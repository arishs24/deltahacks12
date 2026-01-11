"""
Moorcheh SDK Client

Handles all interactions with Moorcheh using the official SDK.
Supports both TEXT and VECTOR namespaces.
"""

import os
from typing import List, Dict, Any, Optional
from moorcheh_sdk import MoorchehClient as MoorchehSDK, MoorchehError
from ..config import config

# Import Google Gemini for embedding (needed for vector namespace queries)
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False


class MoorchehClient:
    """Client for Moorcheh SDK operations."""
    
    def __init__(self):
        """Initialize Moorcheh client."""
        self.api_key = config.moorcheh_api_key
        self._client = None
    
    def __enter__(self):
        """Context manager entry."""
        self._client = MoorchehSDK(api_key=self.api_key)
        self._client.__enter__()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit."""
        if self._client:
            self._client.__exit__(exc_type, exc_val, exc_tb)
    
    def query(
        self,
        question: str,
        namespace: str,
        namespace_type: str = "text",
        chat_history: List[Dict[str, str]] = None,
        top_k: Optional[int] = None,
        threshold: Optional[float] = None,
        temperature: Optional[float] = None,
        model: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Query Moorcheh RAG system using SDK.
        
        For TEXT namespaces: Uses answer.generate for RAG with LLM (Gemini generates answer)
        For VECTOR namespaces: Uses search for similarity search (returns raw chunks)
        
        Args:
            question: User's question
            namespace: Namespace to search in
            namespace_type: "text" or "vector"
            chat_history: Previous conversation history
            top_k: Number of chunks to retrieve
            threshold: Minimum similarity threshold
            temperature: LLM temperature
            model: AI model to use
            
        Returns:
            SDK response with answer
        """
        with MoorchehSDK(api_key=self.api_key) as client:
            if namespace_type == "text":
                # For TEXT namespaces: Use answer.generate() to get Gemini to generate an answer
                result = client.answer.generate(
                    namespace=namespace,
                    query=question,
                    top_k=top_k or config.rag.top_k,
                    ai_model=model or config.llm.model,
                    chat_history=chat_history or [],
                    temperature=temperature or config.llm.temperature
                )
                
                return {
                    "answer": result.get("answer", "No answer generated."),
                    "model": result.get("model"),
                    "contextCount": result.get("contextCount", 0),
                    "namespace_type": "text",
                    "raw_response": result
                }
            else:
                # For VECTOR namespaces: Use search() to get similar chunks
                # Vector namespaces require embedded query vectors, not text
                if not GEMINI_AVAILABLE:
                    raise ValueError(
                        "Google Generative AI package not available. "
                        "Install it with: pip install google-generativeai\n"
                        "Vector namespaces require embedding queries before searching."
                    )
                
                # Get Google API key for embedding
                gemini_api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
                if not gemini_api_key:
                    raise ValueError(
                        "GOOGLE_API_KEY or GEMINI_API_KEY not set in environment. "
                        "Vector namespaces require embedding queries. "
                        "Get a key from: https://makersuite.google.com/app/apikey"
                    )
                
                # Configure Gemini and embed the query
                genai.configure(api_key=gemini_api_key)
                try:
                    embedding_result = genai.embed_content(
                        model="models/embedding-001",
                        content=question,
                        task_type="retrieval_query"  # Use retrieval_query for queries
                    )
                    query_vector = embedding_result['embedding']
                except Exception as e:
                    raise ValueError(
                        f"Failed to embed query for vector namespace: {e}\n"
                        "Make sure GOOGLE_API_KEY is set and valid."
                    )
                
                # Search using the embedded vector
                search_result = client.search(
                    namespaces=[namespace],
                    query=query_vector,  # Pass the embedded vector, not text
                    top_k=top_k or config.rag.top_k,
                    threshold=threshold or config.rag.threshold,
                    kiosk_mode=config.rag.kiosk_mode
                )
                
                # Extract results and format
                results = search_result.get("results", [])
                
                if not results:
                    answer = "No relevant information found in the knowledge base."
                else:
                    # Format the top results
                    answer_parts = []
                    for i, item in enumerate(results[:5], 1):  # Top 5 results
                        # Try multiple places for text content
                        text = (
                            item.get("text") or 
                            item.get("content") or
                            (item.get("metadata", {}).get("text") if isinstance(item.get("metadata"), dict) else None) or
                            ""
                        )
                        score = item.get("score", item.get("distance", 0))
                        
                        if text:
                            answer_parts.append(f"[Result {i}, score: {score:.3f}]\n{text}")
                    
                    if answer_parts:
                        answer = "\n\n".join(answer_parts)
                    else:
                        # If no text found, at least show we found results
                        answer = f"Found {len(results)} relevant results, but text content not available. Check sources for metadata."
                
                return {
                    "answer": answer,
                    "results": results,
                    "namespace_type": "vector",
                    "execution_time": search_result.get("execution_time", 0),
                    "raw_results": search_result
                }
    
    def _format_vector_results(self, results: Dict) -> str:
        """Format vector search results into a readable answer."""
        items = results.get("results", [])
        if not items:
            return "No relevant information found in the knowledge base."
        
        # Combine the top results into a summary
        texts = []
        for i, item in enumerate(items[:3], 1):  # Top 3 results
            text = item.get("text", item.get("content", ""))
            score = item.get("score", 0)
            if text:
                texts.append(f"[Result {i}, relevance: {score:.3f}]\n{text}")
        
        return "\n\n".join(texts) if texts else "No text content found."
    
    def upload_documents(
        self,
        namespace: str,
        documents: List[Dict[str, str]]
    ) -> Dict[str, Any]:
        """
        Upload documents to Moorcheh TEXT namespace using SDK.
        Note: This only works for TEXT namespaces.
        
        Args:
            namespace: Name of the namespace (must be text type)
            documents: List of documents with 'id' and 'text' fields
            
        Returns:
            Upload response
        """
        with MoorchehSDK(api_key=self.api_key) as client:
            result = client.documents.upload(
                namespace_name=namespace,
                documents=documents
            )
            return result
    
    def list_namespaces(self) -> List[Dict[str, Any]]:
        """
        List all available namespaces using SDK.
        
        Returns:
            List of namespace dictionaries with names and types
        """
        with MoorchehSDK(api_key=self.api_key) as client:
            result = client.namespaces.list()
            namespaces = result.get('namespaces', [])
            return namespaces
    
    def create_namespace(self, namespace: str, type: str = "text") -> Dict[str, Any]:
        """
        Create a new namespace.
        
        Args:
            namespace: Name of the namespace
            type: Type of namespace ("text" or "vector")
            
        Returns:
            Creation response
        """
        with MoorchehSDK(api_key=self.api_key) as client:
            result = client.namespaces.create(
                namespace_name=namespace,
                type=type
            )
            return result
    
    def delete_documents(self, namespace: str, ids: List[str]) -> Dict[str, Any]:
        """
        Delete documents from a namespace.
        
        Args:
            namespace: Name of the namespace
            ids: List of document IDs to delete
            
        Returns:
            Deletion response
        """
        with MoorchehSDK(api_key=self.api_key) as client:
            result = client.documents.delete(
                namespace_name=namespace,
                ids=ids
            )
            return result
