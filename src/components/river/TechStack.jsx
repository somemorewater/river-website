import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { Braces, Cpu, HardDrive, Network, ScrollText, Waypoints } from "lucide-react";

const stack = [
  { icon: Braces, title: "Rust (edition 2024)", desc: "Memory-safe core with explicit ownership; river 1.0.0." },
  { icon: Network, title: "Tokio (full)", desc: "Async runtime for the TCP listener, per-client tasks, and the 1s TTL cleanup worker." },
  { icon: Waypoints, title: "Serde + Bincode", desc: "Snapshot encoding for river.db — full-store snapshots via atomic temp-file rename." },
  { icon: HardDrive, title: "river.db snapshots", desc: "Default persistence file (RIVER_DB_PATH to override). Restore on startup with expiry purge." },
  { icon: Cpu, title: "Sharded HashMap store", desc: "ConcurrentStore: Vec<RwLock<Shard>> with data + expiration maps. RIVER_SHARDS tunes contention." },
  { icon: ScrollText, title: "Tracing + Criterion", desc: "Leveled logs via RIVER_LOG; five Criterion benches cover store, protocol, and TTL/persistence." },
];

export function TechStack() {
  return (
    <section id="stack" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Boring parts done carefully."
          subtitle="A small set of primitives — chosen for control, debuggability, and systems learning. Defaults: 127.0.0.1:2007, river.db, auth off."
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
