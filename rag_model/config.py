"""
Configuration for RAG system

Centralized configuration management for the RAG model.
Uses Moorcheh API for vector storage and retrieval.
Environment variables are used for sensitive data.
"""

import os
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class MoorchehConfig:
    """Moorcheh API configuration."""

    api_key: str = os.getenv("MOORCHEH_API_KEY", "")
    api_endpoint: str = os.getenv("MOORCHEH_API_ENDPOINT", "https://api.moorcheh.ai/v1/answer")
    upload_endpoint: str = os.getenv("MOORCHEH_UPLOAD_ENDPOINT", "https://api.moorcheh.ai/v1/upload")
    namespaces_endpoint: str = os.getenv("MOORCHEH_NAMESPACES_ENDPOINT", "https://api.moorcheh.ai/v1/namespaces")

    @property
    def headers(self) -> dict:
        """Get HTTP headers for Moorcheh API."""
        return {"Content-Type": "application/json", "x-api-key": self.api_key}


@dataclass
class LLMConfig:
    """Large Language Model configuration for Moorcheh."""

    # Moorcheh supports multiple models - defaulting to Claude (AWS Bedrock format)
    model: str = os.getenv("AI_MODEL", "anthropic.claude-sonnet-4-20250514-v1:0")
    temperature: float = float(os.getenv("TEMPERATURE", "0.0"))
    max_tokens: Optional[int] = None


@dataclass
class RAGConfig:
    """RAG system configuration for Moorcheh."""

    top_k: int = int(os.getenv("TOP_K", "15"))  # Number of chunks to retrieve
    threshold: float = float(os.getenv("THRESHOLD", "0.01"))  # Minimum similarity
    kiosk_mode: bool = os.getenv("KIOSK_MODE", "true").lower() == "true"
    type: str = os.getenv("NAMESPACE_TYPE", "vector")  # Document type in Moorcheh (vector or text)


@dataclass
class Config:
    """Main configuration class for Moorcheh RAG system."""

    # API Keys
    moorcheh_api_key: str = field(default_factory=lambda: os.getenv("MOORCHEH_API_KEY", ""))

    # Sub-configurations
    moorcheh: MoorchehConfig = field(default_factory=MoorchehConfig)
    llm: LLMConfig = field(default_factory=LLMConfig)
    rag: RAGConfig = field(default_factory=RAGConfig)

    # Prompts (can be customized)
    header_prompt: str = os.getenv(
        "HEADER_PROMPT",
        "You are a helpful AI assistant. Based on the provided context and chat history, " "please answer the user's query. If the context is not sufficient, say you don't have enough information.",
    )

    footer_prompt: str = os.getenv(
        "FOOTER_PROMPT",
        "Base your answers on the context provided. When using context chunks, prioritize information " "from chunks with higher relevance labels. If the context is not relevant, say you don't know.",
    )

    def validate(self) -> None:
        """Validate configuration."""
        if not self.moorcheh_api_key:
            raise ValueError("MOORCHEH_API_KEY environment variable not set.\n" "Set it with: export MOORCHEH_API_KEY='your-api-key-here'")

    @classmethod
    def from_env(cls) -> "Config":
        """Create configuration from environment variables."""
        config = cls()
        config.validate()
        return config


# Global configuration instance
config = Config()
