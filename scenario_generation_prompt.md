# Scenario Generation Prompt

To generate new scenarios for the CompTIA Simulation Sandbox, use the following prompt with an AI assistant. This prompt is designed to ensure technical accuracy and consistency across log sources.

---

## The Prompt

"Act as a CompTIA Security+ / CySA+ / CASP+ Content Developer. Your goal is to generate a new incident response scenario in JSON format for a SOC simulation sandbox.

**IMPORTANT: Before generating the JSON, you must first state the 'Ground Truth' answer for each field and briefly explain the logic of the incident (Attack Vector, Point of Origin, Affected Assets, Principles Involved). This ensures the logs you generate are consistent with the solution.**

### Master List of Principles
When selecting the 'correct' principles for the checklist, you MUST choose from this list:
- Phishing / Social Engineering
- Beaconing / Command & Control
- Data Exfiltration (Overt Channel)
- Data Exfiltration (Alternate Channel)
- Privilege Escalation
- Lateral Movement
- Impossible Travel (Geo-velocity violation)
- Insider Threat
- Reconnaissance / Scanning
- Obfuscation / Encryption
- Persistence
- Insecure Direct Object Reference (IDOR)
- SQL Injection
- Cross-Site Scripting (XSS)
- Brute Force / Credential Stuffing
- Unauthorized Privilege Use

The output must be a single JavaScript object following this schema:

```javascript
{
  id: "unique-string-id",
  title: "Scenario Title",
  description: "Short high-level alert description.",
  logs: {
    proxy: ["Log line"],        // Web Gateway
    email: ["Log line"],        // Mail Exchange
    file_server: ["Log line"],  // File Repo
    workstations: ["Log line"], // Endpoints
    auth_logs: ["Log line"]     // Auth Logs
  },
  questions: {
    // Keys can be anything. Types: 'select' (requires options) or 'number'
    vector: {
      label: "Initial Infection Vector?",
      type: "select",
      options: ["Phishing", "Insider", "Exploit"],
      correct: "Phishing"
    },
    count: {
      label: "Infected Endpoints?",
      type: "number",
      correct: 1
    }
  },
  principles: ["Phishing / Social Engineering", "Persistence"], // Array from Master List
  explanation: "A detailed technical debrief of the incident."
}
```

**Technical Guidelines:**
1. **Diverse Indicators**: Include DNS Exfiltration (TXT/CNAME), ICMP Tunneling (oversized pings), Beaconing (periodic HEARTBEATS), and Impossible Travel (disparate IPs within impossible timeframes).
2. **Temporal Consistency**: Ensure timestamps align across different logs (e.g., Auth Log login happens before File Repo access).
3. **Complex Indicators**: Include lateral movement (SMB/RDP logs between endpoints) to justify 'infection count' questions.
4. **Subtlety**: Mix malicious entries with normal 'noise' (e.g., standard OS updates, benign web browsing)."
