import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { ArrowDown, Database, FileOutput, Network, ScanText, SquareTerminal, Users } from "lucide-react";

const nodes = [
  { icon: Users, label: "TCP Client", desc: "River CLI, nc, telnet, or any TCP client → 127.0.0.1:2007" },
  { icon: Network, label: "TCP Layer", desc: "Tokio listener + one task per connection (src/server/tcp.rs)" },
  { icon: ScanText, label: "RESP + Command Parser", desc: "Framed bytes → parts → strict Command enum (src/protocol, src/commands/parser.rs)" },
  { icon: SquareTerminal, label: "Command Execution", desc: "SET / GET / DEL / TTL / PING / AUTH / STATS / HEALTH (src/commands/mod.rs)" },
  { icon: Database, label: "ConcurrentStore", desc: "Sharded RwLock partitions: data + expirations + 1s cleanup worker" },
  { icon: FileOutput, label: "Snapshot Persistence", desc: "serde + bincode via atomic rename to river.db; restore + startup expiry purge" },
  { icon: ArrowDown, label: "RESP Encoder → Response", desc: "+OK · $bulk · :int · $-1 null · -ERROR over the same socket" },
];

export function Architecture() {
  return (
    <section id="architecture" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Architecture"
          title="A clean request pipeline."
          subtitle="The current data path from docs/architecture.md — parsing isolated from storage."
        />
        <div style={{ marginTop: 56, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          {nodes.map((n, i) => (
            <div key={n.label}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="river-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 22px",
                  boxShadow: "0 0 0 1px oklch(0.78 0.16 220 / 0.06) inset",
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10, display: "grid", placeItems: "center",
                  background: "var(--gradient-river)", color: "oklch(0.15 0.02 250)",
                  boxShadow: "0 0 20px oklch(0.7 0.18 240 / 0.4)", flexShrink: 0,
                }}>
                  <n.icon size={18} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{n.label}</div>
                  <div style={{ fontSize: 13, color: "var(--muted-fg)", lineHeight: 1.5 }}>{n.desc}</div>
                </div>
              </motion.div>
              {i < nodes.length - 1 && <div className="arch-line" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
