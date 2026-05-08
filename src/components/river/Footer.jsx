import { Waves, Github } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-soft)", padding: "32px 0", marginTop: 60 }}>
      <div className="river-container" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Waves size={18} style={{ color: "oklch(0.85 0.14 200)" }} />
          <span style={{ fontWeight: 600 }}>River</span>
          <span className="river-mono" style={{ fontSize: 12, color: "var(--muted-fg)", marginLeft: 8 }}>
            // Built in Rust 🦀
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a
            href="https://github.com/somemorewater/river"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Github size={14} /> GitHub
          </a>
          <span style={{ fontSize: 12, color: "var(--muted-fg)" }}>© {new Date().getFullYear()} River</span>
        </div>
      </div>
    </footer>
  );
}
