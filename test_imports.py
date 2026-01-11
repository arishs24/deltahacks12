"""
Quick test script to verify all modules can be imported.
Run this before running the main pipeline.
"""

import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent))

print("Testing Synovia Move imports...")
print("-" * 50)

modules = [
    ("mri_ingestion", "MRI loading and preprocessing"),
    ("segmentation", "Knee anatomy segmentation"),
    ("surface_reconstruction", "Surface mesh generation"),
    ("volumetric_meshing", "Tetrahedral meshing"),
    ("injury_modeling", "ACL deficiency modeling"),
    ("movement_scenarios", "Movement scenario definition"),
    ("fea_solver", "Finite element analysis"),
    ("risk_scoring", "Risk score computation"),
    ("longitudinal_tracking", "Mechanical dose tracking"),
    ("visualization", "3D visualization and plotting"),
]

failed = []
for module_name, description in modules:
    try:
        module = __import__(f"synovia_move.{module_name}", fromlist=[module_name])
        print(f"[OK] {module_name:25s} - {description}")
    except ImportError as e:
        print(f"[FAIL] {module_name:25s} - FAILED: {e}")
        failed.append(module_name)
    except Exception as e:
        print(f"[WARN] {module_name:25s} - ERROR: {e}")
        failed.append(module_name)

print("-" * 50)
if not failed:
    print("\n[SUCCESS] All modules imported successfully!")
    print("\nYou can now run the pipeline:")
    print("  python examples/pipeline_example.py")
else:
    print(f"\n[ERROR] {len(failed)} module(s) failed to import:")
    for m in failed:
        print(f"   - {m}")
    print("\nPlease check your installation and dependencies.")
