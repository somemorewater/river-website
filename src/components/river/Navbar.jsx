import { motion } from "framer-motion";
import { Github } from "lucide-react";

import riverIcon from "@/assets/river-icon-only.png";

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
            <img
              src={riverIcon}
              alt="River"
              width={22}
              height={22}
              style={{ display: "block" }}
            />
            <span style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>River</span>
            <span className="river-mono" style={{ fontSize: 11, color: "var(--muted-fg)", marginLeft: 4 }}>v0.2</span>
          </a>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ display: "none", gap: 24 }} className="nav-links">
                <a href="#architecture" className="nav-link">Architecture</a>
                <a href="#features" className="nav-link">Capabilities</a>
                <a href="#demo" className="nav-link">Demo</a>
                <a href="#roadmap" className="nav-link">Build Log</a>
                <a href="#tradeoffs" className="nav-link">Philosophy</a>
                <a href="#stack" className="nav-link">Stack</a>
              </div>
            <a
              href="https://github.com/somemorewater/river"
              target="_blank"
              rel="noreferrer"
              className="river-btn river-btn-secondary"
              style={{ padding: "8px 14px" }}
            >
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
