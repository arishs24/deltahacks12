"""
Chat Service

Orchestrates RAG pipeline: retrieval + generation with strict source citation.
"""

from typing import Dict, List, Optional
from langchain_core.prompts import ChatPromptTemplate

from ..core.llm import get_llm
from .retrieval_service import RetrievalService
from ..config import config


# Strict RAG prompt template
RAG_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a helpful assistant that answers questions STRICTLY based on the provided context.

Rules:
1. ONLY use information from the context provided below
2. If the answer is not in the context, respond with: "I don't have enough information in the knowledge base to answer this question."
3. Always cite which source document(s) you used (by source name)
4. Be concise and accurate
5. Do not use external knowledge or make assumptions

Context:
{context}
""",
    ),
    ("human", "{question}"),
])


class ChatService:
    """Service for RAG-based question answering."""
    
    def __init__(self):
        """Initialize chat service."""
        self.retrieval_service = RetrievalService()
        self.llm = get_llm()
    
    def answer_question(
        self,
        question: str,
        namespace: str,
        top_k: Optional[int] = None,
        return_sources: bool = True
    ) -> Dict:
        """
        Answer a question using RAG pipeline.
        
        Args:
            question: User's question
            namespace: Collection/namespace to search in
            top_k: Number of documents to retrieve
            return_sources: Whether to include source information
            
        Returns:
            Dictionary containing:
                - answer: The generated answer
                - sources: List of source documents (if return_sources=True)
                - context_found: Boolean indicating if relevant context was found
        """
        # Retrieve relevant documents
        try:
            retrieved_docs = self.retrieval_service.retrieve(
                query=question,
                namespace=namespace,
                top_k=top_k
            )
        except ValueError as e:
            return {
                "answer": f"Error: {str(e)}",
                "sources": [],
                "context_found": False,
                "error": str(e)
            }
        
        # Check if we have results
        if not retrieved_docs:
            return {
                "answer": "Not found in knowledge base",
                "sources": [],
                "context_found": False
            }
        
        # Format context
        context = self.retrieval_service.format_context(
            retrieved_docs,
            include_scores=False
        )
        
        # Generate answer using LLM
        try:
            chain = RAG_PROMPT | self.llm
            response = chain.invoke({
                "context": context,
                "question": question
            })
            answer = response.content
        except Exception as e:
            return {
                "answer": f"Error generating answer: {str(e)}",
                "sources": [],
                "context_found": True,
                "error": str(e)
            }
        
        # Prepare response
        result = {
            "answer": answer,
            "context_found": True
        }
        
        if return_sources:
            result["sources"] = self.retrieval_service.get_sources(retrieved_docs)
        
        return result
    
    def stream_answer(
        self,
        question: str,
        namespace: str,
        top_k: Optional[int] = None
    ):
        """
        Stream answer generation (for real-time responses).
        
        Args:
            question: User's question
            namespace: Collection/namespace to search in
            top_k: Number of documents to retrieve
            
        Yields:
            Chunks of the generated answer
        """
        # Retrieve relevant documents
        retrieved_docs = self.retrieval_service.retrieve(
            query=question,
            namespace=namespace,
            top_k=top_k
        )
        
        if not retrieved_docs:
            yield {"type": "error", "content": "Not found in knowledge base"}
            return
        
        # Format context
        context = self.retrieval_service.format_context(
            retrieved_docs,
            include_scores=False
        )
        
        # Stream the response
        chain = RAG_PROMPT | self.llm
        
        try:
            for chunk in chain.stream({
                "context": context,
                "question": question
            }):
                yield {
                    "type": "content",
                    "content": chunk.content
                }
            
            # Send sources at the end
            yield {
                "type": "sources",
                "sources": self.retrieval_service.get_sources(retrieved_docs)
            }
        except Exception as e:
            yield {
                "type": "error",
                "content": f"Error: {str(e)}"
            }

