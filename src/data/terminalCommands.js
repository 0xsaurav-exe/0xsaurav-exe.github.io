// -----------------------------------------------------------------------
// Interactive terminal command registry.
// -----------------------------------------------------------------------
// Each command is a key on `commands`. `output` can be:
//   - an array of strings (rendered as separate lines), or
//   - a function (ctx) => array of strings, for dynamic content
//     (ctx gives access to navigate() to jump to a page section).
//
// Add a new command by adding a new key here — no component changes needed.
// -----------------------------------------------------------------------

export const commandList = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "scanforge",
  "linuxsentinel",
  "throttlex",
  "wordforge",
  "achievements",
  "certifications",
  "contact",
  "resume",
  "ls",
  "history",
  "sudo",
  "clear",
];

export const commands = {
  help: {
    output: () => [
      "Available commands:",
      "",
      "  help            show this list",
      "  whoami          who I am",
      "  about           background & focus",
      "  skills          tools & technical skills",
      "  projects        list of projects",
      "  achievements    stats & rankings",
      "  certifications  diploma & training",
      "  contact         get in touch",
      "  resume          open resume",
      "  ls              list site sections",
      "  clear           clear the terminal",
    ],
  },
  whoami: {
    output: () => ["Saurav Saini  —  0xsaurav-exe", "Cybersecurity Trainee | VAPT & Penetration Testing"],
  },
  about: {
    output: () => [
      "Cybersecurity trainee focused on VAPT, penetration testing,",
      "and Linux privilege escalation.",
      "",
      "Practical experience through 250+ labs and CTF challenges.",
      "Builds own tooling in Python and Bash to automate recon work.",
    ],
  },
  skills: {
    output: () => [
      "Security:    VAPT, Web Testing, Enumeration, Linux PrivEsc",
      "Tools:       Burp Suite, Nmap, SQLMap, Wireshark, Hydra, ffuf",
      "Linux:       SUID/sudo concepts, PATH hijacking, cron, GTFOBins",
      "Automation:  Python, Bash, SQL basics",
      "Platforms:   VirtualBox, VMware, AWS basics",
    ],
  },
  projects: {
    output: () => [
      "=== Projects ===",
      "",
      "scanforge       Python web vulnerability scanner",
      "linuxsentinel   Linux security assessment framework",
      "throttlex       Bash rate-limit detection tool",
      "wordforge       Bash wordlist optimization CLI",
      "",
      "Type a project name above for details.",
    ],
  },
  scanforge: {
    output: () => [
      "ScanForge — Python-based web vulnerability scanner",
      "Detects XSS and SQL injection via payload injection",
      "and response analysis. CLI + HTML reporting.",
    ],
  },
  linuxsentinel: {
    output: () => [
      "LinuxSentinel — Linux security assessment framework",
      "Enumeration, privilege escalation checks, persistence",
      "analysis, and shell activity inspection.",
    ],
  },
  throttlex: {
    output: () => [
      "ThrottleX — Bash-based rate-limit detection tool",
      "Automates request timing analysis to detect throttling",
      "and blocking mechanisms in web applications.",
    ],
  },
  wordforge: {
    output: () => [
      "WordForge — Bash-based wordlist optimization CLI",
      "Filters, deduplicates, and pattern-matches wordlists",
      "to speed up brute-force and enumeration workflows.",
    ],
  },
  achievements: {
    output: () => [
      "=== Achievements ===",
      "",
      "[+] Top 2% Global Ranking — TryHackMe",
      "[+] King of the Hill (KOTH) Winner — Epic Tier",
      "[+] 250+ labs / CTF challenges completed",
    ],
  },
  certifications: {
    output: () => [
      "=== Certifications ===",
      "",
      "Master Diploma in Cyber Security — Craw Security",
      "Ethical Hacking (CEH-aligned) — Internshala / IIT Madras / NSDC",
      "Advent of Cyber 2025 — TryHackMe",
    ],
  },
  contact: {
    output: () => [
      "=== Contact ===",
      "",
      "Email:     sauravsaini31609@gmail.com",
      "GitHub:    github.com/0xsaurav-exe",
      "LinkedIn:  linkedin.com/in/saurav-saini-eh",
      "TryHackMe: tryhackme.com/p/KillerSourav",
    ],
  },
  resume: {
    output: () => ["Opening resume in a new tab..."],
    sideEffect: "open-resume",
  },
  ls: {
    output: () => [
      "hero/  about/  skills/  projects/  achievements/",
      "certifications/  resume/  terminal/  contact/",
    ],
  },
  sudo: {
    output: () => ["Permission denied: nice try, this isn't that kind of terminal."],
  },
  history: {
    // handled dynamically by the terminal component (needs command history)
    output: () => [],
    sideEffect: "show-history",
  },
  clear: {
    output: () => [],
    sideEffect: "clear",
  },
};

export const NOT_FOUND = (cmd) => [
  `command not found: ${cmd}`,
  `type 'help' to see available commands`,
];
