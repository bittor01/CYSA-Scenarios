scenarios.push({
    id: "ir-scenario-2026-idor-enumeration",
    title: "Operation Broken Gate: IDOR Enumeration",
    description: "Sequential access patterns detected on the payroll document-retrieval endpoint, originating from an authenticated but unauthorized user account.",
    logs: {
        proxy: [
            "2026-05-29T13:00:05Z - IP: 192.168.10.33 - URL: https://portal.company.local/api/v1/payroll/get?id=1055 - Status: 200 - Bytes: 45000",
            "2026-05-29T13:01:20Z - IP: 192.168.10.33 - URL: https://portal.company.local/api/v1/payroll/get?id=1054 - Status: 200 - Bytes: 45000",
            "2026-05-29T13:01:35Z - IP: 192.168.10.33 - URL: https://portal.company.local/api/v1/payroll/get?id=1053 - Status: 200 - Bytes: 45000",
            "2026-05-29T13:01:50Z - IP: 192.168.10.33 - URL: https://portal.company.local/api/v1/payroll/get?id=1052 - Status: 200 - Bytes: 45000",
            "2026-05-29T13:02:05Z - IP: 192.168.10.33 - URL: https://portal.company.local/api/v1/payroll/get?id=1051 - Status: 200 - Bytes: 45000",
            "2026-05-29T13:10:00Z - IP: 192.168.10.33 - URL: https://portal.company.local/dashboard - Status: 200 - Bytes: 1240"
        ],
        email: [
            "2026-05-29T12:45:00Z - Inbound - From: notifications@bamboohr.com - To: mrogers@company.com - Subject: Your Q2 Paystub is now available - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T13:00:00Z - Local Disk Access: E:\\Payroll_Docs\\2026\\Q2\\Paystub_1055.pdf - Accesses: ReadData - User: IIS_IUSRS\\DefaultAppPool",
            "2026-05-29T13:01:20Z - Local Disk Access: E:\\Payroll_Docs\\2026\\Q2\\Paystub_1054.pdf - Accesses: ReadData - User: IIS_IUSRS\\DefaultAppPool",
            "2026-05-29T13:01:35Z - Local Disk Access: E:\\Payroll_Docs\\2026\\Q2\\Paystub_1053.pdf - Accesses: ReadData - User: IIS_IUSRS\\DefaultAppPool"
        ],
        workstations: [
            "2026-05-29T13:00:00Z - WKSTN-03 (192.168.10.33) - EventID: 4688 - Process Created: chrome.exe spawned"
        ],
        auth_logs: [
            "2026-05-29T08:30:00Z - Web_Auth - User: mrogers@company.com - App: Employee Portal - Status: Success - Source IP: 192.168.10.33"
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
    explanation: "User 'mrogers' authenticated legitimately to the employee portal. After accessing their own paystub (ID 1055), they noticed the numeric ID in the URL and began manually or programmatically decrementing it (1054, 1053, etc.) to access the payroll documents of other employees. Because the application only verified that the user was 'logged in' but not 'authorized' for specific file IDs, it returned the sensitive files for each request. This is a classic Insecure Direct Object Reference (IDOR) vulnerability, often categorized under Broken Access Control."
});
