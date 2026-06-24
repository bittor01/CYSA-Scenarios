scenarios.push({
    id: "ir-scenario-2026-anti-forensics",
    title: "Operation Ghost Walk: Anti-Forensics",
    description: "System logs show evidence of manual log tampering and service disabling following a high-severity privilege escalation alert on a domain controller.",
    logs: {
        proxy: [
            "2026-06-06T09:45:12Z - IP: 192.168.10.10 - URL: https://github.com/company-org/admin-scripts - Action: Allowed - Category: IT/Development - Bytes: 15320",
            "2026-06-06T09:55:05Z - IP: 192.168.10.33 - URL: https://outlook.office.com/mapi - Action: Allowed - Category: Business/Collaboration - Bytes: 8400",
            "2026-06-06T10:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 3100",
            "2026-06-06T10:18:00Z - IP: 192.168.10.5 - URL: http://uncategorized-drop.example.com/payloads/priv_esc.exe - Action: Allowed - Category: Uncategorized - Bytes: 254000",
            "2026-06-06T10:28:15Z - IP: 192.168.10.33 - URL: https://canva.example.com/design - Action: Allowed - Category: Media/Arts - Bytes: 1500000",
            "2026-06-06T10:35:00Z - IP: 192.168.10.10 - URL: https://stackoverflow.com/questions - Action: Allowed - Category: IT/Development - Bytes: 12450",
            "2026-06-06T10:40:22Z - IP: 192.168.10.33 - URL: https://teams.microsoft.com - Action: Allowed - Category: Business/Collaboration - Bytes: 8900"
        ],
        email: [
            "2026-06-06T09:30:00Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: Weekly IT Digest - Status: Delivered",
            "2026-06-06T10:05:12Z - Internal - From: hr-updates@company.com - To: employee-all@company.com - Subject: Reminder: Open Enrollment - Status: Delivered",
            "2026-06-06T10:25:00Z - Internal - From: alert-daemon@siem.local - To: soc-team@company.com - Subject: [WARNING] Telemetry Agent Offline: DC-01 - Status: Delivered",
            "2026-06-06T10:42:00Z - Outbound - From: mrogers@company.com - To: benefits@external-vendor.com - Subject: Enrollment Roster Q3 - Status: Sent"
        ],
        file_server: [
            "2026-06-06T09:50:15Z - Share Name: \\\\FILE-SRV-01\\IT_Admin - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-06-06T09:52:00Z - Object Accessed: \\\\FILE-SRV-01\\IT_Admin\\Scripts\\AD_Audit_Daily.ps1 - Accesses: ReadData - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-06-06T10:15:30Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 192.168.10.33 - User: COMPANY\\mrogers",
            "2026-06-06T10:18:45Z - Object Accessed: \\\\FILE-SRV-01\\HR\\Policies\\Code_of_Conduct_2026.pdf - Accesses: ReadData - Source IP: 192.168.10.33 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-06-06T09:55:30Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned powershell.exe -File \"\\\\FILE-SRV-01\\IT_Admin\\Scripts\\AD_Audit_Daily.ps1\"",
            "2026-06-06T10:19:10Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe",
            "2026-06-06T10:20:05Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: explorer.exe spawned priv_esc.exe",
            "2026-06-06T10:20:10Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: priv_esc.exe spawned cmd.exe (SYSTEM privileges obtained)",
            "2026-06-06T10:21:00Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: cmd.exe spawned wevtutil.exe cl Security",
            "2026-06-06T10:21:05Z - DC-01 (192.168.10.5) - EventID: 1102 - The audit log was cleared. - User: SYSTEM",
            "2026-06-06T10:22:15Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: cmd.exe spawned net.exe stop \"WazuhSvc\"",
            "2026-06-06T10:22:20Z - DC-01 (192.168.10.5) - EventID: 7036 - Service Status Change: The WazuhSvc service entered the stopped state.",
            "2026-06-06T10:25:00Z - DC-02 (192.168.10.6) - EventID: 7036 - Service Status Change: The Windows Update service entered the running state.",
            "2026-06-06T10:30:00Z - DC-01 (192.168.10.5) - EventID: 4688 - Process Created: cmd.exe spawned ntdsutil.exe \"ac i ntds\" \"ifm\" \"create full C:\\Windows\\Temp\\NTDS\" q q",
            "2026-06-06T10:45:00Z - WKSTN-33 (192.168.10.33) - EventID: 4800 - Workstation Locked - User: COMPANY\\mrogers"
        ],
        auth_logs: [
            "2026-06-06T09:40:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
            "2026-06-06T09:50:00Z - WKSTN-33 (192.168.10.33) - EventID: 4624 - Successful Logon - User: COMPANY\\mrogers - Logon Type: 2 (Interactive)",
            "2026-06-06T10:15:00Z - DC-01 (192.168.10.5) - EventID: 4624 - Successful Logon - User: COMPANY\\bjohnson - Logon Type: 10 (RemoteInteractive/RDP)",
            "2026-06-06T10:20:10Z - DC-01 (192.168.10.5) - EventID: 4624 - Successful Logon - User: SYSTEM - Logon Type: 5 (Service)",
            "2026-06-06T10:20:10Z - DC-01 (192.168.10.5) - EventID: 4672 - Special Privileges Assigned to New Logon - User: SYSTEM - Privileges: SeDebugPrivilege, SeTcbPrivilege"
        ]
    },
    questions: {
        vector: {
            label: "What initial action preceded the anti-forensics activity on DC-01?",
            type: "select",
            options: [
                "A lateral movement pivot from WKSTN-01 using PsExec",
                "A web proxy download of an unclassified executable followed by privilege escalation",
                "An automated vulnerability scanner triggering a false positive",
                "A Pass-the-Hash attack originating from the secondary domain controller"
            ],
            correct: "A web proxy download of an unclassified executable followed by privilege escalation"
        },
        anti_forensics: {
            label: "Which sequence of events provides the most definitive proof of deliberate anti-forensics evasion?",
            type: "select",
            options: [
                "explorer.exe spawning powershell.exe to execute AD_Audit_Daily.ps1",
                "The Windows Update service entering the running state on DC-02",
                "The execution of 'wevtutil cl Security' immediately followed by Event ID 1102 and the stopping of the monitoring service",
                "A network logon (Type 10) by bjohnson followed immediately by a lock screen event"
            ],
            correct: "The execution of 'wevtutil cl Security' immediately followed by Event ID 1102 and the stopping of the monitoring service"
        },
        objective: {
            label: "What was the attacker's primary objective immediately after blinding the local logging mechanisms?",
            type: "select",
            options: [
                "Encrypting the local file shares with a ransomware payload",
                "Exfiltrating data via an overt HTTPS connection to a personal cloud drive",
                "Dumping the Active Directory database using ntdsutil.exe",
                "Establishing a persistent C2 beacon over DNS TXT queries"
            ],
            correct: "Dumping the Active Directory database using ntdsutil.exe"
        }
    },
    principles: [
        "Privilege Escalation",
        "Unauthorized Privilege Use"
    ],
    explanation: "At 10:15:00Z, an attacker accessed the primary Domain Controller (DC-01) via RDP using compromised credentials for 'bjohnson'. The attacker then used Chrome to download a malicious binary ('priv_esc.exe') from an unclassified external domain. Executing this file at 10:20:05Z granted the attacker 'SYSTEM' level privileges (EventID 4672). Realizing their actions were highly visible, the attacker performed immediate manual anti-forensics: running 'wevtutil cl Security' to wipe the local security logs (triggering the critical Event ID 1102) and deliberately stopping the WazuhSvc telemetry agent via 'net stop'. This action triggered a SIEM warning email at 10:25:00Z regarding the offline agent. With the host's logging mechanisms blinded, the attacker safely executed 'ntdsutil.exe' at 10:30:00Z to dump the Active Directory database (NTDS.dit) for offline credential extraction. Routine IT script execution by 'asmith' and background service updates on DC-02 provided standard operational noise."
});