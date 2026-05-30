scenarios.push({
    id: "ir-scenario-2026-exfil-stego-archive",
    title: "Operation Pixels: Steganographic Exfiltration",
    description: "Suspicious high-volume uploads of image files to a personal cloud storage site following unauthorized access to the R&D file share.",
    logs: {
        proxy: [
            "2026-05-29T15:00:10Z - IP: 192.168.10.12 - URL: https://teams.microsoft.com - Action: Allowed - Bytes: 12450",
            "2026-05-29T15:05:00Z - IP: 192.168.10.14 - URL: https://openstego.example.com/download/OpenStego.msi - Action: Allowed - Category: IT-Tools - Bytes: 4500000",
            "2026-05-29T15:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T15:30:45Z - IP: 192.168.10.14 - URL: https://www.google.com/search?q=how+to+hide+files+in+images - Action: Allowed - Bytes: 1240",
            "2026-05-29T16:00:10Z - IP: 192.168.10.14 - URL: https://imgur.example.com/upload/vacation_01.jpg - Action: Allowed - Status: 201 - Bytes: 25400000",
            "2026-05-29T16:02:15Z - IP: 192.168.10.14 - URL: https://imgur.example.com/upload/vacation_02.jpg - Action: Allowed - Status: 201 - Bytes: 25400000",
            "2026-05-29T16:05:30Z - IP: 192.168.10.14 - URL: https://imgur.example.com/upload/vacation_03.jpg - Action: Allowed - Status: 201 - Bytes: 25400000",
            "2026-05-29T16:10:45Z - IP: 192.168.10.10 - URL: https://slack.com/api/rtm.start - Action: Allowed - Bytes: 3100",
            "2026-05-29T16:15:22Z - IP: 192.168.10.15 - URL: https://sharepoint.example.com/marketing/assets - Action: Allowed - Bytes: 125000"
        ],
        email: [
            "2026-05-29T14:45:00Z - Inbound - From: hr@example.com - To: rjones@example.com - Subject: Update regarding your recent Promotion Application - Status: Delivered",
            "2026-05-29T15:15:00Z - Inbound - From: newsletters@techcrunch.com - To: rjones@example.com - Subject: TechCrunch Daily - Status: Delivered",
            "2026-05-29T15:35:12Z - Inbound - From: alerts@bamboohr.com - To: rjones@example.com - Subject: Time Off Request - Status: Delivered",
            "2026-05-29T16:20:00Z - Outbound - From: rjones@example.com - To: recruiter@competitor.example.com - Subject: RE: Career Inquiry - Status: Sent"
        ],
        file_server: [
            "2026-05-29T15:20:15Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.10 - User: COMPANY\\asmith",
            "2026-05-29T15:45:00Z - Share Name: \\\\FILE-SRV-01\\Research - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones",
            "2026-05-29T15:46:12Z - Object Accessed: \\\\FILE-SRV-01\\Research\\Patents\\Core_Algorithm.c - Accesses: ReadData - User: COMPANY\\rjones",
            "2026-05-29T15:47:00Z - Object Accessed: \\\\FILE-SRV-01\\Research\\Patents\\Q3_Roadmap.pdf - Accesses: ReadData - User: COMPANY\\rjones"
        ],
        workstations: [
            "2026-05-29T15:05:30Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: chrome.exe spawned OpenStego.msi",
            "2026-05-29T15:10:00Z - WKSTN-03 (192.168.10.14) - EventID: 7045 - Service Created: OpenStego_Service - Command: C:\\Program Files\\OpenStego\\openstego.exe",
            "2026-05-29T15:50:05Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: openstego.exe --embed --crypt --file Core_Algorithm.c --cover vacation.jpg --out vacation_01.jpg",
            "2026-05-29T15:55:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: chrome.exe - URL: https://imgur.example.com/upload",
            "2026-05-29T16:30:12Z - WKSTN-01 (192.168.10.10) - EventID: 4800 - Workstation Locked"
        ],
        auth_logs: [
            "2026-05-29T08:00:15Z - WKSTN-01 (192.168.10.10) - EventID: 4624 - Successful Logon - User: COMPANY\\asmith",
            "2026-05-29T09:30:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones",
            "2026-05-29T15:45:00Z - FILE-SRV-01 - EventID: 4624 - Successful Network Logon - User: COMPANY\\rjones - Source: 192.168.10.14"
        ]
    },
    questions: {
        vector: {
            label: "What was the primary driver and classification for this incident?",
            type: "select",
            options: [
                "External Phishing Attack",
                "Malicious Insider (Intellectual Property Theft)",
                "SQL Injection on the R&D Server",
                "Ransomware Staging by a Remote Actor"
            ],
            correct: "Malicious Insider (Intellectual Property Theft)"
        },
        origin: {
            label: "Which corporate asset was the source of the exfiltrated data?",
            type: "select",
            options: [
                "FILE-SRV-01 (Research Share)",
                "WKSTN-03 (Local Drive)",
                "WEB-SRV-01 (Public Root)",
                "IdP_Auth (Credential Vault)"
            ],
            correct: "FILE-SRV-01 (Research Share)"
        },
        indicator: {
            label: "What forensic indicator best distinguishes this exfiltration from standard image uploads?",
            type: "select",
            options: [
                "The user accessed Imgur during business hours",
                "The presence of 'openstego.exe' execution followed by unusually large 25MB JPG uploads",
                "Oversized ICMP echo requests transferring payload batches",
                "A 500 error status code on the image-hosting portal"
            ],
            correct: "The presence of 'openstego.exe' execution followed by unusually large 25MB JPG uploads"
        }
    },
    principles: ["Data Exfiltration (Overt Channel)", "Obfuscation / Encryption", "Insider Threat"],
    explanation: "User 'rjones', an employee in the R&D department, recently received notice that they were passed over for a promotion (revealed in the HR email). Following this, they downloaded a steganography tool (OpenStego) and accessed sensitive patent files on the Research share. They then utilized the steganography tool to hide the stolen data within legitimate-looking JPEG images, which were uploaded to a public image-hosting site. The 'smoking gun' is the combination of the tool download, the access to sensitive IP, and the subsequent high-volume (25MB) JPG uploads, which are significantly larger than typical optimized web images. Benign noise includes other users' standard business traffic and marketing asset uploads."
});
