import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { Archive, Database, HardDrive, Layers, Server, Terminal, User } from "lucide-react";

const nodes = [
  { icon: User, label: "Client", desc: "redis-cli, telnet, or any TCP client" },
  { icon: Server, label: "TCP Layer", desc: "Tokio-based listener + connection tasks" },
  { icon: Layers, label: "RESP Parser", desc: "Frames bytes into typed requests (in progress)" },
  { icon: Terminal, label: "Command System", desc: "Routes parsed commands into the execution layer" },
  { icon: Database, label: "RiverStore", desc: "Shared in-memory keyspace with multi-client state" },
  { icon: Archive, label: "Persistence Layer", desc: "Snapshots / append-style logs for durability" },
  { icon: HardDrive, label: "Disk", desc: "On-disk state reloaded at startup" },
];

export function Architecture() {
  return (
    <section id="architecture" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Architecture"
          title="A clean request pipeline."
          subtitle="The current data path, modeled like infrastructure docs—not a marketing diagram."
        />
        <div style={{ marginTop: 56, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
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
                  boxShadow: "0 0 20px oklch(0.7 0.18 240 / 0.4)",
                }}>
                  <n.icon size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{n.label}</div>
                  <div style={{ fontSize: 13, color: "var(--muted-fg)" }}>{n.desc}</div>
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
