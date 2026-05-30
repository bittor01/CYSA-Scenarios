# CompTIA Simulation Sandbox - Scenario TODO List

To provide comprehensive coverage for CySA+ and CASP+ exams, the following scenarios should be developed:

## Missing Attack Vectors (High Priority)
- [ ] **SQL Injection (SQLi)**: Web Gateway logs showing `' OR 1=1` style attacks or UNION-based exfiltration.
- [ ] **Cross-Site Scripting (XSS)**: Script tags or encoded payloads in proxy logs targeting user sessions.
- [ ] **Insecure Direct Object Reference (IDOR)**: Sequential ID enumeration in URL parameters to access other users' data.
- [ ] **Ransomware Staging**: Mass file renames/encryptions on the File Repo, spawning of `vssadmin.exe` on endpoints.
- [ ] **Brute Force / Credential Stuffing**: High-volume 4625 (Logon Failure) events followed by a single 4624 (Success) from a single IP.
- [ ] **Privilege Escalation (Local)**: Execution of `whoami /priv` or `getsystem` style commands on a workstation.
- [ ] **Cloud-Specific Attacks**: Unauthorized S3 bucket access or MFA bypass alerts in auth logs.

## "Common on Exam" Variations (Multiple Scenarios Needed)
- [ ] **Phishing**:
    - Variation 1: Malicious Attachment (Macro-enabled).
    - Variation 2: Credential Harvesting Link (Lookalike domain).
    - Variation 3: QR Code Phishing (Quishing).
- [ ] **Lateral Movement**:
    - Variation 1: RDP-based (TCP 3389).
    - Variation 2: SMB/PsExec (TCP 445).
    - Variation 3: WMI-based (TCP 135/445).
- [ ] **Data Exfiltration**:
    - Variation 1: Overt HTTPS upload (Dropbox/Google Drive).
    - Variation 2: DNS Tunneling (TXT records).
    - Variation 3: Steganography or Encrypted Archives.

## Proposed Log Improvements
- [ ] **Mail Exchange**: Add `Links` and `Attachments` fields to email log objects to more clearly distinguish vectors (as suggested by the user).
- [ ] **Auth Logs**: Include Geo-IP data (City/Country) consistently for all logon events.
- [ ] **Endpoints**: Add `Parent Process` to workstation logs to better show process hollowing or injection.
