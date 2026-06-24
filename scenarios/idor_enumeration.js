scenarios.push({
    id: "ir-scenario-2026-idor-enumeration",
    title: "Operation Broken Gate: IDOR Enumeration",
    description: "Sequential access patterns detected on the payroll document-retrieval endpoint, originating from an authenticated but unauthorized user account.",
    logs: {
        proxy: [
            "2026-06-24T14:02:14Z - IP: 192.168.10.33 - URL: https://portal.company.local/api/v1/auth - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 1042",
            "2026-06-24T14:10:05Z - IP: 192.168.10.15 - URL: http://192.168.10.82/api/v1/test - Action: Allowed - Category: Vulnerability-Scanner - Status: 404 - Bytes: 280",
            "2026-06-24T14:10:12Z - IP: 192.168.10.15 - URL: http://192.168.10.82/admin - Action: Allowed - Category: Vulnerability-Scanner - Status: 403 - Bytes: 310",
            "2026-06-24T14:16:02Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1024 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45200 - Note: User bjones downloading own payroll stub",
            "2026-06-24T14:24:30Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1025 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 48100",
            "2026-06-24T14:24:31Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1026 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 43200",
            "2026-06-24T14:24:32Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1027 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 46100",
            "2026-06-24T14:24:33Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1028 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 44000",
            "2026-06-24T14:24:34Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1029 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45000",
            "2026-06-24T14:24:35Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1030 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 47800",
            "2026-06-24T14:24:37Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1031 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 42100",
            "2026-06-24T14:24:38Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1032 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 44300",
            "2026-06-24T14:24:40Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1033 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45200",
            "2026-06-24T14:24:42Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1034 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 43900",
            "2026-06-24T14:24:43Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1035 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 46200",
            "2026-06-24T14:24:45Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1036 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 44000",
            "2026-06-24T14:24:46Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1037 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45100",
            "2026-06-24T14:24:48Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1038 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 47500",
            "2026-06-24T14:24:50Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1039 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 41800",
            "2026-06-24T14:24:51Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1040 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 44100",
            "2026-06-24T14:24:53Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1041 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45200",
            "2026-06-24T14:24:54Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1042 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 43900",
            "2026-06-24T14:24:56Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1043 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 46200",
            "2026-06-24T14:24:57Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1044 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 44000",
            "2026-06-24T14:24:59Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1045 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45100",
            "2026-06-24T14:25:01Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1046 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 47500",
            "2026-06-24T14:25:02Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1047 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 41800",
            "2026-06-24T14:25:04Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1048 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 44100",
            "2026-06-24T14:25:05Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1049 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45200",
            "2026-06-24T14:25:07Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1050 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 43900",
            "2026-06-24T14:25:08Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1051 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 46200",
            "2026-06-24T14:25:10Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1052 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 44000",
            "2026-06-24T14:25:11Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1053 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 45100",
            "2026-06-24T14:25:13Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1054 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 47500",
            "2026-06-24T14:25:14Z - IP: 192.168.10.66 - URL: https://portal.company.local/api/v1/payroll/download?id=1055 - Action: Allowed - Category: Internal Portal - Status: 200 - Bytes: 41800",
            "2026-06-24T14:35:00Z - IP: 192.168.10.14 - URL: https://stackoverflow.com - Action: Allowed - Category: IT/Development - Status: 200 - Bytes: 9100"
        ],
        email: [
            "2026-06-24T14:00:10Z - Inbound - From: notifications@slack.com - To: bjones@company.com - Subject: Direct Messages Waiting - Status: Delivered",
            "2026-06-24T14:02:15Z - Inbound - From: payroll-dept@company-updates.local - To: employee-all@company.com - Subject: URGENT: Action Required - Digital W-2 Forms Available - Status: Delivered",
            "2026-06-24T14:12:00Z - Inbound - From: alert-service@internal-scanner.local - To: security-team@company.com - Subject: Info: Completed Host Audit Sweep - Status: Delivered",
            "2026-06-24T14:30:15Z - Outbound - From: mrogers@company.com - To: auditor-external@taxpartner.com - Subject: Signed Q2 Audit Certification - Status: Sent"
        ],
        file_server: [
            "2026-06-24T14:05:22Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones",
            "2026-06-24T14:18:15Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 192.168.10.33 - User: COMPANY\\mrogers",
            "2026-06-24T14:18:50Z - Object Accessed: \\\\FILE-SRV-01\\HR\\Audit\\Q2_Salary_Verification.xlsx - Accesses: ReadData, WriteData - Source IP: 192.168.10.33 - User: COMPANY\\mrogers"
        ],
        workstations: [
            "2026-06-24T14:15:30Z - WKSTN-11 (192.168.10.66) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe --new-window https://portal.company.local",
            "2026-06-24T14:24:25Z - WKSTN-11 (192.168.10.66) - EventID: 4688 - Process Created: chrome.exe spawned cmd.exe /c \"for /L %i in (1025,1,1055) do curl -s -b \"session_token=bjones_A8F22B\" https://portal.company.local/api/v1/payroll/download?id=%i\"",
            "2026-06-24T14:24:27Z - WKSTN-11 (192.168.10.66) - EventID: 4688 - Process Created: cmd.exe spawned curl.exe",
            "2026-06-24T14:28:10Z - WKSTN-03 (192.168.10.14) - EventID: 7036 - Service Status Change: Background Intelligent Transfer Service entered the running state."
        ],
        auth_logs: [
            "2026-06-24T14:00:15Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones - Logon Type: 2 (Interactive)",
            "2026-06-24T14:01:45Z - IdP_Auth - User: mrogers@company.com - App: Internal Portal - AuthMethod: Password+MFA - Status: Success - IP: 192.168.10.33",
            "2026-06-24T14:15:20Z - WKSTN-11 (192.168.10.66) - EventID: 4624 - Successful Logon - User: COMPANY\\bjones - Logon Type: 2 (Interactive)",
            "2026-06-24T14:15:22Z - Portal_Auth - User: bjones@company.com - App: Internal Portal - AuthMethod: Password - Status: Success - IP: 192.168.10.66 - Token Issued: bjones_A8F22B"
        ]
    },
    questions: {
        vector: {
            label: "What specific vulnerability classification was exploited to retrieve unauthorized files?",
            type: "select",
            options: [
                "SQL Injection (SQLi)",
                "Cross-Site Scripting (XSS)",
                "Insecure Direct Object Reference (IDOR)",
                "Insecure Deserialization (Python Pickle)"
            ],
            correct: "Insecure Direct Object Reference (IDOR)"
        },
        origin: {
            label: "Which internal workstation initiated the programmatic bulk retrieval?",
            type: "select",
            options: [
                "WKSTN-03",
                "WKSTN-11",
                "WKSTN-33",
                "sec-audit-01"
            ],
            correct: "WKSTN-11"
        },
        sign: {
            label: "What behavioural signature in the web proxy log confirms automated enumeration rather than manual retrieval?",
            type: "select",
            options: [
                "The presence of SQL syntax markers such as SELECT or UNION",
                "A highly rapid, sequential numeric increment of parameters occurring at second-level intervals",
                "Outbound base64 encoded strings in the parameter values",
                "High-frequency UDP/53 DNS TXT queries mapping to domain infrastructure"
            ],
            correct: "A highly rapid, sequential numeric increment of parameters occurring at second-level intervals"
        },
        count: {
            label: "How many unauthorized payroll records were successfully exfiltrated by the actor (excluding their own record)?",
            type: "number",
            correct: 31
        }
    },
    principles: [
        "Insecure Direct Object Reference (IDOR)",
        "Unauthorized Privilege Use",
        "Data Exfiltration (Overt Channel)",
        "Insider Threat"
    ],
    explanation: "At 14:15:20Z, user 'bjones' initiated a standard authenticated session on the internal company portal from workstation WKSTN-11, generating a legitimate session token (bjones_A8F22B). At 14:16:02Z, the user navigated to their personal payroll document (ID 1024). Spotting the sequential integer logic, the user launched an administrative utility command-line script utilizing curl to programmatically query the range starting at 1025 and ending at 1055 in continuous, sequential 1-second increments. Because the backend system on WEB-SRV-02 failed to validate standard object access privileges, the application server blindly authorized the requests under the session context, resulting in the unauthorized exfiltration of 31 distinct employee payroll documents over a secure overt HTTPS tunnel. Meanwhile, noisy scans from sec-audit-01 and legitimate salary verification spreadsheet edits on FILE-SRV-01 by HR manager mrogers ran concurrently, providing typical enterprise background distractions."
});