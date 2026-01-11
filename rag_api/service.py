"""
Service layer for processing exercise recommendations.
Handles Moorcheh RAG queries and Gemini LLM structured output generation.
"""

import sys
import json
from pathlib import Path
from typing import Dict, Any, List, Tuple
from google import genai
from google.genai import types

# Add parent directory to path to import from rag_model
sys.path.insert(0, str(Path(__file__).parent.parent))

from rag_model.core.moorcheh_client import MoorchehClient
from rag_model.services.document_service import DocumentService
from .config import get_config
from .models import ExerciseRecommendationRequest, ExerciseRecommendationResponse, HealthyForce, Exercise


class ExerciseRecommendationService:
    """Service for generating exercise recommendations using RAG and Gemini."""

    def __init__(self):
        """Initialize the service."""
        config = get_config()
        self.moorcheh_client = MoorchehClient()
        self.doc_service = DocumentService()

        # Configure Gemini using the new SDK
        self.genai_client = genai.Client(api_key=config.google_api_key)
        self.gemini_model = config.gemini_model
        self.config = config

    def generate_recommendation(self, request: ExerciseRecommendationRequest) -> ExerciseRecommendationResponse:
        """
        Generate exercise recommendations based on stress measurements.

        Args:
            request: Exercise recommendation request with patient info and measurements

        Returns:
            Exercise recommendation response with healthy forces and exercises
        """
        # Step 1: Build prompt for Moorcheh RAG
        rag_prompt = self._build_rag_prompt(request)

        # Step 2: Query Moorcheh RAG
        rag_response, data_sufficient = self._query_moorcheh(rag_prompt)

        # Step 3: Build prompt for Gemini with structured output
        gemini_prompt = self._build_gemini_prompt(request, rag_response, data_sufficient)

        # Step 4: Get structured output from Gemini
        structured_output = self._query_gemini(gemini_prompt)

        # Step 5: Parse and validate structured output
        return self._parse_response(structured_output, data_sufficient)

    def _build_rag_prompt(self, request: ExerciseRecommendationRequest) -> str:
        """Build prompt for Moorcheh RAG to interpret stress measurements."""
        regions_str = "\n".join([f"- {r.region}: Stress={r.stress}, Load={r.load}" for r in request.regions])

        prompt = f"""Please provide an accurate interpretation of the following biomechanical stress and load measurements for different regions of the foot/knee.

Patient Information:
- Height: {request.patient_info.height} cm
- Weight: {request.patient_info.weight} kg
- Gender: {request.patient_info.gender}

Measurements by Region:
{regions_str}

Please analyze these measurements and provide:
1. Interpretation of the stress/load values
2. Comparison with healthy baseline values for key structures (ACL, menisci, patellar tendon, etc.)
3. Identification of any areas of concern
4. Clinical context for these measurements

Focus on providing medically accurate information about what these measurements indicate."""

        return prompt

    def _query_moorcheh(self, prompt: str) -> Tuple[str, bool]:
        """Query Moorcheh RAG and return the answer along with data sufficiency flag."""
        try:
            namespace_type = self.doc_service.get_namespace_type(self.config.moorcheh_namespace)

            response = self.moorcheh_client.query(
                question=prompt,
                namespace=self.config.moorcheh_namespace,
                namespace_type=namespace_type,
                chat_history=None,
                top_k=10,
            )

            answer = response.get("answer", "")
            context_count = response.get("contextCount", 0)

            insufficient_indicators = [
                "No relevant information found",
                "No specific biomechanical data found",
                "No answer generated",
                "No information",
                "don't have enough information",
                "insufficient information",
            ]

            is_sufficient = (
                answer
                and answer != "No relevant information found in the knowledge base."
                and not any(indicator.lower() in answer.lower() for indicator in insufficient_indicators)
                and context_count > 0
            )

            if not is_sufficient:
                return "No specific biomechanical data found in knowledge base. The RAG system did not retrieve sufficient relevant information to provide accurate recommendations.", False

            print(f"Moorcheh response: {answer[:200]}...")  # DEBUG
            return answer, True

        except Exception as e:
            print(f"Error querying Moorcheh: {e}")
            return "Error retrieving biomechanical data from knowledge base. The RAG query failed.", False

    def _build_gemini_prompt(self, request: ExerciseRecommendationRequest, rag_interpretation: str, data_sufficient: bool) -> str:
        """Build prompt for Gemini to generate structured output."""
        regions_str = "\n".join([f"- {r.region}: Stress={r.stress}, Load={r.load}" for r in request.regions])

        data_quality_note = ""
        if not data_sufficient:
            data_quality_note = """
⚠️ IMPORTANT: The RAG system did NOT find sufficient relevant data in the knowledge base. 
The RAG interpretation above indicates insufficient or missing information.
In this case, you MUST:
1. Set "data_sufficient" to FALSE
2. Set "exercises" to an EMPTY ARRAY [] - DO NOT provide any exercise recommendations when data is insufficient
3. Set "healthy_forces" to an EMPTY OBJECT {} - DO NOT invent or estimate specific healthy force values
4. This indicates that without sufficient knowledge base data, we cannot provide reliable recommendations
"""

        prompt = f"""You are a clinical exercise specialist. Based on the following biomechanical measurements and RAG interpretation, provide exercise recommendations in JSON format.

Patient Information:
- Height: {request.patient_info.height} cm
- Weight: {request.patient_info.weight} kg
- Gender: {request.patient_info.gender}

Stress/Load Measurements:
{regions_str}

RAG Interpretation from Knowledge Base:
{rag_interpretation}
{data_quality_note}
CRITICAL INSTRUCTIONS:
- You MUST base your response ONLY on the RAG interpretation provided above
- If the RAG interpretation indicates insufficient data, missing information, or errors, you MUST reflect this in your response
- DO NOT invent, estimate, or make up biomechanical values if they are not in the RAG interpretation
- DO NOT use general knowledge to fill in missing data - only use what is explicitly provided in the RAG interpretation
- If specific healthy force values are not available in the RAG data, set healthy_forces to an empty object {{}} or only include values that were explicitly mentioned
- If data is insufficient, provide only GENERAL exercise recommendations that are safe and standard for the patient profile, NOT specific to the measurements

Please provide your response as a JSON object with the following structure:
{{
    "data_sufficient": <boolean>,
    "healthy_forces": {{}},
    "exercises": []
}}

Return ONLY valid JSON, no additional text before or after."""

        return prompt

    def _query_gemini(self, prompt: str) -> str:
        """Query Gemini and return structured JSON output using new genai SDK."""
        try:
            response = self.genai_client.models.generate_content(
                model=self.gemini_model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=2048,
                    response_mime_type="application/json",  # optional: enforce JSON only
                ),
            )

            text = response.text.strip() if response.text else ""
            if not text:
                raise ValueError("Empty response from Gemini")

            # Extract JSON from markdown if needed
            if "```json" in text:
                start = text.find("```json") + 7
                end = text.find("```", start)
                text = text[start:end].strip()
            elif "```" in text:
                start = text.find("```") + 3
                end = text.find("```", start)
                text = text[start:end].strip()

            return text

        except Exception as e:
            error_msg = str(e)
            if "not found" in error_msg.lower() or "404" in error_msg:
                raise ValueError(f"Model '{self.gemini_model}' not found or not accessible. " "Check model name and API key permissions.")
            else:
                raise ValueError(f"Error querying Gemini: {error_msg}")

    def _parse_response(self, json_text: str, data_sufficient_default: bool = True) -> ExerciseRecommendationResponse:
        """Parse Gemini's JSON response into structured model."""
        try:
            data = json.loads(json_text)

            data_sufficient = data.get("data_sufficient", data_sufficient_default)

            healthy_forces = data.get("healthy_forces", {})
            if isinstance(healthy_forces, list):
                healthy_forces = {item["structure"]: item["healthy_force"] for item in healthy_forces}

            exercises_data = data.get("exercises", [])

            if not data_sufficient:
                if healthy_forces:
                    print(f"Warning: data_sufficient is False but healthy_forces contains values: {list(healthy_forces.keys())}. Clearing healthy_forces.")
                    healthy_forces = {}
                if exercises_data:
                    print(f"Warning: data_sufficient is False but exercises contains {len(exercises_data)} items. Clearing exercises.")
                    exercises_data = []
                exercises = []
            else:
                exercises = [Exercise(**ex) if isinstance(ex, dict) else Exercise(name=str(ex)) for ex in exercises_data]

            return ExerciseRecommendationResponse(
                healthy_forces=healthy_forces,
                exercises=exercises,
                data_sufficient=data_sufficient,
            )

        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON response from Gemini: {str(e)}\nResponse: {json_text}")
        except Exception as e:
            raise ValueError(f"Error parsing response: {str(e)}")
