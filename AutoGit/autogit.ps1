Clear-Host

$config = Get-Content ".\config.json" | ConvertFrom-Json

Set-Location $config.Repository

function Write-Log($texto){

    $hora = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    Add-Content $config.LogFile "[$hora] $texto"
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "         AutoGit" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Repositorio :" $config.Repository
Write-Host "Rama        :" $config.Branch
Write-Host ""

Write-Host "Esperando cambios..."
Write-Host ""

while($true){

    $status = git status --porcelain

    if($status){

        Write-Host ""
        Write-Host "Cambios detectados." -ForegroundColor Yellow

        Start-Sleep -Seconds $config.DelaySeconds

        git add .

        $fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

        $mensaje = "$($config.CommitPrefix) $fecha"

        git commit -m $mensaje

        if($LASTEXITCODE -eq 0){

            Write-Host "Commit realizado." -ForegroundColor Green

            Write-Log "Commit -> $mensaje"

            git push

            if($LASTEXITCODE -eq 0){

                Write-Host "Push realizado correctamente." -ForegroundColor Green

                Write-Log "Push correcto"

            }
            else{

                Write-Host "Error al hacer Push." -ForegroundColor Red

                Write-Log "Push fallido"

                if($config.RetryPush){

                    Write-Host "Reintentando en $($config.RetryInterval) segundos..."

                    Start-Sleep -Seconds $config.RetryInterval

                    git push

                }

            }

        }

        Write-Host ""
        Write-Host "Esperando cambios..."
        Write-Host ""

    }

    Start-Sleep -Milliseconds 700

}