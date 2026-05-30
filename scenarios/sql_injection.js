scenarios.push({
    id: "ir-scenario-2026-sql-injection",
    title: "Operation Data Leak: SQL Injection",
    description: "Anomalous database-error patterns detected in web gateway logs alongside high-volume data transfers from the public-facing e-commerce portal.",
    logs: {
        proxy: [
            "2026-05-29T10:00:05Z - IP: 192.168.10.15 - URL: https://shop.company.com/products?cat=1 - Status: 200 - Bytes: 1240",
            "2026-05-29T10:02:12Z - IP: 203.0.113.5 - URL: https://shop.company.com/products?cat=1' - Status: 500 - Bytes: 450",
            "2026-05-29T10:03:45Z - IP: 203.0.113.5 - URL: https://shop.company.com/products?cat=1'-- - Status: 200 - Bytes: 1240",
            "2026-05-29T10:05:22Z - IP: 203.0.113.5 - URL: https://shop.company.com/products?cat=1' ORDER BY 10-- - Status: 500 - Bytes: 450",
            "2026-05-29T10:10:00Z - IP: 192.168.10.44 - URL: https://shop.company.com/products?cat=2 - Status: 200 - Bytes: 1350",
            "2026-05-29T10:12:15Z - IP: 203.0.113.5 - URL: https://shop.company.com/products?cat=1' UNION SELECT username,password,null FROM users-- - Status: 200 - Bytes: 85000",
            "2026-05-29T10:15:30Z - IP: 203.0.113.5 - URL: https://shop.company.com/products?cat=1' UNION SELECT credit_card,cvv,null FROM payments-- - Status: 200 - Bytes: 152000",
            "2026-05-29T10:20:00Z - IP: 192.168.10.15 - URL: https://shop.company.com/checkout - Status: 200 - Bytes: 2400"
        ],
        email: [
            "2026-05-29T09:45:00Z - Inbound - From: support@shop-monitor.com - To: it-admin@company.com - Subject: Alert: Increased 500 Errors on shop.company.com - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T10:15:00Z - Local Disk Access: D:\\Databases\\ECommerce_Prod.mdf - Accesses: ReadData - Source IP: 192.168.10.80 - User: SERVICE\\sql-svc"
        ],
        workstations: [
            "2026-05-29T10:00:00Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: sqlservr.exe - Command: Standard query execution"
        ],
        auth_logs: [
            "2026-05-29T08:00:00Z - WEB-SRV-01 (192.168.10.80) - EventID: 4624 - Successful Network Logon - User: SERVICE\\sql-svc"
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
                "Successful Kerberos logins from an external IP (203.0.113.5)"
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
    explanation: "The attacker at IP 203.0.113.5 initially probed the shop.company.com portal with single quotes, triggering 500 Internal Server Errors that revealed vulnerability. After identifying the column count using 'ORDER BY', the attacker executed UNION SELECT statements to join sensitive data from the 'users' and 'payments' tables into the legitimate product search results. This is clearly visible in the proxy logs, where the byte count for the vulnerable URL jumps from ~1,200 bytes (benign) to over 85,000 and 152,000 bytes (malicious exfiltration). The SQL server logs show the 'sql-svc' account performing the read operations, which is normal for the application but triggered by the malicious user input."
});
