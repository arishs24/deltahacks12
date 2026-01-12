# RAG API - Exercise Recommendation Service

A FastAPI backend service that provides exercise recommendations based on biomechanical stress measurements. It uses Moorcheh RAG to interpret measurements and Google Gemini LLM to generate structured exercise recommendations.

## Overview

The RAG API is a FastAPI server that:

1. Takes knee biomechanical stress measurements and comprehensive patient info as input
2. Queries Moorcheh RAG to interpret the measurements in clinical context
3. Uses Google Gemini LLM to generate structured exercise recommendations
4. Returns JSON with ideal stress values for each region and detailed exercise recommendations

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

1. **Input**: Client sends JSON with patient info (age, gender, height, weight, injury type, rehab stage, affected structures) and knee region stress measurements
2. **RAG Query**: Service queries Moorcheh RAG to interpret measurements in clinical context
3. **Gemini Processing**: Gemini LLM generates structured exercise recommendations with full details
4. **Output**: Returns JSON with ideal stress values for each region and comprehensive exercise recommendations

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
      "age": 35,
      "gender": "Male",
      "height_cm": 175.0,
      "weight_kg": 80.0,
      "injury_type": "ACL tear",
      "rehab_stage": "Intermediate",
      "affected_structures": ["ACL", "medial_menisci", "quadriceps"]
    },
    "regions": [
      {
        "region": "medial compartment",
        "stress": 120.5
      },
      {
        "region": "lateral compartment",
        "stress": 95.3
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
        "age": 35,
        "gender": "Male",
        "height_cm": 175.0,
        "weight_kg": 80.0,
        "injury_type": "ACL tear",
        "rehab_stage": "Intermediate",
        "affected_structures": ["ACL", "medial_menisci", "quadriceps"]
    },
    "regions": [
        {
            "region": "medial compartment",
            "stress": 120.5
        },
        {
            "region": "lateral compartment",
            "stress": 95.3
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

Generates knee rehabilitation exercise recommendations based on biomechanical stress measurements and patient information.

**Request Body:**

```json
{
  "patient_info": {
    "age": 35,
    "gender": "Male",
    "height_cm": 175.0,
    "weight_kg": 80.0,
    "injury_type": "ACL tear",
    "rehab_stage": "Intermediate",
    "affected_structures": ["ACL", "medial_menisci", "quadriceps"]
  },
  "regions": [
    {
      "region": "medial compartment",
      "stress": 120.5
    },
    {
      "region": "lateral compartment",
      "stress": 95.3
    }
  ]
}
```

**Request Field Descriptions:**

- `patient_info.age`: Patient age in years (0-150)
- `patient_info.gender`: Patient gender (string)
- `patient_info.height_cm`: Patient height in centimeters (must be > 0)
- `patient_info.weight_kg`: Patient weight in kilograms (must be > 0)
- `patient_info.injury_type`: Type of knee injury (string, e.g., "ACL tear", "Meniscus injury")
- `patient_info.rehab_stage`: Rehabilitation stage (string, e.g., "Initial", "Intermediate", "Advanced")
- `patient_info.affected_structures`: Array of affected knee structures (must include at least one)
  - Valid values: `"ACL"`, `"PCL"`, `"MCL"`, `"LCL"`, `"femur"`, `"tibia"`, `"patella"`, `"articular_cartilage"`, `"medial_menisci"`, `"lateral_menisci"`, `"quadriceps"`, `"hamstrings"`, `"gastrocnemius"`
- `regions`: Array of stress measurements for knee regions (must include at least one)
  - `region`: Knee region name (e.g., "medial compartment", "lateral compartment", "patellofemoral")
  - `stress`: Stress measurement value in N or Nm (must be > 0)

**Response:**

```json
{
  "ideal_stresses": [
    {
      "region": "medial compartment",
      "ideal_stress": 150.5
    },
    {
      "region": "lateral compartment",
      "ideal_stress": 120.3
    }
  ],
  "exercises": [
    {
      "name": "Quadriceps Isometric Contraction",
      "description": "Sit with leg extended. Tighten quadriceps muscle and hold for 10 seconds. Relax and repeat.",
      "target_structures": ["quadriceps", "patella"],
      "duration": "10 seconds per contraction",
      "sets_reps": "3 sets x 10 reps",
      "load_level": "low",
      "clinical_justification": "Low-load isometric exercise to maintain muscle activation without excessive stress on healing ACL graft. Evidence supports early isometric exercises in ACL rehabilitation protocols."
    },
    {
      "name": "Hamstring Stretch",
      "description": "Sit on floor with one leg extended. Reach forward toward toes, hold for 30 seconds. Repeat on other leg.",
      "target_structures": ["hamstrings"],
      "duration": "30 seconds per stretch",
      "sets_reps": "3 sets x 3 reps",
      "load_level": "low",
      "clinical_justification": "Gentle stretching to maintain flexibility and prevent muscle tightness during ACL rehabilitation."
    }
  ]
}
```

**Response Field Descriptions:**

- `ideal_stresses`: Array of ideal stress values for each input region
  - `region`: Knee region name (matches input regions)
  - `ideal_stress`: Ideal stress value in N or Nm (based on rehabilitation stage and clinical guidelines)
- `exercises`: Array of recommended rehabilitation exercises
  - `name`: Descriptive name of the exercise
  - `description`: Step-by-step instructions for performing the exercise
  - `target_structures`: Array of target structures from the valid structures list
  - `duration`: Recommended duration (e.g., "30 seconds", "5 minutes")
  - `sets_reps`: Sets and reps recommendation (e.g., "3 sets x 10 reps")
  - `load_level`: Qualitative load level - `"low"`, `"medium"`, or `"high"` (matched to rehabilitation stage)
  - `clinical_justification`: Rationale linking exercise to rehab goals and injury type

**Load Level Guidelines:**

- **Initial stage**: Exercises use `"low"` load level
- **Intermediate stage**: Exercises use `"low"` to `"medium"` load levels
- **Advanced stage**: Exercises can use `"medium"` to `"high"` load levels

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
- ✅ Structured input/output using Pydantic models with comprehensive validation
- ✅ Knee-specific rehabilitation recommendations with full exercise details
- ✅ Integration with Moorcheh RAG for evidence-based recommendations
- ✅ Google Gemini LLM for structured output generation
- ✅ Automatic load level matching to rehabilitation stage
- ✅ Validates affected structures against clinical anatomy list
- ✅ CORS configured for Next.js frontend
- ✅ Comprehensive error handling and validation
- ✅ Lazy configuration loading

## Valid Structures

The API validates that all `affected_structures` and `target_structures` use values from this clinical anatomy list:

- **Ligaments**: `ACL`, `PCL`, `MCL`, `LCL`
- **Bones**: `femur`, `tibia`, `patella`
- **Cartilage**: `articular_cartilage`
- **Menisci**: `medial_menisci`, `lateral_menisci`
- **Muscles**: `quadriceps`, `hamstrings`, `gastrocnemius`

Any structure not in this list will result in a validation error.

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
    age: number; // 0-150
    gender: string; // e.g., "Male", "Female"
    height_cm: number; // > 0
    weight_kg: number; // > 0
    injury_type: string; // e.g., "ACL tear"
    rehab_stage: string; // e.g., "Initial", "Intermediate", "Advanced"
    affected_structures: string[]; // At least one from valid list
  };
  regions: Array<{
    region: string; // Knee region name
    stress: number; // Stress in N or Nm (> 0)
  }>;
}

// Valid structures for affected_structures and target_structures:
type ValidStructure =
  | "ACL"
  | "PCL"
  | "MCL"
  | "LCL"
  | "femur"
  | "tibia"
  | "patella"
  | "articular_cartilage"
  | "medial_menisci"
  | "lateral_menisci"
  | "quadriceps"
  | "hamstrings"
  | "gastrocnemius";
```

### Response Format

```typescript
interface Response {
  ideal_stresses: Array<{
    region: string; // Matches input region names
    ideal_stress: number; // Ideal stress value in N or Nm
  }>;
  exercises: Array<{
    name: string; // Exercise name
    description: string; // Step-by-step instructions
    target_structures: string[]; // Array of valid structures
    duration: string; // e.g., "30 seconds", "5 minutes"
    sets_reps: string; // e.g., "3 sets x 10 reps"
    load_level: "low" | "medium" | "high";
    clinical_justification: string; // Rationale for the exercise
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
      age: 35,
      gender: "Male",
      height_cm: 175.0,
      weight_kg: 80.0,
      injury_type: "ACL tear",
      rehab_stage: "Intermediate",
      affected_structures: ["ACL", "medial_menisci", "quadriceps"],
    },
    regions: [
      { region: "medial compartment", stress: 120.5 },
      { region: "lateral compartment", stress: 95.3 },
    ],
  }),
});

