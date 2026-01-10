"""
Configuration for RAG system

Centralized configuration management for the RAG model.
Environment variables are used for sensitive data.
"""

import os
from dataclasses import dataclass
from typing import Optional


@dataclass
class MilvusConfig:
    """Milvus vector database configuration."""

    host: str = os.getenv("MILVUS_HOST", "localhost")
    port: str = os.getenv("MILVUS_PORT", "19530")
    user: str = os.getenv("MILVUS_USER", "")
    password: str = os.getenv("MILVUS_PASSWORD", "")

    @property
    def connection_args(self) -> dict:
        """Get connection arguments for Milvus."""
        args = {
            "host": self.host,
            "port": self.port,
        }
        if self.user:
            args["user"] = self.user
        if self.password:
            args["password"] = self.password
        return args


@dataclass
class EmbeddingConfig:
    """Embedding model configuration."""

    model: str = "models/embedding-001"  # Google's embedding model
    dimension: int = 768  # Embedding dimension


@dataclass
class LLMConfig:
    """Large Language Model configuration."""

    model: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    temperature: float = 0.0  # Deterministic for RAG
    max_tokens: Optional[int] = None


@dataclass
class RAGConfig:
    """RAG system configuration."""

    chunk_size: int = 1000  # Characters per chunk
    chunk_overlap: int = 200  # Overlap between chunks
    top_k: int = 3  # Number of chunks to retrieve
    similarity_threshold: float = 0.7  # Minimum similarity (0-1)


@dataclass
class Config:
    """Main configuration class."""

    # API Keys
    google_api_key: str = os.getenv("GOOGLE_API_KEY", "")

    # Sub-configurations
    milvus: MilvusConfig = MilvusConfig()
    embedding: EmbeddingConfig = EmbeddingConfig()
    llm: LLMConfig = LLMConfig()
    rag: RAGConfig = RAGConfig()

    def validate(self) -> None:
        """Validate configuration."""
        if not self.google_api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set.\n" "Set it with: export GOOGLE_API_KEY='your-api-key-here'")

    @classmethod
    def from_env(cls) -> "Config":
        """Create configuration from environment variables."""
        config = cls()
        config.validate()
        return config


# Global configuration instance
config = Config()
