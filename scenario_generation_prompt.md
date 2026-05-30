# Scenario Generation Prompt

To generate new scenarios for the CompTIA Simulation Sandbox, use the following prompt with an AI assistant.

---

## The Prompt

"Act as a CompTIA CySA+ / CASP+ Content Developer. Your goal is to generate a new incident response scenario for a SOC simulation sandbox.

**IMPORTANT: Your output must be a JavaScript object that can be appended to the `scenarios` array in `scenarios.js`.**

### Master List of Principles
When selecting the 'correct' principles for the checklist, you MUST choose from this list:
- Phishing / Social Engineering
- Beaconing / Command & Control
- Data Exfiltration (Overt Channel)
- DNS Tunneling / Exfiltration
- ICMP Tunneling / Beaconing
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
- Pass-the-Hash

### How to Add a Scenario
1. Open `scenarios.js`.
2. Append the following object to the `scenarios` array.

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
      label: "Initial Access Method?",
      type: "select",
      options: ["Phishing", "Insider", "Exploit"],
      correct: "Phishing"
    }
  },
  principles: ["Phishing / Social Engineering", "Lateral Movement"], // Selection from Master List
  explanation: "A detailed technical debrief explaining the malicious narrative and how to distinguish it from the noise."
}
```

**Technical Guidelines:**
1. **Realistic Noise**: 50-70% of the log entries should be benign activity (OS updates, legitimate user logons, standard web browsing).
2. **Coherent Malicious Flow**: Ensure the malicious activity follows a logical kill chain (e.g., Auth Log login -> File Repo access -> Proxy upload).
3. **Complex Indicators**: Feature advanced techniques like Pass-the-Hash, DNS TXT record exfiltration, or oversized ICMP pings.
4. **Variety**: Scenarios can range from 'Impossible Travel' (geo-velocity alerts) to subtle insider threats."
