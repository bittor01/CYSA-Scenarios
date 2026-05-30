scenarios.push({
    id: "ir-scenario-2026-phishing-cred-harvest",
    title: "Operation Lookalike: Credential Harvesting",
    description: "Successful logins from anomalous geographic locations detected following a widespread email campaign featuring a link to a fraudulent identity portal.",
    logs: {
        proxy: [
            "2026-05-29T09:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T10:05:00Z - IP: 192.168.10.45 - URL: http://identity-portal-security.com/login - Status: 200 - Bytes: 12400",
            "2026-05-29T10:06:12Z - IP: 192.168.10.12 - URL: http://identity-portal-security.com/login - Status: 200 - Bytes: 12400",
            "2026-05-29T10:15:30Z - IP: 192.168.10.33 - URL: http://identity-portal-security.com/login - Status: 200 - Bytes: 12400",
            "2026-05-29T10:30:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100"
        ],
        email: [
            "2026-05-29T10:00:15Z - Inbound - From: admin@identity-portal-security.com - To: ALL_EMPLOYEES@company.com - Subject: URGENT: Mandatory Password Reset - Link: http://identity-portal-security.com/login - Status: Delivered",
            "2026-05-29T10:20:45Z - Inbound - From: alerts@bamboohr.com - To: mrogers@company.com - Subject: Time Off Pending - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T09:30:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T11:45:00Z - Share Name: \\\\FILE-SRV-01\\Research - Access Request: Allowed - Source IP: 185.190.140.12 - User: COMPANY\\jdoe"
        ],
        workstations: [
            "2026-05-29T10:05:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: chrome.exe spawned - URL: http://identity-portal-security.com/login",
            "2026-05-29T10:45:10Z - WKSTN-01 (192.168.10.10) - EventID: 4800 - Workstation Locked - User: COMPANY\\asmith"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T11:30:15Z - IdP_Auth - User: jdoe@company.com - Status: Success - Source: 185.190.140.12 - Country: Russia - MFA: NOT_ENABLED",
            "2026-05-29T11:42:00Z - IdP_Auth - User: fsmith@company.com - Status: Success - Source: 185.190.140.12 - Country: Russia - MFA: NOT_ENABLED"
        ]
    },
    questions: {
        vector: {
            label: "How were the user credentials likely harvested?",
            type: "select",
            options: [
                "SQL Injection on the IdP database",
                "Phishing via a fraudulent lookalike domain",
                "Brute force attack on the IdP login page",
                "Malicious macro execution in a PDF"
            ],
            correct: "Phishing via a fraudulent lookalike domain"
        },
        indicator: {
            label: "Which log characteristic identifies the identity portal as fraudulent?",
            type: "select",
            options: [
                "It uses HTTPS on port 443",
                "It uses the domain 'identity-portal-security.com' instead of the corporate 'okta.com'",
                "It returned a 200 OK status code",
                "It was accessed via Chrome browser"
            ],
            correct: "It uses the domain 'identity-portal-security.com' instead of the corporate 'okta.com'"
        },
        impact: {
            label: "What forensic evidence confirms the credentials were used by the attacker?",
            type: "select",
            options: [
                "The email was delivered to all employees",
                "Successful logins from a Russian IP (185.190.140.12) for multiple compromised accounts",
                "The proxy logs show high-volume data exfiltration to Dropbox",
                "User 'jdoe' locked their workstation at 10:05Z"
            ],
            correct: "Successful logins from a Russian IP (185.190.140.12) for multiple compromised accounts"
        }
    },
    principles: ["Phishing / Social Engineering", "Unauthorized Privilege Use", "Impossible Travel (Geo-velocity violation)"],
    explanation: "A widespread phishing campaign targeted all employees with a 'Mandatory Password Reset' notice. The link directed users to a fraudulent lookalike domain 'identity-portal-security.com' (rather than the legitimate corporate IdP). Proxy logs show multiple users visiting the site at 10:05Z. Roughly 90 minutes later, successful logins were observed from a suspicious external IP in Russia for those same accounts. The attacker then used these compromised credentials to access the internal file server. This is a classic credential harvesting attack leveraging a lookalike domain."
});
