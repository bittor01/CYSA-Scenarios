scenarios.push({
    id: "ir-scenario-2026-sql-injection",
    title: "Operation Data Leak: SQL Injection",
    description: "Anomalous database-error patterns detected in web gateway logs alongside high-volume data transfers from the public-facing e-commerce portal.",
    logs: {
        proxy: [
            "2026-05-29T10:00:05Z - IP: 192.168.10.15 - URL: https://shop.example.com/products?cat=1 - Action: Allowed - Status: 200 - Bytes: 1240",
            "2026-05-29T10:01:30Z - IP: 74.125.22.14 - URL: https://shop.example.com/index.html - Action: Allowed - Status: 200 - Bytes: 4500",
            "2026-05-29T10:02:12Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1' - Action: Allowed - Status: 500 - Category: Shopping - Bytes: 450",
            "2026-05-29T10:02:45Z - IP: 192.168.10.12 - URL: https://shop.example.com/products?cat=2 - Action: Allowed - Status: 200 - Bytes: 1350",
            "2026-05-29T10:03:45Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1'-- - Action: Allowed - Status: 200 - Category: Shopping - Bytes: 1240",
            "2026-05-29T10:05:22Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1' ORDER BY 1-- - Action: Allowed - Status: 200 - Bytes: 1240",
            "2026-05-29T10:05:30Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1' ORDER BY 10-- - Action: Allowed - Status: 500 - Bytes: 450",
            "2026-05-29T10:05:45Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1' ORDER BY 5-- - Action: Allowed - Status: 200 - Bytes: 1240",
            "2026-05-29T10:06:40Z - IP: 8.8.8.8 - URL: https://shop.example.com/favicon.ico - Action: Allowed - Status: 200 - Bytes: 850",
            "2026-05-29T10:07:15Z - IP: 192.168.10.44 - URL: https://shop.example.com/search?q=t-shirt - Action: Allowed - Status: 200 - Bytes: 2400",
            "2026-05-29T10:10:00Z - IP: 192.168.10.44 - URL: https://shop.example.com/products?cat=2 - Action: Allowed - Status: 200 - Bytes: 1350",
            "2026-05-29T10:12:15Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1' UNION SELECT username,password,null,null,null FROM users-- - Action: Allowed - Status: 200 - Category: Shopping - Bytes: 85000",
            "2026-05-29T10:14:02Z - IP: 192.168.10.15 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity - Bytes: 1450",
            "2026-05-29T10:15:30Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1' UNION SELECT credit_card,cvv,expiry,null,null FROM payments-- - Action: Allowed - Status: 200 - Category: Shopping - Bytes: 152000",
            "2026-05-29T10:18:22Z - IP: 192.168.10.10 - URL: https://shop.example.com/cart - Action: Allowed - Status: 200 - Bytes: 3200",
            "2026-05-29T10:20:00Z - IP: 192.168.10.15 - URL: https://shop.example.com/checkout - Action: Allowed - Status: 200 - Category: Shopping - Bytes: 2400",
            "2026-05-29T10:25:12Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Category: Business - Bytes: 12450",
            "2026-05-29T10:30:45Z - IP: 66.249.66.1 - URL: https://shop.example.com/robots.txt - Action: Allowed - Status: 200 - Bytes: 120",
            "2026-05-29T10:35:00Z - IP: 203.0.113.42 - URL: https://shop.example.com/products?cat=1' UNION SELECT @@version,null,null,null,null-- - Action: Allowed - Status: 200 - Bytes: 1300"
        ],
        email: [
            "2026-05-29T09:40:00Z - Inbound - From: notifications@slack.com - To: asmith@example.com - Subject: You have unread messages - Status: Delivered",
            "2026-05-29T09:45:00Z - Inbound - From: support@shop-monitor.com - To: it-admin@example.com - Subject: Alert: Increased 500 Errors on shop.example.com - Status: Delivered",
            "2026-05-29T10:05:12Z - Outbound - From: asmith@example.com - To: client@external.com - Subject: Project Update - Status: Sent",
            "2026-05-29T10:15:00Z - Inbound - From: alerts@bamboohr.com - To: mrogers@example.com - Subject: Time Off Approved - Status: Delivered",
            "2026-05-29T10:22:15Z - Inbound - From: no-reply@example.com - To: fsmith@example.com - Subject: Your Order Confirmation #8821 - Status: Delivered",
            "2026-05-29T10:45:00Z - Inbound - From: newsletter@techtrends.com - To: asmith@example.com - Subject: Daily Newsletter - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T09:30:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T10:00:00Z - Local Disk Access: D:\\Backups\\SQL\\ShopDB_Daily.bak - Accesses: WriteData - User: SERVICE\\sql-svc",
            "2026-05-29T10:15:00Z - Local Disk Access: D:\\Databases\\ECommerce_Prod.mdf - Accesses: ReadData - Source IP: 192.168.10.80 - User: SERVICE\\sql-svc",
            "2026-05-29T10:22:10Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\mrogers",
            "2026-05-29T10:40:15Z - Share Name: \\\\FILE-SRV-01\\IT_Admin - Access Request: Allowed - Source IP: 192.168.10.12 - User: COMPANY\\fsmith"
        ],
        workstations: [
            "2026-05-29T09:01:22Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T09:15:00Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: explorer.exe spawned outlook.exe",
            "2026-05-29T10:00:00Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: sqlservr.exe - Command: Standard query execution",
            "2026-05-29T10:12:15Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: w3wp.exe - Note: Processing high-volume database result set",
            "2026-05-29T10:15:40Z - WKSTN-03 (192.168.10.14) - EventID: 4800 - Workstation Locked - User: COMPANY\\rjones",
            "2026-05-29T10:30:12Z - WKSTN-01 (192.168.10.10) - EventID: 4800 - Workstation Locked - User: COMPANY\\asmith"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T08:15:32Z - WKSTN-04 (192.168.10.45) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe",
            "2026-05-29T09:30:12Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones",
            "2026-05-29T10:00:00Z - WEB-SRV-01 (192.168.10.80) - EventID: 4624 - Successful Network Logon - User: SERVICE\\sql-svc",
            "2026-05-29T10:12:00Z - WEB-SRV-01 (192.168.10.80) - EventID: 4624 - Successful Network Logon - User: SERVICE\\sql-svc - Note: Connection from w3wp.exe"
        ]
    },
    questions: {
        vector: {
            label: "What was the primary attack vector used to compromise the data?",
            type: "select",
            options: [
                "Phishing for SQL Admin Credentials",
                "SQL Injection (UNION-based exfiltration)",
                "Broken Access Control on the checkout page",
                "Insecure Direct Object Reference (IDOR) on product IDs"
            ],
            correct: "SQL Injection (UNION-based exfiltration)"
        },
        indicator: {
            label: "Which log characteristic best distinguishes the malicious SQLi activity from benign traffic?",
            type: "select",
            options: [
                "The presence of 500 error status codes followed by 200 codes with massive byte counts",
                "Regular 60-second polling to the checkout page",
                "Outbound DNS TXT queries from the SQL server",
                "Successful Kerberos logins from an external IP (203.0.113.42)"
            ],
            correct: "The presence of 500 error status codes followed by 200 codes with massive byte counts"
        },
        target: {
            label: "Which database table was likely exfiltrated based on the URI payloads?",
            type: "select",
            options: [
                "Products and Categories",
                "Users and Payments",
                "System Configuration",
                "Audit Logs"
            ],
            correct: "Users and Payments"
        }
    },
    principles: ["SQL Injection", "Data Exfiltration (Overt Channel)"],
    explanation: "The attacker at IP 203.0.113.42 initially probed the shop.example.com portal with single quotes, triggering 500 Internal Server Errors that revealed vulnerability. After identifying the column count using 'ORDER BY', the attacker executed UNION SELECT statements to join sensitive data from the 'users' and 'payments' tables into the legitimate product search results. This is clearly visible in the proxy logs, where the byte count for the vulnerable URL jumps from ~1,240 bytes (benign) to over 85,000 and 152,000 bytes (malicious exfiltration). The SQL server logs show the 'sql-svc' account performing the read operations, which is normal for the application but triggered by the malicious user input. Benign traffic from users like asmith and fsmith, as well as routine SQL backups, provides the necessary noise for the simulation."
});
