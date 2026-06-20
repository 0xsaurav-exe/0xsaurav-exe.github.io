import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ---------------------------------------------------------------------------
// GitHub Pages base path
// ---------------------------------------------------------------------------
// This repo is configured for a USER/ORG site: 0xsaurav-exe.github.io
// User/org sites are served from the domain root, so base MUST be "/".
//
// If you ever rename or fork this into a PROJECT repo instead
// (e.g. github.com/0xsaurav-exe/cyber-portfolio, served at
// 0xsaurav-exe.github.io/cyber-portfolio/), change the line below to:
//
//   base: "/cyber-portfolio/",
//
// i.e. base must equal "/<repo-name>/" (with both leading and trailing slash).
// Getting this wrong is the #1 cause of a blank white page / broken
// CSS-JS-asset paths on GitHub Pages, so double check it matches your repo
// name exactly, including case.
// ---------------------------------------------------------------------------
const base = "/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
