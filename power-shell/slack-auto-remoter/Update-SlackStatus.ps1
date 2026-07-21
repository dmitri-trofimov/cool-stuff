function Set-SlackStatus {
    param([string]$statusText, [string]$statusEmoji)

    $body = @{
        profile = @{
            status_text  = $statusText
            status_emoji = $statusEmoji
        }
    } | ConvertTo-Json -Depth 3

    $headers = @{
        "Authorization" = "Bearer $TOKEN"
        "Content-Type"  = "application/json; charset=utf-8"
    }

    try {
        $response = Invoke-RestMethod -Uri "https://slack.com/api/users.profile.set" `
                                      -Method Post `
                                      -Headers $headers `
                                      -Body $body

        if ($response.ok) {
            Write-Host "Slack status updated successfully."
        } else {
            Write-Host "Slack API error: $($response.error)"
        }
    } catch {
        Write-Host "Request failed: $_"
    }
}

# Configuration
$TOKEN = $env:SLACK_AUTO_REMOTER_TOKEN
$CORPORATE_SSIDS = $env:SLACK_AUTO_REMOTER_SSIDS -split "," | ForEach-Object { $_.Trim() }

$STATUS_TEXT = "Working remotely"
$STATUS_EMOJI = ":house_with_garden:"

# Get current Wi-Fi SSID
$wlanOutput = netsh wlan show interfaces 2>$null
$ssidLine = $wlanOutput | Select-String -Pattern "^\s+SSID\s+:\s+(.+)" | Select-Object -First 1

$currentSsid = if ($ssidLine -and $ssidLine.Matches.Count -gt 0) {
    $ssidLine.Matches[0].Groups[1].Value.Trim()
} else {
    $null
}

if (-not $currentSsid) {
    Write-Host "No active Wi-Fi connection detected. Assuming remote."
    Set-SlackStatus -statusText $STATUS_TEXT -statusEmoji $STATUS_EMOJI
    exit
}

Write-Host "Current SSID: $currentSsid"

$onCorporateNetwork = $CORPORATE_SSIDS -contains $currentSsid

if ($onCorporateNetwork) {
    Write-Host "Connected to corporate Wi-Fi. Clearing remote status."
    Set-SlackStatus -statusText "" -statusEmoji ""
} else {
    Write-Host "Not on corporate Wi-Fi. Setting remote status."
    Set-SlackStatus -statusText $STATUS_TEXT -statusEmoji $STATUS_EMOJI
}
