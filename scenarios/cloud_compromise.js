scenarios.push({
    id: "ir-scenario-2026-cloud-compromise",
    title: "Operation Sky Breach: Cloud MFA Bypass",
    description: "Critical security alert for a high-volume S3 bucket download following an MFA bypass event for a global administrator account.",
    logs: {
        proxy: [
            "2026-05-29T15:30:45Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12450",
            "2026-05-29T16:00:10Z - IP: 198.51.100.22 - URL: https://s3.amazonaws.com/company-legal-vault - Action: Allowed - Action: ListBucket",
            "2026-05-29T16:02:15Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T16:05:00Z - IP: 198.51.100.22 - URL: https://s3.amazonaws.com/company-legal-vault/M_and_A_2026.zip - Action: Allowed - Action: GetObject - Bytes: 450000000",
            "2026-05-29T16:15:00Z - IP: 198.51.100.22 - URL: https://s3.amazonaws.com/company-legal-vault/Trade_Secrets.pdf - Action: Allowed - Action: GetObject - Bytes: 12500000",
            "2026-05-29T16:20:00Z - IP: 198.51.100.22 - URL: https://c2-cloud-panel.net/heartbeat - Action: Allowed - Bytes: 350"
        ],
        email: [
            "2026-05-29T15:40:00Z - Inbound - From: notifications@slack.com - To: admin-root@company.com - Subject: You have unread messages - Status: Delivered",
            "2026-05-29T15:55:00Z - Inbound - From: alerts@aws-security.com - To: soc-alerts@company.com - Subject: [CRITICAL] MFA Bypass Detected: Root Account - Status: Delivered",
            "2026-05-29T16:30:00Z - Outbound - From: admin-root@company.com - To: ceo@company.com - Subject: RE: Cloud Migration Update - Status: Sent"
        ],
        file_server: [
            "2026-05-29T15:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T16:10:00Z - Cloud_Sync - Service: AWS S3 Connector - Status: Synced - Bucket: company-legal-vault"
        ],
        workstations: [
            "2026-05-29T15:01:22Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T16:00:00Z - Cloud_Console - IP: 198.51.100.22 - Action: AWS Management Console Login - User: admin-root@company.com"
        ],
        auth_logs: [
            "2026-05-29T15:54:10Z - Cloud_Auth - User: admin-root@company.com - Status: Success - IP: 198.51.100.22 - MFA: BYPASSED - Method: Session_Token_Injection",
            "2026-05-29T15:58:00Z - Cloud_Auth - User: admin-root@company.com - Action: PolicyChanged - Effect: Allow - Resource: s3:*"
        ]
    },
    questions: {
        vector: {
            label: "How did the attacker gain access to the global administrator cloud account?",
            type: "select",
            options: [
                "Brute forcing the root password",
                "MFA Bypass via Session Token Injection",
                "Phishing for MFA codes",
                "Exploiting an unpatched VPN vulnerability"
            ],
            correct: "MFA Bypass via Session Token Injection"
        },
        impact: {
            label: "What was the primary impact of this cloud compromise?",
            type: "select",
            options: [
                "Deletion of all S3 buckets",
                "Exfiltration of sensitive legal and trade secret documents (450MB+)",
                "Unauthorized creation of new EC2 instances",
                "Mass encryption of local file shares"
            ],
            correct: "Exfiltration of sensitive legal and trade secret documents (450MB+)"
        },
        principle: {
            label: "Which principle describes the attacker's action of changing the IAM policy (s3:*) after login?",
            type: "select",
            options: [
                "Reconnaissance",
                "Privilege Escalation",
                "Persistence",
                "Unauthorized Privilege Use"
            ],
            correct: "Unauthorized Privilege Use"
        }
    },
    principles: ["Unauthorized Privilege Use", "Data Exfiltration (Overt Channel)", "Beaconing / Command & Control"],
    explanation: "The attacker gained access to the cloud environment by injecting a stolen session token to bypass MFA for the 'admin-root' account. Once authenticated from an external IP (198.51.100.22), the attacker modified IAM policies to grant themselves full S3 access. They then proceeded to download several hundred megabytes of sensitive documents from the 'company-legal-vault' bucket. The attacker also established a C2 heartbeat to 'c2-cloud-panel.net', indicating that the compromised administrator session was being systematically used for command and control."
});
