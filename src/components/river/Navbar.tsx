import { motion } from "framer-motion";
import { Waves, Github } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ position: "fixed", top: 16, left: 0, right: 0, zIndex: 50 }}
    >
      <div className="river-container">
        <div
          className="river-glass"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderRadius: 14,
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--foreground)" }}>
            <Waves size={20} style={{ color: "oklch(0.85 0.14 200)" }} />
            <span style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>River</span>
            <span className="river-mono" style={{ fontSize: 11, color: "var(--muted-fg)", marginLeft: 4 }}>v0.1</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "none", gap: 24 }} className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#architecture" className="nav-link">Architecture</a>
              <a href="#roadmap" className="nav-link">Roadmap</a>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="river-btn river-btn-secondary" style={{ padding: "8px 14px" }}>
              <Github size={15} /> GitHub
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .nav-links { display: flex !important; }
        }
        .nav-link {
          font-size: 14px; color: var(--muted-fg); text-decoration: none;
          transition: color .2s ease;
        }
        .nav-link:hover { color: oklch(0.85 0.14 200); }
      `}</style>
    </motion.nav>
  );
}