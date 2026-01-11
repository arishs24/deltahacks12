import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

/**
 * API Route: /api/patients
 * 
 * Server-side only: This route handles patient data operations.
 * Client-side code should NEVER access MongoDB directly - it must go through this API.
 * 
 * POST /api/patients - Create a new patient
 * GET /api/patients - Fetch all patients (for future use)
 */

/**
 * POST /api/patients
 * Creates a new patient document in MongoDB
 * 
 * Request body:
 * {
 *   name: string,
 *   age: string (will be converted to number),
 *   gender: string,
 *   height: string (will be converted to number),
 *   weight: string (will be converted to number),
 *   injuryType: string,
 *   rehabStage: "Initial" | "Intermediate" | "Advanced",
 *   affectedStructures: string[]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'age', 'gender', 'height', 'weight', 'injuryType', 'rehabStage', 'affectedStructures'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate affectedStructures is an array and not empty
    if (!Array.isArray(body.affectedStructures) || body.affectedStructures.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one affected structure must be selected' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || 'deltahacks12';
    const db = client.db(dbName);

    // Transform form data to match patient schema
    // Convert string numbers to actual numbers, normalize rehabStage to lowercase
    const patientData = {
      name: body.name.trim(),
      age: parseInt(body.age, 10),
      gender: body.gender,
      height: parseFloat(body.height),
      weight: parseFloat(body.weight),
      injuryType: body.injuryType.trim(),
      rehabStage: body.rehabStage.toLowerCase(), // Store as lowercase: "initial", "intermediate", "advanced"
      affectedStructures: body.affectedStructures,
      createdAt: new Date(),
      // Note: simulationStatus and other fields can be added later
    };

    // Validate numeric fields
    if (isNaN(patientData.age) || patientData.age < 0 || patientData.age > 150) {
      return NextResponse.json(
        { success: false, error: 'Invalid age. Must be between 0 and 150' },
        { status: 400 }
      );
    }

    if (isNaN(patientData.height) || patientData.height <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid height. Must be a positive number' },
        { status: 400 }
      );
    }

    if (isNaN(patientData.weight) || patientData.weight <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid weight. Must be a positive number' },
        { status: 400 }
      );
    }

    // Insert document into patients collection
    const result = await db.collection('patients').insertOne(patientData);

    // Return success response with created document ID
    return NextResponse.json(
      { 
        success: true, 
        id: result.insertedId.toString(),
        message: 'Patient created successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving patient to MongoDB:', error);
    
    // Handle MongoDB-specific errors
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: `Failed to save patient: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save patient. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/patients
 * Fetches all patients from MongoDB
 * 
 * Note: This endpoint is available for future use (e.g., populating patient lists)
 * For now, we'll keep mock data in the frontend, but this endpoint is ready.
 */
export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || 'deltahacks12';
    const db = client.db(dbName);
    
    const patients = await db.collection('patients').find({}).toArray();

    return NextResponse.json(
      { success: true, patients },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching patients from MongoDB:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}
