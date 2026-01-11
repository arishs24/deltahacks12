# Complete Installation Script for Synovia Move Pipeline
# Installs all dependencies except FEniCS (which requires special handling on Windows)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Synovia Move - Complete Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set OpenMP workaround
$env:KMP_DUPLICATE_LIB_OK = "TRUE"
Write-Host "[INFO] Set KMP_DUPLICATE_LIB_OK=TRUE" -ForegroundColor Yellow
Write-Host ""

# Install core dependencies
Write-Host "[1/3] Installing core packages..." -ForegroundColor Yellow
pip install --upgrade pip --quiet
pip install numpy>=1.21.0 scipy>=1.7.0 --quiet
pip install nibabel>=3.2.0 pydicom>=2.2.0 scikit-image>=0.18.0 --quiet
pip install pyvista>=0.32.0 matplotlib>=3.4.0 --quiet
Write-Host "[OK] Core packages installed" -ForegroundColor Green
Write-Host ""

# Install deep learning dependencies
Write-Host "[2/3] Installing deep learning packages..." -ForegroundColor Yellow
pip install torch --quiet
pip install monai --quiet
Write-Host "[OK] Deep learning packages installed" -ForegroundColor Green
Write-Host ""

# Check FEniCS
Write-Host "[3/3] Checking FEniCS..." -ForegroundColor Yellow
python -c "import dolfin; print('OK')" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] FEniCS already installed" -ForegroundColor Green
} else {
    Write-Host "[WARNING] FEniCS not installed" -ForegroundColor Yellow
    Write-Host "FEniCS is difficult to install on Windows." -ForegroundColor Yellow
    Write-Host "Run: .\install_fenics_windows.ps1 for installation options" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: The pipeline will fail at FEA step if FEniCS is missing." -ForegroundColor Yellow
    Write-Host "You can:" -ForegroundColor White
    Write-Host "  1. Use Docker (recommended): docker run -it -v `${PWD}:/workspace quay.io/fenicsproject/stable:latest" -ForegroundColor White
    Write-Host "  2. Use WSL: wsl --install, then install FEniCS in WSL" -ForegroundColor White
    Write-Host "  3. Temporarily modify code to skip FEniCS (not recommended)" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installation Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verify installations
Write-Host "Verifying installations..." -ForegroundColor Yellow
$all_ok = $true

python -c "import numpy; print('numpy OK')" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) { Write-Host "[OK] NumPy" -ForegroundColor Green } else { Write-Host "[FAIL] NumPy" -ForegroundColor Red; $all_ok = $false }

python -c "import monai; print('monai OK')" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) { Write-Host "[OK] MONAI" -ForegroundColor Green } else { Write-Host "[FAIL] MONAI" -ForegroundColor Red; $all_ok = $false }

python -c "import torch; print('torch OK')" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) { Write-Host "[OK] PyTorch" -ForegroundColor Green } else { Write-Host "[FAIL] PyTorch" -ForegroundColor Red; $all_ok = $false }

python -c "import pyvista; print('pyvista OK')" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) { Write-Host "[OK] PyVista" -ForegroundColor Green } else { Write-Host "[FAIL] PyVista" -ForegroundColor Red; $all_ok = $false }

python -c "import dolfin; print('fenics OK')" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) { 
    Write-Host "[OK] FEniCS" -ForegroundColor Green 
} else { 
    Write-Host "[MISSING] FEniCS (see install_fenics_windows.ps1)" -ForegroundColor Yellow 
}

Write-Host ""
if ($all_ok) {
    Write-Host "[SUCCESS] Core dependencies installed!" -ForegroundColor Green
    Write-Host "You can now run: python examples/pipeline_example.py" -ForegroundColor Cyan
    Write-Host "(Note: Pipeline will fail at FEA step if FEniCS is not installed)" -ForegroundColor Yellow
} else {
    Write-Host "[ERROR] Some dependencies failed to install" -ForegroundColor Red
}
