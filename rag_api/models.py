"""
Pydantic models for request and response schemas.
"""

from typing import List, Dict, Optional
from pydantic import BaseModel, Field


class PatientInfo(BaseModel):
    """Patient information model."""

    height: float = Field(..., description="Patient height in cm")
    weight: float = Field(..., description="Patient weight in kg")
    gender: str = Field(..., description="Patient gender")


class RegionMeasurement(BaseModel):
    """Stress measurement for a specific region."""

    region: str = Field(..., description="Region name (e.g., 'heel', 'arch', 'forefoot')")
    stress: float = Field(..., description="Stress measurement value")
    load: float = Field(..., description="Load measurement value")


class ExerciseRecommendationRequest(BaseModel):
    """Request model for exercise recommendation API."""

    patient_info: PatientInfo = Field(..., description="Patient information")
    regions: List[RegionMeasurement] = Field(..., description="List of stress/load measurements for different regions")


class HealthyForce(BaseModel):
    """Healthy force measurement for a specific structure."""

    structure: str = Field(..., description="Structure name (e.g., 'acl', 'menisci', 'patellar_tendon')")
    healthy_force: float = Field(..., description="Healthy force/stress value for this structure")


class Exercise(BaseModel):
    """Exercise recommendation model."""

    name: str = Field(..., description="Exercise name")
    # Extensible: Add more fields as needed (e.g., description, reps, sets, duration)


class ExerciseRecommendationResponse(BaseModel):
    """Response model for exercise recommendation API."""

    healthy_forces: Dict[str, float] = Field(..., description="Dictionary mapping structure names to healthy force values")
    exercises: List[Exercise] = Field(..., description="List of recommended exercises")
    data_sufficient: bool = Field(
        default=True,
        description="Indicates whether sufficient and reliable data was found in the knowledge base to provide accurate recommendations. If false, the recommendations should be treated as general guidelines only.",
    )
    rag_interpretation: Optional[str] = Field(
        default=None,
        description="The RAG interpretation from Moorcheh knowledge base that was used to generate the recommendations. This shows what information was retrieved from the knowledge base.",
    )
    gemini_feedback: Optional[str] = Field(
        default=None,
        description="Feedback from Gemini LLM about any struggles, limitations, or concerns when generating the response. This includes warnings if general knowledge was used instead of RAG data, or if the RAG interpretation was insufficient. Null if no issues were encountered.",
    )

    class Config:
        json_schema_extra = {
            "example": {
                "healthy_forces": {"acl": 150.5, "menisci": 200.3, "patellar_tendon": 180.0},
                "exercises": [{"name": "Hamstring Stretch"}, {"name": "Quad Strengthening"}],
                "data_sufficient": True,
                "rag_interpretation": "Based on the biomechanical measurements, the stress values indicate...",
                "gemini_feedback": None,
            }
        }
