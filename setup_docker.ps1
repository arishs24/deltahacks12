# Docker Setup for FEniCS on Windows
# This is the recommended way to run FEniCS on Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Docker Setup for FEniCS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
$docker_installed = $false
try {
    docker --version 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $docker_installed = $true
        Write-Host "[OK] Docker is installed" -ForegroundColor Green
        docker --version
    }
} catch {
    Write-Host "[MISSING] Docker is not installed" -ForegroundColor Red
}

Write-Host ""

if (-not $docker_installed) {
    Write-Host "To install Docker Desktop:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://www.docker.com/products/docker-desktop" -ForegroundColor White
    Write-Host "  2. Install Docker Desktop" -ForegroundColor White
    Write-Host "  3. Start Docker Desktop" -ForegroundColor White
    Write-Host "  4. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use WSL method (see setup_wsl.ps1)" -ForegroundColor Cyan
    exit 1
}

# Pull FEniCS Docker image
Write-Host "Pulling FEniCS Docker image..." -ForegroundColor Yellow
docker pull quay.io/fenicsproject/stable:latest

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] FEniCS Docker image downloaded" -ForegroundColor Green
    Write-Host ""
    Write-Host "To run the pipeline in Docker:" -ForegroundColor Cyan
    Write-Host "  docker run -it -v `${PWD}:/workspace quay.io/fenicsproject/stable:latest" -ForegroundColor White
    Write-Host "  cd /workspace" -ForegroundColor White
    Write-Host "  pip install monai torch numpy scipy nibabel pydicom scikit-image pyvista matplotlib" -ForegroundColor White
    Write-Host "  python examples/pipeline_example.py" -ForegroundColor White
} else {
    Write-Host "[ERROR] Failed to pull Docker image" -ForegroundColor Red
}
