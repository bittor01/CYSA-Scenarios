scenarios.push({
    id: "ir-scenario-2026-phishing-cred-harvest",
    title: "Operation Lookalike: Credential Harvesting",
    description: "Successful logins from anomalous geographic locations detected following a widespread email campaign featuring a link to a fraudulent identity portal.",
    logs: {
        proxy: [
            "2026-05-29T09:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T10:05:00Z - IP: 192.168.10.45 - URL: http://identity-portal.example.com/login - Status: 200 - Bytes: 12400",
            "2026-05-29T10:06:12Z - IP: 192.168.10.12 - URL: http://identity-portal.example.com/login - Status: 200 - Bytes: 12400",
            "2026-05-29T10:07:30Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Status: 200 - Bytes: 1450",
            "2026-05-29T10:15:30Z - IP: 192.168.10.33 - URL: http://identity-portal.example.com/login - Status: 200 - Bytes: 12400",
            "2026-05-29T10:20:15Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T10:30:45Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Bytes: 8900",
            "2026-05-29T11:00:12Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12400",
            "2026-05-29T11:45:10Z - IP: 192.168.10.10 - URL: https://www.google.com/search?q=reset+password+help - Action: Allowed - Bytes: 2400"
        ],
        email: [
            "2026-05-29T10:00:15Z - Inbound - From: admin@identity-portal.example.com - To: ALL_EMPLOYEES@example.com - Subject: URGENT: Mandatory Password Reset - Link: http://identity-portal.example.com/login - Status: Delivered",
            "2026-05-29T10:15:00Z - Inbound - From: it-support@example.com - To: asmith@example.com - Subject: Password Reset Request Confirmed - Status: Delivered",
            "2026-05-29T10:20:45Z - Inbound - From: alerts@bamboohr.com - To: mrogers@example.com - Subject: Time Off Pending - Status: Delivered",
            "2026-05-29T11:05:12Z - Inbound - From: newsletters@techcrunch.com - To: asmith@example.com - Subject: TechCrunch Daily - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T09:30:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T11:30:00Z - Local Disk Access: D:\\Research\\Patents\\NextGen_v2.zip - Accesses: ReadData - Source IP: 185.190.140.12 - User: COMPANY\\jdoe",
            "2026-05-29T11:45:00Z - Share Name: \\\\FILE-SRV-01\\Research - Access Request: Allowed - Source IP: 185.190.140.12 - User: COMPANY\\jdoe",
            "2026-05-29T11:50:22Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T10:05:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: chrome.exe spawned - URL: http://identity-portal.example.com/login",
            "2026-05-29T10:06:12Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: chrome.exe spawned - URL: http://identity-portal.example.com/login",
            "2026-05-29T10:30:15Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: chrome.exe spawned - URL: https://identity.okta.com/oauth2",
            "2026-05-29T10:45:10Z - WKSTN-01 (192.168.10.10) - EventID: 4800 - Workstation Locked - User: COMPANY\\asmith"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T11:30:15Z - IdP_Auth - User: jdoe@example.com - Status: Success - Source: 185.190.140.12 - Country: Russia - MFA: NOT_ENABLED",
            "2026-05-29T11:42:00Z - IdP_Auth - User: fsmith@example.com - Status: Success - Source: 185.190.140.12 - Country: Russia - MFA: NOT_ENABLED",
            "2026-05-29T11:55:00Z - IdP_Auth - User: asmith@example.com - Status: Success - Source: 192.168.10.10 - Country: USA - MFA: ENABLED"
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
                "It uses the domain 'identity-portal.example.com' instead of the corporate 'okta.com'",
                "It returned a 200 OK status code",
                "It was accessed via Chrome browser"
            ],
            correct: "It uses the domain 'identity-portal.example.com' instead of the corporate 'okta.com'"
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
    explanation: "A widespread phishing campaign targeted employees with a 'Mandatory Password Reset' notice. The link directed users to a fraudulent lookalike domain 'identity-portal.example.com' (instead of the legitimate corporate IdP). Proxy logs show users like jdoe and fsmith visiting the site. Shortly after, successful logins were observed from a suspicious Russian IP for those same accounts. The attacker then used these compromised credentials to access internal research files. Benign noise includes user 'asmith' performing a legitimate password reset through the official portal and standard office traffic."
});
