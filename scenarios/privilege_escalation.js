scenarios.push({
    id: "ir-scenario-2026-privilege-escalation",
    title: "Operation Apex: Privilege Escalation",
    description: "Suspicious execution of administrative system commands on a non-IT workstation followed by a sudden cessation of local security logging.",
    logs: {
        proxy: [
            "2026-05-29T14:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T15:00:10Z - IP: 192.168.10.22 - URL: https://legit-tools.example.com/downloads/processhacker.zip - Action: Allowed - Category: IT-Tools - Bytes: 2500000",
            "2026-05-29T15:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T15:20:00Z - IP: 192.168.10.22 - URL: https://external-c2-panel.example.top/api/v1/heartbeat - Action: Allowed - Category: Uncategorized - Bytes: 350",
            "2026-05-29T15:21:00Z - IP: 192.168.10.22 - URL: https://external-c2-panel.example.top/api/v1/heartbeat - Action: Allowed - Category: Uncategorized - Bytes: 350",
            "2026-05-29T15:22:00Z - IP: 192.168.10.22 - URL: https://external-c2-panel.example.top/api/v1/heartbeat - Action: Allowed - Category: Uncategorized - Bytes: 350",
            "2026-05-29T15:30:15Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Bytes: 8800"
        ],
        email: [
            "2026-05-29T14:30:00Z - Inbound - From: newsletters@techcrunch.com - To: tturner@example.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T14:45:00Z - Inbound - From: alerts@security-vendor.example.com - To: it-team@example.com - Subject: Notice: Potentially Unwanted Program (PUP) detected on WKSTN-12 - Status: Delivered",
            "2026-05-29T15:05:12Z - Outbound - From: tturner@example.com - To: candidate-external@jobmail.example.com - Subject: Interview Schedule - Status: Sent",
            "2026-05-29T15:25:00Z - Inbound - From: it-support@example.com - To: tturner@example.com - Subject: URGENT: Remote Investigation of WKSTN-12 - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T14:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T15:10:00Z - Share Name: \\\\FILE-SRV-01\\C$ - Access Request: Denied - User: COMPANY\\tturner - Source IP: 192.168.10.22",
            "2026-05-29T15:15:00Z - Share Name: \\\\FILE-SRV-01\\C$ - Access Request: Allowed - User: COMPANY\\tturner (via Escalated Token)",
            "2026-05-29T15:20:45Z - Object Accessed: \\\\FILE-SRV-01\\Public\\IT_Manuals\\Backup_Procedures.pdf - Accesses: ReadData - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T15:05:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: explorer.exe spawned cmd.exe",
            "2026-05-29T15:05:10Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned whoami /priv",
            "2026-05-29T15:05:15Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned getsystem.exe",
            "2026-05-29T15:05:20Z - WKSTN-12 (192.168.10.22) - EventID: 4672 - Special Privileges Assigned to New Logon - User: SYSTEM - Privileges: SeDebugPrivilege, SeTcbPrivilege, SeBackupPrivilege",
            "2026-05-29T15:10:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned mimikatz.exe sekurlsa::logonpasswords",
            "2026-05-29T15:12:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned wevtutil cl Security",
            "2026-05-29T15:12:05Z - WKSTN-12 (192.168.10.22) - EventID: 1102 - The audit log was cleared. - User: SYSTEM",
            "2026-05-29T15:12:10Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned wevtutil cl System",
            "2026-05-29T15:15:30Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T15:30:00Z - WKSTN-12 (192.168.10.22) - [NO FURTHER LOCAL LOGS RECEIVED FROM THIS ASSET]"
        ],
        auth_logs: [
            "2026-05-29T08:30:00Z - WKSTN-12 (192.168.10.22) - EventID: 4624 - Successful Logon - User: COMPANY\\tturner",
            "2026-05-29T08:45:10Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T15:05:20Z - WKSTN-12 (192.168.10.22) - EventID: 4624 - Successful Logon - User: SYSTEM - Logon Type: 5 (Service)",
            "2026-05-29T15:12:00Z - IdP_Auth - User: it-admin@example.com - App: SIEM Portal - Status: Success - Source: 192.168.10.55"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial indicator that triggered the investigation on WKSTN-12?",
            type: "select",
            options: [
                "A high-volume upload to a file-sharing site",
                "An external email alert from a security vendor regarding a PUP",
                "A failed RDP login attempt from an external IP",
                "A sequential IDOR enumeration on the payroll API"
            ],
            correct: "An external email alert from a security vendor regarding a PUP"
        },
        action: {
            label: "Which command-line tool was used by the attacker to attempt automated privilege escalation to SYSTEM?",
            type: "select",
            options: [
                "whoami /all",
                "getsystem.exe",
                "netstat -ano",
                "tasklist /v"
            ],
            correct: "getsystem.exe"
        },
        anti_forensics: {
            label: "Which Windows event and command confirmed the attacker's attempt at anti-forensics?",
            type: "select",
            options: [
                "Event ID 1102 and 'wevtutil cl Security'",
                "Event ID 4624 and 'net user admin /add'",
                "Event ID 4688 and 'taskkill /f /im explorer.exe'",
                "Event ID 4720 and 'del C:\\Windows\\System32\\config\\SAM'"
            ],
            correct: "Event ID 1102 and 'wevtutil cl Security'"
        }
    },
    principles: ["Privilege Escalation", "Unauthorized Privilege Use", "Log Clearing / Anti-Forensics", "Beaconing / Command & Control"],
    explanation: "The incident began with a low-severity alert for a Potentially Unwanted Program (PUP) on WKSTN-12. Upon investigation, endpoint logs show user 'tturner' executing 'whoami /priv' to inspect their current privileges, followed by 'getsystem.exe' to escalate to SYSTEM privileges. Windows Event ID 4672 confirms the successful assignment of sensitive privileges. Crucially, the attacker then attempted to hide their tracks by clearing the Security and System logs using 'wevtutil cl', which generated Event ID 1102. After this point, local logging from the host ceased, which is a major red flag for anti-forensic activity. Benign noise includes standard IT support communications and typical administrative browsing."
});
