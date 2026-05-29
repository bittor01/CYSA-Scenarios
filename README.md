# CompTIA Simulation Sandbox

A single-file, interactive Cybersecurity Incident Response Simulation Application designed for CompTIA exam preparation (Security+, CySA+, CASP+).

## Features

- **SOC Observation Dashboard**: Monitor logs from Web Gateways, Mail Exchanges, File Repositories, Endpoints, and Authentication Logs.
- **CySA+ Principles Checklist**: Identify specific attack patterns from a comprehensive master list, including:
    - Impossible Travel (Geo-velocity violations)
    - Beaconing & C2 Heartbeats
    - Data Exfiltration (Overt & Alternate channels)
    - Privilege Escalation & Lateral Movement
- **Interactive Randomizer**: Start a random investigation to test your detection skills without knowing the scenario type in advance.
- **Dynamic Assessment**: Solve complex questions like "How many endpoints are infected?" or calculate timing gaps in authentication logs.
- **Technical Debriefs**: Receive granular feedback for every question and checkbox, followed by an architectural explanation.

## How to Use

1. Open `index.html` in a modern browser.
2. Click **Random Case** to jump into a new investigation.
3. Toggle between network nodes in the **Network Observation Nodes** grid to hunt for Indicators of Compromise (IoCs).
4. Look for patterns:
    - **Impossible Travel**: Authentication successes from disparate countries (e.g., India and US) within minutes.
    - **Beaconing**: Periodic logs to the same external IP/Domain in Proxy or Endpoint logs.
    - **Exfiltration**: Abnormal DNS queries, oversized ICMP packets, or large POST requests.
    - **Lateral Movement**: Evidence of the same malicious process or credential use on multiple endpoints.
5. Select the relevant **CySA+ Principles** in the checklist.
6. Submit your assessment to see the **Technical Debrief**.

## Adding New Scenarios

Use the provided AI prompt in `scenario_generation_prompt.md` to generate more cases. Add the resulting objects to the `scenarios` array in the `index.html` script tag.

## Deployment

Push this repository to GitHub and enable **GitHub Pages** for a live, shareable link.
