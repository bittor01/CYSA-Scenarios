scenarios.push({
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
    });
