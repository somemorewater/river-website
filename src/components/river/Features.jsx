import { motion } from "framer-motion";
import { Activity, Blocks, Database, HardDrive, Network, Server, Users } from "lucide-react";

const features = [
  { icon: Database, title: "In-Memory Key-Value Store", desc: "A fast, shared keyspace designed for concurrent reads/writes." },
  { icon: Server, title: "TCP Server", desc: "Async listener accepting multiple connections over a real network boundary." },
  { icon: Users, title: "Multi-Client Support", desc: "Shared state across sessions with predictable concurrency behavior." },
  { icon: HardDrive, title: "Persistent Disk Storage", desc: "Snapshots and append-style persistence to survive restarts." },
  { icon: Activity, title: "Health + Stats Monitoring", desc: "Runtime signals: key count, ops, latencies, and health checks." },
  { icon: Blocks, title: "Modular Architecture", desc: "Systems split into layers: IO, parsing, commands, storage, persistence." },
  { icon: Network, title: "RESP Protocol Development", desc: "Redis-inspired framing with an evolving parser and command surface." },
];

export function SectionHeader({ eyebrow, title, subtitle }) {
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
        <SectionHeader
          eyebrow="Current Capabilities"
          title="What River can do today."
          subtitle="A real server, real state, real persistence — built with an engineer's bias for clarity."
        />
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
              style={{
                padding: 24,
                boxShadow: "0 0 0 1px oklch(0.78 0.16 220 / 0.06) inset, 0 0 40px oklch(0.78 0.16 220 / 0.06)",
              }}
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
