# Safe Pipeline Runner - Sets environment variables correctly

# Set OpenMP workaround BEFORE Python starts
$env:KMP_DUPLICATE_LIB_OK = "TRUE"
$env:TF_ENABLE_ONEDNN_OPTS = "0"  # Suppress TensorFlow warnings

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Synovia Move Pipeline Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Environment variables set:" -ForegroundColor Yellow
Write-Host "  KMP_DUPLICATE_LIB_OK = $env:KMP_DUPLICATE_LIB_OK" -ForegroundColor White
Write-Host "  TF_ENABLE_ONEDNN_OPTS = $env:TF_ENABLE_ONEDNN_OPTS" -ForegroundColor White
Write-Host ""

# Check if FEniCS is available
$fenics_available = $false
try {
    python -c "import dolfin; print('OK')" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $fenics_available = $true
    }
} catch {
    $fenics_available = $false
}

if ($fenics_available) {
    Write-Host "[INFO] FEniCS detected - running full pipeline" -ForegroundColor Green
    Write-Host ""
    python examples/pipeline_example.py
} else {
    Write-Host "[INFO] FEniCS not available - running without FEA (Steps 1-6)" -ForegroundColor Yellow
    Write-Host ""
    python examples/pipeline_example_no_fenics.py
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Pipeline completed!" -ForegroundColor Green
    Write-Host "Check outputs in:" -ForegroundColor Cyan
    Write-Host "  - output_visualizations/" -ForegroundColor White
    Write-Host "  - tracking_data/" -ForegroundColor White
    if ($fenics_available) {
        Write-Host "  - fea_output/" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "[ERROR] Pipeline failed with exit code $LASTEXITCODE" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Make sure PyTorch is installed: pip install torch --index-url https://download.pytorch.org/whl/cpu" -ForegroundColor White
    Write-Host "  2. Restart PowerShell and try again" -ForegroundColor White
    Write-Host "  3. Check error messages above" -ForegroundColor White
}
