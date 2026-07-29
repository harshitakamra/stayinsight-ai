$path = 'c:\Users\Dell\Downloads\AI_FSD_Week9_Modules-SIP26.docx'
if (-not (Test-Path $path)) {
    Write-Output 'file not found'
    exit 1
}
$zip = [System.IO.Compression.ZipFile]::OpenRead($path)
try {
    $entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
    if (-not $entry) {
        Write-Output 'document.xml not found'
        exit 1
    }
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xml = $reader.ReadToEnd()
    $reader.Dispose()
    $stream.Dispose()
    $xml = [System.Text.RegularExpressions.Regex]::Replace($xml, '<[^>]+>', ' ')
    $xml = [System.Text.RegularExpressions.Regex]::Replace($xml, '\s+', ' ')
    Write-Output $xml.Substring(0, [Math]::Min(20000, $xml.Length))
}
finally {
    $zip.Dispose()
}
