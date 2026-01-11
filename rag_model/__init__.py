"""
RAG Model Package - Moorcheh API Version

A modular RAG system using Moorcheh's hosted vector database and AI models.
Designed for easy integration with Next.js API routes.
"""

__version__ = "2.0.0"

from .services.chat_service import ChatService
from .services.document_service import DocumentService
from .core.moorcheh_client import MoorchehClient

__all__ = ["ChatService", "DocumentService", "MoorchehClient"]
