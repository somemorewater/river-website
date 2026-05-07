import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { User, Server, Code2, HardDrive, Send } from "lucide-react";

const nodes = [
  { icon: User, label: "Client", desc: "redis-cli, telnet, or any TCP client" },
  { icon: Server, label: "TCP Server", desc: "Async listener accepting connections" },
  { icon: Code2, label: "Command Parser", desc: "Reads RESP-style frames into commands" },
  { icon: HardDrive, label: "Storage Engine", desc: "In-memory hashmap with thread-safe access" },
  { icon: Send, label: "Response", desc: "Encoded reply written back over the socket" },
];

export function Architecture() {
  return (
    <section id="architecture" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Architecture"
          title="From socket to storage."
          subtitle="A single request, traced through River's pipeline."
        />
        <div style={{ marginTop: 56, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          {nodes.map((n, i) => (
            <div key={n.label}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="river-card"
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px" }}
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