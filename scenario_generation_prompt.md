# Scenario Generation Prompt

To generate new scenarios for the CompTIA Simulation Sandbox, use the following prompt with an AI assistant. This prompt is designed to ensure consistency and technical accuracy by requiring the AI to define the "Ground Truth" before generating the logs.

---

## The Prompt

"Act as a CompTIA Security+ / CySA+ Exam Content Developer. Your goal is to generate a new incident response scenario in JSON format for a SOC simulation sandbox.

**IMPORTANT: Before generating the JSON, you must first state the 'Ground Truth' answer for each field (Initial Attack Vector, Affected User, Malicious Artifact, Threat Source) and briefly explain the logic of the incident. This ensures the logs you generate are consistent with the solution.**

The output must be a single JavaScript object following this schema:

```javascript
{
  id: "unique-string-id",
  title: "Scenario Title",
  description: "Short high-level alert description.",
  logs: {
    proxy: ["Log line 1", "Log line 2"],
    email: ["Log line 1", "Log line 2"],
    file_server: ["Log line 1", "Log line 2"],
    workstations: ["Log line 1", "Log line 2"]
  },
  questions: {
    vector: {
      label: "What was the initial attack vector?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: "Option B"
    },
    user: {
      label: "Which corporate identity is implicated?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: "Option A"
    },
    artifact: {
      label: "What malicious artifact or data file was targeted?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: "Option C"
    },
    source: {
      label: "Where did the threat originate or destination IP?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: "Option D"
    }
  },
  explanation: "A detailed architectural explanation of the incident and why the answers are correct."
}
```

**Technical Guidelines:**
1. **Consistency**: Ensure timestamps across different logs align with the narrative.
2. **Authenticity**: Use realistic log formats (e.g., Syslog, Apache Access Logs, Windows Event IDs).
3. **Complexity**: Include "noise" logs (normal activity) to make the user hunt for the indicators of compromise (IoCs).
4. **Variety**: Scenarios can include SQL Injection, Password Spraying, Ransomware, Man-in-the-Middle, etc."
