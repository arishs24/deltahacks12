"""
Large Language Model wrapper

Provides Google Gemini LLM for answer generation.
"""

from langchain_google_genai import ChatGoogleGenerativeAI
from ..config import config


def get_llm() -> ChatGoogleGenerativeAI:
    """
    Get configured Gemini LLM.
    
    Returns:
        ChatGoogleGenerativeAI: Initialized LLM
    """
    return ChatGoogleGenerativeAI(
        model=config.llm.model,
        temperature=config.llm.temperature,
        google_api_key=config.google_api_key,
        convert_system_message_to_human=True  # Required for system messages
    )

