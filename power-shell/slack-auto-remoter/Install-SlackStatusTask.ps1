$taskName = "Slack Remote Status"
$scriptPath = "C:\Users\dmitri.trofimov\Documents\Default Project\Update-SlackStatus.ps1"

if (-not (Test-Path $scriptPath)) {
    Write-Host "ERROR: Script not found at $scriptPath"
    exit 1
}

$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "Removed existing task."
}

$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-NoProfile -WindowStyle Hidden -File `"$scriptPath`""

$trigger = New-ScheduledTaskTrigger -Once -At "00:00" -RepetitionInterval (New-TimeSpan -Minutes 5)

Register-ScheduledTask -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -RunLevel Limited `
    -Description "Updates Slack status based on Wi-Fi network every 5 minutes"

Write-Host ""
Write-Host "Task '$taskName' registered. It runs every 5 minutes."
Write-Host "To test now:  Start-ScheduledTask -TaskName '$taskName'"
Write-Host "To remove:    Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"
