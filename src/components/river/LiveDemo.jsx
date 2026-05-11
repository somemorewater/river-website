import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { Terminal } from "./Terminal";

export function LiveDemo() {
  return (
    <section id="demo" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Live Demo"
          title="Talk to River like a real server."
          subtitle="A realistic, interactive-ish session showing the current command surface and runtime signals."
        />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{ marginTop: 56 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}

