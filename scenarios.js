const MASTER_PRINCIPLES = [
    "Phishing / Social Engineering",
    "Beaconing / Command & Control",
    "Data Exfiltration (Overt Channel)",
    "Data Exfiltration (Alternate Channel)",
    "DNS Tunneling / Exfiltration",
    "ICMP Tunneling / Beaconing",
    "Privilege Escalation",
    "Lateral Movement",
    "Impossible Travel (Geo-velocity violation)",
    "Insider Threat",
    "Reconnaissance / Scanning",
    "Obfuscation / Encryption",
    "Persistence",
    "Insecure Direct Object Reference (IDOR)",
    "SQL Injection",
    "Cross-Site Scripting (XSS)",
    "Brute Force / Credential Stuffing",
    "Unauthorized Privilege Use",
    "Pass-the-Hash"
];

const scenarios = [
    {
        id: "scen-01",
        title: "Unauthorized Exfiltration",
        description: "Alert: High volume outbound data transfers detected outside core business hours.",
        logs: {
            proxy: [
                "2026-05-29 02:14:10 | 10.10.4.52 -> 192.0.2.115:443 | POST /upload HTTP/1.1 | 200 | 4.2GB",
                "2026-05-29 02:15:00 | 10.10.4.52 -> 192.0.2.115:443 | POST /upload HTTP/1.1 | 200 | 3.8GB"
            ],
            email: ["2026-05-29 09:00:10 | User a.smith checked mail | No attachments."],
            file_server: [
                "2026-05-29 01:45:12 | User: d.jones | IP: 10.10.4.52 | Read/Copy | S:\\Finances\\Q2_Proprietary_Data.csv",
                "2026-05-29 01:46:01 | User: d.jones | IP: 10.10.4.52 | Read/Copy | S:\\R&D\\Blueprints_2026.tar.gz"
            ],
            workstations: [
                "Host: WKSTN-452 | IP: 10.10.4.52 | Active User: d.jones",
                "Host: WKSTN-453 | IP: 10.10.4.53 | Active User: a.smith | Idle"
            ],
            auth_logs: [
                "2026-05-29 01:40:00 | User d.jones | Login Success | IP: 10.10.4.52 | Workstation"
            ]
        },
        questions: {
            vector: {
                label: "Initial Access Method?",
                type: "select",
                options: ["Phishing", "Insider Abuse", "Vulnerability Exploit", "Broken Auth"],
                correct: "Insider Abuse"
            }
        },
        principles: ["Insider Threat", "Data Exfiltration (Overt Channel)", "Unauthorized Privilege Use"],
        explanation: "Correct! User d.jones used their existing access to copy and exfiltrate proprietary data over a standard HTTPS channel. Noise includes regular workstation activity from a.smith."
    },
    {
        id: "scen-02",
        title: "Ransomware Spread",
        description: "Alert: Multiple endpoints reporting file encryption alerts.",
        logs: {
            proxy: ["2026-06-12 09:12:05 | 10.10.4.88 -> 93.184.216.34:80 | GET /payload.exe"],
            email: [
                "2026-06-12 08:45:00 | Inbound | From: updates@it.net | To: s.rogers@co.com | Link: 93.184.216.34/patch",
                "2026-06-12 08:50:11 | Inbound | From: marketing@co.com | To: all-staff@co.com | Monthly Newsletter"
            ],
            file_server: [
                "2026-06-12 10:15:22 | User: s.rogers | IP: 10.10.4.88 | Rename -> *.locked",
                "2026-06-12 10:20:00 | User: b.banner | IP: 10.10.4.90 | Access | S:\\Public\\Images"
            ],
            workstations: [
                "WKSTN-88 | 10.10.4.88 | payload.exe active",
                "WKSTN-89 | 10.10.4.89 | Lateral Move: SMB Admin Share Access from 10.10.4.88",
                "WKSTN-90 | 10.10.4.90 | Active User: b.banner | Standard activity"
            ],
            auth_logs: ["No anomalies."]
        },
        questions: {
            count: { label: "Infected Endpoints?", type: "number", correct: 2 }
        },
        principles: ["Phishing / Social Engineering", "Lateral Movement", "Obfuscation / Encryption", "Persistence"],
        explanation: "Correct! The attack began with phishing, followed by internal spread via SMB lateral movement. Noise logs show benign user activity from b.banner."
    },
    {
        id: "scen-05",
        title: "Impossible Travel Detection",
        description: "Alert: Identity Protection alert for user account 't.stark'. Logins detected from disparate geographic locations.",
        logs: {
            proxy: ["Standard traffic."],
            email: ["Standard traffic."],
            file_server: ["Standard traffic."],
            workstations: ["WKSTN-101 | 10.10.10.5 | User: t.stark"],
            auth_logs: [
                "2026-09-01 10:00:00 | User t.stark | Login Success | IP: 72.14.213.10 (New York, US)",
                "2026-09-01 10:12:45 | User t.stark | Login Success | IP: 117.20.14.52 (Bangalore, India)",
                "2026-09-01 10:15:00 | User t.stark | Access Granted | S:\\Confidential\\Iron_Legion_Specs.pdf",
                "2026-09-01 10:16:11 | User c.barton | Login Success | IP: 10.10.10.11 (Internal)"
            ]
        },
        questions: {
            gap: {
                label: "Time gap between disparate logins (minutes)?",
                type: "number",
                correct: 12
            }
        },
        principles: ["Impossible Travel (Geo-velocity violation)", "Brute Force / Credential Stuffing", "Unauthorized Privilege Use"],
        explanation: "Correct! The user account t.stark was used to log in from New York and Bangalore within 12 minutes. Noise includes a benign internal login from c.barton."
    }
];
