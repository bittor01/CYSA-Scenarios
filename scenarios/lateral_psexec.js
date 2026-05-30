scenarios.push({
    id: "ir-scenario-2026-lateral-psexec",
    title: "Operation Admin Pivot: SMB/PsExec Movement",
    description: "Anomalous service creation and remote execution events detected on database servers, originating from a compromised administrator workstation.",
    logs: {
        proxy: [
            "2026-05-29T10:00:05Z - IP: 192.168.10.15 - URL: https://identity.okta.com/oauth2 - Status: 200",
            "2026-05-29T10:15:22Z - IP: 192.168.10.15 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320"
        ],
        email: [
            "2026-05-29T10:30:00Z - Internal - From: it-security@company.com - To: admin-team@company.com - Subject: Critical: Potential Credential Dump on WKSTN-05 - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T11:05:00Z - Share Name: \\\\DB-SRV-01\\ADMIN$ - Action: Write - File: PSEXESVC.exe - User: COMPANY\\helpdesk-admin",
            "2026-05-29T11:05:10Z - Share Name: \\\\DB-SRV-02\\ADMIN$ - Action: Write - File: PSEXESVC.exe - User: COMPANY\\helpdesk-admin"
        ],
        workstations: [
            "2026-05-29T09:30:12Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones",
            "2026-05-29T10:45:00Z - WKSTN-05 (192.168.10.15) - EventID: 4688 - Process Created: cmd.exe spawned psexec.exe \\\\DB-SRV-01 -u helpdesk-admin -p [REDACTED] cmd.exe",
            "2026-05-29T11:05:05Z - DB-SRV-01 (192.168.10.99) - EventID: 7045 - A service was installed in the system. Service Name: PSEXESVC - Service File Name: %SystemRoot%\\PSEXESVC.exe",
            "2026-05-29T11:15:40Z - WKSTN-03 (192.168.10.14) - EventID: 4800 - Workstation Locked"
        ],
        auth_logs: [
            "2026-05-29T08:45:10Z - WKSTN-05 (192.168.10.15) - EventID: 4624 - Successful Logon - User: COMPANY\\helpdesk-admin",
            "2026-05-29T11:05:02Z - DB-SRV-01 (192.168.10.99) - EventID: 4624 - Successful Logon - User: COMPANY\\helpdesk-admin - Logon Type: 3 (Network) - Source IP: 192.168.10.15"
        ]
    },
    questions: {
        vector: {
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
            label: "Which artifact on the target servers is a signature indicator of PsExec usage?",
            type: "select",
            options: [
                "A 4624 Logon Type 10 event",
                "The creation of the 'PSEXESVC' service in the System event logs",
                "A large data upload to personalfileshare.example.com",
                "A 401 Unauthorized error in the web gateway logs"
            ],
            correct: "The creation of the 'PSEXESVC' service in the System event logs"
        },
        logon_type: {
            label: "Which logon type is associated with the initial SMB connection to the ADMIN$ share?",
            type: "select",
            options: [
                "Type 2 (Interactive)",
                "Type 3 (Network)",
                "Type 10 (RemoteInteractive)",
                "Type 5 (Service)"
            ],
            correct: "Type 3 (Network)"
        }
    },
    principles: ["Lateral Movement", "Unauthorized Privilege Use", "Persistence"],
    explanation: "The attacker, having compromised the 'helpdesk-admin' credentials on WKSTN-05, utilized the legitimate Sysinternals PsExec tool to pivot to DB-SRV-01. This movement involved an initial SMB connection to the target's ADMIN$ share (Event ID 4624, Logon Type 3) to copy the 'PSEXESVC.exe' executable. The tool then automatically registered and started a new service ('PSEXESVC') on the target to execute the command-line shell. This is a common technique for lateral movement that leaves distinct fingerprints in both the file system and the system event logs (Event ID 7045)."
});
