import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Terminal } from "./Terminal";

import logoDark from "@/assets/river-full-logo-dark-mode.png";
import logoLight from "@/assets/river-logo-light-mode.png";

export function Hero() {
  return (
    <section id="top" className="river-noise" style={{ position: "relative", paddingTop: 160, paddingBottom: 100, overflow: "hidden" }}>
      <div className="river-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div
        className="river-flow-bg"
        style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 280, transform: "translateY(-50%)", filter: "blur(40px)", pointerEvents: "none" }}
      />
      <div className="river-container" style={{ position: "relative", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">v0.1 · Experimental · Open Source</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          style={{ marginTop: 18 }}
        >
          <picture>
            <source srcSet={logoLight} media="(prefers-color-scheme: light)" />
            <img
              src={logoDark}
              alt="River"
              style={{
                height: 44,
                width: "auto",
                display: "inline-block",
                filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.35))",
              }}
            />
          </picture>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: "clamp(64px, 12vw, 160px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            margin: "24px 0 8px",
          }}
        >
          <span className="river-gradient-text">River</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="river-mono"
          style={{ fontSize: 15, color: "oklch(0.85 0.14 200)", marginTop: 12 }}
        >
          <span style={{ opacity: 0.6 }}>{">"}</span> An in-memory data store built in Rust.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          style={{
            maxWidth: 620, margin: "20px auto 36px",
            fontSize: 17, lineHeight: 1.6, color: "var(--muted-fg)",
          }}
        >
          Fast. Lightweight. Experimental. Built to explore systems programming
          from the ground up — one socket, one byte, one keyspace at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}
        >
          <a href="#about" className="river-btn river-btn-primary">
            View Documentation <ArrowRight size={15} />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="river-btn river-btn-secondary">
            <Github size={15} /> GitHub
          </a>
        </motion.div>

        <Terminal />
      </div>
    </section>
  );
}
