"""
PDF Processing Utilities

Handles PDF loading and validation.
"""

from pathlib import Path
from typing import List
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document


def validate_pdf(pdf_path: str) -> bool:
    """
    Validate that the file exists and is a PDF.
    
    Args:
        pdf_path: Path to the PDF file
        
    Returns:
        True if valid, False otherwise
    """
    path = Path(pdf_path)
    
    if not path.exists():
        raise FileNotFoundError(f"File not found: {pdf_path}")
    
    if not path.is_file():
        raise ValueError(f"Path is not a file: {pdf_path}")
    
    if path.suffix.lower() != ".pdf":
        raise ValueError(f"File is not a PDF: {pdf_path}")
    
    return True


def load_pdf(pdf_path: str) -> List[Document]:
    """
    Load a PDF file and return documents.
    
    Args:
        pdf_path: Path to the PDF file
        
    Returns:
        List of Document objects (one per page)
    """
    # Validate PDF
    validate_pdf(pdf_path)
    
    # Load PDF using LangChain's PyPDFLoader
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    
    # Add filename to metadata
    filename = Path(pdf_path).name
    for doc in documents:
        doc.metadata["filename"] = filename
    
    return documents


def get_pdf_metadata(pdf_path: str) -> dict:
    """
    Extract metadata from a PDF file.
    
    Args:
        pdf_path: Path to the PDF file
        
    Returns:
        Dictionary with PDF metadata
    """
    validate_pdf(pdf_path)
    
    path = Path(pdf_path)
    
    # Load first page to get basic info
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    
    return {
        "filename": path.name,
        "size_bytes": path.stat().st_size,
        "num_pages": len(documents),
        "path": str(path.absolute())
    }

