scenarios.push({
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
                    "A highly rigid 60-second connection frequency to a social media platform",
                    "Oversized ICMP echo requests transferring payload batches back to Sofia",
                    "Direct SSH outbound connections targeting unclassified IP segments"
                ],
                correct: "A highly rigid 60-second connection frequency to a social media platform"
            }
        },
        principles: ["Impossible Travel (Geo-velocity violation)", "Beaconing / Command & Control", "Phishing / Social Engineering"],
        explanation: "At 14:10:15Z, user jdoe authenticated legitimately from New York, USA. Just 2 minutes and 30 seconds later, at 14:12:45Z, a second login event was authorized using jdoe's active session token from Sofia, Bulgaria. Because traveling 4,700 miles in under three minutes is physically impossible, this confirms a Session Hijack compromise. Correlating the telemetry, jdoe received a phishing email at 14:05:00Z designed to harvest OAuth tokens and drop a silent payload. After the token was successfully stolen and utilized from Bulgaria, the local payload executed on WKSTN-08 at 14:14:05Z, spawning a persistent background PowerShell process that began polling socialmedia.example.com/company-feed/posts exactly every 60 seconds. Meanwhile, developer kbaker browsed the same social media domain for technical discussions at erratic times with widely varying payload sizes, providing benign background noise."
    });
