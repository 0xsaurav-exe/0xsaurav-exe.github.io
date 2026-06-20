import { profile } from "../../data/profile";
import useViewCounter from "../../hooks/useViewCounter";

export default function Footer() {
  const { count, status } = useViewCounter();

  return (
    <footer className="border-t border-hairline mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm text-muted">
          <span className="text-term-green">{profile.handle}</span>
          <span className="mx-2 text-hairline">/</span>
          <span>{profile.name}</span>
        </div>

        <div className="flex items-center gap-5 font-mono text-xs text-muted">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-term-green transition-colors">
            github
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-term-green transition-colors">
            linkedin
          </a>
          <a href={profile.social.tryhackme} target="_blank" rel="noopener noreferrer" className="hover:text-term-green transition-colors">
            tryhackme
          </a>
        </div>

        <div className="font-mono text-[11px] text-muted/70 flex items-center gap-3">
          {status === "ok" && (
            <span>
              views: <span className="text-term-green">{count.toLocaleString()}</span>
            </span>
          )}
          <span>built with React + Vite + Tailwind</span>
        </div>
      </div>
      <div className="text-center font-mono text-[11px] text-muted/50 pb-6">
        © {new Date().getFullYear()} {profile.name}. All systems nominal.
      </div>
    </footer>
  );
}
