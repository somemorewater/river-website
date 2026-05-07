import { motion } from "framer-motion";
import { Database, Network, Cpu, Feather } from "lucide-react";

const features = [
  { icon: Database, title: "In-Memory Storage", desc: "All data lives in RAM for sub-millisecond reads and writes." },
  { icon: Network, title: "TCP-Based Server", desc: "A simple, fast TCP listener speaking a Redis-style protocol." },
  { icon: Cpu, title: "Built With Rust", desc: "Memory-safe, zero-cost abstractions, fearless concurrency." },
  { icon: Feather, title: "Lightweight Architecture", desc: "Tiny binary, minimal dependencies, easy to read end-to-end." },
];

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-0.025em", marginTop: 16 }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: "var(--muted-fg)", marginTop: 12, fontSize: 16, lineHeight: 1.6 }}>{subtitle}</p>}
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader eyebrow="Features" title="Small surface, sharp edges." subtitle="Everything River does, it tries to do well." />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18, marginTop: 56,
        }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="river-card"
              style={{ padding: 24 }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                display: "grid", placeItems: "center", marginBottom: 16,
                background: "oklch(0.85 0.14 200 / 0.1)",
                border: "1px solid oklch(0.85 0.14 200 / 0.25)",
                color: "oklch(0.85 0.14 200)",
              }}>
                <f.icon size={18} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, letterSpacing: "-0.01em" }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted-fg)", lineHeight: 1.55 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}