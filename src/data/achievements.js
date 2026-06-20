// -----------------------------------------------------------------------
// Edit achievement stats here. `value` should be a number for the
// counter animation to work; `suffix` appends text after the number.
// -----------------------------------------------------------------------

export const achievements = [
  {
    id: "ranking",
    value: 2,
    prefix: "Top ",
    suffix: "%",
    label: "Global Ranking — TryHackMe",
  },
  {
    id: "labs",
    value: 250,
    suffix: "+",
    label: "Labs & CTF Challenges Completed",
  },
  {
    id: "koth",
    value: 0.2,
    prefix: "Top ",
    suffix: "%",
    label: "King of the Hill — Epic Tier",
  },
  {
    id: "tools",
    value: 4,
    suffix: "",
    label: "Security Tools Built & Shipped",
  },
];

export const achievementNotes = [
  "King of the Hill (KOTH) Winner — Epic Tier, competitive exploitation environment",
  "250+ labs and CTF challenges completed, focused on Linux privilege escalation",
  "Practical experience with SUID exploitation, sudo misconfigurations, PATH hijacking, and GTFOBins-based methods",
];
