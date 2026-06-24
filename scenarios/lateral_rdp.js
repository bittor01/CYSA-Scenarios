scenarios.push({
    id: "ir-scenario-2026-lateral-rdp",
    title: "Operation Remote Step: RDP Lateral Movement",
    description: "Multiple Remote Desktop (RDP) sessions initiated from a standard workstation to internal server segments following a local credential compromise.",
    logs: {
        proxy: [
            "2026-05-29T19:56:10Z - IP: 192.168.10.14 - URL: https://git.example.com/devops/deploy - Action: Allowed - Category: Code-Repository - Bytes: 12400",
            "2026-05-29T20:02:15Z - IP: 192.168.10.10 - URL: https://canva.com/assets - Action: Allowed - Category: Media/Arts - Bytes: 852000",
            "2026-05-29T20:10:00Z - IP: 192.168.10.82 - URL: http://198.51.100.15/shell.txt - Action: Allowed - Category: Uncategorized - Bytes: 1450",
            "2026-05-29T20:15:30Z - IP: 192.168.10.33 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 3100",
            "2026-05-29T20:45:00Z - IP: 192.168.10.10 - URL: https://canva.com/design - Action: Allowed - Category: Media/Arts - Bytes: 125000",
            "2026-05-29T20:55:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Category: IT/Development - Bytes: 15300"
        ],
        email: [
            "2026-05-29T19:50:00Z - Inbound - From: notifications@slack.com - To: rjones@company.com - Subject: You have unread messages in Dev-Ops - Status: Delivered",
            "2026-05-29T20:00:10Z - Inbound - From: hr-portal@company.com - To: mrogers@company.com - Subject: Notice: Scheduled Q2 Evaluations - Status: Delivered",
            "2026-05-29T20:30:15Z - Outbound - From: mrogers@company.com - To: ceo@company.com - Subject: RE: Evaluation Guidelines - Status: Sent"
        ],
        file_server: [
            "2026-05-29T19:57:45Z - Share Name: \\\\FILE-SRV-01\\DevShare - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones",
            "2026-05-29T20:02:10Z - Object Accessed: \\\\FILE-SRV-01\\DevShare\\Templates\\deploy_baseline.sh - Accesses: ReadData - Source IP: 192.168.10.14 - User: COMPANY\\rjones",
            "2026-05-29T20:10:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.33 - User: COMPANY\\mrogers",
            "2026-05-29T20:12:00Z - Object Accessed: \\\\FILE-SRV-01\\Public\\Onboarding_Forms.zip - Accesses: ReadData - Source IP: 192.168.10.33 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T19:55:30Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned vscode.exe",
            "2026-05-29T20:10:00Z - WEB-SRV-02 (192.168.10.82) - EventID: 4688 - Process Created: w3wp.exe spawned cmd.exe /c whoami",
            "2026-05-29T20:11:15Z - WEB-SRV-02 (192.168.10.82) - EventID: 4688 - Process Created: cmd.exe spawned powershell.exe -WindowStyle Hidden -Command \"Get-Content C:\\inetpub\\wwwroot\\web.config.bak\"",
            "2026-05-29T20:20:00Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: svchost.exe (termsrv) spawned rdpshell.exe - session initiated from 192.168.10.82",
            "2026-05-29T20:25:10Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: explorer.exe spawned cmd.exe",
            "2026-05-29T20:35:12Z - DB-SRV-01 (192.168.10.85) - EventID: 4688 - Process Created: svchost.exe (termsrv) spawned rdpshell.exe - session initiated from 192.168.10.12",
            "2026-05-29T20:50:00Z - DB-SRV-01 (192.168.10.85) - EventID: 4688 - Process Created: cmd.exe spawned powershell.exe -Command \"Compress-Archive -Path D:\\MSSQL\\Backup\\Q2_Transactions.bak -DestinationPath C:\\Windows\\Temp\\db_staging.zip\""
        ],
        auth_logs: [
            "2026-05-29T19:55:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones - Logon Type: 2 (Interactive)",
            "2026-05-29T20:00:15Z - WKSTN-33 (192.168.10.33) - EventID: 4624 - Successful Logon - User: COMPANY\\mrogers - Logon Type: 2 (Interactive)",
            "2026-05-29T20:05:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
            "2026-05-29T20:20:00Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.82 - User: COMPANY\\db-admin - Logon Type: 10 (RemoteInteractive/RDP)",
            "2026-05-29T20:35:12Z - DB-SRV-01 (192.168.10.85) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.12 - User: COMPANY\\db-admin - Logon Type: 10 (RemoteInteractive/RDP)"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial access method used to breach the environment and harvest high-privilege credentials?",
            type: "select",
            options: [
                "Spear-phishing email targeting an administrator with a malicious attachment",
                "Unauthenticated Remote Code Execution on a public e-commerce database",
                "Application exploitation on public server WEB-SRV-02 and local file config enumeration",
                "Brute-forcing exposed RDP administrative connections from the internet"
            ],
            correct: "Application exploitation on public server WEB-SRV-02 and local file config enumeration"
        },
        origin: {
            label: "Which internal IP address represents the initial point of origin (Patient Zero) where the malicious shell was executed?",
            type: "select",
            options: [
                "192.168.10.12",
                "192.168.10.14",
                "192.168.10.82",
                "192.168.10.85"
            ],
            correct: "192.168.10.82"
        },
        lateral_movement: {
            label: "Which Windows Logon Type explicitly identifies the use of Remote Desktop Protocol (RDP) for the lateral movement pivot?",
            type: "select",
            options: [
                "Logon Type 2 (Interactive)",
                "Logon Type 3 (Network)",
                "Logon Type 5 (Service)",
                "Logon Type 10 (RemoteInteractive)"
            ],
            correct: "Logon Type 10 (RemoteInteractive)"
        },
        impact: {
            label: "Identify the high-value target endpoint compromised at the end of the multi-hop RDP chain:",
            type: "select",
            options: [
                "WKSTN-02 (Finance)",
                "DB-SRV-01 (Database)",
                "WKSTN-33 (HR)",
                "WEB-SRV-02 (Web)"
            ],
            correct: "DB-SRV-01 (Database)"
        }
    },
    principles: [
        "Lateral Movement",
        "Privilege Escalation",
        "Unauthorized Privilege Use",
        "Reconnaissance / Scanning"
    ],
    explanation: "At 20:10:00Z, an external attacker exploited an unpatched application vulnerability on WEB-SRV-02 (192.168.10.82) to spawn a local system shell. Running as the web server process daemon, the attacker enumerated local files to read a backup configuration file containing hardcoded credentials for COMPANY\\db-admin. At 20:20:00Z, the attacker executed their first lateral pivot using Remote Desktop Protocol (RDP) to authenticate to the finance workstation WKSTN-02 (Logon Type 10, RemoteInteractive). Armed with administrative access, they executed a second RDP pivot at 20:35:12Z from WKSTN-02 to the highly restricted database host DB-SRV-01 (192.168.10.85). Once inside, the attacker staged the exfiltration of the Q2 Transaction database backup, compressing the archive into a temporary folder. Legitimate users (rjones, mrogers, asmith) accessing standard development environments and business tools concurrently provide realistic background network activity."
});