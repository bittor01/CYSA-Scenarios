scenarios.push({
    id: "ir-scenario-2026-phishing-cred-harvest",
    title: "Operation Lookalike: Credential Harvesting",
    description: "Successful logins from anomalous geographic locations detected following a widespread email campaign featuring a link to a fraudulent identity portal.",
    logs: {
        proxy: [
            "2026-06-03T10:01:10Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1450",
            "2026-06-03T10:03:00Z - IP: 192.168.10.110 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1420",
            "2026-06-03T10:05:05Z - IP: 192.168.10.110 - URL: https://okta-verify-update.com/login - Action: Allowed - Category: Uncategorized - Status: 200 - Bytes: 4500",
            "2026-06-03T10:05:15Z - IP: 192.168.10.110 - URL: https://okta-verify-update.com/submit - Action: Allowed - Method: POST - Category: Uncategorized - Status: 200 - Bytes: 512",
            "2026-06-03T10:08:00Z - IP: 192.168.10.15 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 3100",
            "2026-06-03T10:12:45Z - IP: 192.168.10.10 - URL: https://canva.com/design - Action: Allowed - Category: Media/Arts - Bytes: 850000",
            "2026-06-03T10:16:00Z - IP: 197.210.29.50 - URL: https://company-cloud.sharepoint.com/dashboard - Action: Allowed - Category: Cloud Storage - Status: 200 - Bytes: 24000",
            "2026-06-03T10:18:22Z - IP: 192.168.10.88 - URL: https://github.com/company-org/backend - Action: Allowed - Category: IT/Development - Bytes: 18500",
            "2026-06-03T10:20:00Z - IP: 197.210.29.50 - URL: https://company-cloud.sharepoint.com/finance/Q3_Strategic_Prospectus.pdf - Action: Allowed - Method: GET - Category: Cloud Storage - Status: 200 - Bytes: 85400000",
            "2026-06-03T10:25:00Z - IP: 192.168.10.15 - URL: https://stackoverflow.com/questions - Action: Allowed - Category: IT/Development - Bytes: 8400"
        ],
        email: [
            "2026-06-03T10:00:15Z - Inbound - From: security@okta-verify-update.com - To: bjohnson@company.com - Subject: URGENT: Verify Your Identity Portal Session - Status: Delivered",
            "2026-06-03T10:00:15Z - Inbound - From: security@okta-verify-update.com - To: asmith@company.com - Subject: URGENT: Verify Your Identity Portal Session - Status: Delivered",
            "2026-06-03T10:00:15Z - Inbound - From: security@okta-verify-update.com - To: jdoe@company.com - Subject: URGENT: Verify Your Identity Portal Session - Status: Delivered",
            "2026-06-03T10:02:00Z - Inbound - From: notifications@slack.com - To: mrogers@company.com - Subject: Daily Team Sync - Status: Delivered",
            "2026-06-03T10:10:00Z - Internal - From: asmith@company.com - To: it-helpdesk@company.com - Subject: FWD: Suspicious Email Received - Status: Delivered"
        ],
        file_server: [
            "2026-06-03T10:12:00Z - Share Name: \\\\FILE-SRV-01\\Marketing - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-06-03T10:15:30Z - Share Name: \\\\FILE-SRV-01\\IT_Admin - Access Request: Allowed - Source IP: 192.168.10.50 - User: COMPANY\\helpdesk-admin",
            "2026-06-03T10:22:15Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 203.0.113.15 - User: COMPANY\\mrogers",
            "2026-06-03T10:23:05Z - Object Accessed: \\\\FILE-SRV-01\\HR\\Onboarding\\New_Hire_Checklist.pdf - Accesses: ReadData - Source IP: 203.0.113.15 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-06-03T10:02:00Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-06-03T10:04:30Z - WKSTN-10 (192.168.10.110) - EventID: 4688 - Process Created: explorer.exe spawned outlook.exe",
            "2026-06-03T10:05:00Z - WKSTN-10 (192.168.10.110) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url https://okta-verify-update.com/login",
            "2026-06-03T10:15:00Z - WKSTN-05 (192.168.10.50) - EventID: 4688 - Process Created: explorer.exe spawned cmd.exe /c ping 192.168.10.1",
            "2026-06-03T10:15:05Z - WKSTN-05 (192.168.10.50) - EventID: 4688 - Process Created: cmd.exe spawned PING.EXE",
            "2026-06-03T10:25:30Z - WKSTN-08 (192.168.10.88) - EventID: 4800 - Workstation Locked - User: COMPANY\\jdoe"
        ],
        auth_logs: [
            "2026-06-03T10:01:05Z - IdP_Auth - User: asmith@company.com - App: O365 Portal - AuthMethod: Password+MFA - Status: Success - IP: 192.168.10.10 - Country: USA",
            "2026-06-03T10:03:00Z - IdP_Auth - User: bjohnson@company.com - App: O365 Portal - AuthMethod: Password+MFA - Status: Success - IP: 192.168.10.110 - Country: USA",
            "2026-06-03T10:15:30Z - IdP_Auth - User: bjohnson@company.com - App: O365 Portal - AuthMethod: Password - Status: Success - IP: 197.210.29.50 - Country: Nigeria - Note: New Device Fingerprint",
            "2026-06-03T10:18:00Z - VPN_Gateway - User: mrogers - Status: Success - Source: 203.0.113.15 - Country: USA"
        ]
    },
    questions: {
        vector: {
            label: "What mechanism was used to successfully harvest the compromised user's credentials?",
            type: "select",
            options: [
                "A brute-force credential stuffing attack against the external VPN gateway",
                "A targeted spear-phishing email directing the user to a lookalike authentication portal",
                "A Pass-the-Hash attack originating from a previously compromised domain controller",
                "An Insecure Direct Object Reference (IDOR) exploit on the HR file share"
            ],
            correct: "A targeted spear-phishing email directing the user to a lookalike authentication portal"
        },
        indicator: {
            label: "Which event is the definitive indicator that the credential harvesting attempt was successful?",
            type: "select",
            options: [
                "The web proxy logging a POST request to 'okta-verify-update.com/submit'",
                "The email gateway recording the delivery of the 'URGENT: Verify Your Identity' message",
                "A successful IdP authentication from an anomalous geographic location (Nigeria) occurring shortly after the phishing click",
                "User 'asmith' forwarding the suspicious email to the IT Helpdesk"
            ],
            correct: "A successful IdP authentication from an anomalous geographic location (Nigeria) occurring shortly after the phishing click"
        },
        triage: {
            label: "Based on the telemetry provided, which user account must be immediately isolated and have its active sessions revoked?",
            type: "select",
            options: [
                "asmith",
                "mrogers",
                "jdoe",
                "bjohnson"
            ],
            correct: "bjohnson"
        }
    },
    principles: [
        "Phishing / Social Engineering",
        "Impossible Travel (Geo-velocity violation)",
        "Data Exfiltration (Overt Channel)",
        "Unauthorized Privilege Use"
    ],
    explanation: "At 10:00:15Z, an attacker launched a mass phishing campaign targeting multiple employees with a fake Okta verification email. While 'asmith' recognized the threat and forwarded it to the helpdesk, user 'bjohnson' fell for the lure. At 10:05:00Z, workstation logs show 'bjohnson' opening the link, and proxy logs confirm a POST request was sent to 'okta-verify-update.com', submitting their credentials to the attacker. Because 'bjohnson' had legitimately logged in from the USA at 10:03:00Z, the attacker's subsequent successful login using those stolen credentials from Nigeria (IP 197.210.29.50) at 10:15:30Z triggered a massive geo-velocity (Impossible Travel) anomaly. The attacker then used this authenticated session to overtly exfiltrate an 85MB strategic prospectus from the corporate SharePoint instance. The activities of 'mrogers' (logging in via VPN) and the helpdesk admin are benign workflows serving as background noise."
});