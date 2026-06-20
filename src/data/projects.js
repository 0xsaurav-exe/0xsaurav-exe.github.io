// -----------------------------------------------------------------------
// Edit your project cards here. `details` is shown in the expanded
// modal/drawer view. `github` can be left as "#" if a repo isn't public yet.
// -----------------------------------------------------------------------

export const projects = [
  {
    id: "scanforge",
    name: "ScanForge",
    tagline: "Python-based web vulnerability scanner",
    stack: ["Python", "CLI", "HTML Reports"],
    summary:
      "Detects XSS and SQL injection through automated payload injection and response analysis.",
    details: [
      "Engineered response-based detection logic to identify behavior changes across web application responses.",
      "Built a CLI interface alongside structured HTML report generation for repeatable security testing.",
      "Designed payload sets specifically for injection-class vulnerabilities, focused on accuracy over noise.",
    ],
    github: "https://github.com/0xsaurav-exe/ScanForge",
    terminalCmd: "scanforge",
  },
  {
    id: "linuxsentinel",
    name: "LinuxSentinel",
    tagline: "Linux security assessment framework",
    stack: ["Bash", "Linux", "Enumeration"],
    summary:
      "Automates enumeration, privilege escalation checks, persistence analysis, and shell activity inspection.",
    details: [
      "Runs systematic checks for SUID binaries, sudo misconfigurations, and writable PATH entries.",
      "Flags common Linux persistence mechanisms including cron jobs and suspicious shell activity.",
      "Outputs a structured report summarizing findings for fast triage during assessments.",
    ],
    github: "https://github.com/0xsaurav-exe/LinuxSentinel",
    terminalCmd: "linuxsentinel",
  },
  {
    id: "throttlex",
    name: "ThrottleX",
    tagline: "Bash-based rate-limit detection tool",
    stack: ["Bash", "HTTP", "Automation"],
    summary:
      "Automates HTTP requests and analyzes timing patterns to identify throttling and blocking mechanisms.",
    details: [
      "Automates GET/POST requests at controlled intervals to probe rate-limiting behavior.",
      "Analyzes response codes and response timing to detect throttling, blocking, or WAF interference.",
      "Built as a lightweight support tool for broader web testing workflows.",
    ],
    github: "https://github.com/0xsaurav-exe/ThrottleX",
    terminalCmd: "throttlex",
  },
  {
    id: "wordforge",
    name: "WordForge",
    tagline: "Bash-based wordlist optimization CLI",
    stack: ["Bash", "Text Processing"],
    summary:
      "Filters and optimizes large wordlists for targeted brute-force and enumeration workflows.",
    details: [
      "Implements pattern matching, length filtering, and duplicate removal using Linux text utilities.",
      "Reduces wordlist noise to speed up brute-force and content discovery workflows.",
      "Designed to slot directly into existing enumeration pipelines without extra dependencies.",
    ],
    github: "https://github.com/0xsaurav-exe/WordForge",
    terminalCmd: "wordforge",
  },
  {
    id: "steganography",
    name: "Steganography & File Analysis",
    tagline: "Hidden data extraction for CTF-style challenges",
    stack: ["Forensics", "CTF", "File Analysis"],
    summary:
      "Hands-on extraction and analysis of hidden data embedded in image and file formats.",
    details: [
      "Practiced metadata inspection, LSB extraction, and embedded file carving across CTF challenges.",
      "Used tools such as binwalk, exiftool, and steghide alongside manual hex analysis.",
      "Applied findings to recover flags and hidden payloads in CTF-style forensics challenges.",
    ],
    github: "#",
    terminalCmd: "steganography",
  },
];
