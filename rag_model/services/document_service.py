"""
Document Service

Handles PDF processing and uploading to Moorcheh namespaces using SDK.
Supports both TEXT and VECTOR namespaces.
"""

from pathlib import Path
from typing import List, Dict, Any
import PyPDF2
from ..core.moorcheh_client import MoorchehClient
from ..utils.pdf_utils import validate_pdf, get_pdf_metadata


class DocumentService:
    """Service for document processing and uploading to Moorcheh."""
    
    def __init__(self):
        """Initialize document service."""
        self.client = MoorchehClient()
    
    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """
        Extract text from a PDF file.
        
        Args:
            pdf_path: Path to the PDF file
            
        Returns:
            Extracted text
        """
        validate_pdf(pdf_path)
        
        text = ""
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        
        return text.strip()
    
    def upload_pdf(
        self,
        pdf_path: str,
        namespace: str,
        metadata: Dict = None
    ) -> dict:
        """
        Upload a PDF file to Moorcheh TEXT namespace.
        
        Note: This only works for TEXT namespaces.
        For VECTOR namespaces, you need to upload via Moorcheh Console.
        
        Args:
            pdf_path: Path to the PDF file
            namespace: Name of the TEXT namespace
            metadata: Optional metadata for the document
            
        Returns:
            Dictionary with upload statistics
        """
        # Extract text from PDF
        text = self.extract_text_from_pdf(pdf_path)
        filename = Path(pdf_path).name
        
        # Create document for Moorcheh
        documents = [{
            "id": filename,  # Use filename as ID
            "text": text
        }]
        
        # Upload to Moorcheh using SDK (TEXT namespace only)
        result = self.client.upload_documents(
            namespace=namespace,
            documents=documents
        )
        
        # Return formatted response
        return {
            "pdf_path": pdf_path,
            "namespace": namespace,
            "filename": filename,
            "status": result.get('status', 'success'),
            "moorcheh_response": result
        }
    
    def list_namespaces(self) -> List[Dict[str, Any]]:
        """
        List all available namespaces with their types.
        
        Returns:
            List of namespace dictionaries
        """
        namespaces = self.client.list_namespaces()
        return namespaces
    
    def list_namespace_names(self) -> List[str]:
        """
        List all available namespace names (legacy compatibility).
        
        Returns:
            List of namespace names
        """
        namespaces = self.client.list_namespaces()
        return [ns.get('namespace_name', ns.get('name', str(ns))) for ns in namespaces]
    
    def get_namespace_type(self, namespace: str) -> str:
        """
        Get the type of a namespace (text or vector).
        
        Args:
            namespace: Name of the namespace
            
        Returns:
            "text" or "vector"
        """
        namespaces = self.list_namespaces()
        for ns in namespaces:
            if ns.get('namespace_name') == namespace:
                return ns.get('type', 'text')
        return 'text'  # Default to text
    
    def create_namespace(self, namespace: str, type: str = "text") -> Dict:
        """
        Create a new namespace.
        
        Args:
            namespace: Name of the namespace
            type: Type of namespace ("text" or "vector")
            
        Returns:
            Creation response
        """
        return self.client.create_namespace(namespace, type)
