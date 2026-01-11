"""
Configuration for RAG API.
"""

import os
from pathlib import Path
from typing import Optional


class Config:
    """Configuration class for RAG API."""

    def __init__(self):
        """Initialize configuration from environment variables."""
        # API Keys
        self.moorcheh_api_key: str = os.getenv("MOORCHEH_API_KEY", "")
        self.google_api_key: str = os.getenv("GOOGLE_API_KEY", "") or os.getenv("GEMINI_API_KEY", "")

        # Moorcheh namespace (where biomechanical/clinical data is stored)
        self.moorcheh_namespace: str = os.getenv("MOORCHEH_NAMESPACE", "Deltahacks12Text")

        # Gemini model (valid options: gemini-2.5-flash, gemini-2.5-pro, gemini-2.0-flash-exp, gemini-2.0-flash, gemini-2.0-flash-001)
        self.gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

        # API Server
        self.api_host: str = os.getenv("API_HOST", "0.0.0.0")
        self.api_port: int = int(os.getenv("API_PORT", "8000"))

    @classmethod
    def load_env_file(cls):
        """Load .env file if it exists."""
        try:
            from dotenv import load_dotenv

            # Try loading from project root
            env_path = Path(__file__).parent.parent / ".env"
            if env_path.exists():
                load_dotenv(dotenv_path=env_path)
            # Also try from rag_model folder (where existing .env might be)
            rag_model_env = Path(__file__).parent.parent / "rag_model" / ".env"
            if rag_model_env.exists():
                load_dotenv(dotenv_path=rag_model_env)
        except ImportError:
            pass  # dotenv not installed, use system env vars

    def validate(self) -> None:
        """Validate required configuration."""
        if not self.moorcheh_api_key:
            raise ValueError("MOORCHEH_API_KEY environment variable not set")
        if not self.google_api_key:
            raise ValueError("GOOGLE_API_KEY or GEMINI_API_KEY environment variable not set")

    @classmethod
    def from_env(cls) -> "Config":
        """Create configuration from environment variables."""
        cls.load_env_file()
        config = cls()
        config.validate()
        return config


# Global configuration instance (lazy initialization)
_config_instance: Config = None


def get_config() -> Config:
    """Get global configuration instance (lazy initialization)."""
    global _config_instance
    if _config_instance is None:
        Config.load_env_file()
        _config_instance = Config()
        _config_instance.validate()
    return _config_instance
