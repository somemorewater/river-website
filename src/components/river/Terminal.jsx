import { motion } from "framer-motion";

const lines = [
  { prompt: "river>", cmd: "SET user Water", out: "OK" },
  { prompt: "river>", cmd: "GET user", out: "\"Water\"" },
  { prompt: "river>", cmd: "PING", out: "PONG" },
  { prompt: "river>", cmd: "DEL user", out: "(integer) 1" },
];

export function Terminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="river-glass river-glow"
      style={{ borderRadius: 14, overflow: "hidden", maxWidth: 620, width: "100%", margin: "0 auto" }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "12px 16px",
        borderBottom: "1px solid var(--border-soft)",
        background: "oklch(0.18 0.02 250 / 0.6)"
      }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f" }} />
        <span className="river-mono" style={{ marginLeft: 12, fontSize: 12, color: "var(--muted-fg)" }}>
          ~/river — tcp://127.0.0.1:6379
        </span>
      </div>
      <div className="river-mono" style={{ padding: "20px 22px", fontSize: 14, lineHeight: 1.85, minHeight: 220 }}>
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.5, duration: 0.4 }}
          >
            <div>
              <span style={{ color: "oklch(0.85 0.14 200)" }}>{l.prompt}</span>{" "}
              <span style={{ color: "var(--foreground)" }}>{l.cmd}</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.5 + 0.25, duration: 0.3 }}
              style={{ color: "var(--muted-fg)", paddingLeft: 4 }}
            >
              {l.out}
            </motion.div>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ display: "inline-block", width: 8, height: 16, background: "oklch(0.85 0.14 200)", verticalAlign: "middle", marginTop: 4 }}
        />
      </div>
    </motion.div>
  );
}