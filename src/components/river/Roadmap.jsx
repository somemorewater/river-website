import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";

const timeline = [
  { status: "done", title: "TCP server + multi-client state", desc: "Tokio listener on 127.0.0.1:2007; per-connection tasks sharing one ConcurrentStore." },
  { status: "done", title: "RESP protocol subset", desc: "Simple / integer / bulk / array / error / null frames; pipelining and fragmented-read handling." },
  { status: "done", title: "Command surface", desc: "SET, SETEX, GET, DEL, EXPIRE, PING, AUTH, STATS, HEALTH, EXIT/QUIT — strict arity, never panics on input." },
  { status: "done", title: "Sharded store + TTL", desc: "Sharded async RwLock partitions; EXPIRE/SETEX with passive reads, 1s cleanup, startup purge, persisted expirations." },
  { status: "done", title: "Snapshot persistence", desc: "serde + bincode via atomic temp-file rename to river.db; restore on restart. No AOF yet." },
  { status: "done", title: "River CLI (REPL)", desc: "`cargo run -- cli` with human-readable output, HELP, --raw frames, RIVER_PASSWORD auto-auth." },
  { status: "done", title: "Auth + observability", desc: "Optional single-password auth (localhost default, no TLS) plus tracing logs, STATS, HEALTH." },
  { status: "done", title: "Benchmarks", desc: "Criterion suites: store_concurrency, store_ops, store_workloads, protocol, ttl_persistence." },
  { status: "wip", title: "Crash recovery / durability", desc: "Partial: snapshots only. Checksums, manifests, and append-only log are future work." },
  { status: "next", title: "INFO + richer introspection", desc: "Memory hints and persistence state beyond today's STATS/HEALTH." },
  { status: "next", title: "Replication · transactions · Pub/Sub", desc: "Explicitly not implemented. Post-v1 ideas alongside eviction policies and HTTP diagnostics." },
];

export function Roadmap() {
  return (
    <section id="roadmap" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Build Log"
          title="Progress, not promises."
          subtitle="Implemented means shipped and tested. Partial means snapshots-only durability. Future is future — never presented as done."
        />
        <div
          className="river-card"
          style={{
            marginTop: 56,
            padding: 26,
            maxWidth: 860,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 14,
              position: "relative",
              paddingLeft: 24,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 8,
                top: 6,
                bottom: 6,
                width: 2,
                background:
                  "linear-gradient(180deg, oklch(0.85 0.14 200 / 0.8), oklch(0.7 0.18 240 / 0.15))",
                borderRadius: 99,
                boxShadow: "0 0 24px oklch(0.78 0.16 220 / 0.12)",
              }}
            />
            {timeline.map((it, i) => {
              const icon =
                it.status === "done" ? (
                  <CheckCircle2 size={16} />
                ) : it.status === "wip" ? (
                  <Loader2 size={16} />
                ) : (
                  <CircleDashed size={16} />
                );
              const color =
                it.status === "done"
                  ? "oklch(0.85 0.14 200)"
                  : it.status === "wip"
                    ? "oklch(0.7 0.18 240)"
                    : "oklch(0.7 0.02 250)";

              return (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px 1fr",
                    gap: 14,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      color,
                      background: "oklch(0.85 0.14 200 / 0.06)",
                      border: "1px solid oklch(0.85 0.14 200 / 0.14)",
                      marginTop: 2,
                      boxShadow: "0 0 24px oklch(0.78 0.16 220 / 0.08)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className={it.status === "wip" ? "river-spin" : undefined}
                      style={{
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {icon}
                    </span>
                  </div>

                  <div style={{ display: "grid", gap: 6 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "baseline",
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="river-mono" style={{ fontSize: 12, color: "var(--muted-fg)" }}>
                        {it.status === "done" ? "✓ implemented" : it.status === "wip" ? "→ partial" : "· future"}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>{it.title}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--muted-fg)", lineHeight: 1.55 }}>{it.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes riverSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .river-spin { animation: riverSpin 1.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .river-spin { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
