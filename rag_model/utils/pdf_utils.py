"""
PDF Processing Utilities

Handles PDF validation and text extraction.
"""

from pathlib import Path
import PyPDF2


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file.

    Args:
        pdf_path: Path to the PDF file

    Returns:
        Extracted text as a string
    """
    validate_pdf(pdf_path)

    text = ""
    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"

    return text.strip()


def validate_pdf(pdf_path: str) -> bool:
    """
    Validate that the file exists and is a PDF.

    Args:
        pdf_path: Path to the PDF file

    Returns:
        True if valid

    Raises:
        FileNotFoundError: If file doesn't exist
        ValueError: If file is not a PDF
    """
    path = Path(pdf_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {pdf_path}")

    if not path.is_file():
        raise ValueError(f"Path is not a file: {pdf_path}")

    if path.suffix.lower() != ".pdf":
        raise ValueError(f"File is not a PDF: {pdf_path}")

    return True


def get_pdf_metadata(pdf_path: str) -> dict:
    """
    Extract basic metadata from a PDF file.

    Args:
        pdf_path: Path to the PDF file

    Returns:
        Dictionary with PDF metadata
    """
    validate_pdf(pdf_path)

    path = Path(pdf_path)

    return {"filename": path.name, "size_bytes": path.stat().st_size, "path": str(path.absolute())}
