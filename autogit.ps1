# Ruta de tu proyecto
$repo = "C:\Users\SupérateSantiago\Fynder\Fynder-2.0"

Set-Location $repo

Write-Host "Auto Git iniciado..."
Write-Host "Presiona Ctrl + C para detenerlo."

while ($true) {

    $status = git status --porcelain

    if ($status) {
        Write-Host "Cambios detectados..."

        git add .

        $fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

        git commit -m "Auto guardado $fecha"

        git push

        Write-Host "Cambios subidos a GitHub."
    }

    Start-Sleep -Seconds 30
}