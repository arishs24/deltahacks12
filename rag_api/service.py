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
        return self._parse_response(structured_output, data_sufficient, rag_interpretation=rag_response)

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
CRITICAL INSTRUCTIONS - STRICT ADHERENCE TO RAG DATA:
- You MUST base your response ONLY on the RAG interpretation provided above
- DO NOT invent, estimate, or make up ANY information that is not explicitly in the RAG interpretation
- DO NOT use general knowledge, medical training, or any external information to fill gaps
- DO NOT create exercises if the RAG interpretation does not explicitly mention or suggest exercises
- If the RAG interpretation does not mention exercises, set exercises to an EMPTY ARRAY []
- If the RAG interpretation does not provide specific healthy force values, set healthy_forces to an EMPTY OBJECT {{}}
- Hallucination (making up information) is considered VERY BAD and must be avoided at all costs
- If you find yourself wanting to add information not in the RAG interpretation, DO NOT add it - instead, note it in the "gemini_feedback" field

Please provide your response as a JSON object with the following EXACT structure:
{{
    "data_sufficient": <boolean>,
    "healthy_forces": {{
        // Dictionary with structure names as keys and numbers as values
        // Examples: "acl": 150.5, "menisci": 200.3, "patellar_tendon": 180.0
        // If data_sufficient is FALSE, use empty object {{}}
        // ONLY include structures and values EXPLICITLY mentioned in RAG interpretation
        // DO NOT invent or estimate values - if not in RAG, use empty object {{}}
    }},
    "exercises": [
        // Array of exercise objects, each with EXACTLY one field: "name"
        // Example: {{"name": "Hamstring Stretch"}}
        // CRITICAL: Use "name" NOT "exercise_name", NOT "exercise", NOT "title"
        // CRITICAL: ONLY include exercises that are EXPLICITLY mentioned or suggested in the RAG interpretation
        // If the RAG interpretation does NOT mention exercises, use EMPTY ARRAY []
        // DO NOT invent exercises based on general knowledge - if RAG doesn't suggest them, don't include them
        // If data_sufficient is FALSE, use empty array []
    ],
    "gemini_feedback": <string or null>
    // Report any struggles, concerns, or limitations you encountered:
    // - If you had to resist using general knowledge, mention it here
    // - If the RAG interpretation was unclear or contradictory, mention it
    // - If you wanted to add information not in RAG but didn't, note what was missing
    // - If you successfully used only RAG data with no issues, set to null
    // Examples:
    //   null (if no issues)
    //   "RAG interpretation did not mention specific exercises, so exercises array is empty as required"
    //   "RAG interpretation lacked specific healthy force values for some structures mentioned in measurements"
    //   "Had to resist adding general knowledge about knee biomechanics not present in RAG interpretation"
}}

CRITICAL FIELD REQUIREMENTS:
- Each exercise object MUST have a field called exactly "name" (lowercase)
- Do NOT use "exercise_name", "exercise", "title", or any other field name
- The field must be: "name": "Exercise Name Here"
- All other fields in exercise objects will be ignored
- gemini_feedback: Be honest about any struggles or limitations - this helps identify when RAG data is insufficient

