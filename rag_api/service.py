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
from .models import ExerciseRecommendationRequest, ExerciseRecommendationResponse, IdealStress, Exercise, VALID_STRUCTURES


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
        return self._parse_response(structured_output, request, rag_interpretation=rag_response)

    def _build_rag_prompt(self, request: ExerciseRecommendationRequest) -> str:
        """Build prompt for Moorcheh RAG to interpret knee stress measurements."""
        regions_str = "\n".join([f"- {r.region}: Stress={r.stress} N" for r in request.regions])
        structures_str = ", ".join(request.patient_info.affected_structures)

        prompt = f"""Please provide an accurate interpretation of the following knee biomechanical stress measurements for a patient undergoing rehabilitation.

Patient Information:
- Age: {request.patient_info.age} years
- Gender: {request.patient_info.gender}
- Height: {request.patient_info.height_cm} cm
- Weight: {request.patient_info.weight_kg} kg
- Injury Type: {request.patient_info.injury_type}
- Rehabilitation Stage: {request.patient_info.rehab_stage}
- Affected Structures: {structures_str}

Stress Measurements by Region:
{regions_str}

Please analyze these measurements and provide:
1. Interpretation of the stress values compared to healthy baseline values
2. Ideal stress values for each measured region based on the patient's rehabilitation stage
3. Identification of any areas of concern or abnormal stress patterns
4. Clinical context for these measurements in relation to the injury type and rehab stage
5. Specific exercise recommendations from the database studies that are appropriate for:
   - The patient's rehabilitation stage ({request.patient_info.rehab_stage})
   - The affected structures ({structures_str})
   - The measured stress patterns
   - Evidence-based protocols from clinical studies

IMPORTANT: When suggesting exercises, please reference specific exercises from the studies and clinical protocols in the database. Include:
- Exercise names as they appear in research studies
- Detailed descriptions and instructions
- Target structures for each exercise
- Appropriate load levels for the rehabilitation stage
- Clinical justification based on biomechanical measurements and evidence from the database"""

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
        regions_str = "\n".join([f"- {r.region}: {r.stress} N" for r in request.regions])
        structures_str = ", ".join(request.patient_info.affected_structures)

        data_quality_note = ""
        if not data_sufficient:
            data_quality_note = """
⚠️ IMPORTANT: The RAG system did NOT find sufficient relevant data in the knowledge base. 
The RAG interpretation above indicates insufficient or missing information.
In this case, you MUST:
1. Provide conservative, general recommendations based on standard rehabilitation protocols
2. Clearly indicate in clinical_justification that recommendations are based on general guidelines
3. Focus on low-load exercises appropriate for the rehabilitation stage
"""

        prompt = f"""You are a clinical exercise specialist specializing in knee rehabilitation. Based on the following patient information, stress measurements, and RAG interpretation from the knowledge base, provide knee rehabilitation recommendations in JSON format.

Patient Information:
- Age: {request.patient_info.age} years
- Gender: {request.patient_info.gender}
- Height: {request.patient_info.height_cm} cm
- Weight: {request.patient_info.weight_kg} kg
- Injury Type: {request.patient_info.injury_type}
- Rehabilitation Stage: {request.patient_info.rehab_stage}
- Affected Structures: {structures_str}

Stress Measurements:
{regions_str}

RAG Interpretation from Knowledge Base:
{rag_interpretation}
{data_quality_note}

CRITICAL INSTRUCTIONS:
- You MUST base your response on the RAG interpretation provided above
- Provide ideal stress values for EACH region mentioned in the stress measurements
- Ensure exercises target the affected structures: {structures_str}
- Match exercise load levels to the rehabilitation stage: {request.patient_info.rehab_stage}
  * Initial stage: Use "low" load level
  * Intermediate stage: Use "low" to "medium" load levels
  * Advanced stage: Can use "medium" to "high" load levels
- Include detailed descriptions and clinical justifications
- Reference specific exercises from the RAG interpretation when available
- If RAG interpretation lacks specific exercises, use evidence-based general recommendations appropriate for the injury type and rehab stage

Please provide your response as a JSON object with the following EXACT structure:
{{
    "ideal_stresses": [
        {{
            "region": "<region name matching input regions>",
            "ideal_stress": <number in N or Nm>
        }}
    ],
    "exercises": [
        {{
            "name": "<exercise name>",
            "description": "<step-by-step instructions>",
            "target_structures": ["<structure1>", "<structure2>"],
            "duration": "<duration string, e.g., '30 seconds', '5 minutes'>",
            "sets_reps": "<sets and reps, e.g., '3 sets x 10 reps'>",
            "load_level": "<'low', 'medium', or 'high'>",
            "clinical_justification": "<rationale linking exercise to rehab goals>"
        }}
    ]
}}

VALID STRUCTURES (for target_structures):
{', '.join(VALID_STRUCTURES)}

REQUIREMENTS:
- ideal_stresses: Must include one entry for EACH region in the input
- exercises: Should include 3-8 exercises that collectively target all affected structures
- Each exercise must have at least one target_structure from the affected_structures list
- load_level must match the rehabilitation stage
- All fields are required for each exercise

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

    def _parse_response(self, json_text: str, request: ExerciseRecommendationRequest, rag_interpretation: str = None) -> ExerciseRecommendationResponse:
        """Parse Gemini's JSON response into structured model."""
        try:
            # Try to parse JSON
            try:
                data = json.loads(json_text)
            except json.JSONDecodeError as json_err:
                error_pos = json_err.pos if hasattr(json_err, "pos") else len(json_text)
                context_start = max(0, error_pos - 100)
                context_end = min(len(json_text), error_pos + 100)
                error_context = json_text[context_start:context_end]

                raise ValueError(
                    f"Invalid or incomplete JSON response from Gemini. "
                    f"Error at position {error_pos}: {str(json_err)}\n"
                    f"Response context: {error_context}\n"
                    f"Full response length: {len(json_text)} characters."
                )

            # Parse ideal stresses
            ideal_stresses_data = data.get("ideal_stresses", [])
            ideal_stresses = []
            input_regions = {r.region for r in request.regions}

            for stress_data in ideal_stresses_data:
                if not isinstance(stress_data, dict):
                    continue
                region = stress_data.get("region", "")
                ideal_stress = stress_data.get("ideal_stress", 0)

                if region and ideal_stress > 0:
                    ideal_stresses.append(IdealStress(region=region, ideal_stress=ideal_stress))

            # Ensure we have ideal stresses for all input regions
            output_regions = {s.region for s in ideal_stresses}
            missing_regions = input_regions - output_regions
            if missing_regions:
                # Add default ideal stresses for missing regions (conservative estimate)
                for region in missing_regions:
                    # Use average of existing ideal stresses or a conservative default
                    avg_stress = sum(s.ideal_stress for s in ideal_stresses) / len(ideal_stresses) if ideal_stresses else 100.0
                    ideal_stresses.append(IdealStress(region=region, ideal_stress=avg_stress))

            # Parse exercises
            exercises_data = data.get("exercises", [])
            exercises = []

            for ex_data in exercises_data:
                if not isinstance(ex_data, dict):
                    continue

                try:
                    # Validate and extract exercise fields
                    name = ex_data.get("name", "").strip()
                    description = ex_data.get("description", "").strip()
                    target_structures = ex_data.get("target_structures", [])
                    duration = ex_data.get("duration", "").strip()
                    sets_reps = ex_data.get("sets_reps", "").strip()
                    load_level = ex_data.get("load_level", "low").lower()
                    clinical_justification = ex_data.get("clinical_justification", "").strip()

                    # Validate required fields
                    if not name or not description or not target_structures:
                        print(f"Warning: Skipping exercise with missing required fields: {ex_data}")
                        continue

                    # Validate load_level
                    if load_level not in ["low", "medium", "high"]:
                        load_level = "low"  # Default to low if invalid

                    # Validate target_structures
                    valid_targets = [s for s in target_structures if s in VALID_STRUCTURES]
                    if not valid_targets:
                        # If no valid targets, use first affected structure as fallback
                        valid_targets = [request.patient_info.affected_structures[0]] if request.patient_info.affected_structures else ["quadriceps"]

                    # Create exercise object
                    exercise = Exercise(
                        name=name,
                        description=description,
                        target_structures=valid_targets,
                        duration=duration or "As prescribed",
                        sets_reps=sets_reps or "As prescribed",
                        load_level=load_level,
                        clinical_justification=clinical_justification or f"Recommended for {request.patient_info.injury_type} rehabilitation at {request.patient_info.rehab_stage} stage.",
                    )
                    exercises.append(exercise)

                except Exception as e:
                    print(f"Warning: Error parsing exercise {ex_data}: {e}")
                    continue

            # Ensure we have at least some exercises
            if not exercises:
                # Add a default conservative exercise
                default_target = request.patient_info.affected_structures[0] if request.patient_info.affected_structures else "quadriceps"
                exercises.append(
                    Exercise(
                        name="Gentle Range of Motion",
                        description="Slowly move the knee through its comfortable range of motion. Start with small movements and gradually increase as tolerated.",
                        target_structures=[default_target],
                        duration="5-10 minutes",
                        sets_reps="2-3 sets x 10-15 reps",
                        load_level="low",
                        clinical_justification=f"Conservative exercise appropriate for {request.patient_info.rehab_stage} stage rehabilitation of {request.patient_info.injury_type}.",
                    )
                )

            return ExerciseRecommendationResponse(ideal_stresses=ideal_stresses, exercises=exercises)

        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON response from Gemini: {str(e)}\nResponse: {json_text}")
        except Exception as e:
            raise ValueError(f"Error parsing response: {str(e)}")
