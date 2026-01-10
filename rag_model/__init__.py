"""
RAG Model Package

A modular RAG system using Milvus (Moorcheh) and Google Gemini.
Designed for easy integration with Next.js API routes.
"""

__version__ = "1.0.0"

from .services.chat_service import ChatService
from .services.document_service import DocumentService
from .services.retrieval_service import RetrievalService

__all__ = ["ChatService", "DocumentService", "RetrievalService"]

