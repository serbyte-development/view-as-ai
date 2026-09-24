$ErrorActionPreference = "Stop"

$repo = "Serbyte-Development/view-as-ai"
$arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString().ToLowerInvariant()
switch ($arch) {
    "x64" { $asset = "view-as-ai-windows-x64.exe" }
    "arm64" { $asset = "view-as-ai-windows-arm64.exe" }
    default { throw "view-as-ai: unsupported architecture: $arch" }
}

$version = $env:VIEW_AS_AI_VERSION
if ([string]::IsNullOrWhiteSpace($version)) {
    $base = "https://github.com/$repo/releases/latest/download"
} else {
    if (-not $version.StartsWith("v")) { $version = "v$version" }
    $base = "https://github.com/$repo/releases/download/$version"
}

$temp = Join-Path ([System.IO.Path]::GetTempPath()) ("view-as-ai-" + [System.Guid]::NewGuid())
New-Item -ItemType Directory -Path $temp | Out-Null

try {
    $binary = Join-Path $temp $asset
    $checksums = Join-Path $temp "checksums.txt"
    Invoke-WebRequest "$base/$asset" -OutFile $binary
    Invoke-WebRequest "$base/checksums.txt" -OutFile $checksums

    $line = Get-Content $checksums | Where-Object { $_ -match "\s$([regex]::Escape($asset))$" } | Select-Object -First 1
    if (-not $line) { throw "view-as-ai: checksum entry missing for $asset" }
    $expected = ($line -split "\s+")[0].ToLowerInvariant()
    $actual = (Get-FileHash -Algorithm SHA256 $binary).Hash.ToLowerInvariant()
    if ($actual -ne $expected) { throw "view-as-ai: checksum verification failed" }

    $installDir = if ($env:VIEW_AS_AI_INSTALL_DIR) {
        $env:VIEW_AS_AI_INSTALL_DIR
    } else {
        Join-Path $env:LOCALAPPDATA "Programs\ViewAsAI"
    }
    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
    $target = Join-Path $installDir "view-as-ai.exe"
    Copy-Item -Force $binary $target

    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $parts = if ($userPath) { $userPath -split ";" } else { @() }
    if ($parts -notcontains $installDir) {
        $newPath = if ($userPath) { "$userPath;$installDir" } else { $installDir }
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        $env:Path = "$env:Path;$installDir"
        Write-Output "Added $installDir to your user PATH. Open a new terminal if needed."
    }

    Write-Output "Installed view-as-ai to $target"
} finally {
    Remove-Item -Recurse -Force $temp -ErrorAction SilentlyContinue
}
