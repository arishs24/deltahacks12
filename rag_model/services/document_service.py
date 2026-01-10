"""
Document Service

Handles PDF processing, chunking, and indexing into vector database.
"""

from pathlib import Path
from typing import List
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from ..core.vector_store import VectorStoreManager
from ..utils.pdf_utils import load_pdf
from ..config import config


class DocumentService:
    """Service for document processing and indexing."""
    
    def __init__(self):
        """Initialize document service."""
        self.vector_store_manager = VectorStoreManager()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=config.rag.chunk_size,
            chunk_overlap=config.rag.chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
    
    def process_pdf(self, pdf_path: str) -> List[Document]:
        """
        Load and process a single PDF file.
        
        Args:
            pdf_path: Path to the PDF file
            
        Returns:
            List of processed documents
        """
        # Load PDF
        documents = load_pdf(pdf_path)
        
        # Chunk documents
        chunks = self.text_splitter.split_documents(documents)
        
        return chunks
    
    def process_multiple_pdfs(self, pdf_paths: List[str]) -> List[Document]:
        """
        Process multiple PDF files.
        
        Args:
            pdf_paths: List of paths to PDF files
            
        Returns:
            List of processed document chunks from all PDFs
        """
        all_chunks = []
        for pdf_path in pdf_paths:
            chunks = self.process_pdf(pdf_path)
            all_chunks.extend(chunks)
        return all_chunks
    
    def index_documents(
        self,
        documents: List[Document],
        namespace: str,
        create_new: bool = False
    ) -> None:
        """
        Index documents into a vector store namespace (collection).
        
        Args:
            documents: List of document chunks to index
            namespace: Name of the collection/namespace
            create_new: If True, create new collection. If False, add to existing.
        """
        if create_new:
            self.vector_store_manager.create_collection(
                documents=documents,
                collection_name=namespace
            )
        else:
            # Check if collection exists
            if not self.vector_store_manager.collection_exists(namespace):
                # If doesn't exist, create it
                self.vector_store_manager.create_collection(
                    documents=documents,
                    collection_name=namespace
                )
            else:
                # Add to existing collection
                self.vector_store_manager.add_documents(
                    documents=documents,
                    collection_name=namespace
                )
    
    def upload_pdf(
        self,
        pdf_path: str,
        namespace: str,
        create_new: bool = False
    ) -> dict:
        """
        Complete pipeline: process PDF and upload to namespace.
        
        Args:
            pdf_path: Path to the PDF file
            namespace: Name of the collection/namespace
            create_new: If True, create new collection
            
        Returns:
            Dictionary with upload statistics
        """
        # Process PDF
        chunks = self.process_pdf(pdf_path)
        
        # Index chunks
        self.index_documents(chunks, namespace, create_new)
        
        # Return statistics
        return {
            "pdf_path": pdf_path,
            "namespace": namespace,
            "chunks_created": len(chunks),
            "status": "success"
        }
    
    def upload_multiple_pdfs(
        self,
        pdf_paths: List[str],
        namespace: str,
        create_new: bool = False
    ) -> dict:
        """
        Upload multiple PDFs to a namespace.
        
        Args:
            pdf_paths: List of paths to PDF files
            namespace: Name of the collection/namespace
            create_new: If True, create new collection
            
        Returns:
            Dictionary with upload statistics
        """
        # Process all PDFs
        all_chunks = self.process_multiple_pdfs(pdf_paths)
        
        # Index all chunks
        self.index_documents(all_chunks, namespace, create_new)
        
        # Return statistics
        return {
            "pdf_count": len(pdf_paths),
            "namespace": namespace,
            "total_chunks": len(all_chunks),
            "status": "success"
        }
    
    def list_namespaces(self) -> List[str]:
        """
        List all available namespaces (collections).
        
        Returns:
            List of namespace names
        """
        return self.vector_store_manager.list_collections()
    
    def delete_namespace(self, namespace: str) -> None:
        """
        Delete a namespace (collection).
        
        Args:
            namespace: Name of the namespace to delete
        """
        self.vector_store_manager.delete_collection(namespace)

