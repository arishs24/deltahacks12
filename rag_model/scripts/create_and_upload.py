#!/usr/bin/env python3
"""
Create Text Namespace and Upload PDF

Usage:
    python create_and_upload.py <pdf_path> <new_namespace_name>
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
from moorcheh_sdk.exceptions import ConflictError


def main():
    if len(sys.argv) < 3:
        print("Usage: python create_and_upload.py <pdf_path> <namespace_name>")
        print("Example: python create_and_upload.py test.pdf Deltahacks12Text")
        return 1
    
    pdf_path = sys.argv[1]
    namespace = sys.argv[2]
    
    print(f"\nCreate TEXT Namespace & Upload PDF")
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
        
        # Create text namespace
        print(f"\nCreating TEXT namespace '{namespace}'...")
        try:
            result = doc_service.create_namespace(namespace, type="text")
            print(f"[+] Namespace '{namespace}' created")
        except ConflictError:
            print(f"[+] Namespace '{namespace}' already exists")
        except Exception as e:
            print(f"[!] Error creating namespace: {e}")
        
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

