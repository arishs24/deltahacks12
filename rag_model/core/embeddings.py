"""
Embedding model wrapper

Provides Google Generative AI embeddings for document and query vectorization.
"""

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from ..config import config


def get_embeddings() -> GoogleGenerativeAIEmbeddings:
    """
    Get configured embedding model.
    
    Returns:
        GoogleGenerativeAIEmbeddings: Initialized embedding model
    """
    return GoogleGenerativeAIEmbeddings(
        model=config.embedding.model,
        google_api_key=config.google_api_key
    )

