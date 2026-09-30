import { motion } from "framer-motion";
import { SectionHeader } from "./Features";

const points = [
  "Networking: Tokio TCP on 127.0.0.1:2007, RESP framing, pipelining, multi-client tasks",
  "Concurrency: sharded async RwLock store — concurrent reads across shards, per-shard writes",
  "Storage + persistence: in-memory HashMaps with TTL metadata, bincode snapshots, crash-restore behavior",
  "Protocol design: strict command parsing that never panics on user input",
];

export function About() {
  return (
    <section id="about" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="About"
          title="A learning project with production-shaped edges."
          subtitle="River exists to demystify what sits between a TCP socket and a durable keyspace: protocol framing, command execution, shared state, persistence, and observability. Experimental — not a Redis replacement."
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="river-card"
          style={{ maxWidth: 720, margin: "48px auto 0", padding: 32 }}
        >
          <ul style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
            {points.map((p) => (
              <li key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.55 }}>
                <span className="pulse-glow" style={{ width: 8, height: 8, borderRadius: 99, background: "oklch(0.85 0.14 200)", boxShadow: "0 0 10px oklch(0.85 0.14 200)", marginTop: 7, flexShrink: 0 }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
