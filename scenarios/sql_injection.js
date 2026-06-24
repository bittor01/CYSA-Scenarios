scenarios.push({
    id: "ir-scenario-2026-sql-injection",
    title: "Operation Data Leak: SQL Injection",
    description: "Anomalous database-error patterns detected in web gateway logs alongside high-volume data transfers from the public-facing e-commerce portal.",
    logs: {
        proxy: [
            "2026-05-30T08:05:12Z - IP: 198.51.100.15 - URL: https://shop.company.com/product?id=4 - Action: Allowed - Category: E-Commerce - Status: 200 - Bytes: 4500",
            "2026-05-30T08:06:30Z - IP: 198.51.100.15 - URL: https://shop.company.com/product?id=12 - Action: Allowed - Category: E-Commerce - Status: 200 - Bytes: 4800",
            "2026-05-30T08:12:00Z - IP: 192.168.10.10 - URL: https://canva.com/design - Action: Allowed - Category: Media/Arts - Status: 200 - Bytes: 320000",
            "2026-05-30T08:45:10Z - IP: 203.0.113.42 - URL: https://shop.company.com/product?id=4' - Action: Allowed - Category: E-Commerce - Status: 500 - Bytes: 1200",
            "2026-05-30T08:46:22Z - IP: 203.0.113.42 - URL: https://shop.company.com/product?id=4'%20OR%20'1'='1 - Action: Allowed - Category: E-Commerce - Status: 200 - Bytes: 158000",
            "2026-05-30T08:50:05Z - IP: 203.0.113.42 - URL: https://shop.company.com/product?id=4'%20UNION%20SELECT%20null,username,password_hash,credit_card%20FROM%20customers-- - Action: Allowed - Category: E-Commerce - Status: 200 - Bytes: 145000000",
            "2026-05-30T08:55:00Z - IP: 198.51.100.22 - URL: https://shop.company.com/checkout - Action: Allowed - Category: E-Commerce - Status: 200 - Bytes: 6200",
            "2026-05-30T09:10:15Z - IP: 192.168.10.14 - URL: https://github.com/company-org/web-frontend - Action: Allowed - Category: IT/Development - Status: 200 - Bytes: 18500"
        ],
        email: [
            "2026-05-30T08:01:15Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: Daily Team Sync - Status: Delivered",
            "2026-05-30T08:20:00Z - Inbound - From: automated-reports@company.com - To: management@company.com - Subject: Daily E-Commerce Sales Metrics - Status: Delivered",
            "2026-05-30T08:40:30Z - Inbound - From: alerts@bamboohr.com - To: rjones@company.com - Subject: Timesheet Reminder - Status: Delivered"
        ],
        file_server: [
            "2026-05-30T08:20:15Z - Share Name: \\\\FILE-SRV-01\\Marketing - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-30T08:21:05Z - Object Accessed: \\\\FILE-SRV-01\\Marketing\\Summer_Campaign_Assets.zip - Accesses: ReadData - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-30T09:15:20Z - Share Name: \\\\FILE-SRV-01\\DevShare - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones"
        ],
        workstations: [
            "2026-05-30T08:05:00Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: w3wp.exe (IIS Worker Process) initialized for DefaultAppPool",
            "2026-05-30T08:45:10Z - DB-SRV-01 (192.168.10.85) - MS-SQL EventID: 17002 - Source: MSSQLSERVER - Message: Syntax error in SQL statement. Unclosed quotation mark after the character string ''.",
            "2026-05-30T08:46:22Z - DB-SRV-01 (192.168.10.85) - MS-SQL EventID: 33205 - Source: MSSQLSERVER - Message: Execution of query generated a larger than average result set (Table Scan: Products).",
            "2026-05-30T08:50:05Z - DB-SRV-01 (192.168.10.85) - MS-SQL EventID: 15457 - Source: MSSQLSERVER - Message: Unusually large data retrieval operation executed by user IIS_APPPOOL. Result set size exceeded 140MB.",
            "2026-05-30T09:12:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned vscode.exe"
        ],
        auth_logs: [
            "2026-05-30T08:00:10Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
            "2026-05-30T08:00:15Z - IdP_Auth - User: asmith@company.com - App: O365 Portal - AuthMethod: Password+MFA - Status: Success - Country: USA - IP: 104.244.42.1",
            "2026-05-30T08:15:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones - Logon Type: 2 (Interactive)",
            "2026-05-30T08:35:10Z - DB-SRV-01 (192.168.10.85) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.80 - User: LOCALRESOURCE\\IIS_APPPOOL - Logon Type: 3 (Network) - Note: Normal App-to-DB Auth"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial access method used to compromise the application and access the data?",
            type: "select",
            options: [
                "Stolen VPN credentials providing lateral movement",
                "Unauthenticated SQL Injection on a public-facing web gateway",
                "Malicious document execution via a spear-phishing email",
                "A supply chain compromise in the npm package registry"
            ],
            correct: "Unauthenticated SQL Injection on a public-facing web gateway"
        },
        indicator: {
            label: "Which specific indicator strongly confirms that the database dump was successfully exfiltrated to the attacker?",
            type: "select",
            options: [
                "A MS-SQL EventID 17002 indicating a syntax error",
                "High-frequency, low-byte DNS TXT queries to an external domain",
                "A single HTTP 200 response with an anomalously massive byte count (145MB) to an external IP",
                "A large SMB read access log on FILE-SRV-01"
            ],
            correct: "A single HTTP 200 response with an anomalously massive byte count (145MB) to an external IP"
        },
        target: {
            label: "Which internal asset was the direct target of the malicious exploitation payload?",
            type: "select",
            options: [
                "WKSTN-01 (User Endpoint)",
                "FILE-SRV-01 (Corporate File Share)",
                "DB-SRV-01 (Backend Database Server)",
                "WKSTN-03 (Developer Endpoint)"
            ],
            correct: "DB-SRV-01 (Backend Database Server)"
        }
    },
    principles: ["SQL Injection", "Data Exfiltration (Overt Channel)"],
    explanation: "At 08:45:10Z, an external attacker at IP 203.0.113.42 began probing the web gateway's `/product?id=` parameter with a single quote (`'`). This unescaped input caused a syntax error in the backend database (DB-SRV-01), returning an HTTP 500 error and logging MS-SQL EventID 17002. Identifying the vulnerability, the attacker then verified the injection using an `OR '1'='1` boolean payload, successfully bypassing the query logic and pulling the entire Products table (158KB). Finally, at 08:50:05Z, the attacker executed a full `UNION SELECT` statement targeting the `customers` table. Because the web application's service account (IIS_APPPOOL) had excessive read permissions, the database blindly returned the entire table, generating MS-SQL EventID 15457. This sensitive data was exfiltrated overtly through the web gateway as a massive 145MB HTTP 200 OK response. Meanwhile, benign user traffic, such as marketing employee 'asmith' interacting with local file shares and standard customers browsing the exact same product pages, provided standard network background noise."
});