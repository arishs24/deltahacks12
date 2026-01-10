#!/usr/bin/env python3
"""
RAG Query CLI

Interactive command-line interface for querying the RAG system.

Usage:
    export GOOGLE_API_KEY="your-api-key-here"
    python query.py
"""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from rag_model.services.chat_service import ChatService
from rag_model.services.document_service import DocumentService
from rag_model.config import Config


def print_header():
    """Print welcome header."""
    print("\n" + "=" * 60)
    print("RAG System - Query Interface")
    print("=" * 60 + "\n")


def list_namespaces(doc_service: DocumentService) -> list:
    """List all available namespaces."""
    print("📚 Available Namespaces:")
    namespaces = doc_service.list_namespaces()
    
    if not namespaces:
        print("  (No namespaces found)")
        print("  Please upload PDFs first using upload_pdf.py")
        return []
    
    for i, namespace in enumerate(namespaces, 1):
        print(f"  [{i}] {namespace}")
    
    return namespaces


def select_namespace(namespaces: list) -> str:
    """
    Let user select a namespace to query.
    
    Returns:
        Selected namespace name
    """
    if not namespaces:
        return None
    
    print("\n🔖 Select namespace to query:")
    
    while True:
        choice = input("\nYour choice (number or name): ").strip()
        
        # Try by number
        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(namespaces):
                selected = namespaces[idx]
                print(f"✓ Selected namespace: {selected}")
                return selected
        
        # Try by name
        if choice in namespaces:
            print(f"✓ Selected namespace: {choice}")
            return choice
        
        print("❌ Invalid choice. Please try again.")


def query_loop(chat_service: ChatService, namespace: str):
    """
    Main query loop.
    
    Args:
        chat_service: Initialized chat service
        namespace: Namespace to query
    """
    print("\n" + "=" * 60)
    print(f"Querying namespace: {namespace}")
    print("Type 'quit' or 'exit' to stop, 'back' to change namespace")
    print("=" * 60 + "\n")
    
    while True:
        # Get user query
        query = input("\n🤔 Your question: ").strip()
        
        # Check for exit commands
        if query.lower() in ["quit", "exit", "q"]:
            print("\nGoodbye! 👋\n")
            sys.exit(0)
        
        if query.lower() == "back":
            return
        
        if not query:
            continue
        
        # Process query
        print("\n🔍 Searching knowledge base...")
        
        try:
            result = chat_service.answer_question(
                question=query,
                namespace=namespace,
                return_sources=True
            )
            
            # Check for errors
            if "error" in result:
                print(f"\n❌ Error: {result['error']}")
                continue
            
            # Check if context was found
            if not result.get("context_found", False):
                print("\n❌ Not found in knowledge base")
                continue
            
            # Display sources
            if result.get("sources"):
                print("\n📚 Sources:")
                for source in result["sources"]:
                    print(f"  [{source['index']}] {source['filename']} (score: {source['score']:.3f})")
            
            # Display answer
            print(f"\n🤖 Answer:\n{result['answer']}\n")
            
        except Exception as e:
            print(f"\n❌ Error processing query: {e}")


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
    
    # Initialize services
    doc_service = DocumentService()
    chat_service = ChatService()
    
    # Main loop (allows switching namespaces)
    while True:
        # List namespaces
        print("\n" + "-" * 60)
        namespaces = list_namespaces(doc_service)
        print("-" * 60)
        
        if not namespaces:
            print("\n⚠️  No namespaces available. Upload PDFs first.")
            return 1
        
        # Select namespace
        namespace = select_namespace(namespaces)
        
        if namespace is None:
            return 1
        
        # Query loop for selected namespace
        query_loop(chat_service, namespace)


if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

