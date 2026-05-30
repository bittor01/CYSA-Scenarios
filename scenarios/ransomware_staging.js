scenarios.push({
    id: "ir-scenario-2026-ransomware-staging",
    title: "Operation Deadlock: Ransomware Staging",
    description: "Multiple endpoint alerts for Shadow Copy deletion and mass file renaming activity on corporate file shares.",
    logs: {
        proxy: [
            "2026-05-29T14:02:14Z - IP: 192.168.10.45 - URL: https://identity.okta.com/oauth2 - Action: Allowed - Bytes: 1450",
            "2026-05-29T14:15:22Z - IP: 192.168.10.45 - URL: https://outlook.office.com/mapi - Action: Allowed - Bytes: 8940",
            "2026-05-29T14:30:45Z - IP: 192.168.10.45 - URL: http://tor-gateway.onion.to/keys/pub_0921.key - Action: Allowed - Category: Uncategorized - Bytes: 1024",
            "2026-05-29T14:31:45Z - IP: 192.168.10.45 - URL: http://tor-gateway.onion.to/keys/pub_0921.key - Action: Allowed - Category: Uncategorized - Bytes: 1024",
            "2026-05-29T14:32:45Z - IP: 192.168.10.45 - URL: http://tor-gateway.onion.to/keys/pub_0921.key - Action: Allowed - Category: Uncategorized - Bytes: 1024",
            "2026-05-29T14:45:00Z - IP: 192.168.10.45 - URL: https://pastebin.com/raw/malscript - Action: Allowed - Category: Uncategorized - Bytes: 4500",
            "2026-05-29T14:50:30Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100"
        ],
        email: [
            "2026-05-29T13:30:00Z - Inbound - From: newsletters@techcrunch.com - To: jdoe@company.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T13:45:22Z - Inbound - From: notifications@shipping-updates.com - To: jdoe@company.com - Subject: Delivery Failed - Attachment: Shipment_Details.zip - Status: Delivered",
            "2026-05-29T14:10:00Z - Outbound - From: jdoe@company.com - To: external@vendor.com - Subject: RE: Project Invoice - Status: Sent"
        ],
        file_server: [
            "2026-05-29T14:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - User: COMPANY\\asmith",
            "2026-05-29T14:50:10Z - Share Name: \\\\FILE-SRV-01\\Public - Action: Rename - Original: Annual_Report_2025.pdf - New: Annual_Report_2025.pdf.crypt - User: COMPANY\\jdoe",
            "2026-05-29T14:50:12Z - Share Name: \\\\FILE-SRV-01\\Public - Action: Rename - Original: Q3_Budget.xlsx - New: Q3_Budget.xlsx.crypt - User: COMPANY\\jdoe",
            "2026-05-29T14:50:15Z - Share Name: \\\\FILE-SRV-01\\Public - Action: Rename - Original: Strategy_2026.docx - New: Strategy_2026.docx.crypt - User: COMPANY\\jdoe",
            "2026-05-29T14:55:00Z - Share Name: \\\\FILE-SRV-01\\Public - File Created: README_DECRYPT.txt - User: COMPANY\\jdoe"
        ],
        workstations: [
            "2026-05-29T14:40:05Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: explorer.exe spawned Shipment_Details.exe",
            "2026-05-29T14:40:10Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: Shipment_Details.exe spawned vssadmin.exe delete shadows /all /quiet",
            "2026-05-29T14:40:15Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: Shipment_Details.exe spawned bcdedit.exe /set {default} recoveryenabled No",
            "2026-05-29T14:42:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: cmd.exe spawned cipher.exe /w:C:\\",
            "2026-05-29T14:45:00Z - WKSTN-04 (192.168.10.45) - EventID: 7045 - Service Created: MalService - Command: C:\\Windows\\Temp\\mal.exe"
        ],
        auth_logs: [
            "2026-05-29T08:15:00Z - WKSTN-04 (192.168.10.45) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe",
            "2026-05-29T08:30:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial delivery method for the ransomware payload?",
            type: "select",
            options: [
                "SQL Injection on the web server",
                "Phishing email with a malicious attachment (.zip containing .exe)",
                "Brute force attack on the RDP gateway",
                "Insider threat copying files to a USB drive"
            ],
            correct: "Phishing email with a malicious attachment (.zip containing .exe)"
        },
        persistence: {
            label: "Which command-line action confirmed the attacker's intent to prevent system recovery?",
            type: "select",
            options: [
                "vssadmin.exe delete shadows /all /quiet",
                "cipher.exe /w:C:\\",
                "netstat -ano",
                "ipconfig /flushdns"
            ],
            correct: "vssadmin.exe delete shadows /all /quiet"
        },
        indicator: {
            label: "What indicator distinguishes the command-and-control (C2) channel from standard user activity?",
            type: "select",
            options: [
                "Unstructured web browsing to techcrunch.com",
                "Highly rigid 60-second connection frequency to a TOR gateway",
                "Oversized ICMP echo requests transferring payload batches",
                "Direct SSH outbound connections targeting unclassified IP segments"
            ],
            correct: "Highly rigid 60-second connection frequency to a TOR gateway"
        }
    },
    principles: ["Phishing / Social Engineering", "Obfuscation / Encryption", "Beaconing / Command & Control"],
    explanation: "At 14:40:05Z, user 'jdoe' on WKSTN-04 executed a malicious file disguised as shipping details. The malware immediately attempted to disable recovery options by deleting Volume Shadow Copies via 'vssadmin.exe' and disabling boot recovery via 'bcdedit.exe'. Process logs also show a 60-second beacon to a TOR gateway ('tor-gateway.onion.to') to retrieve encryption keys. Shortly after, the process began encrypting files on the network share \\\\FILE-SRV-01\\Public, as evidenced by the rapid renaming of documents to include the '.crypt' extension. This follows the standard behavior of modern ransomware strains."
});
