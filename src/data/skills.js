// -----------------------------------------------------------------------
// Edit skills here. Each category renders as its own animated card.
// `items` is a flat list of strings rendered as terminal-style pills.
// -----------------------------------------------------------------------

export const skillCategories = [
  {
    id: "security",
    title: "Security / Testing",
    prompt: "~/skills/security$",
    items: [
      "VAPT",
      "Web Security Testing",
      "Enumeration / Recon",
      "Linux Privilege Escalation",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    prompt: "~/skills/tools$",
    items: [
      "Burp Suite",
      "Nmap",
      "SQLMap",
      "Wireshark",
      "Hydra",
      "Gobuster",
      "ffuf",
      "dirsearch",
      "Nikto",
    ],
  },
  {
    id: "linux",
    title: "Linux / System Security",
    prompt: "~/skills/linux$",
    items: [
      "Kali Linux",
      "Shell Workflows",
      "SUID / Sudo Concepts",
      "PATH Hijacking",
      "Cron / Persistence",
    ],
  },
  {
    id: "automation",
    title: "Programming / Automation",
    prompt: "~/skills/automation$",
    items: ["Python", "Bash", "SQL Basics"],
  },
  {
    id: "platforms",
    title: "Platforms / Virtualization",
    prompt: "~/skills/platforms$",
    items: ["VirtualBox", "VMware", "AWS Basics"],
  },
];
