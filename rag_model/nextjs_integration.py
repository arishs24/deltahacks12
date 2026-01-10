"""
Example Next.js API Route Integration

This file demonstrates how to integrate the RAG system with Next.js.
Copy the relevant functions to your Next.js API routes.
"""

# ============================================================================
# Example 1: Simple Query Handler (for Next.js API route)
# ============================================================================

def handle_rag_query(question: str, namespace: str) -> dict:
    """
    Handle a RAG query. Call this from your Next.js API route.
    
    Usage in Next.js (app/api/rag/route.ts):
    
    ```typescript
    import { NextRequest, NextResponse } from 'next/server';
    import { exec } from 'child_process';
    import { promisify } from 'util';
    
    const execAsync = promisify(exec);
    
    export async function POST(request: NextRequest) {
      const { question, namespace } = await request.json();
      
      const script = `
    import sys
    sys.path.insert(0, './rag_model')
    from nextjs_integration import handle_rag_query
    import json
    
    result = handle_rag_query('${question}', '${namespace}')
    print(json.dumps(result))
      `;
      
      const { stdout } = await execAsync(`python3 -c "${script}"`);
      return NextResponse.json(JSON.parse(stdout));
    }
    ```
    """
    import sys
    sys.path.insert(0, './rag_model')
    from services.chat_service import ChatService
    
    chat_service = ChatService()
    result = chat_service.answer_question(
        question=question,
        namespace=namespace,
        return_sources=True
    )
    return result


# ============================================================================
# Example 2: List Available Namespaces
# ============================================================================

def list_available_namespaces() -> list:
    """
    List all available document namespaces.
    
    Usage in Next.js (app/api/namespaces/route.ts):
    
    ```typescript
    export async function GET() {
      const script = `
    import sys
    sys.path.insert(0, './rag_model')
    from nextjs_integration import list_available_namespaces
    import json
    
    result = list_available_namespaces()
    print(json.dumps({'namespaces': result}))
      `;
      
      const { stdout } = await execAsync(`python3 -c "${script}"`);
      return NextResponse.json(JSON.parse(stdout));
    }
    ```
    """
    import sys
    sys.path.insert(0, './rag_model')
    from services.document_service import DocumentService
    
    doc_service = DocumentService()
    return doc_service.list_namespaces()


# ============================================================================
# Example 3: Upload PDF (requires file path)
# ============================================================================

def handle_pdf_upload(pdf_path: str, namespace: str, create_new: bool = False) -> dict:
    """
    Upload a PDF to a namespace.
    
    Note: You need to save the uploaded file to disk first in Next.js,
    then pass the file path to this function.
    
    Usage in Next.js (app/api/upload-pdf/route.ts):
    
    ```typescript
    import { writeFile } from 'fs/promises';
    import { join } from 'path';
    
    export async function POST(request: NextRequest) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const namespace = formData.get('namespace') as string;
      
      // Save file temporarily
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tempPath = join('/tmp', file.name);
      await writeFile(tempPath, buffer);
      
      // Call Python
      const script = `
    import sys
    sys.path.insert(0, './rag_model')
    from nextjs_integration import handle_pdf_upload
    import json
    
    result = handle_pdf_upload('${tempPath}', '${namespace}')
    print(json.dumps(result))
      `;
      
      const { stdout } = await execAsync(`python3 -c "${script}"`);
      return NextResponse.json(JSON.parse(stdout));
    }
    ```
    """
    import sys
    sys.path.insert(0, './rag_model')
    from services.document_service import DocumentService
    
    doc_service = DocumentService()
    result = doc_service.upload_pdf(
        pdf_path=pdf_path,
        namespace=namespace,
        create_new=create_new
    )
    return result


# ============================================================================
# CLI Test (run this file directly to test)
# ============================================================================

if __name__ == "__main__":
    import sys
    import json
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python nextjs_integration.py list")
        print("  python nextjs_integration.py query <namespace> <question>")
        print("  python nextjs_integration.py upload <pdf_path> <namespace>")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "list":
        result = list_available_namespaces()
        print(json.dumps({"namespaces": result}))
    
    elif command == "query":
        if len(sys.argv) < 4:
            print("Usage: python nextjs_integration.py query <namespace> <question>")
            sys.exit(1)
        namespace = sys.argv[2]
        question = " ".join(sys.argv[3:])
        result = handle_rag_query(question, namespace)
        print(json.dumps(result, indent=2))
    
    elif command == "upload":
        if len(sys.argv) < 4:
            print("Usage: python nextjs_integration.py upload <pdf_path> <namespace>")
            sys.exit(1)
        pdf_path = sys.argv[2]
        namespace = sys.argv[3]
        result = handle_pdf_upload(pdf_path, namespace)
        print(json.dumps(result, indent=2))
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

