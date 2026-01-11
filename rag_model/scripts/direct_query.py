#!/usr/bin/env python3
"""
Direct Query Script - No Interaction

Queries the RAG system directly without prompts.

Usage:
    python direct_query.py <namespace> "<question>"
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

from rag_model.services.chat_service import ChatService
from rag_model.config import Config


def main():
    if len(sys.argv) < 3:
        print('Usage: python direct_query.py <namespace> "<question>"')
        print('Example: python direct_query.py Deltahacks12Text "What is this document about?"')
        return 1

    namespace = sys.argv[1]
    question = sys.argv[2]

    print(f"\nDirect RAG Query")
    print("=" * 70)
    print(f"Namespace: {namespace}")
    print(f"Question: {question}")
    print("=" * 70)

    try:
        # Validate config
        config = Config.from_env()
        print("[+] Configuration validated")

        # Initialize service
        chat_service = ChatService()

        # Query
        print("\nQuerying Moorcheh RAG...")
        result = chat_service.answer_question(question=question, namespace=namespace, return_sources=True)

        # Check for errors
        if "error" in result:
            print(f"\n[!] Error: {result['error']}")
            if "traceback" in result:
                print(result["traceback"])
            return 1

        # Display results
        print("\n" + "=" * 70)
        print("ANSWER:")
        print("=" * 70)
        # Handle Unicode encoding issues on Windows console
        try:
            print(result["answer"])
        except UnicodeEncodeError:
            print(result["answer"].encode("ascii", "ignore").decode("ascii"))
        print("=" * 70)

        # Display sources if available
        if result.get("sources"):
            print("\nSOURCES:")
            for source in result["sources"]:
                filename = source.get("filename", "Unknown")
                score = source.get("score", 0)
                try:
                    print(f"  - {filename} (score: {score:.3f})")
                except UnicodeEncodeError:
                    print(f"  - {filename.encode('ascii', 'ignore').decode('ascii')} (score: {score:.3f})")

        print()
        return 0

    except Exception as e:
        print(f"\n[!] Error: {e}")
        import traceback

        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
