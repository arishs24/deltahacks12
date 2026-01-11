#!/usr/bin/env python3
"""
Direct PDF Upload Script - No Interaction

Uploads a PDF directly without prompts for automated testing.

Usage:
    python direct_upload.py <pdf_path> <namespace>
"""

import sys
from pathlib import Path

# Load .env file
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent / ".env"
    load_dotenv(dotenv_path=env_path)
except ImportError:
    pass

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from rag_model.services.document_service import DocumentService
from rag_model.config import Config


def main():
    if len(sys.argv) < 3:
        print("Usage: python direct_upload.py <pdf_path> <namespace>")
        print("Example: python direct_upload.py test.pdf Deltahacks12Vector")
        return 1
    
    pdf_path = sys.argv[1]
    namespace = sys.argv[2]
    
    print(f"\nDirect PDF Upload")
    print("=" * 60)
    print(f"PDF: {pdf_path}")
    print(f"Namespace: {namespace}")
    print("=" * 60)
    
    try:
        # Validate config
        config = Config.from_env()
        print("[+] Configuration validated")
        
        # Initialize service
        doc_service = DocumentService()
        
        # Upload
        print("\nUploading PDF to Moorcheh...")
        result = doc_service.upload_pdf(
            pdf_path=pdf_path,
            namespace=namespace
        )
        
        print("\n" + "=" * 60)
        print("[SUCCESS] Upload Complete!")
        print("=" * 60)
        print(f"Filename: {result['filename']}")
        print(f"Namespace: {result['namespace']}")
        print(f"Status: {result['status']}")
        print("=" * 60)
        
        return 0
        
    except Exception as e:
        print("\n" + "=" * 60)
        print("[FAILED] Upload Failed!")
        print("=" * 60)
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        print("=" * 60)
        return 1


if __name__ == "__main__":
    sys.exit(main())

