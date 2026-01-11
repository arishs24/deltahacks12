"""
Configuration file for Synovia Move pipeline.

Modify these settings to customize the pipeline behavior.
"""

from pathlib import Path
from typing import Optional

# ============================================================================
# PATHS
# ============================================================================

# Default data directories
DATA_DIR = Path("data")
OUTPUT_DIR = Path("output")
FEA_OUTPUT_DIR = Path("fea_output")
VISUALIZATION_OUTPUT_DIR = Path("output_visualizations")
TRACKING_DATA_DIR = Path("tracking_data")
CACHE_DIR = Path("cache")

# FEA Solver paths
FEBIO_PATH: Optional[Path] = None  # Set to Path("/path/to/febio2") if not in PATH
FENICS_AVAILABLE = False  # Set to True if FEniCS is installed

# Segmentation model path
SEGMENTATION_MODEL_PATH: Optional[Path] = None  # Set to your model path

# ============================================================================
# SEGMENTATION PARAMETERS
# ============================================================================

SEGMENTATION_DEVICE = "cuda"  # "cuda" or "cpu"
SEGMENTATION_POSTPROCESS = True
SEGMENTATION_SMOOTHING_ITERATIONS = 50

# ============================================================================
# MESHING PARAMETERS
# ============================================================================

# Surface reconstruction
SURFACE_SMOOTHING_ITERATIONS = 50
SURFACE_DECIMATION_TARGET = None  # None or float (0-1)

# Volumetric meshing
CARTILAGE_ELEMENT_SIZE = 1.0  # mm (fine mesh for cartilage)
BONE_ELEMENT_SIZE = 3.0  # mm (coarser mesh for bone)
USE_GMSH = True  # Use Gmsh if available, else TetGen

# ============================================================================
# MATERIAL PROPERTIES
# ============================================================================

MATERIAL_PROPERTIES = {
    'femoral_cartilage': {
        'E': 0.5,  # MPa (Young's modulus)
        'nu': 0.45,  # Poisson's ratio
        'density': 1.0  # g/cm³
    },
    'tibial_cartilage': {
        'E': 0.5,
        'nu': 0.45,
        'density': 1.0
    },
    'femur': {
        'E': 17000.0,  # MPa (cortical bone)
        'nu': 0.3,
        'density': 1.85
    },
    'tibia': {
        'E': 17000.0,
        'nu': 0.3,
        'density': 1.85
    }
}

# ============================================================================
# FEA PARAMETERS
# ============================================================================

FEA_SOLVER = "febio"  # "febio" or "fenics"
FEA_TIMEOUT_SECONDS = 3600  # 1 hour
FEA_MAX_ITERATIONS = 100

# ============================================================================
# RISK SCORING PARAMETERS
# ============================================================================

STRESS_THRESHOLDS = {
    'low_risk': 1.0,      # MPa
    'moderate_risk': 2.0,  # MPa
    'high_risk': 3.0,      # MPa
    'critical': 5.0       # MPa
}

# ============================================================================
# VISUALIZATION PARAMETERS
# ============================================================================

VISUALIZATION_COLORMAP = "hot"
VISUALIZATION_DPI = 300
VISUALIZATION_SHOW = False  # Set to True to display plots interactively

# ============================================================================
# LOGGING
# ============================================================================

LOG_LEVEL = "INFO"  # "DEBUG", "INFO", "WARNING", "ERROR"
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
