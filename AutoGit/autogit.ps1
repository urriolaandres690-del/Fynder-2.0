Clear-Host

$Repo = Split-Path $PSScriptRoot -Parent
Set-Location $Repo

Write-Host ""
Write-Host "========================================"
Write-Host "          AutoGit iniciado"
Write-Host "========================================"
Write-Host ""
Write-Host "Repositorio: $Repo"
Write-Host ""
Write-Host "Esperando cambios..."
Write-Host ""

while ($true)
{
    $status = git status --porcelain

    if ($status)
    {
        Write-Host ""
        Write-Host "Cambios detectados..." -ForegroundColor Yellow

        Start-Sleep 5

        $status = git status --porcelain

        if ($status)
        {
            git add .

            $fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

            git commit -m "AutoSave $fecha"

            if ($LASTEXITCODE -eq 0)
            {
                Write-Host "Commit realizado."

                git pull --rebase origin main

                if ($LASTEXITCODE -eq 0)
                {
                    git push origin main

                    if ($LASTEXITCODE -eq 0)
                    {
                        Write-Host "GitHub actualizado." -ForegroundColor Green
                    }
                    else
                    {
                        Write-Host "Error haciendo Push." -ForegroundColor Red
                    }
                }
                else
                {
                    Write-Host "Error haciendo Pull." -ForegroundColor Red
                }
            }
        }

        Write-Host ""
        Write-Host "Esperando cambios..."
    }

    Start-Sleep 2
}