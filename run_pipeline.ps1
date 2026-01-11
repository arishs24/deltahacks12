# PowerShell script to run Synovia Move pipeline with proper environment setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Synovia Move Pipeline Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set OpenMP workaround for Windows
$env:KMP_DUPLICATE_LIB_OK = "TRUE"
Write-Host "[INFO] Set KMP_DUPLICATE_LIB_OK=TRUE" -ForegroundColor Yellow

# Check dependencies
Write-Host "`nChecking dependencies..." -ForegroundColor Yellow

$monai_ok = $false
$fenics_ok = $false
$torch_ok = $false

try {
    python -c "import monai; print('OK')" 2>&1 | Out-Null
    Write-Host "[OK] MONAI installed" -ForegroundColor Green
    $monai_ok = $true
} catch {
    Write-Host "[MISSING] MONAI not installed - run: pip install monai" -ForegroundColor Red
}

try {
    python -c "import dolfin; print('OK')" 2>&1 | Out-Null
    Write-Host "[OK] FEniCS installed" -ForegroundColor Green
    $fenics_ok = $true
} catch {
    Write-Host "[MISSING] FEniCS not installed - run: conda install -c conda-forge fenics" -ForegroundColor Red
}

try {
    python -c "import torch; print('OK')" 2>&1 | Out-Null
    Write-Host "[OK] PyTorch installed" -ForegroundColor Green
    $torch_ok = $true
} catch {
    Write-Host "[MISSING] PyTorch not installed - run: pip install torch" -ForegroundColor Red
}

Write-Host ""

# Check if all required dependencies are available
if (-not $monai_ok) {
    Write-Host "[ERROR] MONAI is required for segmentation" -ForegroundColor Red
    Write-Host "Install with: pip install monai" -ForegroundColor Yellow
    exit 1
}

if (-not $fenics_ok) {
    Write-Host "[ERROR] FEniCS is required for FEA" -ForegroundColor Red
    Write-Host "Install with: conda install -c conda-forge fenics" -ForegroundColor Yellow
    Write-Host "Or use Docker: docker run -it -v ${PWD}:/workspace quay.io/fenicsproject/stable:latest" -ForegroundColor Yellow
    exit 1
}

if (-not $torch_ok) {
    Write-Host "[ERROR] PyTorch is required" -ForegroundColor Red
    Write-Host "Install with: pip install torch" -ForegroundColor Yellow
    exit 1
}

# All dependencies OK, run pipeline
Write-Host "[INFO] All dependencies OK. Starting pipeline..." -ForegroundColor Green
Write-Host ""

python examples/pipeline_example.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Pipeline completed successfully!" -ForegroundColor Green
    Write-Host "Check outputs in:" -ForegroundColor Cyan
    Write-Host "  - fea_output/" -ForegroundColor White
    Write-Host "  - output_visualizations/" -ForegroundColor White
    Write-Host "  - tracking_data/" -ForegroundColor White
} else {
    Write-Host "`n[ERROR] Pipeline failed with exit code $LASTEXITCODE" -ForegroundColor Red
    exit $LASTEXITCODE
}
