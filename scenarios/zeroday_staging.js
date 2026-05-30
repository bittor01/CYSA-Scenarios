scenarios.push({
        id: "ir-scenario-2026-zeroday-staging",
        title: "Operation Hidden Cache",
        description: "Critical web application compromise identified via parent-child process anomalies on public web servers and unauthorized web root file staging.",
        logs: {
            proxy: [
                "2026-05-29T11:00:05Z - IP: 198.51.100.12 - URL: https://www.company.com/index.html - Action: Allowed - Category: General - Status: 200 - Bytes: 4500",
                "2026-05-29T11:02:15Z - IP: 198.51.100.77 - URL: https://www.company.com/api - Action: Allowed - Category: General - Status: 404 - Bytes: 280",
                "2026-05-29T11:02:22Z - IP: 198.51.100.77 - URL: https://www.company.com/api/v1/parser - Action: Allowed - Category: General - Status: 405 - Bytes: 310",
                "2026-05-29T11:02:35Z - IP: 198.51.100.77 - URL: https://www.company.com/api/v2/document-parser - Action: Allowed - Category: General - Status: 200 - Bytes: 1500",
                "2026-05-29T11:10:42Z - IP: 192.168.10.15 - URL: http://192.168.10.80/api/v2/document-parser - Action: Allowed - Category: Internal-Audit - Status: 200 - Bytes: 1500",
                "2026-05-29T11:15:30Z - IP: 198.51.100.77 - URL: https://www.company.com/api/v2/document-parser - Action: Allowed - Category: General - Status: 500 - Method: POST - Bytes: 42000",
                "2026-05-29T11:20:12Z - IP: 198.51.100.44 - URL: https://www.company.com/assets/css/main.css - Action: Allowed - Category: General - Status: 200 - Bytes: 12400",
                "2026-05-29T11:28:55Z - IP: 192.168.10.10 - URL: http://192.168.10.80/assets/images/marketing/hero_banner_v2.png - Action: Allowed - Category: Internal-Upload - Status: 201 - Method: POST - Bytes: 1450000",
                "2026-05-29T11:32:45Z - IP: 198.51.100.77 - URL: https://www.company.com/assets/images/.system_temp/payroll_staging.zip - Action: Allowed - Category: General - Status: 200 - Method: GET - Bytes: 85200000",
                "2026-05-29T11:40:00Z - IP: 198.51.100.12 - URL: https://www.company.com/about.html - Action: Allowed - Category: General - Status: 200 - Bytes: 5100"
            ],
            email: [
                "2026-05-29T11:00:10Z - Inbound - From: security-alerts@internal-siem.local - To: soc-team@company.com - Subject: Notice: Scheduled Subnet Scans Beginning - Status: Delivered",
                "2026-05-29T11:15:00Z - Inbound - From: portal-notifications@bamboohr.com - To: employee-all@company.com - Subject: Update: Q2 Compensation Statements Available - Status: Delivered"
            ],
            file_server: [
                "2026-05-29T11:10:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
                "2026-05-29T11:24:12Z - Local Disk Access: D:\\Corporate_Vault\\HR_Payroll_2026.csv - Accesses: ReadData - Source IP: 192.168.10.80 - User: IIS_IUSRS\\DefaultAppPool",
                "2026-05-29T11:28:50Z - Local Disk Access: C:\\inetpub\\wwwroot\\assets\\images\\.system_temp\\payroll_staging.zip - Accesses: WriteData - Source IP: 192.168.10.80 - User: IIS_IUSRS\\DefaultAppPool"
            ],
            workstations: [
                "2026-05-29T11:15:32Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: w3wp.exe spawned cmd.exe /c whoami",
                "2026-05-29T11:16:05Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: w3wp.exe spawned cmd.exe /c dir D:\\Corporate_Vault\\",
                '2026-05-29T11:24:30Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: cmd.exe spawned powershell.exe -Command "Compress-Archive -Path D:\\Corporate_Vault\\HR_Payroll_2026.csv -DestinationPath C:\\inetpub\\wwwroot\\assets\\images\\.system_temp\\payroll_staging.zip"',
                "2026-05-29T11:28:40Z - WEB-SRV-01 (192.168.10.80) - EventID: 4688 - Process Created: cmd.exe spawned attrib.exe +h C:\\inetpub\\wwwroot\\assets\\images\\.system_temp"
            ],
            auth_logs: [
                "2026-05-29T11:00:00Z - WEB-SRV-01 (192.168.10.80) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.15 - User: COMPANY\\scan-svc - Logon Type: 3 (Network)"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial infection/compromise vector leveraged by the threat actor?",
                type: "select",
                options: [
                    "A malicious attachment inside a spoofed human resources email",
                    "An unauthenticated Remote Code Execution (RCE) zero-day exploit in a public-facing API",
                    "Stolen VPN session tokens harvested from a corporate workstation",
                    "An administrative credential stuffing attack on the file share repository"
                ],
                correct: "An unauthenticated Remote Code Execution (RCE) zero-day exploit in a public-facing API"
            },
            origin: {
                label: "Which asset served as the primary system compromised by the attacker during the intrusion?",
                type: "select",
                options: [
                    "FILE-SRV-01",
                    "WEB-SRV-01",
                    "sec-audit-01",
                    "WKSTN-01"
                ],
                correct: "WEB-SRV-01"
            },
            count: {
                label: "How many internal systems show telemetry indicating that a malicious process or shell was actively executed?",
                type: "number",
                correct: 1
            },
            staging_location: {
                label: "To which specific folder path did the attacker write the compressed sensitive files to stage them for retrieval?",
                type: "select",
                options: [
                    "D:\\Corporate_Vault\\",
                    "\\\\FILE-SRV-01\\Public\\Brand_Assets\\",
                    "C:\\Windows\\Temp\\",
                    "C:\\inetpub\\wwwroot\\assets\\images\\.system_temp\\"
                ],
                correct: "C:\\inetpub\\wwwroot\\assets\\images\\.system_temp\\"
            },
            exfiltration_method: {
                label: "How did the attacker bypass outbound egress filtering rules to exfiltrate the compressed data archive?",
                type: "select",
                options: [
                    "Sending outbound DNS TXT query chunks to a command server",
                    "Uploading the archive to a personal cloud hosting provider using high-volume POST requests",
                    "Issuing an inbound HTTP GET request to download the staged archive from the public web root",
                    "Opening an outbound SSH tunnel over Port 22 back to the external scanner"
                ],
                correct: "Issuing an inbound HTTP GET request to download the staged archive from the public web root"
            }
        },
        principles: ["Data Exfiltration (Overt Channel)", "Reconnaissance / Scanning"],
        explanation: "At 11:15:30Z, an external threat actor at IP 198.51.100.77 initiated a massive 42KB HTTP POST payload targeting the /api/v2/document-parser API endpoint on WEB-SRV-01. This request triggered an unauthenticated zero-day remote code execution vulnerability, forcing the IIS web worker process (w3wp.exe) to spawn cmd.exe. Running commands as IIS_IUSRS, the attacker accessed D:\\Corporate_Vault\\HR_Payroll_2026.csv, zipped it via PowerShell, and relocated it into the public-facing directory C:\\inetpub\\wwwroot\\assets\\images\\.system_temp\\, hiding the folder using attrib.exe +h. The attacker then completed the exfiltration at 11:32:45Z via an inbound HTTP GET request directly to the staged file path, effectively bypassing outbound egress controls by using the server's legitimate incoming web traffic. Telemetry also shows noisy internal auditing traffic from sec-audit-01 scanning the web app, which is benign and matches corporate security scanning schedules."
    });
