# CompTIA Simulation Sandbox

A single-file, interactive Cybersecurity Incident Response Simulation Application designed for CompTIA exam preparation (Security+, CySA+, CASP+).

## Features

- **SOC Aesthetic**: Modern Security Operations Center dark theme.
- **Interactive Asset Network**: Toggle between Proxy, Email, File Servers, and Workstations to investigate logs.
- **Dynamic Scenarios**: Switch between different incident types (Exfiltration, Ransomware, etc.).
- **Immediate Feedback**: Submit your analysis and receive instant validation and architectural explanations.
- **Self-Contained**: Runs entirely in `index.html` with no backend required. Perfect for GitHub Pages.

## How to Use

1. Open `index.html` in any modern web browser.
2. Select a scenario from the dropdown menu in the header.
3. Click on different assets in the "Asset Network" grid to view their specific logs in the terminal.
4. Answer the assessment questions in the right-hand panel.
5. Click **Submit Analysis** to see your score and the architectural explanation of the incident.

## Adding New Scenarios

To add more scenarios, you can use the AI prompt provided in `scenario_generation_prompt.md`.

1. Copy the prompt from `scenario_generation_prompt.md`.
2. Paste it into an AI assistant (like ChatGPT, Claude, or Gemini).
3. Once the AI generates the JSON object, add it to the `scenarios` array in the `<script>` tag of `index.html`.

## Deployment

Simply push this repository to GitHub and enable **GitHub Pages** in the repository settings to host your simulation live.
