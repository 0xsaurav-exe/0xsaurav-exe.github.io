/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05080A",
        panel: "#0A1410",
        hairline: "#14241E",
        term: {
          green: "#39FF8C",
          dim: "#1F8F56",
        },
        cyan: {
          DEFAULT: "#2FE0E8",
          dim: "#1A7E84",
        },
        muted: "#7A8A95",
        ink: "#D7F5E4",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(57,255,140,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,140,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glow: "0 0 18px rgba(57,255,140,0.35)",
        "glow-cyan": "0 0 18px rgba(47,224,232,0.35)",
        "glow-sm": "0 0 8px rgba(57,255,140,0.25)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scan: "scan 6s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        scan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 44px" },
        },
      },
    },
  },
  plugins: [],
};
