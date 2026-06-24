scenarios.push({
    id: "ir-scenario-2026-exfil-stego-archive",
    title: "Operation Pixels: Steganographic Exfiltration",
    description: "Suspicious high-volume uploads of image files to a personal cloud storage site following unauthorized access to the R&D file share.",
    logs: {
        proxy: [
            "2026-06-05T13:12:45Z - IP: 192.168.10.121 - URL: https://canva.example.com/upload/asset - Action: Allowed - Method: POST - Category: Media/Arts - Status: 200 - Bytes: 1250000 - Note: Uploading campaign_hero.png",
            "2026-06-05T13:15:30Z - IP: 192.168.10.122 - URL: https://github.com/company-org/api-backend/info/refs - Action: Allowed - Method: POST - Category: IT/Development - Status: 200 - Bytes: 452000",
            "2026-06-05T13:20:00Z - IP: 192.168.10.22 - URL: https://slack.com/api/rtm.start - Action: Allowed - Category: Business/Collaboration - Status: 200 - Bytes: 3100",
            "2026-06-05T13:35:10Z - IP: 192.168.10.22 - URL: https://personal-drive.example.net/upload/photo_01.jpg - Action: Allowed - Method: POST - Category: Personal Storage - Status: 200 - Bytes: 52400000",
            "2026-06-05T13:37:45Z - IP: 192.168.10.22 - URL: https://personal-drive.example.net/upload/photo_02.jpg - Action: Allowed - Method: POST - Category: Personal Storage - Status: 200 - Bytes: 51850000",
            "2026-06-05T13:40:20Z - IP: 192.168.10.22 - URL: https://personal-drive.example.net/upload/photo_03.jpg - Action: Allowed - Method: POST - Category: Personal Storage - Status: 200 - Bytes: 53100000",
            "2026-06-05T13:42:15Z - IP: 192.168.10.121 - URL: https://canva.example.com/upload/asset - Action: Allowed - Method: POST - Category: Media/Arts - Status: 200 - Bytes: 850000",
            "2026-06-05T13:50:00Z - IP: 192.168.10.14 - URL: https://stackoverflow.com - Action: Allowed - Category: IT/Development - Status: 200 - Bytes: 12400"
        ],
        email: [
            "2026-06-05T13:00:10Z - Inbound - From: notifications@slack.com - To: tturner@company.com - Subject: You have unread mentions - Status: Delivered",
            "2026-06-05T13:05:45Z - Internal - From: hr-updates@company.com - To: employee-all@company.com - Subject: Notice: Upcoming Holiday Schedule - Status: Delivered",
            "2026-06-05T13:30:15Z - Outbound - From: kbaker@company.com - To: dev-contractor@external-agency.com - Subject: RE: API Integration Docs - Status: Sent"
        ],
        file_server: [
            "2026-06-05T13:08:15Z - Share Name: \\\\FILE-SRV-01\\Marketing - Access Request: Allowed - Source IP: 192.168.10.121 - User: COMPANY\\mjenkins",
            "2026-06-05T13:09:22Z - Object Accessed: \\\\FILE-SRV-01\\Marketing\\Raw_Photography\\Conference_2026.zip - Accesses: ReadData - Source IP: 192.168.10.121 - User: COMPANY\\mjenkins",
            "2026-06-05T13:20:10Z - Share Name: \\\\FILE-SRV-01\\R_and_D - Access Request: Allowed - Source IP: 192.168.10.22 - User: COMPANY\\tturner",
            "2026-06-05T13:22:40Z - Object Accessed: \\\\FILE-SRV-01\\R_and_D\\Project_Nova_Blueprints.zip - Accesses: ReadData - Source IP: 192.168.10.22 - User: COMPANY\\tturner",
            "2026-06-05T13:45:00Z - Share Name: \\\\FILE-SRV-01\\Public - Access Request: Allowed - Source IP: 192.168.10.14 - User: COMPANY\\rjones"
        ],
        workstations: [
            "2026-06-05T13:08:10Z - WKSTN-21 (192.168.10.121) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe --url https://canva.example.com",
            "2026-06-05T13:12:00Z - WKSTN-22 (192.168.10.122) - EventID: 4688 - Process Created: explorer.exe spawned git.exe push origin main",
            "2026-06-05T13:26:30Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: explorer.exe spawned cmd.exe",
            "2026-06-05T13:28:00Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned cmd.exe /c copy /b C:\\Users\\tturner\\Pictures\\vacation_01.jpg + C:\\Users\\tturner\\Downloads\\Project_Nova_Blueprints.zip C:\\Users\\tturner\\Pictures\\upload_01.jpg",
            "2026-06-05T13:28:45Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: cmd.exe spawned cmd.exe /c copy /b C:\\Users\\tturner\\Pictures\\vacation_02.jpg + C:\\Users\\tturner\\Downloads\\Project_Nova_Specs.zip C:\\Users\\tturner\\Pictures\\upload_02.jpg",
            "2026-06-05T13:30:10Z - WKSTN-12 (192.168.10.22) - EventID: 4688 - Process Created: explorer.exe spawned chrome.exe --new-window https://personal-drive.example.net",
            "2026-06-05T13:50:00Z - WKSTN-03 (192.168.10.14) - EventID: 4688 - Process Created: explorer.exe spawned powershell.exe -ExecutionPolicy Bypass -File C:\\Scripts\\Audit_Checks.ps1"
        ],
        auth_logs: [
            "2026-06-05T13:00:15Z - WKSTN-12 (192.168.10.22) - EventID: 4624 - Successful Logon - User: COMPANY\\tturner - Logon Type: 2 (Interactive)",
            "2026-06-05T13:05:00Z - WKSTN-21 (192.168.10.121) - EventID: 4624 - Successful Logon - User: COMPANY\\mjenkins - Logon Type: 2 (Interactive)",
            "2026-06-05T13:10:00Z - WKSTN-22 (192.168.10.122) - EventID: 4624 - Successful Logon - User: COMPANY\\kbaker - Logon Type: 2 (Interactive)",
            "2026-06-05T13:48:30Z - WKSTN-03 (192.168.10.14) - EventID: 4624 - Successful Logon - User: COMPANY\\rjones - Logon Type: 2 (Interactive)"
        ]
    },
    questions: {
        vector: {
            label: "How did the threat actor evade standard Data Loss Prevention (DLP) file-type blocking to stage the sensitive data?",
            type: "select",
            options: [
                "By encrypting the files using an AES-256 password-protected zip archive",
                "By using a binary copy command to append the sensitive archive to the end of a benign JPG image file",
                "By splitting the zip archive into multiple smaller volumes to evade size limits",
                "By exfiltrating the data via base64 encoded DNS TXT queries"
            ],
            correct: "By using a binary copy command to append the sensitive archive to the end of a benign JPG image file"
        },
        indicator: {
            label: "Which web proxy indicator definitively suggests the uploaded image files contain obfuscated data?",
            type: "select",
            options: [
                "The destination URL resolving to an unclassified, personal cloud storage domain",
                "The HTTP status code 200 OK returned from the remote server",
                "An anomalously large byte count (e.g., 52MB) for standard JPG image uploads",
                "The presence of the POST method rather than the GET method"
            ],
            correct: "An anomalously large byte count (e.g., 52MB) for standard JPG image uploads"
        },
        origin: {
            label: "Which user account is responsible for initiating the unauthorized data staging and exfiltration?",
            type: "select",
            options: [
                "mjenkins",
                "tturner",
                "kbaker",
                "rjones"
            ],
            correct: "tturner"
        }
    },
    principles: [
        "Insider Threat",
        "Obfuscation / Encryption",
        "Data Exfiltration (Alternate Channel)"
    ],
    explanation: "At 13:20:10Z, an insider threat ('tturner' on WKSTN-12) successfully accessed the restricted R&D network share and downloaded the 'Project_Nova_Blueprints.zip' archive. Knowing that standard DLP appliances often block outbound .zip file extensions or large unclassified uploads, the user employed a basic steganographic evasion technique. At 13:28:00Z, tturner executed the native Windows 'copy /b' command to append the raw binary of the zip file to the end of a benign JPG image ('vacation_01.jpg'), producing a hybridized 'upload_01.jpg' file. Because the file header remains a standard JPG, naive DLP filters allow it to pass. However, proxy logs captured between 13:35:10Z and 13:40:20Z reveal the anomaly: these JPG image uploads to 'personal-drive.example.net' were upwards of 52 Megabytes each, indicating the presence of hidden, massive payloads within the image layers. Concurrent benign marketing activity by 'mjenkins' uploading genuine imagery to Canva provides an operational baseline for comparison."
});