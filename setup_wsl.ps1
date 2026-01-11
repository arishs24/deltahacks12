# WSL Setup for FEniCS on Windows
# Alternative to Docker for running FEniCS

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "WSL Setup for FEniCS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if WSL is installed
$wsl_installed = $false
try {
    wsl --status 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $wsl_installed = $true
        Write-Host "[OK] WSL is installed" -ForegroundColor Green
        wsl --status
    }
} catch {
    Write-Host "[MISSING] WSL is not installed" -ForegroundColor Red
}

Write-Host ""

if (-not $wsl_installed) {
    Write-Host "To install WSL:" -ForegroundColor Yellow
    Write-Host "  1. Run as Administrator: wsl --install" -ForegroundColor White
    Write-Host "  2. Restart your computer" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use Docker method (see setup_docker.ps1)" -ForegroundColor Cyan
    exit 1
}

Write-Host "To install FEniCS in WSL, run these commands in WSL:" -ForegroundColor Cyan
Write-Host "  sudo apt-get update" -ForegroundColor White
Write-Host "  sudo apt-get install -y python3-pip" -ForegroundColor White
Write-Host "  pip3 install fenics" -ForegroundColor White
Write-Host "  pip3 install monai torch numpy scipy nibabel pydicom scikit-image pyvista matplotlib" -ForegroundColor White
Write-Host ""
Write-Host "Then copy your project to WSL and run:" -ForegroundColor Cyan
Write-Host "  python3 examples/pipeline_example.py" -ForegroundColor White
