# 0xsaurav-exe — Cybersecurity Portfolio

A premium, motion-rich cybersecurity portfolio for **Saurav Saini (0xsaurav-exe)** — rebuilt from a terminal-style static site into a full React experience, while keeping the hacker-terminal identity at its core.

Built with **React + Vite + Tailwind CSS + Framer Motion**. Fully static, deploys to **GitHub Pages**.

---

## Screenshots

> Add screenshots here after your first deploy.

- `docs/screenshot-hero.png` — Hero / terminal boot
- `docs/screenshot-projects.png` — Projects section
- `docs/screenshot-terminal.png` — Interactive terminal

---

## Tech Stack

| Layer       | Choice                          |
|-------------|----------------------------------|
| Framework   | React 18                        |
| Build tool  | Vite 5                          |
| Styling     | Tailwind CSS 3                  |
| Motion      | Framer Motion 11                |
| Hosting     | GitHub Pages (static export)    |
| CI/CD       | GitHub Actions                  |

No backend, no database, no server-side rendering — everything ships as static HTML/CSS/JS.

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`). The dev server has hot module reload — edits to any component or data file appear instantly.

### 3. Build for production

```bash
npm run build
```

This outputs a fully static site into `dist/`. You can sanity-check the production build locally before deploying:

```bash
npm run preview
```

---

## Deploying to GitHub Pages

This repo is preconfigured for a **user/org site**: `0xsaurav-exe.github.io`. Two deployment paths are set up — pick one.

### Option A — GitHub Actions (recommended, automatic)

Already configured at `.github/workflows/deploy.yml`. It builds and deploys on every push to `main`.

1. Push this repo to `github.com/0xsaurav-exe/0xsaurav-exe.github.io`.
2. In the repo, go to **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. Your site goes live at `https://0xsaurav-exe.github.io` within a minute or two.

No manual build step needed — the workflow runs `npm ci && npm run build` and publishes `dist/` for you.

### Option B — Manual deploy with `gh-pages`

A `deploy` script using the `gh-pages` package is already in `package.json`.

```bash
npm run build
npm run deploy
```

This pushes the contents of `dist/` to a `gh-pages` branch. Use this if you'd rather not use GitHub Actions, but then set **Settings → Pages → Source** to "Deploy from a branch" → `gh-pages` → `/ (root)`.

---

## ⚠️ IMPORTANT: `vite.config.js` base path

GitHub Pages serves **user sites** and **project sites** from different URL roots, and Vite needs to know which one you're using or all your CSS/JS/asset links will 404 (the classic "blank white page" bug).

Open `vite.config.js`:

```js
const base = "/";
```

| Repo type | Repo name example | URL it's served at | `base` value |
|---|---|---|---|
| **User/org site** (current setup) | `0xsaurav-exe.github.io` | `https://0xsaurav-exe.github.io/` | `"/"` |
| **Project repo** | `cyber-portfolio` | `https://0xsaurav-exe.github.io/cyber-portfolio/` | `"/cyber-portfolio/"` |

**If you ever rename or fork this into a project repo**, change that one line to match your repo name exactly (case-sensitive), with both a leading and trailing slash:

```js
const base = "/cyber-portfolio/";
```

Then rebuild (`npm run build`) and redeploy. That's the only code change required to switch between the two hosting modes.

---

## Project Structure

```text
src/
  assets/                  # static images/icons used inside components
  components/
    layout/                # Navbar, Footer, shared SectionHeading
    hero/                  # Hero, HeroTerminal (boot sequence), HeroStats
    about/                 # About section + FocusCard
    skills/                # Skills section + SkillCategoryCard
    projects/               # Projects grid + ProjectCard + ProjectModal
    achievements/           # Achievements + animated StatCard
    certifications/         # Certifications + DiplomaCard
    resume/                 # Resume/Experience section
    terminal/                # InteractiveTerminal (dedicated terminal widget)
    contact/                 # Contact section
    ui/                      # Reusable primitives: GlowCard, Button,
                              # MotionReveal, StaggerContainer, CyberGridBackground
  data/                      # ← EDIT YOUR CONTENT HERE (see below)
  hooks/                     # useTerminal, useViewCounter
  pages/
    Home.jsx                 # assembles all sections in order
  App.jsx
  main.jsx
```

Almost everything you'll want to change lives in `src/data/`, not inside components — this keeps content edits safe and simple.

---

## Customization Guide — Where to Edit

| What you want to change | File |
|---|---|
| Hero headline, role lines, intro paragraph, quick facts | `src/data/profile.js` |
| About section copy | `src/data/profile.js` → `profile.about` |
| Email, GitHub, LinkedIn, TryHackMe links | `src/data/profile.js` → `profile.social` / `profile.email` |
| Skills categories & tools | `src/data/skills.js` |
| Projects (add/edit/remove cards) | `src/data/projects.js` |
| Achievement stats & counters | `src/data/achievements.js` |
| Diploma + certifications | `src/data/certifications.js` |
| Resume/experience section copy | `src/data/resume.js` |
| **Interactive terminal commands** | `src/data/terminalCommands.js` |
| View counter config | `src/hooks/useViewCounter.js` |
| Resume PDF file | `public/resume.pdf` (see below) |
| Site colors / fonts | `tailwind.config.js` |
| Favicon | `public/favicon.svg` |

---

## Motion System — How It Works & Where to Tune

