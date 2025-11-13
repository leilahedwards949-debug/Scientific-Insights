<# Quickstart PowerShell script: create venv, install deps, run migrations, start server #>
param(
    [string]$venvName = '.venv',
    [int]$port = 8000
)

Write-Host "Creating virtual environment '$venvName'..."
python -m venv $venvName
Write-Host "Activating virtual environment..."
.\$venvName\Scripts\Activate.ps1
Write-Host "Installing dependencies from requirements.txt..."
pip install -r requirements.txt
Write-Host "Applying Django migrations..."
python manage.py migrate
Write-Host "Starting Django dev server on port $port..."
python manage.py runserver 0.0.0.0:$port
