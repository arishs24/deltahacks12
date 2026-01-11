#!/usr/bin/env python3
"""
Simple Chat Test Script

Tests the RAG system with a continuous chat loop.
Allows you to ask questions and get answers from your uploaded PDFs.

Usage:
    python chat_test.py
"""

import sys
from pathlib import Path

# Add parent directories to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

# Load .env file if it exists (from root directory)
try:
    from dotenv import load_dotenv

    env_path = Path(__file__).parent.parent / ".env"
    load_dotenv(dotenv_path=env_path)
except ImportError:
    pass

from rag_model.services.chat_service import ChatService
from rag_model.services.document_service import DocumentService
from rag_model.config import Config


def print_header():
    """Print welcome header."""
    print("\n" + "=" * 70)
    print("RAG Chat Test - Continuous Query Loop")
    print("=" * 70)


def select_namespace(doc_service: DocumentService) -> str:
    """Let user select a namespace to chat with."""
    print("\nAvailable Namespaces:")
    namespaces = doc_service.list_namespaces()

    if not namespaces:
        print("  [!] No namespaces found!")
        print("  Please upload PDFs first using: python upload_pdf.py")
        return None

    for i, namespace in enumerate(namespaces, 1):
        if isinstance(namespace, dict):
            ns_name = namespace.get("namespace_name", namespace.get("name", str(namespace)))
            ns_type = namespace.get("type", "unknown")
            print(f"  [{i}] {ns_name} (type: {ns_type})")
        else:
            print(f"  [{i}] {namespace}")

    print("\nSelect namespace to chat with:")

    while True:
        choice = input("Your choice (number or name): ").strip()

        # Try by number
        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(namespaces):
                selected = namespaces[idx]
                if isinstance(selected, dict):
                    namespace_name = selected.get("namespace_name", selected.get("name", str(selected)))
                else:
                    namespace_name = str(selected)
                print(f"✓ Selected: {namespace_name}\n")
                return namespace_name

        # Try by name
        for ns in namespaces:
            if isinstance(ns, dict):
                ns_name = ns.get("namespace_name", ns.get("name", ""))
            else:
                ns_name = str(ns)

            if choice == ns_name:
                print(f"✓ Selected: {choice}\n")
                return choice

        print("[!] Namespace not found. Try again.")


def chat_loop(chat_service: ChatService, namespace: str):
    """Main chat loop."""
    print("=" * 70)
    print(f"Chatting with namespace: {namespace}")
    print("=" * 70)
    print("\nCommands:")
    print("  - Type your question to get an answer")
    print("  - Type 'quit' or 'exit' to stop")
    print("  - Type 'clear' to clear chat history")
    print("=" * 70 + "\n")

    chat_history = []

    while True:
        # Get user input
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\nGoodbye!")
            break

        # Check commands
        if not user_input:
            continue

        if user_input.lower() in ["quit", "exit", "q"]:
            print("\nGoodbye!")
            break

        if user_input.lower() == "clear":
            chat_history = []
            print("[+] Chat history cleared!\n")
            continue

        # Process query
        print("\nThinking...", end="", flush=True)

        try:
            result = chat_service.answer_question(question=user_input, namespace=namespace, chat_history=chat_history, return_sources=True)

            print("\r" + " " * 20 + "\r", end="")  # Clear "Thinking..."

            # Check for errors
            if "error" in result:
                print(f"[!] Error: {result['error']}\n")
                continue

            # Check if context was found
            if not result.get("context_found", False):
                print("Bot: [!] No relevant information found in the knowledge base.\n")
                continue

            # Display answer
            print(f"Bot: {result['answer']}\n")

            # Display sources if available
            if result.get("sources"):
                print("Sources:")
                for source in result["sources"]:
                    print(f"  - {source.get('filename', 'Unknown')} (score: {source.get('score', 0):.3f})")
                print()

            # Update chat history
            chat_history.append({"role": "user", "content": user_input})
            chat_history.append({"role": "assistant", "content": result["answer"]})

        except Exception as e:
            print(f"\n[!] Error: {e}\n")


def main():
    """Main entry point."""
    print_header()

    # Validate configuration
    try:
        config = Config.from_env()
        print("[+] Configuration validated")
    except ValueError as e:
        print(f"\n[!] Configuration error: {e}")
        print("\nMake sure you have:")
        print("  1. Created rag_model/.env file")
        print("  2. Added your MOORCHEH_API_KEY")
        return 1

    # Initialize services
    doc_service = DocumentService()
    chat_service = ChatService()

    # Select namespace
    namespace = select_namespace(doc_service)
    if not namespace:
        return 1

    # Start chat loop
    try:
        chat_loop(chat_service, namespace)
    except KeyboardInterrupt:
        print("\n\n[!] Interrupted by user")

    return 0


if __name__ == "__main__":
    sys.exit(main())
