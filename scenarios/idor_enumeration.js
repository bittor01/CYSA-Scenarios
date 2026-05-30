scenarios.push({
    id: "ir-scenario-2026-idor-enumeration",
    title: "Operation Broken Gate: IDOR Enumeration",
    description: "Sequential access patterns detected on the payroll document-retrieval endpoint, originating from an authenticated but unauthorized user account.",
    logs: {
        proxy: [
            "2026-05-29T12:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org - Action: Allowed - Bytes: 15320",
            "2026-05-29T13:00:05Z - IP: 192.168.10.33 - URL: https://portal.example.com/api/v1/payroll/get?id=1055 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:01:20Z - IP: 192.168.10.33 - URL: https://portal.example.com/api/v1/payroll/get?id=1054 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:01:35Z - IP: 192.168.10.33 - URL: https://portal.example.com/api/v1/payroll/get?id=1053 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:01:50Z - IP: 192.168.10.33 - URL: https://portal.example.com/api/v1/payroll/get?id=1052 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:02:05Z - IP: 192.168.10.33 - URL: https://portal.example.com/api/v1/payroll/get?id=1051 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:05:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T13:10:00Z - IP: 192.168.10.33 - URL: https://portal.example.com/dashboard - Action: Allowed - Status: 200 - Bytes: 1240",
            "2026-05-29T13:12:15Z - IP: 192.168.10.15 - URL: https://portal.example.com/api/v1/payroll/get?id=1060 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:15:22Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12450",
            "2026-05-29T13:20:45Z - IP: 192.168.10.33 - URL: https://portal.example.com/api/v1/payroll/get?id=1050 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:21:00Z - IP: 192.168.10.33 - URL: https://portal.example.com/api/v1/payroll/get?id=1049 - Action: Allowed - Status: 200 - Bytes: 45000",
            "2026-05-29T13:25:00Z - IP: 192.168.10.33 - URL: https://portal.example.com/logout - Action: Allowed - Status: 200 - Bytes: 450"
        ],
        email: [
            "2026-05-29T12:30:00Z - Inbound - From: notifications@slack.com - To: mrogers@example.com - Subject: You have unread messages - Status: Delivered",
            "2026-05-29T12:45:00Z - Inbound - From: notifications@bamboohr.example.com - To: mrogers@example.com - Subject: Your Q2 Paystub is now available - Status: Delivered",
            "2026-05-29T12:47:00Z - Inbound - From: notifications@bamboohr.example.com - To: asmith@example.com - Subject: Your Q2 Paystub is now available - Status: Delivered",
            "2026-05-29T12:50:00Z - Inbound - From: notifications@bamboohr.example.com - To: fsmith@example.com - Subject: Your Q2 Paystub is now available - Status: Delivered",
            "2026-05-29T13:05:12Z - Outbound - From: mrogers@example.com - To: client-ext@partner.example.com - Subject: RE: Project Scope - Status: Sent"
        ],
        file_server: [
            "2026-05-29T12:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T13:00:00Z - Local Disk Access: E:\\Payroll_Docs\\2026\\Q2\\Paystub_1055.pdf - Accesses: ReadData - User: IIS_IUSRS\\DefaultAppPool",
            "2026-05-29T13:01:20Z - Local Disk Access: E:\\Payroll_Docs\\2026\\Q2\\Paystub_1054.pdf - Accesses: ReadData - User: IIS_IUSRS\\DefaultAppPool",
            "2026-05-29T13:01:35Z - Local Disk Access: E:\\Payroll_Docs\\2026\\Q2\\Paystub_1053.pdf - Accesses: ReadData - User: IIS_IUSRS\\DefaultAppPool",
            "2026-05-29T13:10:15Z - Local Disk Access: E:\\Payroll_Docs\\2026\\Q2\\Paystub_1060.pdf - Accesses: ReadData - User: IIS_IUSRS\\DefaultAppPool",
            "2026-05-29T13:15:45Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 192.168.10.33 - User: COMPANY\\mrogers",
            "2026-05-29T13:40:00Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.12 - User: COMPANY\\fsmith"
        ],
        workstations: [
            "2026-05-29T09:01:22Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe",
            "2026-05-29T13:00:00Z - WKSTN-03 (192.168.10.33) - EventID: 4688 - Process Created: chrome.exe spawned",
            "2026-05-29T13:05:00Z - WKSTN-03 (192.168.10.33) - EventID: 4688 - Process Created: chrome.exe - URL: https://portal.example.com/api/v1/payroll/get?id=1055",
            "2026-05-29T13:30:12Z - WKSTN-03 (192.168.10.33) - EventID: 4800 - Workstation Locked - User: COMPANY\\mrogers"
        ],
        auth_logs: [
            "2026-05-29T08:30:00Z - WKSTN-03 (192.168.10.33) - EventID: 4624 - Successful Logon - User: COMPANY\\mrogers",
            "2026-05-29T08:45:10Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Logon - User: COMPANY\\fsmith",
            "2026-05-29T12:55:00Z - Web_Auth - User: mrogers@example.com - App: Employee Portal - Status: Success - Source IP: 192.168.10.33",
            "2026-05-29T13:12:00Z - Web_Auth - User: asmith@example.com - App: Employee Portal - Status: Success - Source IP: 192.168.10.15"
        ]
    },
    questions: {
        vector: {
            label: "What specific web application vulnerability allowed this unauthorized access?",
            type: "select",
            options: [
                "Cross-Site Scripting (XSS)",
                "SQL Injection (SQLi)",
                "Insecure Direct Object Reference (IDOR)",
                "Broken Authentication / Brute Force"
            ],
            correct: "Insecure Direct Object Reference (IDOR)"
        },
        origin: {
            label: "Which internal user account was used to perform the data enumeration?",
            type: "select",
            options: [
                "asmith",
                "fsmith",
                "mrogers",
                "jdoe"
            ],
            correct: "mrogers"
        },
        indicator: {
            label: "What forensic indicator confirms that this was an automated or systematic enumeration attempt?",
            type: "select",
            options: [
                "The user logged in from a Bulgarian IP address",
                "Sequential ID parameters (1055, 1054, 1053) accessed in rapid succession",
                "High-frequency DNS TXT queries to cdn-cache-update.top",
                "The use of 'OR 1=1' in the URL parameters"
            ],
            correct: "Sequential ID parameters (1055, 1054, 1053) accessed in rapid succession"
        }
    },
    principles: ["Insecure Direct Object Reference (IDOR)", "Unauthorized Privilege Use", "Insider Threat"],
    explanation: "User 'mrogers' authenticated legitimately to the employee portal. After accessing their own paystub (ID 1055), they noticed the numeric ID in the URL and began manually or programmatically decrementing it (1054, 1053, etc.) to access the payroll documents of other employees. Because the application only verified that the user was 'logged in' but not 'authorized' for specific file IDs, it returned the sensitive files for each request. This is a classic Insecure Direct Object Reference (IDOR) vulnerability. Benign traffic from other users (asmith, fsmith) accessing their own stubs normally serves as the noise floor."
});
