scenarios.push({
    id: "ir-scenario-2026-ransomware-staging",
    title: "Operation Deadlock: Ransomware Staging",
    description: "Multiple endpoint alerts for Shadow Copy deletion and mass file renaming activity on corporate file shares.",
    logs: {
        proxy: [
            "2026-05-29T14:02:14Z - IP: 192.168.10.45 - URL: https://identity.okta.com/oauth2 - Status: 200",
            "2026-05-29T14:30:45Z - IP: 192.168.10.45 - URL: http://tor-gateway.onion.to/keys/pub_0921.key - Status: 200 - Bytes: 1024",
            "2026-05-29T14:45:00Z - IP: 192.168.10.45 - URL: https://pastebin.com/raw/malscript - Status: 200 - Bytes: 4500"
        ],
        email: [
            "2026-05-29T13:45:22Z - Inbound - From: notifications@shipping-updates.com - To: jdoe@company.com - Subject: Delivery Failed - Attachment: Shipment_Details.zip - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T14:50:10Z - Share Name: \\\\FILE-SRV-01\\Public - Action: Rename - Original: Annual_Report_2025.pdf - New: Annual_Report_2025.pdf.crypt - User: COMPANY\\jdoe",
            "2026-05-29T14:50:12Z - Share Name: \\\\FILE-SRV-01\\Public - Action: Rename - Original: Q3_Budget.xlsx - New: Q3_Budget.xlsx.crypt - User: COMPANY\\jdoe",
            "2026-05-29T14:50:15Z - Share Name: \\\\FILE-SRV-01\\Public - Action: Rename - Original: Strategy_2026.docx - New: Strategy_2026.docx.crypt - User: COMPANY\\jdoe",
            "2026-05-29T14:55:00Z - Share Name: \\\\FILE-SRV-01\\Public - File Created: README_DECRYPT.txt - User: COMPANY\\jdoe"
        ],
        workstations: [
            "2026-05-29T14:40:05Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: explorer.exe spawned Shipment_Details.exe",
            "2026-05-29T14:40:10Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: Shipment_Details.exe spawned vssadmin.exe delete shadows /all /quiet",
            "2026-05-29T14:40:15Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: Shipment_Details.exe spawned bcdedit.exe /set {default} recoveryenabled No",
            "2026-05-29T14:42:00Z - WKSTN-04 (192.168.10.45) - EventID: 4688 - Process Created: cmd.exe spawned cipher.exe /w:C:\\"
        ],
        auth_logs: [
            "2026-05-29T08:15:00Z - WKSTN-04 (192.168.10.45) - EventID: 4624 - Successful Logon - User: COMPANY\\jdoe"
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
        impact: {
            label: "What is the primary indicator of impact on the file server?",
            type: "select",
            options: [
                "High-volume data upload to pastebin.com",
                "Mass renaming of files to include a '.crypt' extension",
                "Unauthorized access to the Finance share by admin-svc",
                "Deletion of the entire Public share directory"
            ],
            correct: "Mass renaming of files to include a '.crypt' extension"
        }
    },
    principles: ["Phishing / Social Engineering", "Obfuscation / Encryption", "Unauthorized Privilege Use"],
    explanation: "At 14:40:05Z, user 'jdoe' on WKSTN-04 executed a malicious file disguised as shipping details. The malware immediately attempted to disable recovery options by deleting Volume Shadow Copies via 'vssadmin.exe' and disabling boot recovery via 'bcdedit.exe'. Shortly after, the process began encrypting files on the network share \\\\FILE-SRV-01\\Public, as evidenced by the rapid renaming of documents to include the '.crypt' extension. The attacker also downloaded an encryption key from a TOR gateway and dropped a ransom note (README_DECRYPT.txt). This follows the standard behavior of modern ransomware strains like LockBit or Conti."
});
