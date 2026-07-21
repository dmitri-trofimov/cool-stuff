# Slack Auto-Remoter

Automatically update your Slack status to "Working remotely" based on your Wi-Fi network connection.

## Overview

This project sets up a Windows Scheduled Task that runs every 5 minutes to check your Wi-Fi SSID and automatically sets your Slack status when you're away from the corporate network.

## Prerequisites

Before running the installation script, you must complete these one-time setup steps:

### 1. Create a Slack Token

- Go to https://api.slack.com/apps
- Click **"Create New App"** → **"From scratch"**
- Name your app (e.g., "Auto Remoter") and select your workspace
- In the left sidebar, go to **"OAuth & Permissions"**
- Under **"User Token Scopes"**, add: `users.profile:write`
- Click **"Install to Workspace"** at the top
- Copy your **"User OAuth Token"** (starts with `xoxp-`)

### 2. Set Environment Variables

1. Press **Win+R**, type `sysdm.cpl`, and press Enter
2. Go to the **"Advanced"** tab → **"Environment Variables..."**
3. In the **"User variables"** section, click **"New"**
4. Add these two variables:

   | Variable Name | Value |
   |---|---|
   | `SLACK_AUTO_REMOTER_TOKEN` | Your Slack User OAuth Token (from step 1) |
   | `SLACK_AUTO_REMOTER_SSIDS` | Comma-separated list of office Wi-Fi SSIDs (e.g., `YourCorporateWiFi, YourCorporateGuest`) |

5. Click **"OK"** twice, then restart or log out/in for changes to take effect

### 3. Verify Environment Variables

Open a new PowerShell window and run:

```powershell
$env:SLACK_AUTO_REMOTER_TOKEN
$env:SLACK_AUTO_REMOTER_SSIDS
```

Both variables should display their values.

## Installation

Once prerequisites are complete, run the installation script:

```powershell
.\Install-SlackStatusTask.ps1
```

The script will:
- Create a Windows Scheduled Task named "Slack Remote Status"
- Configure it to run `Update-SlackStatus.ps1` every 5 minutes
- Set it to run with limited privileges

## Usage

### Test the Task Immediately

```powershell
Start-ScheduledTask -TaskName "Slack Remote Status"
```

### Remove the Task

```powershell
Unregister-ScheduledTask -TaskName "Slack Remote Status" -Confirm:$false
```

## Files

- **Install-SlackStatusTask.ps1** — Installation script that creates the scheduled task
- **Update-SlackStatus.ps1** — Main script that checks Wi-Fi and updates Slack status (runs every 5 minutes)

## How It Works

1. Every 5 minutes, the scheduled task executes `Update-SlackStatus.ps1`
2. The script checks your current Wi-Fi network SSID
3. If the SSID is NOT in your `SLACK_AUTO_REMOTER_SSIDS` list, it sets your Slack status to "Working remotely"
4. If the SSID matches your office network, it clears the remote status

## Troubleshooting

- **Environment variables not found:** Restart PowerShell or your computer after setting variables
- **Script not found error:** Update the script path in `Install-SlackStatusTask.ps1` if your documents folder is in a different location
- **Permission denied:** Run PowerShell as Administrator

## License

See LICENSE file in the parent directory.
