import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { Braces, Cpu, HardDrive, Network, Timer, Waypoints } from "lucide-react";

const stack = [
  { icon: Braces, title: "Rust", desc: "A memory-safe core with explicit ownership and predictable performance." },
  { icon: Timer, title: "Tokio", desc: "Async runtime powering the TCP server and concurrent client handling." },
  { icon: Waypoints, title: "Serde", desc: "Structured encoding/decoding for snapshots and internal metadata." },
  { icon: HardDrive, title: "Bincode", desc: "Compact binary persistence format for fast writes and reloads." },
  { icon: Network, title: "TCP Sockets", desc: "A real network boundary with backpressure, framing, and timeouts." },
  { icon: Cpu, title: "HashMap Store", desc: "In-memory keyspace with shared multi-client state and locking strategy." },
];

export function TechStack() {
  return (
    <section id="stack" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Boring parts done carefully."
          subtitle="A small set of primitives—chosen for control, debuggability, and systems learning."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 56,
          }}
        >
          {stack.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="river-card"
              style={{ padding: 22, display: "grid", gap: 10 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    background: "oklch(0.85 0.14 200 / 0.08)",
                    border: "1px solid oklch(0.85 0.14 200 / 0.22)",
                    color: "oklch(0.85 0.14 200)",
                    boxShadow: "0 0 0 1px oklch(0.78 0.16 220 / 0.10) inset",
                  }}
                >
                  <it.icon size={16} />
                </div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{it.title}</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted-fg)", lineHeight: 1.55 }}>{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

