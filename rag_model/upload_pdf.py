#!/usr/bin/env python3
"""
Unified PDF Upload Script

Uploads PDFs to Moorcheh namespaces (TEXT or VECTOR).
Supports both interactive and command-line modes.

Usage:
    # Interactive mode
    python upload_pdf.py

    # Command-line mode (TEXT namespace - recommended)
    python upload_pdf.py "path/to/file.pdf" "MyNamespace" --type text

    # Command-line mode (VECTOR namespace - requires GOOGLE_API_KEY)
    python upload_pdf.py "path/to/file.pdf" "MyNamespace" --type vector
"""

import os
import sys
import time
import argparse
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from rag_model.services.document_service import DocumentService
from rag_model.config import Config
from rag_model.utils.validators import validate_namespace_name
from rag_model.utils.pdf_utils import extract_text_from_pdf

# Optional imports for vector namespace
try:
    from moorcheh_sdk import MoorchehClient as MoorchehSDK, MoorchehError
    from google import genai
    from google.genai import types

    VECTOR_AVAILABLE = True
except ImportError:
    VECTOR_AVAILABLE = False


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():
            chunks.append(chunk)
        start = end - overlap
    return chunks


def embed_text_with_gemini(client, text: str, model_name: str = "text-embedding-004", max_retries: int = 3, base_delay: float = 0.5) -> list[float]:
    """Generate embedding for text using Google Gemini with retry logic."""
    for attempt in range(max_retries):
        try:
            result = client.models.embed_content(
                model=model_name,
                contents=text,
                config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT")
            )
            return result.embeddings[0].values
        except Exception as e:
            error_str = str(e).lower()
            is_quota_error = "quota" in error_str or "rate limit" in error_str or "resource_exhausted" in error_str or "429" in error_str or "quota_metric" in error_str

            if is_quota_error and attempt < max_retries - 1:
                delay = base_delay * (2**attempt)
                print(f"\n[WARNING] Quota limit hit (attempt {attempt + 1}/{max_retries})")
                print(f"          Waiting {delay:.1f} seconds before retry...")
                time.sleep(delay)
                continue
            else:
                if is_quota_error:
                    print(f"\n[ERROR] Quota limit exceeded after {max_retries} attempts")
                    print("[INFO] Solutions:")
                    print("  1. Wait a few minutes/hours and try again")
                    print("  2. Upgrade your Google API quota limits")
                    print("  3. Consider using TEXT namespaces instead (Moorcheh handles embeddings)")
                else:
                    print(f"[ERROR] Failed to generate embedding: {e}")
                return None

    return None


def upload_to_text_namespace(pdf_path: str, namespace: str):
    """Upload PDF to TEXT namespace (simple, recommended)."""
    doc_service = DocumentService()

    # Check if namespace exists, create if missing
    try:
        namespaces = doc_service.list_namespaces()
        namespace_exists = any(ns.get("namespace_name") == namespace or ns.get("name") == namespace for ns in namespaces)

        if not namespace_exists:
            print(f"\n[+] Namespace '{namespace}' not found. Creating TEXT namespace...")
            try:
                doc_service.create_namespace(namespace, type="text")
                print(f"[+] Namespace '{namespace}' created successfully")
            except Exception as e:
                error_str = str(e).lower()
                if "already exists" in error_str or "conflict" in error_str:
                    print(f"[+] Namespace '{namespace}' already exists")
                else:
                    print(f"[!] Warning: Could not create namespace: {e}")
                    raise
    except Exception as e:
        print(f"[!] Warning: Could not check/create namespace: {e}")
        # Continue anyway - might fail later if namespace doesn't exist

    print(f"\n[1/2] Extracting text from PDF...")
    result = doc_service.upload_pdf(pdf_path=pdf_path, namespace=namespace, create_namespace_if_missing=False)

    print(f"\n[2/2] Upload complete!")
    print(f"[OK] Filename: {result['filename']}")
    print(f"[OK] Namespace: {result['namespace']}")
    print(f"[OK] Status: {result['status']}")

    return result


