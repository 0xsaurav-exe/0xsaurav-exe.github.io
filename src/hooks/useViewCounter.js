import { useEffect, useState } from "react";

// -----------------------------------------------------------------------
// View counter configuration
// -----------------------------------------------------------------------
// Edit COUNTER_NAMESPACE / COUNTER_KEY to change the counter bucket.
// Swap COUNTER_URL if you switch providers — the fetch just expects
// a JSON response with a numeric count somewhere in it; see `parseCount`.
// -----------------------------------------------------------------------
const COUNTER_NAMESPACE = "0xsaurav-exe-portfolio";
const COUNTER_KEY = "homepage";
const COUNTER_URL = `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

function parseCount(data) {
  if (typeof data?.value === "number") return data.value;
  if (typeof data?.count === "number") return data.count;
  return null;
}

/**
 * Fetches and increments a static-friendly view counter.
 * Returns { count, status } where status is "loading" | "ok" | "error".
 * On error, count stays null and the UI should hide/gracefully degrade.
 */
export default function useViewCounter() {
  const [count, setCount] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const res = await fetch(COUNTER_URL);
        if (!res.ok) throw new Error("counter request failed");
        const data = await res.json();
        const parsed = parseCount(data);
        if (!cancelled) {
          if (parsed === null) {
            setStatus("error");
          } else {
            setCount(parsed);
            setStatus("ok");
          }
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchCount();
    return () => {
      cancelled = true;
    };
  }, []);

  return { count, status };
}
