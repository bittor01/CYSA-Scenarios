scenarios.push({
    id: "ir-scenario-2026-privilege-escalation",
    title: "Operation Apex: Privilege Escalation",
    description: "Suspicious execution of administrative system commands on a non-IT workstation following a low-severity malware detection.",
    logs: {
        proxy: [
            "2026-05-29T14:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T15:00:10Z - IP: 192.168.10.22 - URL: https://legit-tools.com/downloads/processhacker.zip - Action: Allowed - Category: IT-Tools - Bytes: 2500000",
            "2026-05-29T15:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T15:20:00Z - IP: 192.168.10.22 - URL: https://external-c2-panel.top/api/v1/heartbeat - Action: Allowed - Category: Uncategorized - Bytes: 350"
        ],
        email: [
            "2026-05-29T14:30:00Z - Inbound - From: newsletters@techcrunch.com - To: tturner@company.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T14:45:00Z - Inbound - From: alerts@security-vendor.com - To: it-team@company.com - Subject: Notice: Potentially Unwanted Program (PUP) detected on WKSTN-12 - Status: Delivered",
            "2026-05-29T15:05:12Z - Outbound - From: tturner@company.com - To: candidate-external@jobmail.com - Subject: Interview Schedule - Status: Sent"
        ],
        file_server: [
            "2026-05-29T14:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T15:15:00Z - Share Name: \\\\FILE-SRV-01\\C$ - Access Request: Allowed - User: COMPANY\\tturner (via Escalated Token)",
            "2026-05-29T15:25:45Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T15:05:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: explorer.exe spawned cmd.exe",
            "2026-05-29T15:05:10Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned whoami /priv",
            "2026-05-29T15:05:15Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned getsystem.exe",
            "2026-05-29T15:05:20Z - WKSTN-12 (192.168.10.22) - EventID: 4672 - Special Privileges Assigned to New Logon - User: SYSTEM - Privileges: SeDebugPrivilege, SeTcbPrivilege, SeBackupPrivilege",
            "2026-05-29T15:10:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned mimikatz.exe sekurlsa::logonpasswords"
        ],
        auth_logs: [
            "2026-05-29T08:30:00Z - WKSTN-12 (192.168.10.22) - EventID: 4624 - Successful Logon - User: COMPANY\\tturner",
            "2026-05-29T08:45:10Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T15:05:20Z - WKSTN-12 (192.168.10.22) - EventID: 4624 - Successful Logon - User: SYSTEM - Logon Type: 5 (Service)"
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
        principle: {
            label: "What CySA+ principle is demonstrated by the assignment of SeDebugPrivilege to the SYSTEM user context?",
            type: "select",
            options: [
                "Lateral Movement",
                "Privilege Escalation",
                "Reconnaissance",
                "Data Exfiltration"
            ],
            correct: "Privilege Escalation"
        }
    },
    principles: ["Privilege Escalation", "Unauthorized Privilege Use", "Beaconing / Command & Control"],
    explanation: "The incident began with a low-severity alert for a Potentially Unwanted Program (PUP) on WKSTN-12. Upon investigation, endpoint logs show user 'tturner' executing 'whoami /priv' to inspect their current privileges, followed by 'getsystem.exe' to escalate to SYSTEM privileges. Windows Event ID 4672 confirms the successful assignment of sensitive privileges (SeDebugPrivilege, etc.). The attacker then proceeded to run 'mimikatz.exe' to harvest credentials and established a persistent C2 heartbeat to 'external-c2-panel.top' at 15:20:00Z. This shows a transition from a local exploit to an active command-and-control session."
});
