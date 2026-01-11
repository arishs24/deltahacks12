# Install FEniCS with Python 3.12 (FEniCS doesn't support Python 3.13 yet)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "FEniCS Installation (Python 3.12)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "FEniCS requires Python 3.9-3.12 (not 3.13)" -ForegroundColor Yellow
Write-Host ""

# Create new environment with Python 3.12
Write-Host "[1/4] Creating conda environment with Python 3.12..." -ForegroundColor Yellow
conda create -n synovia_fenics python=3.12 -y

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to create environment" -ForegroundColor Red
    exit 1
}

Write-Host "[2/4] Activating environment..." -ForegroundColor Yellow
Write-Host "You need to activate it manually:" -ForegroundColor Cyan
Write-Host "  conda activate synovia_fenics" -ForegroundColor White
Write-Host ""

Write-Host "[3/4] Installing FEniCS..." -ForegroundColor Yellow
Write-Host "Run these commands after activating:" -ForegroundColor Cyan
Write-Host "  conda install -c conda-forge fenics-dolfinx -y" -ForegroundColor White
Write-Host "  pip install monai torch numpy scipy nibabel pydicom scikit-image pyvista matplotlib" -ForegroundColor White
Write-Host ""

Write-Host "[4/4] Verify installation:" -ForegroundColor Yellow
Write-Host "  python -c 'import dolfin; print(\"FEniCS OK\")'" -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Quick Commands" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Create and activate environment:" -ForegroundColor Yellow
Write-Host "conda activate synovia_fenics" -ForegroundColor White
Write-Host ""
Write-Host "# Install FEniCS:" -ForegroundColor Yellow
Write-Host "conda install -c conda-forge fenics-dolfinx -y" -ForegroundColor White
Write-Host ""
Write-Host "# Install other dependencies:" -ForegroundColor Yellow
Write-Host "pip install monai torch numpy scipy nibabel pydicom scikit-image pyvista matplotlib" -ForegroundColor White
Write-Host ""
Write-Host "# Run pipeline:" -ForegroundColor Yellow
Write-Host "`$env:KMP_DUPLICATE_LIB_OK='TRUE'" -ForegroundColor White
Write-Host "python examples/pipeline_example.py" -ForegroundColor White
