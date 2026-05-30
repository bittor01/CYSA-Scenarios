scenarios.push({
        id: "ir-scenario-2026-insider-exfil",
        title: "Operation Parting Gift",
        description: "Critical data exfiltration alert triggered by a high-volume outbound upload to an unclassified file sharing host immediately following an HR change event.",
        logs: {
            proxy: [
                "2026-05-29T08:02:14Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1450",
                "2026-05-29T08:03:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 4092",
                "2026-05-29T08:15:32Z - IP: 192.168.10.83 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1410",
                "2026-05-29T08:16:45Z - IP: 192.168.10.83 - URL: https://outlook.office.com/mapi - Action: Allowed - Category: Business/Collaboration - Bytes: 9200",
                "2026-05-29T09:12:00Z - IP: 192.168.10.10 - URL: https://company.sharepoint.com/sites/Marketing/Upload - Action: Allowed - Category: Cloud Storage - Bytes: 45000000",
                "2026-05-29T09:20:00Z - IP: 192.168.10.14 - URL: https://github.com/company-org/repo - Action: Allowed - Category: IT/Development - Bytes: 15300",
                "2026-05-29T09:41:05Z - IP: 192.168.10.83 - Proto: TCP/3389 (RDP) - Dest: 192.168.10.90 - Action: Allowed - Internal Traffic",
                "2026-05-29T09:51:20Z - IP: 192.168.10.83 - URL: https://personalfileshare.example.com/api/upload - Action: Allowed - Category: Uncategorized/Personal Storage - Bytes: 88450000",
                "2026-05-29T09:58:12Z - IP: 192.168.10.14 - URL: https://stackoverflow.com - Action: Allowed - Category: IT/Development - Bytes: 8200"
            ],
            email: [
                "2026-05-29T08:00:10Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: Daily Team Sync - Status: Delivered",
                "2026-05-29T09:30:15Z - Inbound - From: hr-notifications@company.com - To: mrogers@company.com - Subject: URGENT: Confidential Separation Agreement and Transition Plan - Status: Delivered",
                "2026-05-29T09:45:00Z - Inbound - From: alerts@bamboohr.com - To: jdoe@company.com - Subject: Timesheet Approved - Status: Delivered"
            ],
            file_server: [
                "2026-05-29T08:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
                "2026-05-29T09:35:45Z - Share Name: \\\\FILE-SRV-01\\Research - Access Request: Allowed - Source IP: 192.168.10.83 - User: COMPANY\\mrogers",
                "2026-05-29T09:36:12Z - Object Accessed: \\\\FILE-SRV-01\\Research\\Patents\\NextGen_Architecture.zip - Accesses: ReadData - Source IP: 192.168.10.83 - User: COMPANY\\mrogers",
                "2026-05-29T09:55:00Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\jdoe"
            ],
            workstations: [
                "2026-05-29T09:30:20Z - WKSTN-33 (192.168.10.83) - EventID: 4801 - Workstation Unlocked - User: COMPANY\\mrogers",
                "2026-05-29T09:30:45Z - WKSTN-33 (192.168.10.83) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url https://outlook.office.com",
                '2026-05-29T09:42:15Z - DEV-SRV-02 (192.168.10.90) - EventID: 4688 - Process Created: explorer.exe spawned C:\\Program Files\\7-Zip\\7z.exe a -t7z C:\\Windows\\Temp\\engine_backup.7z C:\\Source\\Core_Engine\\',
                "2026-05-29T09:48:30Z - WKSTN-33 (192.168.10.83) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe --new-window https://personalfileshare.example.com",
                "2026-05-29T10:00:00Z - WKSTN-33 (192.168.10.83) - EventID: 4800 - Workstation Locked - User: COMPANY\\mrogers"
            ],
            auth_logs: [
                "2026-05-29T08:05:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
                "2026-05-29T08:14:50Z - IdP_Auth - User: mrogers@company.com - App: Exchange Online - AuthMethod: Password+MFA - Status: Success - Agent: Microsoft Outlook for Windows",
                "2026-05-29T08:14:55Z - WKSTN-33 (192.168.10.83) - EventID: 4624 - Successful Logon - User: COMPANY\\mrogers - Logon Type: 2 (Interactive)",
                "2026-05-29T09:41:05Z - DEV-SRV-02 (192.168.10.90) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.83 - User: COMPANY\\mrogers - Logon Type: 10 (RemoteInteractive/RDP)"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial trigger event and vector that prompted this incident?",
                type: "select",
                options: [
                    "A malicious drive-by download from an external IT blog",
                    "An internal HR termination notification sent to a disgruntled employee",
                    "A compromised software patch downloaded from a vendor site",
                    "An external phishing email harvesting domain admin passwords"
                ],
                correct: "An internal HR termination notification sent to a disgruntled employee"
            },
            origin: {
                label: "Which asset served as the primary system used to coordinate the collection and exfiltration of data?",
                type: "select",
                options: [
                    "WKSTN-01",
                    "WKSTN-04",
                    "DEV-SRV-02",
                    "WKSTN-33"
                ],
                correct: "WKSTN-33"
            },
            count: {
                label: "How many corporate assets (workstations/servers) were directly accessed or interacted with by the insider threat actor to stage data?",
                type: "number",
                correct: 3
            },
            beaconing: {
                label: "What network channel and destination were leveraged by the threat actor to exfiltrate the stolen assets?",
                type: "select",
                options: [
                    "An encrypted DNS TXT tunnel to cdn-cache-update.top",
                    "Oversized ICMP echo requests sent directly to 203.0.113.84",
                    "An overt HTTPS upload session to personalfileshare.example.com",
                    "An outbound SSH transfer to a rogue server over TCP 22"
                ],
                correct: "An overt HTTPS upload session to personalfileshare.example.com"
            },
            lateral_movement: {
                label: "Which protocol was utilized to move laterally from the primary workstation to the secondary production server?",
                type: "select",
                options: [
                    "Server Message Block (SMB) file transfer",
                    "Remote Desktop Protocol (RDP) over TCP 3389",
                    "Windows Management Instrumentation (WMI) over TCP 135",
                    "SSH console connection over TCP 22"
                ],
                correct: "Remote Desktop Protocol (RDP) over TCP 3389"
            }
        },
        principles: ["Insider Threat", "Data Exfiltration (Overt Channel)", "Lateral Movement", "Unauthorized Privilege Use"],
        explanation: "At 09:30:15Z, user 'mrogers' received a legitimate termination notice from HR. Shortly after, at 09:35:45Z, he accessed FILE-SRV-01 using standard SMB protocols to copy next-gen patent designs. Seeking source code, he laterally connected via RDP (TCP 3389) to the development server DEV-SRV-02 at 09:41:05Z, where he ran a command-line 7z.exe archive script to compress proprietary local code repositories. Returning the code package to his workstation, mrogers exfiltrated the accumulated data at 09:51:20Z via an overt HTTPS file upload to personalfileshare.example.com, generating a massive 85MB data spike. While benign marketing users also uploaded large files to SharePoint, that traffic was directed to safe corporate infrastructure, making the unclassified personal cloud server the key differentiator in this incident."
    });
