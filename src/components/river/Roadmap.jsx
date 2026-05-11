import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";

const timeline = [
  { status: "done", title: "Core HashMap store", desc: "In-memory key-value engine with a clean internal API." },
  { status: "done", title: "CLI REPL", desc: "Local loop for fast iteration on commands and edge cases." },
  { status: "done", title: "TCP networking", desc: "Async server that accepts real client connections." },
  { status: "done", title: "Shared state", desc: "Multi-client concurrency model with predictable behavior." },
  { status: "done", title: "Persistence", desc: "Durability layer for restart survival (snapshots / append log)." },
  { status: "done", title: "Health + stats system", desc: "Operational visibility: health checks + runtime counters." },
  { status: "wip", title: "RESP protocol", desc: "Parser, framing rules, and compatibility improvements (in progress)." },
  { status: "next", title: "Benchmarking", desc: "Measure throughput/latency and validate bottlenecks." },
  { status: "next", title: "Replication", desc: "Primary/replica streaming for redundancy and scale testing." },
  { status: "next", title: "Pub/Sub", desc: "Channel-based messaging with fanout semantics." },
];

export function Roadmap() {
  return (
    <section id="roadmap" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Build Log"
          title="Progress, not promises."
          subtitle="A running log of what’s shipped, what’s in progress, and what’s next."
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
                        {it.status === "done" ? "✓ shipped" : it.status === "wip" ? "→ in progress" : "· next"}
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