const data = await response.json();
console.log(data.ideal_stresses); // Array of { region, ideal_stress }
console.log(data.exercises); // Array of full exercise objects
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
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    injury_type: str
    rehab_stage: str
    affected_structures: List[str]
    # Add new fields here, e.g.:
    # medical_history: Optional[str]
    # previous_surgeries: Optional[List[str]]
```

### Adding More Details to Exercises

The `Exercise` model already includes comprehensive fields:

- `name`: Exercise name
- `description`: Step-by-step instructions
- `target_structures`: Target structures array
- `duration`: Recommended duration
- `sets_reps`: Sets and reps
- `load_level`: Load level (low/medium/high)
- `clinical_justification`: Clinical rationale

To add additional fields, edit `rag_api/models.py`:

```python
class Exercise(BaseModel):
    # ... existing fields ...
    difficulty: str  # New field
    equipment_needed: List[str]  # New field
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

## Validation and Error Handling

### Input Validation

The API performs comprehensive validation:

- **Patient Info**: Age must be 0-150, height/weight must be > 0
- **Affected Structures**: Must include at least one structure, all must be from valid list
- **Regions**: Must include at least one region measurement
- **Stress Values**: Must be positive numbers

### Error Responses

- **400 Bad Request**: Invalid input (validation errors, missing required fields)
- **500 Internal Server Error**: Server-side errors (RAG/Gemini failures, parsing errors)

Example error response:

```json
{
  "detail": "Invalid structures: ['invalid_structure']. Valid structures are: ['ACL', 'PCL', ...]"
}
```

### Response Guarantees

- `ideal_stresses` will always include one entry for each input region
- `exercises` will always include at least one exercise (default conservative exercise if RAG data is insufficient)
- All exercises will have at least one `target_structure` from the affected structures list
- `load_level` will match the rehabilitation stage

## Notes

- The API does NOT modify the `rag_model` folder - it only imports from it
- All configuration is via environment variables
- The service is designed to be easily extensible
- Error handling is built into the service layer
- The API automatically detects available Gemini models if the specified model is not found
- Exercises are evidence-based and aligned with the patient's rehabilitation stage
- Ideal stresses are calculated based on rehabilitation stage and clinical guidelines
- All stress values are in Newtons (N) or Newton-meters (Nm)
- Height is in centimeters (cm), weight is in kilograms (kg)