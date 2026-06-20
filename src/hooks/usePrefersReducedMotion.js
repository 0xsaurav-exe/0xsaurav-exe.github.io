import { useEffect, useState } from "react";

/**
 * Tracks the user's prefers-reduced-motion setting reactively.
 * Use this to gate Framer Motion's JS-driven infinite/ambient
 * animations (background drift, pulsing dots, etc.) — the global CSS
 * `@media (prefers-reduced-motion: reduce)` rule in index.css only
 * catches CSS transitions/animations, not motion values driven by
 * `animate={{ ... repeat: Infinity }}`.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
