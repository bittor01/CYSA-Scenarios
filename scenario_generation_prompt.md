# Scenario Generation Prompt

To generate new scenarios for the CompTIA Simulation Sandbox, use the following prompt with an AI assistant. This prompt is designed to ensure technical accuracy and consistency across log sources.

---

## The Prompt

"Act as a CompTIA Security+ / CySA+ / CASP+ Content Developer. Your goal is to generate a new incident response scenario in JSON format for a SOC simulation sandbox.

**IMPORTANT: Before generating the JSON, you must first state the 'Ground Truth' answer for each field and briefly explain the logic of the incident (Attack Vector, Point of Origin, Affected Assets, Beaconing Method). This ensures the logs you generate are consistent with the solution.**

The output must be a single JavaScript object following this schema:

```javascript
{
  id: "unique-string-id",
  title: "Scenario Title", // Will be hidden from user until submission
  description: "Short high-level alert description.",
  logs: {
    proxy: ["Log line 1", "Log line 2"], // Label: Web Gateway
    email: ["Log line 1", "Log line 2"], // Label: Mail Exchange
    file_server: ["Log line 1", "Log line 2"], // Label: File Repository
    workstations: ["Log line 1", "Log line 2"] // Label: Endpoints
  },
  questions: {
    // Keys can be anything.
    // Support types: 'select' (requires options array) or 'number' (for counts)
    vector: {
      label: "Initial Infection Vector?",
      type: "select",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: "Option B"
    },
    count: {
      label: "How many endpoints are confirmed infected?",
      type: "number",
      correct: 3
    }
    // ... add more as needed (e.g., origin, artifact, source)
  },
  explanation: "A detailed technical debrief of the incident and why the answers are correct."
}
```

**Technical Guidelines:**
1. **Diverse Vectors**: Include DNS Exfiltration (TXT/CNAME queries), ICMP Tunneling (oversized pings), Beaconing (periodic HEARTBEATS), and Insider Threats (unauthorized local copies/uploads).
2. **Temporal Consistency**: Ensure timestamps align across different logs.
3. **Complex Indicators**: Include lateral movement (SMB/RDP logs between endpoints) to justify 'infection count' questions.
4. **Subtlety**: Mix malicious entries with normal 'noise' (e.g., standard OS updates, benign web browsing)."
