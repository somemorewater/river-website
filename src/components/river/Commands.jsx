import { motion } from "framer-motion";
import { SectionHeader } from "./Features";

const COMMANDS = [
  { name: "SET key value", desc: "Store a value. Everything after the key is the value, so spaces survive.", resp: "OK" },
  { name: "SETEX key seconds value", desc: "Store a value with a TTL in one step.", resp: "OK" },
  { name: "GET key", desc: "Fetch a value. Missing or expired keys return null.", resp: "value · (nil) in CLI" },
  { name: "DEL key", desc: "Delete a key if present. Always replies OK.", resp: "OK" },
  { name: "EXPIRE key seconds", desc: "Attach a TTL to an existing key.", resp: "1 = set · 0 = missing" },
  { name: "PING", desc: "Connectivity check. Requires auth first on password-protected servers.", resp: "PONG" },
  { name: "AUTH password", desc: "Authenticate this connection. Only meaningful with RIVER_PASSWORD set.", resp: "OK · ERROR otherwise" },
  { name: "STATS", desc: "Keys, operations, uptime, per-command counts, connections, errors, persistence.", resp: "bulk string" },
  { name: "HEALTH", desc: "Lightweight status: status, keys, operations, uptime.", resp: "bulk string" },
  { name: "EXIT / QUIT", desc: "Close this client connection. The server keeps running.", resp: "connection closes" },
  { name: "HELP [command]", desc: "CLI-local help. Never sent to the server; EXIT is an alias of QUIT.", resp: "help text" },
];

const NOT_YET = ["INFO", "DELETE alias (use DEL)", "transactions", "replication", "Pub/Sub", "lists / sets / streams", "AOF", "HTTP endpoints"];

export function Commands() {
  return (
    <section id="commands" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Command Reference"
          title="Exactly what River speaks today."
          subtitle="Derived from src/commands/parser.rs and the CLI parser in src/cli/repl.rs. Strict arity checks: wrong argument counts return ERROR invalid syntax, unknown names return ERROR unknown command."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
            marginTop: 56,
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {COMMANDS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.3) }}
              className="river-card"
              style={{ padding: "18px 20px" }}
            >
              <div className="river-mono" style={{ fontSize: 13, fontWeight: 700, color: "oklch(0.85 0.14 200)", marginBottom: 8, wordBreak: "break-word" }}>
                {c.name}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--muted-fg)", lineHeight: 1.55, marginBottom: 10 }}>{c.desc}</div>
              <div className="river-mono" style={{ fontSize: 12, color: "var(--foreground)", opacity: 0.8 }}>
                → {c.resp}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="river-mono"
          style={{ textAlign: "center", fontSize: 12.5, color: "var(--muted-fg)", marginTop: 32, lineHeight: 1.7 }}
        >
          Not implemented: {NOT_YET.join(" · ")}
        </motion.p>
      </div>
    </section>
  );
}
