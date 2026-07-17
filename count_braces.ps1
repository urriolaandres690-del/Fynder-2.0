$content = [System.IO.File]::ReadAllText('c:\Users\SupérateSantiago\Fynder\Fynder-3.0\pages\mensajes\mensajes.js')
$o = 0; $c = 0
foreach ($ch in $content.ToCharArray()) {
    if ($ch -eq '{') { $o++ }
    elseif ($ch -eq '}') { $c++ }
}
Write-Host "Abiertas: $o  Cerradas: $c  Diferencia: $($o - $c)"
