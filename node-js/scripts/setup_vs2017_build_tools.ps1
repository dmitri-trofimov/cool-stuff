# Installs Visual Studio Build Tools 2017 to be able to build Node.JS native modules

$ErrorActionPreference = "Stop"
$ProgressPreference = 'SilentlyContinue'

Write-Output "Installing Visual Studio 2017 build tools"

$installerFilePath = "$env:TEMP/msvs2017_buildtools.exe"
$shouldDownload = $true

Write-Output "Checking if download is necessary..."
if (Test-Path $installerFilePath) {
    Write-Output "The file '$installerFilePath' already exists. Skipping download."
    $shouldDownload = $false
}

if ($shouldDownload) {
    Write-Output "Downloading installer..."
    Invoke-WebRequest `
        -Uri "https://aka.ms/vs/15/release/vs_buildtools.exe" `
        -OutFile "$installerFilePath"
}

try {
    Write-Output "Running initial setup (step 1 of 2)..."

    $installerArguments = "--quiet --wait --norestart " ` +
        "--add Microsoft.VisualStudio.Workload.ManagedDesktopBuildTools " + `
        "--add Microsoft.VisualStudio.Wcf.BuildTools.ComponentGroup " + `
        "--add Microsoft.VisualStudio.Workload.MSBuildTools " + `
        "--add Microsoft.VisualStudio.Workload.VCTools"

    Start-Process `
        -FilePath $installerFilePath `
        -ArgumentList $installerArguments `
        -NoNewWindow -Wait

    Write-Output "Installing additional components (step 2 of 2)..."

    $installerArguments = "modify " + `
        "--installPath ""C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools"" " + `
        "--add Microsoft.VisualStudio.Component.VC.ATL " + `
        "--add Microsoft.VisualStudio.Component.VC.ATL.Spectre " + `
        "--add Microsoft.VisualStudio.Component.VC.ATLMFC " + `
        "--add Microsoft.VisualStudio.Component.VC.ATLMFC.Spectre " + `
        "--add Microsoft.VisualStudio.Component.Windows10SDK.17763 " + `
        "--add Microsoft.VisualStudio.Component.VC.Tools.14.14 " + `
        "--wait --quiet --norestart"

    Start-Process `
        -FilePath $installerFilePath `
        -ArgumentList $installerArguments `
        -NoNewWindow -Wait
}
finally {
    Write-Output "Removing the '$installerFilePath'..."
    Remove-Item $installerFilePath
}
