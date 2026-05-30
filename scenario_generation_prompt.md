# Scenario Generation Prompt

To generate new scenarios for the CompTIA Simulation Sandbox, use the following prompt with an AI assistant.

---

## The Prompt

"Act as a CompTIA CySA+ / CASP+ Content Developer. Your goal is to generate a new incident response scenario for a SOC simulation sandbox.

**IMPORTANT: Your output must be a JavaScript file containing a single `scenarios.push({ ... });` statement.**

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
1. Create a new file in the `scenarios/` directory named with a human-readable name (e.g. `sqli_attack.js`).
2. Add the filename to the `scenarioManifest` array in `scenarios/manifest.js`.
3. The file should contain:

```javascript
scenarios.push({
  id: "ir-scenario-2026-unique-id",
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
});
```

### Technical Design Guidelines

1. **Ground Truth & Narratives**:
   - Before writing the code, articulate a 'Ground Truth' summary of the attack.
   - Define a 'Malicious Narrative' (the specific steps the attacker took).
   - Define 2-3 'Noise Narratives' (benign user activities that serve as distractions).

2. **CompTIA-Style "Best" Answers**:
   - When designing questions, ensure the 'best' answer is the most specific one.
   - Example: For a beaconing alert, prioritize "machinelike regularity in timing" (e.g., exactly every 60 seconds) over generic indicators like "consistent payload size."

3. **Realistic Noise**:
   - 50-70% of the log entries should be benign activity (OS updates, legitimate user logons, standard web browsing, routine administrative tasks).

4. **Coherent Malicious Flow**:
   - Ensure the malicious activity follows a logical kill chain (e.g., Phishing Email -> Workstation execution -> LSASS dump -> Lateral Movement to Server -> Data Exfiltration via Proxy).

5. **Variety**:
   - Include diverse vectors: SQL Injection, XSS, Ransomware staging, API abuse, and sophisticated insider threats.
"
