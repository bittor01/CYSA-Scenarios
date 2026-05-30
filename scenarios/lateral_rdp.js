scenarios.push({
    id: "ir-scenario-2026-lateral-rdp",
    title: "Operation Remote Step: RDP Lateral Movement",
    description: "Multiple Remote Desktop (RDP) sessions initiated from a standard workstation to internal server segments following a local credential compromise.",
    logs: {
        proxy: [
            "2026-05-29T14:02:14Z - IP: 192.168.10.45 - URL: https://identity.okta.com/oauth2 - Status: 200"
        ],
        email: [
            "2026-05-29T13:45:00Z - Inbound - From: security@company.com - To: jdoe@company.com - Subject: Notice: Unusual Login to your Workstation - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T15:20:00Z - Local Disk Access: C:\\Windows\\Temp\\dump.zip - Accesses: WriteData - User: COMPANY\\jdoe (via RDP on FILE-SRV-01)"
        ],
        workstations: [
            "2026-05-29T14:40:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: explorer.exe spawned mstsc.exe /v:192.168.10.80",
            "2026-05-29T15:10:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: explorer.exe spawned mstsc.exe /v:192.168.10.150"
        ],
        auth_logs: [
            "2026-05-29T14:40:05Z - WEB-SRV-01 (192.168.10.80) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 10 (RemoteInteractive/RDP) - Source IP: 192.168.10.45",
            "2026-05-29T15:10:05Z - FILE-SRV-01 (192.168.10.150) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 10 (RemoteInteractive/RDP) - Source IP: 192.168.10.45"
        ]
    },
    questions: {
        vector: {
            label: "What protocol was used to move laterally within the network?",
            type: "select",
            options: [
                "Server Message Block (SMB)",
                "Remote Desktop Protocol (RDP)",
                "Windows Remote Management (WinRM)",
                "Windows Management Instrumentation (WMI)"
            ],
            correct: "Remote Desktop Protocol (RDP)"
        },
        origin: {
            label: "Which asset served as the launchpad for the lateral movement?",
            type: "select",
            options: [
                "WKSTN-04",
                "WEB-SRV-01",
                "FILE-SRV-01",
                "WKSTN-01"
            ],
            correct: "WKSTN-04"
        },
        indicator: {
            label: "Which Windows Event ID and Logon Type confirm the nature of this lateral movement?",
            type: "select",
            options: [
                "Event ID 4624, Logon Type 2 (Interactive)",
                "Event ID 4624, Logon Type 3 (Network)",
                "Event ID 4624, Logon Type 10 (RemoteInteractive)",
                "Event ID 4625, Logon Type 3 (Network Failure)"
            ],
            correct: "Event ID 4624, Logon Type 10 (RemoteInteractive)"
        }
    },
    principles: ["Lateral Movement", "Unauthorized Privilege Use"],
    explanation: "After compromising user 'jdoe's' credentials on WKSTN-04, the attacker used the native Remote Desktop Connection client ('mstsc.exe') to pivot to critical servers. This is confirmed by process logs on WKSTN-04 and Auth Logs on the targets (WEB-SRV-01 and FILE-SRV-01), which show Event ID 4624 with Logon Type 10 (RemoteInteractive) originating from the workstation's IP. Type 10 is a definitive indicator of an RDP session. The attacker was then able to interact with the file server directly as if they were sitting at the console."
});
