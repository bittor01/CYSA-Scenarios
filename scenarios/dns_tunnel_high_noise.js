scenarios.push({
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
    });
