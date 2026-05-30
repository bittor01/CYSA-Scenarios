scenarios.push({
    id: "ir-scenario-2026-anti-forensics",
    title: "Operation Ghost Walk: Anti-Forensics",
    description: "System logs show evidence of manual log tampering and service disabling following a high-severity privilege escalation alert on a domain controller.",
    logs: {
        proxy: [
            "2026-05-29T11:00:05Z - IP: 192.168.10.15 - URL: https://identity.okta.com/oauth2 - Status: 200",
            "2026-05-29T11:05:30Z - IP: 192.168.10.15 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T11:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T11:15:22Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12450"
        ],
        email: [
            "2026-05-29T10:45:00Z - Inbound - From: alerts@security-center.example.com - To: soc@example.com - Subject: [URGENT] Privilege Escalation Detected on DC-01 - Status: Delivered",
            "2026-05-29T11:00:15Z - Inbound - From: notifications@slack.com - To: asmith@example.com - Subject: You have unread messages - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T10:30:15Z - Share Name: \\\\DC-01\\C$ - Access Request: Allowed - User: COMPANY\\domain-admin - Source IP: 192.168.10.15",
            "2026-05-29T10:31:02Z - Object Accessed: \\\\DC-01\\C$\\Windows\\System32\\config\\SECURITY - Accesses: ReadData - User: COMPANY\\domain-admin"
        ],
        workstations: [
            "2026-05-29T10:35:00Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: cmd.exe spawned wevtutil.exe cl Security",
            "2026-05-29T10:35:05Z - DC-01 (192.168.10.5) - EventID: 1102 - The audit log was cleared. - User: domain-admin",
            "2026-05-29T10:36:00Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: cmd.exe spawned sc.exe stop EventLog",
            "2026-05-29T10:36:05Z - DC-01 (192.168.10.5) - EventID: 7036 - The Windows Event Log service entered the stopped state.",
            "2026-05-29T10:37:00Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: cmd.exe spawned del C:\\Windows\\System32\\winevt\\Logs\\System.evtx",
            "2026-05-29T10:40:12Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T11:00:00Z - DC-01 (192.168.10.5) - [NO LOGS RECEIVED AFTER SERVICE STOP]"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T10:30:00Z - DC-01 (192.168.10.5) - EventID: 4624 - Successful Logon - User: COMPANY\\domain-admin - Logon Type: 3 (Network) - Source: 192.168.10.15",
            "2026-05-29T10:34:00Z - DC-01 (192.168.10.5) - EventID: 4672 - Special Privileges Assigned - User: domain-admin"
        ]
    },
    questions: {
        anti_forensics: {
            label: "Which specific tool and action confirmed the attacker's attempt to clear the security audit trail?",
            type: "select",
            options: [
                "wevtutil cl Security",
                "sc stop EventLog",
                "del System.evtx",
                "All of the above"
            ],
            correct: "All of the above"
        },
        impact: {
            label: "What is the primary consequence of the 'sc stop EventLog' command in a forensic context?",
            type: "select",
            options: [
                "It deletes all existing logs immediately",
                "It prevents the system from recording any new events in the event viewer",
                "It encrypts the log files to prevent reading",
                "It notifies the SOC that an attack is in progress"
            ],
            correct: "It prevents the system from recording any new events in the event viewer"
        },
        origin: {
            label: "From which source IP did the compromised domain-admin session originate?",
            type: "select",
            options: [
                "192.168.10.10",
                "192.168.10.15",
                "192.168.10.5",
                "192.168.10.12"
            ],
            correct: "192.168.10.15"
        }
    },
    principles: ["Log Clearing / Anti-Forensics", "Unauthorized Privilege Use", "Privilege Escalation"],
    explanation: "After gaining domain administrator privileges from WKSTN-05 (192.168.10.15), the attacker pivoted to the domain controller (DC-01). To evade detection and complicate forensic analysis, the attacker executed a series of anti-forensic commands: clearing the Security log with 'wevtutil', stopping the Event Log service itself with 'sc stop', and even attempting to manually delete the System log file. The 'smoking gun' is Event ID 1102 (Log Cleared) followed immediately by the service stop event. This scenario demonstrates why centralized logging is critical, as local logs can be tampered with by an administrative-level attacker."
});
