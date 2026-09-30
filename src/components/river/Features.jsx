import { motion } from "framer-motion";
import { Activity, KeyRound, Network, Save, Store, TerminalSquare } from "lucide-react";

const features = [
  { icon: Store, title: "Sharded In-Memory Store", desc: "HashMap<String, String> behind a sharded async RwLock layer (ConcurrentStore). Shard count via RIVER_SHARDS; no global mutex on the hot path." },
  { icon: Network, title: "Tokio TCP + RESP", desc: "Server on 127.0.0.1:2007. RESP-inspired framing with pipelining, fragmented-frame handling, and per-client tasks for multi-client state." },
  { icon: Save, title: "Snapshot Persistence", desc: "serde + bincode snapshots via atomic temp-file rename to river.db. Saves after SET / SETEX / DEL / EXPIRE and TTL cleanup; restores on restart." },
  { icon: TerminalSquare, title: "River CLI (REPL)", desc: "`cargo run -- cli` speaks RESP under the hood and prints human-readable output — (nil) for missing keys, HELP locally, --raw for frame debugging." },
  { icon: Activity, title: "Observability", desc: "tracing logs (RIVER_LOG, default info) plus STATS and HEALTH: keys, operations, uptime, per-command and connection counters." },
  { icon: KeyRound, title: "TTL + Optional Auth", desc: "EXPIRE / SETEX with passive reads, 1s background cleanup, and startup purge. Single-password auth via RIVER_PASSWORD; localhost default, no TLS." },
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
          subtitle="Verified against the current implementation — snapshots only, no append log, no latencies claimed."
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
