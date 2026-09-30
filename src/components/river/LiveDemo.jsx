import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { Terminal } from "./Terminal";

export function LiveDemo() {
  return (
    <section id="demo" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="River CLI"
          title="The real CLI workflow, on replay."
          subtitle="Animated playback of an actual `cargo run -- cli` session — PING, SET, GET, TTLs, STATS, HEALTH, HELP, QUIT. No server required; the browser renders the transcript like a video."
        />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{ marginTop: 40 }}
        >
          <Terminal />
          <p
            className="river-mono"
            style={{ textAlign: "center", fontSize: 12, color: "var(--muted-fg)", marginTop: 16 }}
          >
            river&gt; prompt · human-readable responses · STATS values illustrative
          </p>
        </motion.div>
      </div>
    </section>
  );
}
