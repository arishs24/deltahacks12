"""
Retrieval Service

Handles vector similarity search and context retrieval.
"""

from typing import List, Tuple
from pathlib import Path
from langchain_core.documents import Document

from ..core.vector_store import VectorStoreManager
from ..config import config


class RetrievalService:
    """Service for retrieving relevant documents from vector store."""
    
    def __init__(self):
        """Initialize retrieval service."""
        self.vector_store_manager = VectorStoreManager()
    
    def retrieve(
        self,
        query: str,
        namespace: str,
        top_k: int = None
    ) -> List[Tuple[Document, float]]:
        """
        Retrieve most relevant documents for a query.
        
        Args:
            query: User's question
            namespace: Collection/namespace to search in
            top_k: Number of documents to retrieve (defaults to config)
            
        Returns:
            List of (document, score) tuples
        """
        if top_k is None:
            top_k = config.rag.top_k
        
        # Get the collection
        vector_store = self.vector_store_manager.get_collection(namespace)
        
        if vector_store is None:
            raise ValueError(f"Namespace '{namespace}' does not exist")
        
        # Perform similarity search with scores
        results = vector_store.similarity_search_with_score(query, k=top_k)
        
        return results
    
    def format_context(
        self,
        retrieved_docs: List[Tuple[Document, float]],
        include_scores: bool = False
    ) -> str:
        """
        Format retrieved documents into context string.
        
        Args:
            retrieved_docs: List of (document, score) tuples
            include_scores: Whether to include similarity scores
            
        Returns:
            Formatted context string
        """
        if not retrieved_docs:
            return "No relevant context found."
        
        context_parts = []
        for i, (doc, score) in enumerate(retrieved_docs, 1):
            source = doc.metadata.get("source", "Unknown")
            source_name = Path(source).name if source != "Unknown" else "Unknown"
            
            # Format the context chunk
            if include_scores:
                header = f"[Source {i}: {source_name} (Score: {score:.3f})]"
            else:
                header = f"[Source {i}: {source_name}]"
            
            context_parts.append(f"{header}\n{doc.page_content}\n")
        
        return "\n".join(context_parts)
    
    def get_sources(
        self,
        retrieved_docs: List[Tuple[Document, float]]
    ) -> List[dict]:
        """
        Extract source information from retrieved documents.
        
        Args:
            retrieved_docs: List of (document, score) tuples
            
        Returns:
            List of source dictionaries with metadata
        """
        sources = []
        for i, (doc, score) in enumerate(retrieved_docs, 1):
            source_info = {
                "index": i,
                "filename": Path(doc.metadata.get("source", "Unknown")).name,
                "score": float(score),
                "page": doc.metadata.get("page", None),
            }
            sources.append(source_info)
        
        return sources

