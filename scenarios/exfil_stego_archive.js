scenarios.push({
    id: "ir-scenario-2026-exfil-stego-archive",
    title: "Operation Pixels: Steganographic Exfiltration",
    description: "Suspicious high-volume uploads of image files to an unclassified image-hosting site following unauthorized access to the R&D file share.",
    logs: {
        proxy: [
            "2026-05-29T15:00:10Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12450",
            "2026-05-29T15:30:45Z - IP: 192.168.10.14 - URL: https://external-c2-listener.top/api/v1/ping - Action: Allowed - Bytes: 124",
            "2026-05-29T15:31:45Z - IP: 192.168.10.14 - URL: https://external-c2-listener.top/api/v1/ping - Action: Allowed - Bytes: 124",
            "2026-05-29T15:32:45Z - IP: 192.168.10.14 - URL: https://external-c2-listener.top/api/v1/ping - Action: Allowed - Bytes: 124",
            "2026-05-29T16:00:10Z - IP: 192.168.10.14 - URL: https://img-share-free.net/upload/holiday_photo_1.jpg - Action: Allowed - Status: 201 - Bytes: 15400000",
            "2026-05-29T16:02:15Z - IP: 192.168.10.14 - URL: https://img-share-free.net/upload/holiday_photo_2.jpg - Action: Allowed - Status: 201 - Bytes: 15400000",
            "2026-05-29T16:05:30Z - IP: 192.168.10.14 - URL: https://img-share-free.net/upload/holiday_photo_3.jpg - Action: Allowed - Status: 201 - Bytes: 15400000",
            "2026-05-29T16:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100"
        ],
        email: [
            "2026-05-29T15:15:00Z - Inbound - From: newsletters@techcrunch.com - To: rjones@company.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T15:30:00Z - Inbound - From: notifications@slack.com - To: rjones@company.com - Subject: New message from 'IT_Support_Global' - Status: Delivered",
            "2026-05-29T15:35:12Z - Inbound - From: alerts@bamboohr.com - To: rjones@company.com - Subject: Time Off Request - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T15:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T15:45:00Z - Share Name: \\\\FILE-SRV-01\\Research - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones",
            "2026-05-29T15:46:12Z - Object Accessed: \\\\FILE-SRV-01\\Research\\Patents\\Core_Algorithm.c - Accesses: ReadData - User: COMPANY\\rjones"
        ],
        workstations: [
            "2026-05-29T15:40:05Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: outlook.exe spawned chrome.exe --url http://it-support-global.net/help",
            "2026-05-29T15:50:05Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned stego_tool.exe - Command: stego_tool.exe --hide Core_Algorithm.c --cover vacation.jpg --out holiday_photo_1.jpg",
            "2026-05-29T15:55:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: chrome.exe spawned - URL: https://img-share-free.net/upload"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T09:30:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones"
        ]
    },
    questions: {
        vector: {
            label: "What was the initial infection vector for this incident?",
            type: "select",
            options: [
                "Credential Harvesting Phishing Link",
                "Phishing Link leading to Payload Execution",
                "SQL Injection on the R&D Server",
                "Malicious Insider with physical access"
            ],
            correct: "Phishing Link leading to Payload Execution"
        },
        origin: {
            label: "Which corporate asset was the source of the exfiltrated data?",
            type: "select",
            options: [
                "FILE-SRV-01 (Research Share)",
                "WKSTN-03 (Local Drive)",
                "WEB-SRV-01 (Public Root)",
                "DEV-SRV-02 (Source Code)"
            ],
            correct: "FILE-SRV-01 (Research Share)"
        },
        beaconing: {
            label: "What indicator distinguishes the command-and-control (C2) channel from standard user activity?",
            type: "select",
            options: [
                "Unstructured web browsing to techcrunch.com",
                "A highly rigid 60-second connection frequency to external-c2-listener.top",
                "Oversized ICMP echo requests transferring payload batches",
                "Direct SSH outbound connections targeting unclassified IP segments"
            ],
            correct: "A highly rigid 60-second connection frequency to external-c2-listener.top"
        }
    },
    principles: ["Data Exfiltration (Overt Channel)", "Obfuscation / Encryption", "Beaconing / Command & Control", "Phishing / Social Engineering"],
    explanation: "At 15:30:00Z, user 'rjones' received a phishing email from 'IT_Support_Global'. Clicking the link initiated a payload that established a 60-second C2 beacon to 'external-c2-listener.top'. The attacker then used the compromised 'rjones' account to access a sensitive patent file ('Core_Algorithm.c') on the Research share. To evade detection, the attacker utilized a steganography tool to hide the stolen file within legitimate JPEG images, which were then uploaded to a public image-hosting site. While the upload channel is overt, the data itself was obfuscated."
});
