# Fix PyTorch shm.dll Error on Windows
# This error occurs due to OpenMP library conflicts

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Fixing PyTorch shm.dll Error" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set OpenMP workaround
$env:KMP_DUPLICATE_LIB_OK = "TRUE"
Write-Host "[1/3] Setting KMP_DUPLICATE_LIB_OK=TRUE" -ForegroundColor Yellow

# Try to reinstall PyTorch
Write-Host "[2/3] Reinstalling PyTorch..." -ForegroundColor Yellow
pip uninstall torch torchvision torchaudio -y
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

Write-Host "[3/3] Verifying PyTorch..." -ForegroundColor Yellow
python -c "import torch; print('PyTorch version:', torch.__version__)" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] PyTorch is working!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To run pipeline, always set:" -ForegroundColor Cyan
    Write-Host "  `$env:KMP_DUPLICATE_LIB_OK='TRUE'" -ForegroundColor White
} else {
    Write-Host "[ERROR] PyTorch still has issues" -ForegroundColor Red
    Write-Host "Try installing CPU-only version:" -ForegroundColor Yellow
    Write-Host "  pip install torch --index-url https://download.pytorch.org/whl/cpu" -ForegroundColor White
}
