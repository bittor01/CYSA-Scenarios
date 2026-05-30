scenarios.push({
    id: "ir-scenario-2026-phishing-macro",
    title: "Operation Invoice Trap: Macro-enabled Phishing",
    description: "Malicious process execution detected on a finance workstation following the opening of a macro-enabled document from an external source.",
    logs: {
        proxy: [
            "2026-05-29T09:12:45Z - IP: 192.168.10.12 - URL: https://update-services.top/api/v2/config - Status: 200 - Bytes: 1024",
            "2026-05-29T09:13:45Z - IP: 192.168.10.12 - URL: https://update-services.top/api/v2/config - Status: 200 - Bytes: 1024",
            "2026-05-29T09:14:45Z - IP: 192.168.10.12 - URL: https://update-services.top/api/v2/config - Status: 200 - Bytes: 1024"
        ],
        email: [
            "2026-05-29T09:00:10Z - Inbound - From: billing@vendor-corp.net - To: fsmith@company.com - Subject: URGENT: Outstanding Invoice Q2 - Attachment: Invoice_Q2_Final.docm - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T09:05:00Z - Share Name: \\\\FILE-SRV-01\\Finance - Access Request: Allowed - User: COMPANY\\fsmith"
        ],
        workstations: [
            "2026-05-29T09:10:05Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: winword.exe spawned - Command: \"C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\" /n \"C:\\Users\\fsmith\\Downloads\\Invoice_Q2_Final.docm\"",
            "2026-05-29T09:10:30Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: winword.exe spawned cmd.exe - Command: cmd.exe /c \"powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -EncodedCommand SQBFAFgAKABOAGUAdwAtAE8AYgBqAGUAYwB0ACAA...\""
        ],
        auth_logs: [
            "2026-05-29T08:30:00Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Logon - User: COMPANY\\fsmith"
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
    explanation: "User 'fsmith' received an external phishing email containing a macro-enabled Word document ('Invoice_Q2_Final.docm'). Upon opening the document and likely enabling content, the document's embedded VBA macro executed at 09:10:30Z, which is confirmed by the anomalous parent-child process relationship of 'winword.exe' spawning 'cmd.exe' and an obfuscated PowerShell session. This PowerShell session then established a 60-second C2 beacon to 'update-services.top'. This is a textbook example of a macro-based phishing attack aimed at establishing a foothold."
});