def upload_to_vector_namespace(pdf_path: str, namespace: str):
    """Upload PDF to VECTOR namespace (requires Google API key)."""
    if not VECTOR_AVAILABLE:
        raise ValueError("Vector namespace support requires google-generativeai package.\n" "Install with: pip install google-generativeai\n" "Or use TEXT namespaces instead (recommended).")

    # Check for Google API key
    gemini_api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError(
            "GOOGLE_API_KEY or GEMINI_API_KEY not set in .env\n" "Get one from: https://makersuite.google.com/app/apikey\n" "Or use TEXT namespaces instead (recommended - no API key needed)."
        )

    # 1. Extract text
    print(f"\n[1/5] Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_path)
    if not text:
        raise ValueError("No text extracted from PDF")
    print(f"[OK] Extracted {len(text)} characters")

    # 2. Chunk text
    print(f"\n[2/5] Chunking text...")
    chunks = chunk_text(text, chunk_size=1000, overlap=200)
    print(f"[OK] Created {len(chunks)} chunks")

    # 3. Initialize Gemini Client
    print(f"\n[3/5] Initializing Google Gemini...")
    client = genai.Client(api_key=gemini_api_key)
    print("[OK] Gemini configured")

    # 4. Generate embeddings
    print(f"\n[4/5] Generating embeddings...")
    vectors = []
    failed_count = 0

    for i, chunk in enumerate(chunks, 1):
        print(f"  Processing chunk {i}/{len(chunks)}...", end="\r")
        embedding = embed_text_with_gemini(client, chunk)
        if embedding:
            vectors.append(
                {"id": f"{Path(pdf_path).stem}_chunk_{i}", "vector": embedding, "metadata": {"source": Path(pdf_path).name, "chunk_index": i, "text": chunk[:200]}}  # Store first 200 chars as preview
            )
        else:
            failed_count += 1
            if failed_count > len(chunks) * 0.5:
                print(f"\n[ERROR] Too many failures ({failed_count}/{len(chunks)}). Stopping.")
                raise ValueError("Too many embedding failures. Check Google API quota.")

        if i < len(chunks):
            time.sleep(0.1)  # Rate limiting

    print(f"\n[OK] Generated {len(vectors)} embeddings ({failed_count} failed)")

    if not vectors:
        raise ValueError("No vectors generated")

    # 5. Upload to Moorcheh
    print(f"\n[5/5] Uploading vectors to '{namespace}'...")
    api_key = os.getenv("MOORCHEH_API_KEY")
    with MoorchehSDK(api_key=api_key) as client:
        result = client.vectors.upload(namespace_name=namespace, vectors=vectors)
        print(f"[OK] Upload complete: {result.get('status')}")
        print(f"[OK] Processed {len(result.get('vector_ids_processed', []))} vectors")

    return {"filename": Path(pdf_path).name, "namespace": namespace, "status": result.get("status", "success"), "chunks": len(chunks), "vectors": len(vectors)}


def print_header():
    """Print welcome header."""
    print("\n" + "=" * 70)
    print("PDF Upload to Moorcheh Namespace")
    print("=" * 70)


def list_namespaces(doc_service: DocumentService):
    """List all available namespaces."""
    print("\nAvailable Namespaces:")
    namespaces = doc_service.list_namespaces()

    if not namespaces:
        print("  (No namespaces found - you'll create the first one!)")
        return []

    for i, namespace in enumerate(namespaces, 1):
        if isinstance(namespace, dict):
            ns_name = namespace.get("namespace_name", namespace.get("name", str(namespace)))
            ns_type = namespace.get("type", "unknown")
            print(f"  [{i}] {ns_name} (type: {ns_type})")
        else:
            print(f"  [{i}] {namespace}")

    return namespaces


def select_namespace_type() -> str:
    """Let user select namespace type."""
    print("\nSelect namespace type:")
    print("  [1] TEXT (recommended - simple, full RAG support)")
    print("  [2] VECTOR (advanced - requires Google API key)")

    while True:
        choice = input("\nYour choice (1 or 2): ").strip()
        if choice == "1":
            return "text"
        elif choice == "2":
            return "vector"
        print("[!] Invalid choice. Please enter 1 or 2.")


def select_or_create_namespace(doc_service: DocumentService, namespace_type: str) -> str:
    """Let user select existing namespace or create new one."""
    namespaces = list_namespaces(doc_service)

    # Filter by type if possible
    filtered = []
    for ns in namespaces:
        if isinstance(ns, dict):
            ns_type = ns.get("type", "unknown")
            if ns_type == namespace_type:
                filtered.append(ns)
        else:
            filtered.append(ns)

    print("\nOptions:")
    print("  [0] Create new namespace")
    if filtered:
        print("  Or select existing namespace by number")

    while True:
        choice = input("\nYour choice: ").strip()

        if choice == "0":
            return create_new_namespace()

        if filtered and choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(filtered):
                selected = filtered[idx]
                if isinstance(selected, dict):
                    namespace_name = selected.get("namespace_name", selected.get("name", str(selected)))
                else:
                    namespace_name = str(selected)
                print(f"[+] Selected: {namespace_name}")
                return namespace_name

        print("[!] Invalid choice. Please try again.")


def create_new_namespace() -> str:
    """Create a new namespace with validation."""
    print("\n📝 Create New Namespace")
    print("Rules: Letters, numbers, underscores only. Must start with letter/underscore.")

    while True:
        namespace = input("\nNamespace name: ").strip()
        try:
            validate_namespace_name(namespace)
            print(f"[+] Valid namespace name: {namespace}")
            return namespace
        except ValueError as e:
            print(f"[!] {e}")
            print("Please try again.")


def select_pdf_file() -> str:
    """Let user select a PDF file."""
    print("\n📄 Select PDF File")

    while True:
        pdf_path = input("\nEnter path to PDF file: ").strip().strip('"').strip("'")
        path = Path(pdf_path)

        if not path.exists():
            print(f"[!] File not found: {pdf_path}")
            continue

        if not path.is_file():
            print(f"[!] Not a file: {pdf_path}")
            continue

        if path.suffix.lower() != ".pdf":
            print(f"[!] Not a PDF file: {pdf_path}")
            continue

        print(f"[+] Selected: {path.name}")
        return str(path.absolute())


def interactive_mode():
    """Run in interactive mode."""
    print_header()

    # Validate config
    try:
        Config.from_env()
        print("[+] Configuration validated")
    except ValueError as e:
        print(f"[!] Configuration error: {e}")
        return 1

    doc_service = DocumentService()

    # Select namespace type
    namespace_type = select_namespace_type()

    # Select or create namespace
    print("\n" + "-" * 70)
    namespace = select_or_create_namespace(doc_service, namespace_type)

    # Create namespace if it doesn't exist (for both text and vector)
    api_key = os.getenv("MOORCHEH_API_KEY")
    with MoorchehSDK(api_key=api_key) as client:
        try:
            # Check if namespace exists
            ns_list = client.namespaces.list()
            existing = [ns for ns in ns_list.get("namespaces", []) if ns.get("namespace_name") == namespace or ns.get("name") == namespace]

            if not existing:
                if namespace_type == "text":
                    print(f"\n[+] Creating TEXT namespace '{namespace}'...")
                    result = doc_service.create_namespace(namespace, type="text")
                    print(f"[+] Namespace '{namespace}' created successfully")
                else:
                    print(f"\n[+] Creating vector namespace '{namespace}' with dimension 768...")
                    client.namespaces.create(namespace_name=namespace, type="vector", vector_dimension=768)
                    print(f"[+] Namespace created!")
        except Exception as e:
            # Check if error is because namespace already exists (race condition)
            error_str = str(e).lower()
            if "already exists" in error_str or "conflict" in error_str:
                print(f"[+] Namespace '{namespace}' already exists")
            else:
                print(f"[!] Error creating namespace: {e}")

    # Select PDF
    pdf_path = select_pdf_file()

    # Upload
    print("\n" + "=" * 70)
    print("Uploading PDF...")
    print("=" * 70)

    try:
        if namespace_type == "text":
            result = upload_to_text_namespace(pdf_path, namespace)
        else:
            result = upload_to_vector_namespace(pdf_path, namespace)

        print("\n" + "=" * 70)
        print("[SUCCESS] Upload Complete!")
        print("=" * 70)
        return 0
    except Exception as e:
        print("\n" + "=" * 70)
        print("[FAILED] Upload Failed!")
        print("=" * 70)
        print(f"Error: {e}")
        import traceback

        traceback.print_exc()
        return 1


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description="Upload PDF to Moorcheh namespace")
    parser.add_argument("pdf_path", nargs="?", help="Path to PDF file")
    parser.add_argument("namespace", nargs="?", help="Namespace name")
    parser.add_argument("--type", choices=["text", "vector"], default="text", help="Namespace type (default: text)")

    args = parser.parse_args()

    # Interactive mode if no arguments
    if not args.pdf_path or not args.namespace:
        return interactive_mode()

    # Command-line mode
    pdf_path = args.pdf_path
    namespace = args.namespace
    namespace_type = args.type

    # Validate PDF
    if not Path(pdf_path).exists():
        print(f"[ERROR] File not found: {pdf_path}")
        return 1

    if Path(pdf_path).suffix.lower() != ".pdf":
        print(f"[ERROR] Not a PDF file: {pdf_path}")
        return 1

    # Validate config
    try:
        Config.from_env()
    except ValueError as e:
        print(f"[ERROR] Configuration error: {e}")
        return 1

    # Upload
    try:
        if namespace_type == "text":
            upload_to_text_namespace(pdf_path, namespace)
        else:
            upload_to_vector_namespace(pdf_path, namespace)
        print("\n[SUCCESS] Upload complete!")
        return 0
    except Exception as e:
        print(f"\n[ERROR] Upload failed: {e}")
        import traceback

        traceback.print_exc()
        return 1


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n\n[!] Interrupted by user")
        sys.exit(1)
