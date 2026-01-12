"""
Pydantic models for request and response schemas.
"""

from typing import List, Dict, Optional, Literal
from pydantic import BaseModel, Field, validator


VALID_STRUCTURES = ["ACL", "PCL", "MCL", "LCL", "femur", "tibia", "patella", "articular_cartilage", "medial_menisci", "lateral_menisci", "quadriceps", "hamstrings", "gastrocnemius"]


class PatientInfo(BaseModel):
    """Patient information model."""

    age: int = Field(..., ge=0, le=150, description="Patient age in years")
    gender: str = Field(..., description="Patient gender")
    height_cm: float = Field(..., gt=0, description="Patient height in centimeters")
    weight_kg: float = Field(..., gt=0, description="Patient weight in kilograms")
    injury_type: str = Field(..., description="Type of knee injury")
    rehab_stage: str = Field(..., description="Rehabilitation stage (e.g., 'Initial', 'Intermediate', 'Advanced')")
    affected_structures: List[str] = Field(..., min_items=1, description="List of affected knee structures")

    @validator("affected_structures")
    def validate_structures(cls, v):
        """Validate that all structures are from the allowed list."""
        invalid = [s for s in v if s not in VALID_STRUCTURES]
        if invalid:
            raise ValueError(f"Invalid structures: {invalid}. Valid structures are: {VALID_STRUCTURES}")
        return v


class RegionMeasurement(BaseModel):
    """Stress measurement for a specific region."""

    region: str = Field(..., description="Knee region name (e.g., 'medial compartment', 'lateral compartment', 'patellofemoral')")
    stress: float = Field(..., description="Stress measurement value in N or Nm")


class ExerciseRecommendationRequest(BaseModel):
    """Request model for exercise recommendation API."""

    patient_info: PatientInfo = Field(..., description="Patient information")
    regions: List[RegionMeasurement] = Field(..., description="List of stress/load measurements for different regions")


class IdealStress(BaseModel):
    """Ideal stress value for a knee region."""

    region: str = Field(..., description="Knee region name")
    ideal_stress: float = Field(..., gt=0, description="Ideal stress value in N or Nm")


class Exercise(BaseModel):
    """Exercise recommendation model."""

    name: str = Field(..., description="Descriptive name of the exercise")
    description: str = Field(..., description="Step-by-step instructions for performing the exercise")
    target_structures: List[str] = Field(..., min_items=1, description="Array of target structures from the allowed list")
    duration: str = Field(..., description="Recommended duration (e.g., '30 seconds', '5 minutes')")
    sets_reps: str = Field(..., description="Sets and reps recommendation (e.g., '3 sets x 10 reps')")
    load_level: Literal["low", "medium", "high"] = Field(..., description="Qualitative load level")
    clinical_justification: str = Field(..., description="Rationale linking exercise to rehab goals and injury type")

    @validator("target_structures")
    def validate_target_structures(cls, v):
        """Validate that all target structures are from the allowed list."""
        invalid = [s for s in v if s not in VALID_STRUCTURES]
        if invalid:
            raise ValueError(f"Invalid target structures: {invalid}. Valid structures are: {VALID_STRUCTURES}")
        return v


class ExerciseRecommendationResponse(BaseModel):
    """Response model for exercise recommendation API."""

    ideal_stresses: List[IdealStress] = Field(..., description="List of ideal stress values for each region")
    exercises: List[Exercise] = Field(..., description="List of recommended rehabilitation exercises")

    class Config:
        json_schema_extra = {
            "example": {
                "ideal_stresses": [{"region": "medial compartment", "ideal_stress": 150.5}, {"region": "lateral compartment", "ideal_stress": 120.3}],
                "exercises": [
                    {
                        "name": "Quadriceps Isometric Contraction",
                        "description": "Sit with leg extended. Tighten quadriceps muscle and hold for 10 seconds. Relax and repeat.",
                        "target_structures": ["quadriceps", "patella"],
                        "duration": "10 seconds per contraction",
                        "sets_reps": "3 sets x 10 reps",
                        "load_level": "low",
                        "clinical_justification": "Low-load isometric exercise to maintain muscle activation without excessive stress on healing ACL graft. Evidence supports early isometric exercises in ACL rehabilitation protocols.",
                    }
                ],
            }
        }
