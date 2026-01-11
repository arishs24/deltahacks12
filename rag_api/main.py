"""
FastAPI server for exercise recommendation API.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .config import get_config
from .models import ExerciseRecommendationRequest, ExerciseRecommendationResponse
from .service import ExerciseRecommendationService

# Initialize FastAPI app
app = FastAPI(title="Exercise Recommendation API", description="API for generating exercise recommendations based on biomechanical stress measurements", version="1.0.0")

# Add CORS middleware to allow requests from Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Service will be initialized on first request
_service_instance = None


def get_service():
    """Get service instance (lazy initialization)."""
    global _service_instance
    if _service_instance is None:
        _service_instance = ExerciseRecommendationService()
    return _service_instance


@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Exercise Recommendation API", "version": "1.0.0", "docs": "/docs"}


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.post("/exercise-recommendation", response_model=ExerciseRecommendationResponse)
async def get_exercise_recommendation(request: ExerciseRecommendationRequest) -> ExerciseRecommendationResponse:
    """
    Generate exercise recommendations based on biomechanical stress measurements.

    This endpoint:
    1. Queries Moorcheh RAG to interpret the stress measurements
    2. Uses Gemini LLM to generate structured exercise recommendations
    3. Returns healthy force values for key structures and recommended exercises

    Args:
        request: Request containing patient info and stress measurements

    Returns:
        Exercise recommendation response with healthy forces and exercises
    """
    try:
        service = get_service()
        response = service.generate_recommendation(request)
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


def main():
    """Run the FastAPI server."""
    config = get_config()
    uvicorn.run("rag_api.main:app", host=config.api_host, port=config.api_port, reload=True)  # Auto-reload on code changes


if __name__ == "__main__":
    main()
