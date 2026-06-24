scenarios.push({
    id: "ir-scenario-2026-brute-force",
    title: "Operation Power Guess: Brute Force",
    description: "High-volume authentication failure alerts followed by a single successful login from a suspicious external IP address targeting the corporate VPN gateway.",
    logs: {
        proxy: [
            "2026-05-29T21:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T22:00:10Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:12Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:14Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:16Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:18Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:20Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:22Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 401 - Bytes: 450",
            "2026-05-29T22:02:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T22:05:30Z - IP: 45.33.12.110 - URL: https://vpn.example.com/login - Action: Allowed - Status: 200 - Bytes: 1240 - User: COMPANY\\asmith",
            "2026-05-29T22:08:15Z - IP: 45.33.12.110 - URL: https://internal-portal.example.local/ - Action: Allowed - Status: 200 - Bytes: 4500",
            "2026-05-29T22:12:33Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Bytes: 9200",
            "2026-05-29T22:15:22Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12450",
            "2026-05-29T22:20:00Z - IP: 45.33.12.110 - URL: https://internal-portal.example.local/api/v1/users - Action: Allowed - Status: 200 - Bytes: 154000"
        ],
        email: [
            "2026-05-29T21:30:00Z - Inbound - From: notifications@slack.com - To: asmith@example.com - Subject: You have unread messages - Status: Delivered",
            "2026-05-29T22:06:00Z - Internal - From: security-monitor@example.com - To: asmith@example.com - Subject: Notice: New Login from Unknown Location - Status: Delivered",
            "2026-05-29T22:10:00Z - Internal - From: it-support@example.com - To: asmith@example.com - Subject: RE: Access Issue - Status: Sent",
            "2026-05-29T22:30:00Z - Inbound - From: alerts@bamboohr.com - To: asmith@example.com - Subject: Time Off Request Approved - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T21:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T22:15:20Z - Share Name: \\\\FILE-SRV-01\\Marketing - Access Request: Allowed - Source IP: 45.33.12.110 - User: COMPANY\\asmith",
            "2026-05-29T22:18:12Z - Object Accessed: \\\\FILE-SRV-01\\Marketing\\Campaigns\\2026_Strategy.docx - Accesses: ReadData - User: COMPANY\\asmith",
            "2026-05-29T22:45:11Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T21:01:22Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T22:25:30Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned cmd.exe",
            "2026-05-29T22:45:40Z - WKSTN-03 (192.168.10.14) - EventID: 4800 - Workstation Locked - User: COMPANY\\rjones"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T22:00:10Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:00:12Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:00:14Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:00:16Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:00:18Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:05:30Z - VPN_Gateway - User: asmith - Status: Success - Source: 45.33.12.110",
            "2026-05-29T22:08:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Network Logon - User: COMPANY\\asmith - Source: 45.33.12.110",
            "2026-05-29T22:20:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Network Logon - User: COMPANY\\asmith - Source IP: 45.33.12.110 (via VPN)",
            "2026-05-29T22:30:12Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones"
        ]
    },
    questions: {
        vector: {
            label: "Which attack technique was used to gain access to the 'asmith' account?",
            type: "select",
            options: [
                "Credential Stuffing",
                "Brute Force / Password Guessing",
                "Phishing",
                "Session Hijacking"
            ],
            correct: "Brute Force / Password Guessing"
        },
        indicator: {
            label: "What sequence of events in the auth logs confirms the attack?",
            type: "select",
            options: [
                "Multiple failures for different users from the same IP",
                "Multiple failures for a single user followed by a single success from the same IP",
                "A single success from an internal workstation",
                "A failed login attempt using a session token"
            ],
            correct: "Multiple failures for a single user followed by a single success from the same IP"
        },
        response: {
            label: "Based on the logs, what should be the immediate remediation step?",
            type: "select",
            options: [
                "Disable the 'asmith' account and reset their password",
                "Block the IP 192.168.10.10 on the internal firewall",
                "Update the SSL certificate for vpn.example.com",
                "Email 'asmith' to ask if they logged in from 45.33.12.110"
            ],
            correct: "Disable the 'asmith' account and reset their password"
        }
    },
    principles: [
        "Brute Force / Credential Stuffing",
        "Unauthorized Privilege Use"
    ],
    explanation: "The logs indicate a focused brute-force attack against the 'asmith' user account on the corporate VPN gateway. Starting at 22:00:10Z, the attacker at IP 45.33.12.110 made several rapid password attempts, all resulting in 401/Failure status. At 22:05:30Z, a successful login was achieved. The attacker then used the established VPN tunnel to access internal resources, including the marketing file share and workstation WKSTN-01. The immediate security alert sent to the user ('New Login from Unknown Location') is a key indicator that the login was anomalous. Benign traffic from other users (rjones, mrogers) during late hours provides the context for a 24/7 global operation."
});