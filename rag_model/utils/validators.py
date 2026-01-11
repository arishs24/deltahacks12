"""
Validation Utilities

Input validation helpers.
"""

import re


def validate_namespace_name(namespace: str) -> bool:
    """
    Validate namespace (collection) name.
    
    Args:
        namespace: Proposed namespace name
        
    Returns:
        True if valid
        
    Raises:
        ValueError: If namespace name is invalid
    """
    # Must not be empty
    if not namespace or not namespace.strip():
        raise ValueError("Namespace name cannot be empty")
    
    # Remove whitespace
    namespace = namespace.strip()
    
    # Must be alphanumeric with underscores only
    if not re.match(r'^[a-zA-Z0-9_]+$', namespace):
        raise ValueError(
            "Namespace name can only contain letters, numbers, and underscores"
        )
    
    # Must start with letter or underscore
    if not re.match(r'^[a-zA-Z_]', namespace):
        raise ValueError(
            "Namespace name must start with a letter or underscore"
        )
    
    # Length constraints (Milvus has a 255 character limit)
    if len(namespace) > 255:
        raise ValueError("Namespace name too long (max 255 characters)")
    
    if len(namespace) < 3:
        raise ValueError("Namespace name too short (min 3 characters)")
    
    return True


def validate_query(query: str) -> bool:
    """
    Validate user query.
    
    Args:
        query: User's question
        
    Returns:
        True if valid
        
    Raises:
        ValueError: If query is invalid
    """
    if not query or not query.strip():
        raise ValueError("Query cannot be empty")
    
    if len(query.strip()) < 3:
        raise ValueError("Query too short (min 3 characters)")
    
    if len(query) > 5000:
        raise ValueError("Query too long (max 5000 characters)")
    
    return True

