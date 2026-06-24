scenarios.push({
    id: "ir-scenario-2026-lateral-psexec",
    title: "Operation Admin Pivot: SMB/PsExec Movement",
    description: "Anomalous service creation and remote execution events detected on database servers, originating from a helpdesk workstation following a support session.",
    logs: {
        proxy: [
            "2026-05-29T10:00:05Z - IP: 192.168.10.15 - URL: https://identity.okta.com/oauth2 - Status: 200",
            "2026-05-29T10:05:12Z - IP: 192.168.10.15 - URL: http://it-support-portal.example.com/help - Status: 200 - Bytes: 1240",
            "2026-05-29T10:15:22Z - IP: 192.168.10.15 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T10:22:15Z - IP: 192.168.10.14 - URL: https://github.com/company-org/dev - Action: Allowed - Bytes: 45200",
            "2026-05-29T10:30:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T10:45:00Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12450",
            "2026-05-29T11:05:30Z - IP: 192.168.10.15 - URL: https://external-c2-listener.example.net/api/v1/ping - Action: Allowed - Bytes: 350",
            "2026-05-29T11:06:30Z - IP: 192.168.10.15 - URL: https://external-c2-listener.example.net/api/v1/ping - Action: Allowed - Bytes: 350"
        ],
        email: [
            "2026-05-29T10:00:10Z - Inbound - From: admin-support@example.com - To: bjohnson@example.com - Subject: RE: Ticket #8821 - Screen flickering - Status: Delivered",
            "2026-05-29T10:10:00Z - Internal - From: bjohnson@example.com - To: helpdesk@example.com - Subject: Can someone look at my machine? It's doing something weird. - Status: Sent",
            "2026-05-29T10:25:00Z - Inbound - From: alerts@bamboohr.com - To: fsmith@example.com - Subject: Timesheet Approved - Status: Delivered",
            "2026-05-29T10:45:00Z - Inbound - From: newsletters@techcrunch.com - To: asmith@example.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T11:00:00Z - Internal - From: helpdesk-admin@example.com - To: bjohnson@example.com - Subject: I've fixed the issue on WKSTN-05, let know if it recurs. - Status: Sent"
        ],
        file_server: [
            "2026-05-29T10:30:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T11:05:00Z - Share Name: \\\\DB-SRV-01\\ADMIN$ - Action: Write - File: PSEXESVC.exe - User: COMPANY\\helpdesk-admin - Source IP: 192.168.10.15",
            "2026-05-29T11:05:10Z - Share Name: \\\\DB-SRV-02\\ADMIN$ - Action: Write - File: PSEXESVC.exe - User: COMPANY\\helpdesk-admin - Source IP: 192.168.10.15",
            "2026-05-29T11:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T11:30:00Z - Object Accessed: \\\\DB-SRV-01\\C$\\Databases\\Customer_PII.mdf - Accesses: ReadData - User: COMPANY\\helpdesk-admin"
        ],
        workstations: [
            "2026-05-29T09:55:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned vscode.exe",
            "2026-05-29T10:05:00Z - WKSTN-05 (192.168.10.15) - EventID: 4688 - Process Created: chrome.exe spawned - URL: http://it-support-portal.example.com/help",
            "2026-05-29T10:08:12Z - WKSTN-05 (192.168.10.15) - EventID: 4688 - Process Created: explorer.exe spawned malicious_payload.exe (Triggered by drive-by on support portal)",
            "2026-05-29T10:50:00Z - WKSTN-05 (192.168.10.15) - Sysmon EventID: 10 - Process Access: malicious_payload.exe accessed lsass.exe - TargetGrantedAccess: 0x1F0FFF - User: SYSTEM",
            "2026-05-29T10:55:00Z - WKSTN-05 (192.168.10.15) - EventID: 4688 - Process Created: cmd.exe spawned psexec.exe \\\\DB-SRV-01 -u helpdesk-admin -p [REDACTED] cmd.exe",
            "2026-05-29T11:05:05Z - DB-SRV-01 (192.168.10.99) - EventID: 7045 - Service Created: PSEXESVC - Service File Name: %SystemRoot%\\PSEXESVC.exe",
            "2026-05-29T11:10:00Z - DB-SRV-01 (192.168.10.99) - EventID: 4688 - Process Created: PSEXESVC.exe spawned cmd.exe",
            "2026-05-29T11:15:40Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe"
        ],
        auth_logs: [
            "2026-05-29T08:15:00Z - WKSTN-05 (192.168.10.15) - EventID: 4624 - Successful Logon - User: COMPANY\\bjohnson",
            "2026-05-29T09:50:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones",
            "2026-05-29T10:45:00Z - WKSTN-05 (192.168.10.15) - EventID: 4624 - Successful Logon - User: COMPANY\\helpdesk-admin - Logon Type: 2 (Interactive)",
            "2026-05-29T11:05:02Z - DB-SRV-01 (192.168.10.99) - EventID: 4624 - Successful Logon - User: COMPANY\\helpdesk-admin - Logon Type: 3 (Network) - Source IP: 192.168.10.15",
            "2026-05-29T11:15:00Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Logon - User: COMPANY\\fsmith",
            "2026-05-29T11:42:15Z - DB-SRV-02 (192.168.10.100) - EventID: 4624 - Successful Network Logon - User: COMPANY\\helpdesk-admin - Source: 192.168.10.15"
        ]
    },
    questions: {
        vector: {
            label: "How were the 'helpdesk-admin' credentials compromised on WKSTN-05?",
            type: "select",
            options: [
                "Credential harvesting via a phishing link",
                "Dumping LSASS memory after the admin logged in to a compromised workstation",
                "Brute force attack against the admin's VPN account",
                "Keylogging the admin's password during an RDP session"
            ],
            correct: "Dumping LSASS memory after the admin logged in to a compromised workstation"
        },
        mechanism: {
            label: "What mechanism was used to execute commands remotely on the database servers?",
            type: "select",
            options: [
                "Remote Desktop Protocol (RDP)",
                "PsExec via SMB/RPC",
                "WinRM over TCP 5985",
                "WMI over TCP 135"
            ],
            correct: "PsExec via SMB/RPC"
        },
        indicator: {
            label: "Which Sysmon event confirms the credential theft process?",
            type: "select",
            options: [
                "Event ID 1 (Process Creation)",
                "Event ID 3 (Network Connection)",
                "Event ID 10 (Process Access to LSASS)",
                "Event ID 7 (Image Loaded)"
            ],
            correct: "Event ID 10 (Process Access to LSASS)"
        }
    },
    principles: [
        "Lateral Movement",
        "Unauthorized Privilege Use",
        "Persistence",
        "Phishing / Social Engineering"
    ],
    explanation: "This incident is a classic 'Helpdesk Trap'. User bjohnson on WKSTN-05 was initially compromised via a drive-by download from a lookalike support portal. When the helpdesk administrator logged in interactively (Logon Type 2) to troubleshoot the 'weird' behavior reported by the user, the resident malware (running as SYSTEM) accessed the LSASS process (Sysmon Event ID 10) to dump the administrator's credentials. The attacker then used these high-privilege credentials to move laterally to the database servers using PsExec, as evidenced by the creation of the remote PSEXESVC service (EventID 7045) on DB-SRV-01 and file write events targeting ADMIN$ shares over Port 445. Benign developer actions on WKSTN-03 and marketing file activity serve as background noise."
});