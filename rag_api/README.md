# RAG API - Exercise Recommendation Service

A FastAPI backend service that provides exercise recommendations based on biomechanical stress measurements. It uses Moorcheh RAG to interpret measurements and Google Gemini LLM to generate structured exercise recommendations.

## Overview

The RAG API is a FastAPI server that:

1. Takes biomechanical stress measurements and patient info as input
2. Queries Moorcheh RAG to interpret the measurements
3. Uses Google Gemini LLM to generate structured exercise recommendations
4. Returns JSON with healthy force values and recommended exercises

## Architecture

```
Next.js Frontend
    ↓ HTTP POST
Next.js API Route (app/api/exercise-recommendation/route.ts)
    ↓ HTTP POST
FastAPI Server (rag_api/main.py) - Port 8000
    ↓ Uses
Moorcheh RAG → Gemini LLM
    ↓ Returns JSON
FastAPI → Next.js → Frontend
```

## API Flow

1. **Input**: Client sends JSON with patient info and stress measurements
2. **RAG Query**: Service queries Moorcheh RAG to interpret measurements
3. **Gemini Processing**: Gemini LLM generates structured exercise recommendations
4. **Output**: Returns JSON with healthy forces and exercise list

## Prerequisites

- Python 3.10 or higher
- Access to Moorcheh API (with API key)
- Google API key for Gemini

## Setup Instructions

### 1. Install Dependencies

Navigate to the project root directory and install the Python dependencies:

```bash
# From project root
pip install -r rag_api/requirements.txt
```

**Recommended: Using a virtual environment**

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r rag_api/requirements.txt
```

### 2. Environment Variables

You need to set the following environment variables. The API will look for them in:

- System environment variables
- `.env` file in the project root
- `.env` file in the `rag_model/` folder

**Required environment variables:**

```bash
# Moorcheh API Key (required)
MOORCHEH_API_KEY=your-moorcheh-api-key-here

# Google API Key for Gemini (required)
GOOGLE_API_KEY=your-google-api-key-here
# OR
GEMINI_API_KEY=your-google-api-key-here
```

**Optional environment variables:**

```bash
# Moorcheh namespace (optional, defaults to "biomechanical_data")
MOORCHEH_NAMESPACE=your-namespace-name

# Gemini model (optional, defaults to "gemini-2.5-flash")
# Valid options: gemini-2.5-flash, gemini-2.5-pro, gemini-2.0-flash-exp, gemini-2.0-flash, gemini-2.0-flash-001
GEMINI_MODEL=gemini-2.5-flash

# API Server settings (optional)
API_HOST=0.0.0.0
API_PORT=8000
```

**Creating a `.env` file:**

Create a `.env` file in the project root directory:

```bash
# .env (in project root)
MOORCHEH_API_KEY=your-moorcheh-api-key-here
GOOGLE_API_KEY=your-google-api-key-here
MOORCHEH_NAMESPACE=biomechanical_data
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Running the Server

**Option A: Using Python module (Recommended)**

From the project root directory:

```bash
python -m rag_api.main
```

**Option B: Using uvicorn directly**

```bash
uvicorn rag_api.main:app --reload --port 8000
```

The server will start on `http://localhost:8000` (or the port specified in `API_PORT`).

## Testing the API

Once the server is running, you can test it in several ways:

### A. Using the Interactive API Documentation (Swagger UI)

Open your browser and navigate to:

```
http://localhost:8000/docs
```

This provides an interactive interface where you can:

- See all available endpoints
- Test the API directly from the browser
- View request/response schemas

### B. Using curl

```bash
curl -X POST "http://localhost:8000/exercise-recommendation" \
  -H "Content-Type: application/json" \
  -d '{
    "patient_info": {
      "height": 175,
      "weight": 70,
      "gender": "male"
    },
    "regions": [
      {
        "region": "heel",
        "stress": 45.2,
        "load": 120.5
      },
      {
        "region": "arch",
        "stress": 32.1,
        "load": 80.3
      }
    ]
  }'
```

### C. Using Python requests

```python
import requests

url = "http://localhost:8000/exercise-recommendation"
payload = {
    "patient_info": {
        "height": 175,
        "weight": 70,
        "gender": "male"
    },
    "regions": [
        {
            "region": "heel",
            "stress": 45.2,
            "load": 120.5
        },
        {
            "region": "arch",
            "stress": 32.1,
            "load": 80.3
        }
    ]
}

response = requests.post(url, json=payload)
print(response.json())
```

