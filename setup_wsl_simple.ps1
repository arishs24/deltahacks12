# Simple WSL Setup for FEniCS (No Docker Required)
# This installs WSL and sets up FEniCS in Linux environment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "WSL Setup for FEniCS (No Docker)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "[WARNING] This script should be run as Administrator" -ForegroundColor Yellow
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or run manually:" -ForegroundColor Cyan
    Write-Host "  wsl --install" -ForegroundColor White
    Write-Host "  (Then restart your computer)" -ForegroundColor White
    exit 1
}

# Check if WSL is already installed
$wsl_installed = $false
try {
    wsl --status 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $wsl_installed = $true
        Write-Host "[OK] WSL is already installed" -ForegroundColor Green
    }
} catch {
    # WSL not installed
}

if (-not $wsl_installed) {
    Write-Host "[1/3] Installing WSL..." -ForegroundColor Yellow
    wsl --install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] WSL installation initiated" -ForegroundColor Green
        Write-Host "[IMPORTANT] You need to RESTART your computer" -ForegroundColor Yellow
        Write-Host "After restart, run this script again to continue setup" -ForegroundColor Yellow
        exit 0
    } else {
        Write-Host "[ERROR] WSL installation failed" -ForegroundColor Red
        exit 1
    }
}

# WSL is installed, now set up FEniCS
Write-Host "[2/3] Setting up FEniCS in WSL..." -ForegroundColor Yellow

# Create setup script for WSL
$wsl_script = @"
#!/bin/bash
echo 'Updating package list...'
sudo apt-get update -qq

echo 'Installing Python and pip...'
sudo apt-get install -y python3-pip python3-venv > /dev/null 2>&1

echo 'Installing FEniCS...'
pip3 install --user fenics > /dev/null 2>&1

echo 'Installing other dependencies...'
pip3 install --user monai torch numpy scipy nibabel pydicom scikit-image pyvista matplotlib > /dev/null 2>&1

echo 'Verifying installation...'
python3 -c 'import dolfin; print("FEniCS OK")' 2>/dev/null && echo '[SUCCESS] FEniCS installed!' || echo '[ERROR] FEniCS installation failed'
"@

# Save script to temp file
$script_path = "$env:TEMP\fenics_setup.sh"
$wsl_script | Out-File -FilePath $script_path -Encoding UTF8

# Run script in WSL
Write-Host "Running setup in WSL (this may take a few minutes)..." -ForegroundColor Yellow
wsl bash $script_path

Write-Host ""
Write-Host "[3/3] Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To use FEniCS, run your pipeline in WSL:" -ForegroundColor Cyan
Write-Host "  1. Open WSL: wsl" -ForegroundColor White
Write-Host "  2. Navigate to project: cd /mnt/c/Users/arish/OneDrive/Documents/GitHub/deltahacks12" -ForegroundColor White
Write-Host "  3. Run pipeline: python3 examples/pipeline_example.py" -ForegroundColor White
Write-Host ""
Write-Host "Or copy your project to WSL home directory for better performance" -ForegroundColor Yellow
