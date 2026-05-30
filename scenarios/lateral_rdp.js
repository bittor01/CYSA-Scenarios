scenarios.push({
    id: "ir-scenario-2026-lateral-rdp",
    title: "Operation Remote Step: RDP Lateral Movement",
    description: "Multiple Remote Desktop (RDP) sessions initiated from a standard workstation to internal server segments following a local credential compromise.",
    logs: {
        proxy: [
            "2026-05-29T14:02:14Z - IP: 192.168.10.45 - URL: https://identity.okta.com/oauth2 - Status: 200",
            "2026-05-29T14:05:00Z - IP: 192.168.10.45 - URL: http://software-update.example.net/patch_9921.exe - Status: 200 - Bytes: 1250000",
            "2026-05-29T14:15:22Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Bytes: 8940",
            "2026-05-29T14:30:15Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T15:00:12Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 14000",
            "2026-05-29T15:30:45Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15300"
        ],
        email: [
            "2026-05-29T13:45:00Z - Inbound - From: notifications@example.com - To: jdoe@example.com - Subject: Critical: Your workstation requires a manual security patch - Status: Delivered",
            "2026-05-29T14:05:12Z - Inbound - From: newsletters@techcrunch.com - To: asmith@example.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T14:45:00Z - Inbound - From: it-support@example.com - To: kbaker@example.com - Subject: RE: Server Maintenance Schedule - Status: Sent"
        ],
        file_server: [
            "2026-05-29T14:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T15:20:00Z - Local Disk Access: C:\\Windows\\Temp\\dump.zip - Accesses: WriteData - User: COMPANY\\jdoe (via RDP on FILE-SRV-01)",
            "2026-05-29T15:45:11Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T14:10:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: chrome.exe spawned patch_9921.exe",
            "2026-05-29T14:40:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: patch_9921.exe spawned mstsc.exe /v:192.168.10.80",
            "2026-05-29T15:05:30Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: outlook.exe spawned excel.exe",
            "2026-05-29T15:10:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: explorer.exe spawned mstsc.exe /v:192.168.10.150",
            "2026-05-29T15:30:12Z - WKSTN-03 (192.168.10.14) - EventID: 4800 - Workstation Locked - User: COMPANY\\rjones"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T08:30:12Z - WKSTN-04 (192.168.10.45) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe",
            "2026-05-29T14:40:05Z - WEB-SRV-01 (192.168.10.80) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 10 (RemoteInteractive/RDP) - Source IP: 192.168.10.45",
            "2026-05-29T15:10:05Z - FILE-SRV-01 (192.168.10.150) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 10 (RemoteInteractive/RDP) - Source IP: 192.168.10.45",
            "2026-05-29T15:45:00Z - MGMT-SRV-01 (192.168.10.55) - EventID: 4624 - Successful Logon - User: COMPANY\\kbaker - Logon Type: 10 (RemoteInteractive/RDP) - Source IP: 192.168.10.12"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial infection vector that allowed the attacker to reach Patient Zero (WKSTN-04)?",
            type: "select",
            options: [
                "SQL Injection on the web server",
                "Phishing email leading to a malicious patch download",
                "Brute force attack on the RDP gateway",
                "Insider threat copying files to a USB drive"
            ],
            correct: "Phishing email leading to a malicious patch download"
        },
        protocol: {
            label: "What protocol was used to move laterally from the workstation to the internal servers?",
            type: "select",
            options: [
                "Server Message Block (SMB)",
                "Remote Desktop Protocol (RDP)",
                "Windows Remote Management (WinRM)",
                "Windows Management Instrumentation (WMI)"
            ],
            correct: "Remote Desktop Protocol (RDP)"
        },
        indicator: {
            label: "Which process parentage on WKSTN-04 is the most definitive 'smoking gun' of malicious activity?",
            type: "select",
            options: [
                "explorer.exe spawning slack.exe",
                "patch_9921.exe spawning mstsc.exe (RDP client)",
                "outlook.exe spawning chrome.exe",
                "chrome.exe spawning patch_9921.exe"
            ],
            correct: "patch_9921.exe spawning mstsc.exe (RDP client)"
        }
    },
    principles: ["Lateral Movement", "Unauthorized Privilege Use", "Phishing / Social Engineering"],
    explanation: "User 'jdoe' on WKSTN-04 was targeted with a phishing email claiming a 'manual security patch' was required. After downloading and executing 'patch_9921.exe', the malware established control and used the native RDP client ('mstsc.exe') to move laterally to WEB-SRV-01 and FILE-SRV-01. The 'smoking gun' is the anomalous process parentage where the fake patch process spawned the RDP client. Benign noise includes standard office traffic and a legitimate administrative RDP session from user 'kbaker'."
});
