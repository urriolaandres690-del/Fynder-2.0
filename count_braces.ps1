$content = Get-Content -Path ".\Fynder-3.0\pages\mensajes\mensajes.js" -Raw -Encoding UTF8
$o = 0; $c = 0
foreach ($ch in $content.ToCharArray()) {
    if ($ch -eq '{') { $o++ }
    elseif ($ch -eq '}') { $c++ }
}
Write-Host "Abiertas: $o  Cerradas: $c  Diferencia: $($o - $c)"
