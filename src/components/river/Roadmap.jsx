import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { HardDriveDownload, Copy, Radio, Clock, Network, Zap } from "lucide-react";

const items = [
  { icon: HardDriveDownload, title: "Persistence", desc: "AOF + snapshotting to disk" },
  { icon: Copy, title: "Replication", desc: "Primary/replica streaming" },
  { icon: Radio, title: "Pub/Sub", desc: "Channel-based messaging" },
  { icon: Clock, title: "Expiration", desc: "TTL + lazy/active eviction" },
  { icon: Network, title: "Clustering", desc: "Hash-slot sharding across nodes" },
  { icon: Zap, title: "Protocol Optimizations", desc: "Pipelining + custom binary frames" },
];

export function Roadmap() {
  return (
    <section id="roadmap" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Roadmap"
          title="Where the river is flowing."
          subtitle="Each milestone is an excuse to dive deeper into systems."
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16, marginTop: 56,
        }}>
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="river-card"
              style={{ padding: 22, display: "flex", flexDirection: "column", gap: 10 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <it.icon size={16} style={{ color: "oklch(0.85 0.14 200)" }} />
                <span className="river-mono" style={{ fontSize: 11, color: "var(--muted-fg)" }}>0{i + 1}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{it.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted-fg)", lineHeight: 1.5 }}>{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}