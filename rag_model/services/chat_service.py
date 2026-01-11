"""
Chat Service

Handles RAG-based question answering using Moorcheh SDK.
Supports both TEXT and VECTOR namespaces.
"""

from typing import Dict, List, Optional
from ..core.moorcheh_client import MoorchehClient
from ..services.document_service import DocumentService


class ChatService:
    """Service for RAG-based question answering using Moorcheh SDK."""
    
    def __init__(self):
        """Initialize chat service."""
        self.client = MoorchehClient()
        self.doc_service = DocumentService()
    
    def answer_question(
        self,
        question: str,
        namespace: str,
        chat_history: List[Dict[str, str]] = None,
        top_k: Optional[int] = None,
        return_sources: bool = True
    ) -> Dict:
        """
        Answer a question using Moorcheh SDK.
        Automatically detects namespace type and uses appropriate method.
        
        Args:
            question: User's question
            namespace: Namespace to search in
            chat_history: Previous conversation history
            top_k: Number of documents to retrieve
            return_sources: Whether to include source information
            
        Returns:
            Dictionary containing answer and sources
        """
        try:
            # Detect namespace type
            namespace_type = self.doc_service.get_namespace_type(namespace)
            print(f"[DEBUG] Namespace type: {namespace_type}")
            
            # Query Moorcheh SDK
            response = self.client.query(
                question=question,
                namespace=namespace,
                namespace_type=namespace_type,
                chat_history=chat_history,
                top_k=top_k
            )
            
            # Extract answer from SDK response
            if namespace_type == "vector":
                # Vector namespace returns formatted results
                answer = response.get('answer', '')
                sources = response.get('results', [])
            else:
                # Text namespace returns answer directly
                answer = response.get('answer', response.get('response', str(response)))
                sources = response.get('sources', response.get('context', []))
            
            # Format response
            result = {
                "answer": answer,
                "context_found": bool(answer),
                "namespace_type": namespace_type,
                "raw_response": response
            }
            
            if return_sources and sources:
                result["sources"] = self._format_sources(sources)
            
            return result
            
        except Exception as e:
            return {
                "answer": f"Error: {str(e)}",
                "sources": [],
                "context_found": False,
                "error": str(e)
            }
    
    def _format_sources(self, sources: List) -> List[Dict]:
        """Format source information from Moorcheh response."""
        formatted = []
        for i, source in enumerate(sources, 1):
            if isinstance(source, dict):
                # Extract text from various possible locations
                text = (
                    source.get('text') or 
                    source.get('content') or
                    (source.get('metadata', {}).get('text') if isinstance(source.get('metadata'), dict) else None) or
                    ""
                )
                
                # Extract metadata
                metadata = source.get('metadata', {})
                if isinstance(metadata, dict):
                    source_name = metadata.get('source', source.get('id', 'Unknown'))
                else:
                    source_name = source.get('filename', source.get('id', source.get('source', 'Unknown')))
                
                formatted.append({
                    "index": i,
                    "filename": source_name,
                    "score": source.get('score', source.get('relevance', source.get('distance', 0))),
                    "text": text,
                    "metadata": metadata if isinstance(metadata, dict) else {}
                })
            else:
                formatted.append({
                    "index": i,
                    "content": str(source)
                })
        
        return formatted
    
    def chat(
        self,
        question: str,
        namespace: str,
        chat_history: List[Dict[str, str]] = None
    ) -> Dict:
        """
        Simplified chat interface with conversation history.
        
        Args:
            question: User's question
            namespace: Namespace to search in
            chat_history: Previous conversation
            
        Returns:
            Response with answer and updated history
        """
        result = self.answer_question(
            question=question,
            namespace=namespace,
            chat_history=chat_history or []
        )
        
        # Update chat history
        updated_history = (chat_history or []).copy()
        updated_history.append({
            "role": "user",
            "content": question
        })
        updated_history.append({
            "role": "assistant",
            "content": result['answer']
        })
        
        result['chat_history'] = updated_history
        return result
