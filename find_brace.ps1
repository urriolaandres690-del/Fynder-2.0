$lines = Get-Content -Path ".\Fynder-3.0\pages\mensajes\mensajes.js" -Encoding UTF8
$depth = 0
$lastOpenLine = 0
$lastOpenDepth = 0
$lineNum = 0

foreach ($line in $lines) {
    $lineNum++
    foreach ($ch in $line.ToCharArray()) {
        if ($ch -eq '{') {
            $depth++
            $lastOpenLine = $lineNum
        }
        elseif ($ch -eq '}') {
            $depth--
        }
    }
    # Track when we go from 0 to positive (start of a top-level block)
}

Write-Host "Profundidad final: $depth"
Write-Host "Total de lineas: $lineNum"

# Now find what's unclosed - track each opening and closing
$depth = 0
$stack = @()
$lineNum = 0
foreach ($line in $lines) {
    $lineNum++
    $col = 0
    foreach ($ch in $line.ToCharArray()) {
        $col++
        if ($ch -eq '{') {
            $depth++
            $stack += ,@($lineNum, $col, $depth)
        }
        elseif ($ch -eq '}') {
            $depth--
            # remove last item at this depth+1
            if ($stack.Count -gt 0) {
                $stack = $stack[0..($stack.Count-2)]
            }
        }
    }
}

Write-Host "Llaves sin cerrar restantes en stack: $($stack.Count)"
foreach ($item in $stack) {
    Write-Host "  Linea $($item[0]), Col $($item[1]), Profundidad $($item[2])"
}
