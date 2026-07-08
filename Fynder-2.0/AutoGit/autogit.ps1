Clear-Host

# ===== AUTO GIT =====

$Repository = Split-Path $PSScriptRoot -Parent
$Branch = "main"

Set-Location $Repository

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "          AutoGit iniciado"
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repositorio: $Repository"
Write-Host ""
Write-Host "Esperando cambios..."
Write-Host ""

while ($true)
{
    $Changes = git status --porcelain

    if (![string]::IsNullOrWhiteSpace($Changes))
    {
        Write-Host ""
        Write-Host "Cambios detectados..." -ForegroundColor Yellow

        # Esperar unos segundos por si sigues guardando archivos
        Start-Sleep -Seconds 3

        # Verificar nuevamente
        $Changes = git status --porcelain

        if (![string]::IsNullOrWhiteSpace($Changes))
        {
            git add .

            git commit -m "AutoSave $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" *> $null

            # Sincronizar con GitHub
            git pull --rebase origin $Branch *> $null

            git push origin $Branch *> $null

            if ($LASTEXITCODE -eq 0)
            {
                Write-Host "GitHub actualizado." -ForegroundColor Green
            }
            else
            {
                Write-Host "No se pudo hacer push." -ForegroundColor Red
            }

            Write-Host ""
            Write-Host "Esperando cambios..."
        }
    }

    Start-Sleep -Seconds 2
}