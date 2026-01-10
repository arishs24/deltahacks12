"""
Vector Store Manager

Manages connections to Milvus vector database and collection operations.
"""

from typing import List, Optional
from langchain_community.vectorstores import Milvus
from langchain_core.documents import Document
from pymilvus import connections, utility

from .embeddings import get_embeddings
from ..config import config


class VectorStoreManager:
    """Manages Milvus vector store operations."""
    
    def __init__(self):
        """Initialize vector store manager."""
        self.embeddings = get_embeddings()
        self.connection_args = config.milvus.connection_args
    
    def connect(self) -> None:
        """Establish connection to Milvus."""
        connections.connect(
            alias="default",
            host=config.milvus.host,
            port=config.milvus.port
        )
    
    def disconnect(self) -> None:
        """Disconnect from Milvus."""
        connections.disconnect(alias="default")
    
    def list_collections(self) -> List[str]:
        """
        List all available collections (namespaces) in Milvus.
        
        Returns:
            List of collection names
        """
        self.connect()
        try:
            collections = utility.list_collections()
            return collections
        finally:
            self.disconnect()
    
    def collection_exists(self, collection_name: str) -> bool:
        """
        Check if a collection exists.
        
        Args:
            collection_name: Name of the collection
            
        Returns:
            True if collection exists
        """
        self.connect()
        try:
            return utility.has_collection(collection_name)
        finally:
            self.disconnect()
    
    def create_collection(
        self,
        documents: List[Document],
        collection_name: str
    ) -> Milvus:
        """
        Create a new collection and index documents.
        
        Args:
            documents: List of documents to index
            collection_name: Name for the new collection
            
        Returns:
            Milvus vector store instance
        """
        vector_store = Milvus.from_documents(
            documents=documents,
            embedding=self.embeddings,
            collection_name=collection_name,
            connection_args=self.connection_args,
        )
        return vector_store
    
    def get_collection(self, collection_name: str) -> Optional[Milvus]:
        """
        Get an existing collection.
        
        Args:
            collection_name: Name of the collection
            
        Returns:
            Milvus vector store instance or None if not found
        """
        if not self.collection_exists(collection_name):
            return None
        
        vector_store = Milvus(
            embedding_function=self.embeddings,
            collection_name=collection_name,
            connection_args=self.connection_args,
        )
        return vector_store
    
    def add_documents(
        self,
        documents: List[Document],
        collection_name: str
    ) -> None:
        """
        Add documents to an existing collection.
        
        Args:
            documents: List of documents to add
            collection_name: Name of the collection
        """
        vector_store = self.get_collection(collection_name)
        if vector_store is None:
            raise ValueError(f"Collection '{collection_name}' does not exist")
        
        vector_store.add_documents(documents)
    
    def delete_collection(self, collection_name: str) -> None:
        """
        Delete a collection.
        
        Args:
            collection_name: Name of the collection to delete
        """
        self.connect()
        try:
            if utility.has_collection(collection_name):
                utility.drop_collection(collection_name)
        finally:
            self.disconnect()

