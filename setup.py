"""
Setup script for Synovia Move package.
"""

from setuptools import setup, find_packages
from pathlib import Path

# Read README
readme_file = Path(__file__).parent / "README.md"
long_description = readme_file.read_text() if readme_file.exists() else ""

setup(
    name="synovia-move",
    version="1.0.0",
    description="Patient-Specific Knee Digital Twin for Rehabilitation Analysis",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Synovia Move Team",
    author_email="",
    url="",
    packages=find_packages(),
    python_requires=">=3.7",
    install_requires=[
        "numpy>=1.21.0",
        "scipy>=1.7.0",
        "nibabel>=3.2.0",
        "pydicom>=2.2.0",
        "scikit-image>=0.18.0",
        "torch>=1.10.0",
        "pyvista>=0.32.0",
        "matplotlib>=3.4.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.2.0",
            "black>=21.0.0",
            "flake8>=3.9.0",
        ],
    },
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Science/Research",
        "Topic :: Scientific/Engineering :: Medical Science Apps.",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
)
