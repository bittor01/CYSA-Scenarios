scenarios.push({
    id: "ir-scenario-2026-privilege-escalation",
    title: "Operation Apex: Privilege Escalation",
    description: "Suspicious execution of administrative system commands on a non-IT workstation followed by a sudden cessation of local security logging.",
    logs: {
        proxy: [
            "2026-05-29T14:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T14:55:05Z - IP: 192.168.10.22 - URL: http://utility-zone.example.com/files/system-optimizer.zip - Action: Allowed - Category: Uncategorized - Bytes: 2500000",
            "2026-05-29T15:00:10Z - IP: 192.168.10.22 - URL: https://legit-tools.example.com/downloads/processhacker.zip - Action: Allowed - Category: IT-Tools - Bytes: 2500000",
            "2026-05-29T15:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T15:20:00Z - IP: 192.168.10.22 - URL: https://external-c2-panel.example.top/api/v1/heartbeat - Action: Allowed - Category: Uncategorized - Bytes: 350",
            "2026-05-29T15:30:15Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Bytes: 8800"
        ],
        email: [
            "2026-05-29T14:30:00Z - Inbound - From: notifications@slack.com - To: tturner@example.com - Subject: Direct Message from 'IT_Global' - Status: Delivered",
            "2026-05-29T14:45:00Z - Inbound - From: alerts@security-vendor.example.com - To: it-team@example.com - Subject: Notice: Potentially Unwanted Program (PUP) detected on WKSTN-12 - Status: Delivered",
            "2026-05-29T14:50:00Z - Inbound - From: support@utility-zone.example.com - To: tturner@example.com - Subject: Your download is ready: System Optimizer - Status: Delivered",
            "2026-05-29T15:05:12Z - Outbound - From: tturner@example.com - To: candidate-external@jobmail.example.com - Subject: Interview Schedule - Status: Sent"
        ],
        file_server: [
            "2026-05-29T14:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T15:10:00Z - Share Name: \\\\FILE-SRV-01\\C$ - Access Request: Denied - User: COMPANY\\tturner - Source IP: 192.168.10.22",
            "2026-05-29T15:15:00Z - Share Name: \\\\FILE-SRV-01\\C$ - Access Request: Allowed - User: COMPANY\\tturner (via Escalated Token)",
            "2026-05-29T15:20:45Z - Object Accessed: \\\\FILE-SRV-01\\Public\\IT_Manuals\\Backup_Procedures.pdf - Accesses: ReadData - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T14:58:22Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: chrome.exe spawned system-optimizer.exe",
            "2026-05-29T15:05:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: system-optimizer.exe spawned cmd.exe",
            "2026-05-29T15:05:10Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned whoami /priv",
            "2026-05-29T15:05:15Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned getsystem.exe",
            "2026-05-29T15:10:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned mimikatz.exe sekurlsa::logonpasswords",
            "2026-05-29T15:12:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned wevtutil cl Security",
            "2026-05-29T15:12:05Z - WKSTN-12 (192.168.10.22) - EventID: 1102 - The audit log was cleared. - User: SYSTEM",
            "2026-05-29T15:15:30Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T15:30:00Z - WKSTN-12 (192.168.10.22) - [NO FURTHER LOCAL LOGS RECEIVED FROM THIS ASSET]"
        ],
        auth_logs: [
            "2026-05-29T08:30:00Z - WKSTN-12 (192.168.10.22) - EventID: 4624 - Successful Logon - User: COMPANY\\tturner",
            "2026-05-29T08:45:10Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T15:05:20Z - WKSTN-12 (192.168.10.22) - EventID: 4624 - Successful Logon - User: SYSTEM - Logon Type: 5 (Service)",
            "2026-05-29T15:05:20Z - WKSTN-12 (192.168.10.22) - EventID: 4672 - Special Privileges Assigned to New Logon - User: SYSTEM - Privileges: SeDebugPrivilege, SeTcbPrivilege, SeBackupPrivilege",
            "2026-05-29T22:30:12Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial infection vector that led to the compromise of WKSTN-12?",
            type: "select",
            options: [
                "SQL Injection on the corporate portal",
                "Social Engineering/Phishing leading to a malicious tool download",
                "Brute force attack on the RDP gateway",
                "Zero-day exploit in the Chrome browser"
            ],
            correct: "Social Engineering/Phishing leading to a malicious tool download"
        },
        action: {
            label: "Which process relationship on WKSTN-12 confirms the escalation of privileges?",
            type: "select",
            options: [
                "chrome.exe spawning system-optimizer.exe",
                "system-optimizer.exe spawning cmd.exe followed by getsystem.exe",
                "explorer.exe spawning slack.exe",
                "outlook.exe spawning chrome.exe"
            ],
            correct: "system-optimizer.exe spawning cmd.exe followed by getsystem.exe"
        },
        anti_forensics: {
            label: "Which Windows event confirmed the attacker's attempt at anti-forensics?",
            type: "select",
            options: [
                "Event ID 1102 and 'wevtutil cl Security'",
                "Event ID 4624 and 'net user admin /add'",
                "Event ID 4688 and 'taskkill /f /im explorer.exe'",
                "Event ID 4720 and 'del System.evtx'"
            ],
            correct: "Event ID 1102 and 'wevtutil cl Security'"
        }
    },
    principles: [
        "Privilege Escalation", 
        "Unauthorized Privilege Use", 
        "Obfuscation / Encryption", 
        "Phishing / Social Engineering"
    ],
    explanation: "The incident began with a social engineering lure. User 'tturner' received a Slack message from a spoofed 'IT_Global' account directing them to a 'System Optimizer' tool. After downloading and running the tool from an unclassified site, the malware (system-optimizer.exe) spawned a shell and executed 'getsystem.exe' to escalate to SYSTEM privileges. Windows Event ID 4672 and 4624 (SYSTEM) confirm this. The attacker then cleared the Security logs via 'wevtutil' to hide their subsequent actions (mimikatz, lateral movement attempts). Benign noise includes standard marketing activity on WKSTN-01."
});