scenarios.push({
    id: "ir-scenario-2026-brute-force",
    title: "Operation Power Guess: Brute Force",
    description: "High-volume authentication failure alerts followed by a single successful login from a suspicious external IP address targeting the corporate VPN gateway.",
    logs: {
        proxy: [
            "2026-05-29T22:00:10Z - IP: 45.33.12.110 - URL: https://vpn.company.com/login - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:12Z - IP: 45.33.12.110 - URL: https://vpn.company.com/login - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:14Z - IP: 45.33.12.110 - URL: https://vpn.company.com/login - Status: 401 - Bytes: 450",
            "2026-05-29T22:00:16Z - IP: 45.33.12.110 - URL: https://vpn.company.com/login - Status: 401 - Bytes: 450",
            "2026-05-29T22:05:30Z - IP: 45.33.12.110 - URL: https://vpn.company.com/login - Status: 200 - Bytes: 1240 - User: COMPANY\\asmith",
            "2026-05-29T22:10:00Z - IP: 45.33.12.110 - URL: https://internal-portal.company.local/ - Status: 200 - Bytes: 4500"
        ],
        email: [
            "2026-05-29T22:06:00Z - Internal - From: security-monitor@company.com - To: asmith@company.com - Subject: Notice: New Login from Unknown Location - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T22:15:20Z - Share Name: \\\\FILE-SRV-01\\Marketing - Access Request: Allowed - Source IP: 45.33.12.110 - User: COMPANY\\asmith"
        ],
        workstations: [
            "2026-05-29T22:20:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Network Logon - User: COMPANY\\asmith - Source IP: 45.33.12.110 (via VPN)"
        ],
        auth_logs: [
            "2026-05-29T22:00:10Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:00:12Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:00:14Z - VPN_Gateway - User: asmith - Status: Failure - Reason: Bad Password - Source: 45.33.12.110",
            "2026-05-29T22:05:30Z - VPN_Gateway - User: asmith - Status: Success - Source: 45.33.12.110"
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
                "Update the SSL certificate for vpn.company.com",
                "Email 'asmith' to ask if they logged in from 45.33.12.110"
            ],
            correct: "Disable the 'asmith' account and reset their password"
        }
    },
    principles: ["Brute Force / Credential Stuffing", "Unauthorized Privilege Use"],
    explanation: "The logs indicate a focused brute-force attack against the 'asmith' user account on the corporate VPN gateway. Starting at 22:00:10Z, the attacker at IP 45.33.12.110 made several rapid password attempts, all resulting in 401/Failure status. At 22:05:30Z, a successful login was achieved. The attacker then used the established VPN tunnel to access internal resources, including the marketing file share and workstation WKSTN-01. The immediate security alert sent to the user ('New Login from Unknown Location') is a key indicator that the login was anomalous."
});
