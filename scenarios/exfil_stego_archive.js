scenarios.push({
    id: "ir-scenario-2026-exfil-stego-archive",
    title: "Operation Pixels: Steganographic Exfiltration",
    description: "Suspicious high-volume uploads of image files to an unclassified image-hosting site following unauthorized access to the R&D file share.",
    logs: {
        proxy: [
            "2026-05-29T16:00:10Z - IP: 192.168.10.14 - URL: https://img-share-free.net/upload/holiday_photo_1.jpg - Status: 201 - Bytes: 15400000",
            "2026-05-29T16:02:15Z - IP: 192.168.10.14 - URL: https://img-share-free.net/upload/holiday_photo_2.jpg - Status: 201 - Bytes: 15400000",
            "2026-05-29T16:05:30Z - IP: 192.168.10.14 - URL: https://img-share-free.net/upload/holiday_photo_3.jpg - Status: 201 - Bytes: 15400000"
        ],
        email: [
            "2026-05-29T15:30:00Z - Inbound - From: notifications@slack.com - To: rjones@company.com - Subject: New message from 'IT_Support_Global' - Status: Delivered"
        ],
        file_server: [
            "2026-05-29T15:45:00Z - Share Name: \\\\FILE-SRV-01\\Research - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones",
            "2026-05-29T15:46:12Z - Object Accessed: \\\\FILE-SRV-01\\Research\\Patents\\Core_Algorithm.c - Accesses: ReadData - User: COMPANY\\rjones"
        ],
        workstations: [
            "2026-05-29T15:50:05Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned stego_tool.exe - Command: stego_tool.exe --hide Core_Algorithm.c --cover vacation.jpg --out holiday_photo_1.jpg",
            "2026-05-29T15:55:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: chrome.exe spawned - URL: https://img-share-free.net/upload"
        ],
        auth_logs: [
            "2026-05-29T09:30:00Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones"
        ]
    },
    questions: {
        vector: {
            label: "What advanced technique was used to hide the stolen data during exfiltration?",
            type: "select",
            options: [
                "DNS Tunneling",
                "ICMP Tunneling",
                "Steganography (Hiding data within image files)",
                "Overt HTTPS upload of a .zip file"
            ],
            correct: "Steganography (Hiding data within image files)"
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
        indicator: {
            label: "Which forensic indicator confirms the use of the hiding technique?",
            type: "select",
            options: [
                "The status code 201 in the proxy logs",
                "A process execution of 'stego_tool.exe' with parameters to hide a source file inside a cover image",
                "The high byte count of the outbound POST requests",
                "The use of the 'rjones' user account"
            ],
            correct: "A process execution of 'stego_tool.exe' with parameters to hide a source file inside a cover image"
        }
    },
    principles: ["Data Exfiltration (Overt Channel)", "Obfuscation / Encryption", "Unauthorized Privilege Use"],
    explanation: "An analysis of workstation WKSTN-03 revealed that an attacker (using the 'rjones' account) utilized a steganography tool ('stego_tool.exe') to hide a sensitive patent file ('Core_Algorithm.c') within multiple common JPEG images. These images were then uploaded to an unclassified image-hosting site ('img-share-free.net'). While the proxy logs show standard image uploads (Overt Channel), the process logs confirm the data was hidden (Obfuscation) to bypass simple Data Loss Prevention (DLP) filters that might look for source code or document extensions."
});