ANTI-HALLUCINATION RULES:
1. If RAG interpretation does NOT mention exercises → exercises = []
2. If RAG interpretation does NOT provide healthy force values → healthy_forces = {{}}
3. If you find yourself wanting to add information → DON'T add it, note it in gemini_feedback instead
4. When in doubt, leave it empty and explain in gemini_feedback

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
                    max_output_tokens=4096,  # Increased to handle longer responses
                    response_mime_type="application/json",  # Enforce JSON only
                ),
            )

            text = response.text.strip() if response.text else ""
            if not text:
                raise ValueError("Empty response from Gemini")

            # Extract JSON from markdown if needed
            if "```json" in text:
                start = text.find("```json") + 7
                end = text.find("```", start)
                if end == -1:
                    # Incomplete markdown block - use rest of text
                    end = len(text)
                text = text[start:end].strip()
            elif "```" in text:
                start = text.find("```") + 3
                end = text.find("```", start)
                if end == -1:
                    # Incomplete markdown block - use rest of text
                    end = len(text)
                text = text[start:end].strip()

            # Validate and attempt to fix incomplete JSON
            text = text.strip()

            # Check if JSON appears incomplete
            if text.startswith("{") and not text.endswith("}"):
                # Count unclosed brackets/braces
                open_braces = text.count("{") - text.count("}")
                open_brackets = text.count("[") - text.count("]")

                # Check if exercises array is open
                has_incomplete_exercises = '"exercises": [' in text and text.count('"exercises": [') > 0

                if has_incomplete_exercises or open_brackets > 0 or open_braces > 0:
                    # Attempt to close incomplete structures
                    # Remove trailing comma if present
                    text = text.rstrip().rstrip(",")

                    # Close arrays first
                    if has_incomplete_exercises and not text.rstrip().endswith("]"):
                        text += "]"
                        open_brackets = max(0, open_brackets - 1)

                    # Close any remaining brackets
                    text += "\n" + "]" * open_brackets if open_brackets > 0 else ""

                    # Close any remaining braces
                    text += "\n" + "}" * open_braces if open_braces > 0 else ""

                    # Ensure root object is closed
                    if not text.rstrip().endswith("}"):
                        text += "}"

            return text

        except Exception as e:
            error_msg = str(e)
            if "not found" in error_msg.lower() or "404" in error_msg:
                raise ValueError(f"Model '{self.gemini_model}' not found or not accessible. " "Check model name and API key permissions.")
            else:
                raise ValueError(f"Error querying Gemini: {error_msg}")

    def _parse_response(self, json_text: str, data_sufficient_default: bool = True, rag_interpretation: str = None) -> ExerciseRecommendationResponse:
        """Parse Gemini's JSON response into structured model."""
        try:
            # Try to parse JSON
            try:
                data = json.loads(json_text)
            except json.JSONDecodeError as json_err:
                # If JSON parsing fails, provide helpful error message
                error_pos = json_err.pos if hasattr(json_err, "pos") else len(json_text)
                context_start = max(0, error_pos - 100)
                context_end = min(len(json_text), error_pos + 100)
                error_context = json_text[context_start:context_end]

                raise ValueError(
                    f"Invalid or incomplete JSON response from Gemini. "
                    f"Error at position {error_pos}: {str(json_err)}\n"
                    f"Response context: {error_context}\n"
                    f"Full response length: {len(json_text)} characters. "
                    f"This may indicate the response was truncated. Try reducing the number of exercises requested."
                )

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
                # Normalize exercise objects - handle both "name" and "exercise_name" fields
                exercises = []
                for ex in exercises_data:
                    if isinstance(ex, dict):
                        # Try "name" first, then "exercise_name" as fallback
                        exercise_name = ex.get("name") or ex.get("exercise_name") or ex.get("exercise") or ex.get("title")
                        if exercise_name:
                            # Create Exercise with only the name field (ignore other fields)
                            exercises.append(Exercise(name=str(exercise_name)))
                        else:
                            print(f"Warning: Exercise object missing name field: {ex}")
                    elif isinstance(ex, str):
                        # If it's just a string, use it as the name
                        exercises.append(Exercise(name=str(ex)))
                    else:
                        print(f"Warning: Invalid exercise format: {ex}")

            # Extract gemini_feedback
            gemini_feedback = data.get("gemini_feedback")
            if gemini_feedback and isinstance(gemini_feedback, str) and gemini_feedback.strip():
                gemini_feedback = gemini_feedback.strip()
            else:
                gemini_feedback = None

            return ExerciseRecommendationResponse(
                healthy_forces=healthy_forces,
                exercises=exercises,
                data_sufficient=data_sufficient,
                rag_interpretation=rag_interpretation,
                gemini_feedback=gemini_feedback,
            )

        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON response from Gemini: {str(e)}\nResponse: {json_text}")
        except Exception as e:
            raise ValueError(f"Error parsing response: {str(e)}")