### D. Health Check

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{ "status": "healthy" }
```

## API Endpoints

### POST `/exercise-recommendation`

Generates exercise recommendations based on biomechanical measurements.

**Request Body:**

```json
{
  "patient_info": {
    "height": 175.0,
    "weight": 70.0,
    "gender": "male"
  },
  "regions": [
    {
      "region": "heel",
      "stress": 45.2,
      "load": 120.5
    }
  ]
}
```

**Response:**

```json
{
  "healthy_forces": {
    "acl": 150.5,
    "menisci": 200.3,
    "patellar_tendon": 180.0
  },
  "exercises": [
    { "name": "Hamstring Stretch" },
    { "name": "Quad Strengthening" }
  ]
}
```

### GET `/health`

Health check endpoint.

### GET `/`

Root endpoint with API information.

### GET `/docs`

Interactive API documentation (Swagger UI).

## Project Structure

```
rag_api/
├── __init__.py           # Package initialization
├── main.py               # FastAPI application entry point
├── models.py             # Pydantic models for request/response
├── service.py            # Business logic (RAG + Gemini)
├── config.py             # Configuration management
├── requirements.txt      # Python dependencies
└── README.md             # This file
```

## Key Features

- ✅ FastAPI with automatic API documentation (Swagger UI)
- ✅ Structured input/output using Pydantic models
- ✅ Extensible data models (easy to add fields)
- ✅ Integration with Moorcheh RAG
- ✅ Google Gemini LLM for structured output generation
- ✅ CORS configured for Next.js frontend
- ✅ Error handling and validation
- ✅ Lazy configuration loading

## Frontend Integration

### From Next.js Frontend

The frontend engineer should make requests to:

```
POST /api/exercise-recommendation
```

This Next.js API route (`app/api/exercise-recommendation/route.ts`) automatically proxies to the FastAPI server.

### Request Format

```typescript
interface Request {
  patient_info: {
    height: number;
    weight: number;
    gender: string;
  };
  regions: Array<{
    region: string;
    stress: number;
    load: number;
  }>;
}
```

### Response Format

```typescript
interface Response {
  healthy_forces: {
    [structure: string]: number; // e.g., "acl": 150.5
  };
  exercises: Array<{
    name: string;
  }>;
}
```

### Example Usage in Frontend

```typescript
const response = await fetch("/api/exercise-recommendation", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    patient_info: {
      height: 175,
      weight: 70,
      gender: "male",
    },
    regions: [
      { region: "heel", stress: 45.2, load: 120.5 },
      { region: "arch", stress: 32.1, load: 80.3 },
    ],
  }),
});

const data = await response.json();
console.log(data.healthy_forces);
console.log(data.exercises);
```

## Development Workflow

For development, you typically need two terminals:

**Terminal 1: FastAPI Server**

```bash
# Run FastAPI server with auto-reload
python -m rag_api.main
# OR
uvicorn rag_api.main:app --reload --port 8000
```

**Terminal 2: Next.js Frontend**

```bash
npm run dev
```

The Next.js API route will make HTTP requests to the FastAPI server at `http://localhost:8000`.

## Extension Points

### Adding More Fields to Patient Info

Edit `rag_api/models.py`:

```python
class PatientInfo(BaseModel):
    height: float
    weight: float
    gender: str
    age: int  # New field
    # ... add more fields
```

### Adding More Details to Exercises

Edit `rag_api/models.py`:

```python
class Exercise(BaseModel):
    name: str
    description: str  # New field
    reps: int        # New field
    sets: int        # New field
    # ... add more fields
```

Then update `rag_api/service.py` to prompt Gemini for these new fields in the `_build_gemini_prompt` method.

## Troubleshooting

### Error: "MOORCHEH_API_KEY environment variable not set"

Make sure you have set the `MOORCHEH_API_KEY` in your environment variables or `.env` file.

### Error: "GOOGLE_API_KEY or GEMINI_API_KEY environment variable not set"

Make sure you have set the `GOOGLE_API_KEY` or `GEMINI_API_KEY` in your environment variables or `.env` file.

### Error: "Model 'gemini-2.5-flash' not found" or 404 model errors

If you get a 404 error for the model, the error message will list available models for your API key. Set the `GEMINI_MODEL` environment variable to one of the available models:

```bash
GEMINI_MODEL=gemini-2.5-pro  # or another available model
```

Common valid models: `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-2.0-flash-exp`, `gemini-2.0-flash`, `gemini-2.0-flash-001`

### Error: "No module named 'rag_model'"

Make sure you're running the server from the project root directory, or adjust the Python path. The API imports from the `rag_model` folder.

### Port already in use

If port 8000 is already in use, you can:

1. Change the port in `.env`: `API_PORT=8001`
2. Or specify when running: `uvicorn rag_api.main:app --reload --port 8001`

### CORS errors when calling from Next.js

The API is configured to allow requests from `http://localhost:3000`. If you're using a different port, update the CORS settings in `rag_api/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:YOUR_PORT"],
    # ...
)
```

### ImportError when running directly

If you get an `ImportError: attempted relative import with no known parent package` when running `python main.py` directly, use the module syntax instead:

```bash
# Correct way (from project root)
python -m rag_api.main

# OR use uvicorn
uvicorn rag_api.main:app --reload
```

## Production Deployment

For production, consider:

- Using a production ASGI server like Gunicorn with uvicorn workers
- Setting up proper environment variable management
- Configuring CORS appropriately for your domain
- Adding authentication/authorization
- Setting up logging and monitoring
- Using environment-specific configurations

Example production command:

```bash
gunicorn rag_api.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Notes

- The API does NOT modify the `rag_model` folder - it only imports from it
- All configuration is via environment variables
- The service is designed to be easily extensible
- Error handling is built into the service layer
- The API automatically detects available Gemini models if the specified model is not found
