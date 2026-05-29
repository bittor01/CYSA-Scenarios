# CompTIA Simulation Sandbox

A single-file, interactive Cybersecurity Incident Response Simulation Application designed for CompTIA exam preparation (Security+, CySA+, CASP+).

## Features

- **SOC Observation Dashboard**: Monitor logs from Web Gateways, Mail Exchanges, File Repositories, Endpoints, and Authentication Logs.
- **Realistic Log Noise**: Scenarios feature benign user activity mixed with malicious indicators, forcing you to filter out the "noise."
- **Dynamic Principles Checklist**: Identify specific attack patterns from a comprehensive list. The UI adapts to each scenario and provides bold visual feedback on correct, missed, and incorrect identifications.
- **Advanced Attack Vectors**:
    - **Impossible Travel**: Authentication successes from disparate countries within minutes.
    - **DNS & ICMP Tunneling**: Data exfiltration through non-standard protocols.
    - **Lateral Movement & Persistence**: Track attackers as they move through the network.
- **Interactive Randomizer**: Jump into investigations with hidden titles to test your objective analysis skills.
- **Technical Debriefs**: Receive detailed architectural explanations that break down the malicious narrative.

## How to Use

1. Open `index.html` in a modern browser.
2. Click **Random Case** to start a new investigation.
3. Toggle between network nodes in the **Network Observation Nodes** grid.
4. Filter out benign activity (Noise) to find the true Indicators of Compromise (IoCs).
5. Identify the relevant **CySA+ Principles** in the checklist.
6. Submit your assessment to see the **Technical Debrief**.

## Adding New Scenarios

Use the provided AI prompt in `scenario_generation_prompt.md` to generate more cases. The simulation automatically handles new principles defined in scenario data.

## Deployment

Push this repository to GitHub and enable **GitHub Pages** for a live, shareable link.
