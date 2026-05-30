scenarios.push({
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
    });
