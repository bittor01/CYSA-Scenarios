# CompTIA Simulation Sandbox

A single-file, interactive Cybersecurity Incident Response Simulation Application designed for CompTIA exam preparation.

## Features

- **SOC Observation Dashboard**: Monitor logs from Web Gateways, Mail Exchanges, File Repositories, and Endpoints.
- **Diverse Attack Patterns**: Scenarios include DNS Exfiltration, ICMP Tunneling, Ransomware, and Insider Threats.
- **Interactive Randomizer**: Start a random investigation to test your detection skills without knowing the scenario type in advance.
- **Dynamic Assessment**: Handle complex questions like "How many endpoints are infected?" using number and selection inputs.
- **Technical Debriefs**: Receive instant validation and architectural explanations for every investigation.

## How to Use

1. Open `index.html` in a modern browser.
2. Click **Random Investigation** to jump into a new case, or select an investigation by ID from the header.
3. Toggle between network nodes in the **Network Observation Nodes** grid to hunt for Indicators of Compromise (IoCs).
4. Look for patterns:
    - **Beaconing**: Periodic logs to the same external IP/Domain.
    - **Exfiltration**: Abnormal DNS TXT queries or oversized ICMP packets.
    - **Lateral Movement**: Evidence of the same malicious process on multiple endpoints.
5. Submit your assessment to see the **Technical Debrief**.

## Adding New Scenarios

Use the provided AI prompt in `scenario_generation_prompt.md` to generate more cases. Add the resulting objects to the `scenarios` array in the `index.html` script tag.

## Deployment

Push this repository to GitHub and enable **GitHub Pages** for a live, shareable link.
