#!/usr/bin/env python3
"""
PDF Upload Helper Script

Interactive CLI tool to upload PDFs to Milvus vector namespaces.

Usage:
    export GOOGLE_API_KEY="your-api-key-here"
    python upload_pdf.py
"""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from rag_model.services.document_service import DocumentService
from rag_model.config import Config
from rag_model.utils.validators import validate_namespace_name


def print_header():
    """Print welcome header."""
    print("\n" + "=" * 60)
    print("PDF Upload to Vector Namespace")
    print("=" * 60 + "\n")


def list_namespaces(doc_service: DocumentService) -> list:
    """List all available namespaces."""
    print("📚 Available Namespaces:")
    namespaces = doc_service.list_namespaces()

    if not namespaces:
        print("  (No namespaces found - you'll create the first one!)")
        return []

    for i, namespace in enumerate(namespaces, 1):
        print(f"  [{i}] {namespace}")

    return namespaces


def select_namespace(namespaces: list) -> str:
    """
    Let user select an existing namespace or create a new one.

    Returns:
        Selected or new namespace name
    """
    print("\n🔖 Choose namespace:")
    print("  [0] Create new namespace")

    if namespaces:
        print("  Or select existing namespace by number")

    while True:
        choice = input("\nYour choice: ").strip()

        # Create new namespace
        if choice == "0":
            return create_new_namespace()

        # Select existing namespace
        if namespaces and choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(namespaces):
                selected = namespaces[idx]
                print(f"✓ Selected namespace: {selected}")
                return selected

        print("❌ Invalid choice. Please try again.")


def create_new_namespace() -> str:
    """
    Create a new namespace with validation.

    Returns:
        New namespace name
    """
    print("\n📝 Create New Namespace")
    print("Rules: Letters, numbers, underscores only. Must start with letter/underscore.")

    while True:
        namespace = input("\nNamespace name: ").strip()

        try:
            validate_namespace_name(namespace)
            print(f"✓ Valid namespace name: {namespace}")
            return namespace
        except ValueError as e:
            print(f"❌ {e}")
            print("Please try again.")


def select_pdf_file() -> str:
    """
    Let user select a PDF file to upload.

    Returns:
        Path to selected PDF file
    """
    print("\n📄 Select PDF File")

    while True:
        pdf_path = input("\nEnter path to PDF file: ").strip()

        # Remove quotes if present
        pdf_path = pdf_path.strip('"').strip("'")

        path = Path(pdf_path)

        # Validate file
        if not path.exists():
            print(f"❌ File not found: {pdf_path}")
            continue

        if not path.is_file():
            print(f"❌ Not a file: {pdf_path}")
            continue

        if path.suffix.lower() != ".pdf":
            print(f"❌ Not a PDF file: {pdf_path}")
            continue

        print(f"✓ Selected PDF: {path.name}")
        return str(path.absolute())


def confirm_upload(pdf_path: str, namespace: str) -> bool:
    """
    Confirm upload details with user.

    Returns:
        True if user confirms
    """
    print("\n" + "-" * 60)
    print("📋 Upload Summary:")
    print(f"  PDF: {Path(pdf_path).name}")
    print(f"  Namespace: {namespace}")
    print("-" * 60)

    confirm = input("\nProceed with upload? (y/n): ").strip().lower()
    return confirm in ["y", "yes"]


def main():
    """Main entry point."""
    print_header()

    # Validate configuration
    try:
        config = Config.from_env()
        print("✓ Configuration validated")
    except ValueError as e:
        print(f"❌ Configuration error: {e}")
        return 1

    # Initialize document service
    doc_service = DocumentService()

    # List existing namespaces
    print("\n" + "-" * 60)
    namespaces = list_namespaces(doc_service)
    print("-" * 60)

    # Select or create namespace
    namespace = select_namespace(namespaces)

    # Check if namespace exists (determines if we create new or append)
    namespace_exists = namespace in namespaces

    # Select PDF file
    pdf_path = select_pdf_file()

    # Confirm upload
    if not confirm_upload(pdf_path, namespace):
        print("\n❌ Upload cancelled")
        return 0

    # Upload PDF
    print("\n🚀 Processing and uploading PDF...")
    print("   This may take a while for large PDFs...")

    try:
        result = doc_service.upload_pdf(pdf_path=pdf_path, namespace=namespace, create_new=not namespace_exists)

        print("\n" + "=" * 60)
        print("✅ Upload Successful!")
        print("=" * 60)
        print(f"  PDF: {result['pdf_path']}")
        print(f"  Namespace: {result['namespace']}")
        print(f"  Chunks created: {result['chunks_created']}")
        print("=" * 60 + "\n")

        # Ask if user wants to upload another
        another = input("Upload another PDF? (y/n): ").strip().lower()
        if another in ["y", "yes"]:
            print("\n" + "=" * 60 + "\n")
            main()

        return 0

    except Exception as e:
        print("\n" + "=" * 60)
        print("❌ Upload Failed!")
        print("=" * 60)
        print(f"Error: {e}")
        print("=" * 60 + "\n")
        return 1


if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n\n⚠️  Upload interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)
