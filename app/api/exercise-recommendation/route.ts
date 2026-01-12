import { NextRequest, NextResponse } from 'next/server';

/**
 * API route that proxies requests to the FastAPI backend server.
 * 
 * This route forwards exercise recommendation requests to the FastAPI server
 * running on http://localhost:8000 (or the port specified in process.env.RAG_API_PORT).
 */

// Use Edge Runtime for smaller bundle size (no Node.js dependencies)
export const runtime = 'edge';
export const maxDuration = 30;

const FASTAPI_URL = process.env.RAG_API_URL || 'http://localhost:8000';
const FASTAPI_ENDPOINT = `${FASTAPI_URL}/exercise-recommendation`;

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();

    // Forward the request to FastAPI
    const response = await fetch(FASTAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('FastAPI error:', response.status, errorText);
      return NextResponse.json(
        { error: errorText || 'Failed to get exercise recommendation' },
        { status: response.status }
      );
    }

    // Parse and return the response
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling FastAPI:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