The motion/interaction layer is built from a small set of reusable primitives in `src/hooks/` and `src/components/ui/`, rather than one-off animation code scattered through each section. Knowing these makes future edits fast.

### Cursor glow / spotlight
- **File:** `src/hooks/useCursorGlow.js` + `src/components/ui/CursorSpotlight.jsx`
- The glow position is spring-smoothed (not raw mouse coordinates), so it trails gently. Tune the lag with `stiffness`/`damping` in `useCursorGlow` — lower stiffness or higher damping = laggier/floatier trail.
- Tune intensity/size in `CursorSpotlight.jsx`: the `SIZE` constant and the opacity values inside the `radial-gradient(...)` string.
- Automatically disabled on touch devices and when the OS-level "reduce motion" setting is on.

### Magnetic buttons
- **File:** `src/hooks/useMagnetic.js`
- Used on `Button.jsx`, the navbar's "let's talk" link, and the contact channel cards.
- `strength` (passed where the hook is called) controls how far the element can be pulled toward the cursor, in pixels. Keep this in the 6–12 range — higher reads as gimmicky.

### Card tilt / depth
- **File:** `src/hooks/useTilt.js`, wired into `GlowCard.jsx` (so every card built on `GlowCard` gets it automatically)
- `max` controls the maximum tilt rotation in degrees (default 5–6). Set `tilt={false}` on any `GlowCard` usage to disable it for that card (already done on `StatCard`, where a tilting number reads oddly).

### Section reveal direction
- **File:** `src/components/ui/MotionReveal.jsx`
- Accepts a `direction` prop: `"up"` (default), `"left"`, `"right"`, `"blur-up"`, `"scale"`. Each section picks a direction to keep the page from feeling repetitive — e.g. About's terminal panel uses `"left"`, Achievements uses `"scale"`. Change the `direction` prop on any `<SectionHeading>` or `<MotionReveal>` call to retune a section's entrance.
- `distance` (px) and `duration` (s) are also tunable per-instance.

### Staggered groups (cards, chips, list items)
- **File:** `src/components/ui/StaggerContainer.jsx`
- Exports several item-variant presets: `staggerItemVariants` (rise from below), `staggerItemVariantsLeft`/`Right`, and `staggerItemVariantsAssemble` (scale+rise, used for dashboard-style grids like Achievements/Projects).
- Pass `stagger` (delay between each child, seconds) and `delayChildren` (initial delay before the first child) as props on `<StaggerContainer>` to retune pacing for a given section.

### Background atmosphere
- **File:** `src/components/ui/CyberGridBackground.jsx`
- Grid drift speed, glow blob drift paths, and the scanline sweep are each their own `animate`/`transition` block — adjust `duration` on any of them independently.
- Scroll-linked intensity (the grid/glow fading subtly as you scroll) is controlled by the `useTransform` calls at the top of the file.
- All of the above is automatically skipped under `prefers-reduced-motion` via `usePrefersReducedMotion.js`.

### Reduced motion
- **File:** `src/hooks/usePrefersReducedMotion.js`
- A global CSS rule in `index.css` already shortens CSS transitions/animations under `prefers-reduced-motion: reduce`. This hook additionally gates the JS-driven infinite animations (background drift, scanline, pulsing dots) that CSS can't reach on its own.

---

### Adding a terminal command

Open `src/data/terminalCommands.js` and add a new key to the `commands` object:

```js
mycommand: {
  output: () => ["line one", "line two"],
},
```

Also add `"mycommand"` to the `commandList` array (used for the `help`/`ls` text) if you want it discoverable. No component code needs to change.

### Resume file

The **Download Resume** buttons link to `profile.resumeUrl`, which defaults to `/resume.pdf`. To wire it up:

1. Place your resume PDF at `public/resume.pdf` (exact filename, lowercase).
2. That's it — Vite copies everything in `public/` to the build root untouched, so it resolves correctly under both the dev server and the deployed site, regardless of the `base` path setting.

If you'd rather use a different filename or host it elsewhere (e.g. a Google Drive link), just change `resumeUrl` in `src/data/profile.js`.

### View counter

`src/hooks/useViewCounter.js` is configured to use a static-friendly counter API and **fails gracefully** — if the counter service is unreachable, the count UI simply doesn't render (no error shown to visitors), so the rest of the page is unaffected.

```js
const COUNTER_NAMESPACE = "0xsaurav-exe-portfolio";
const COUNTER_KEY = "homepage";
const COUNTER_URL = `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;
```

To switch providers, change `COUNTER_URL` and, if the response shape differs, adjust the `parseCount()` function right above the hook to read the count from wherever your provider puts it in the JSON response.

---

## Notes on GitHub Pages Compatibility

- **No client-side routing** is used — this is a single-page scrolling site, which sidesteps GitHub Pages' lack of native SPA-routing support (no 404 rewrites needed).
- All asset paths go through Vite's bundler (`import`/`public/`), so they automatically respect the configured `base` path — no hardcoded absolute paths anywhere in the component code.
- No `localStorage`/`sessionStorage` dependency — terminal history and command state live in React state only, so there's nothing that can break under GitHub Pages' static serving.
- The view counter calls an external API directly from the browser — it works on static hosting because the counting logic lives entirely on the third-party service, not on GitHub Pages.

---

## License / Credits

Built for Saurav Saini. Feel free to fork the structure for your own portfolio — just swap out `src/data/*` and `tailwind.config.js` colors.
