import { motion } from "framer-motion";
import { SectionHeader } from "./Features";

const points = [
  "Learning systems programming the hard way",
  "Understanding databases and memory stores",
  "Exploring networking and protocol design",
  "Inspired by Redis — built from scratch",
];

export function About() {
  return (
    <section id="about" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="About"
          title="A learning project, taken seriously."
          subtitle="River exists to demystify the layers between a TCP socket and a key-value store. Every line of code is written by hand, on purpose."
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
              <li key={p} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 15 }}>
                <span className="pulse-glow" style={{ width: 8, height: 8, borderRadius: 99, background: "oklch(0.85 0.14 200)", boxShadow: "0 0 10px oklch(0.85 0.14 200)" }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}