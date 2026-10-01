import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { SectionHeader } from "./Features";

const RELEASE = "https://github.com/somemorewater/river/releases/tag/v1.0.0";
const dl = (file) => `https://github.com/somemorewater/river/releases/download/v1.0.0/${file}`;

const PLATFORMS = [
  { label: "Linux x86_64", file: "river-v1.0.0-linux-x86_64.tar.gz", dir: "linux-x86_64", bin: "./river" },
  { label: "Linux aarch64", file: "river-v1.0.0-linux-aarch64.tar.gz", dir: "linux-aarch64", bin: "./river" },
  { label: "macOS x86_64", file: "river-v1.0.0-macos-x86_64.tar.gz", dir: "macos-x86_64", bin: "./river" },
  { label: "macOS aarch64", file: "river-v1.0.0-macos-aarch64.tar.gz", dir: "macos-aarch64", bin: "./river" },
  { label: "Windows x86_64", file: "river-v1.0.0-windows-x86_64.zip", dir: null, bin: ".\\river.exe" },
  { label: "Windows aarch64", file: "river-v1.0.0-windows-aarch64.zip", dir: null, bin: ".\\river.exe" },
];

export function DownloadRelease() {
  return (
    <section id="download" style={{ padding: "120px 0", position: "relative" }}>
      <div className="river-container">
        <SectionHeader
          eyebrow="Download"
          title="River v1.0.0, ready to run."
          subtitle="One executable per platform with both subcommands: river server starts the database, river cli opens the interactive client."
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
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={p.label}
              href={dl(p.file)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.24) }}
              className="river-card"
              style={{ padding: "18px 20px", textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Download size={15} style={{ color: "oklch(0.85 0.14 200)", flexShrink: 0 }} />
                <div style={{ fontWeight: 600, fontSize: 15 }}>{p.label}</div>
              </div>
              <div className="river-mono" style={{ fontSize: 12, color: "var(--muted-fg)", wordBreak: "break-all", lineHeight: 1.6 }}>
                {p.file}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="river-card"
          style={{ maxWidth: 760, margin: "32px auto 0", padding: 28 }}
        >
          <div className="river-mono" style={{ fontSize: 13, lineHeight: 2, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
{`# Linux / macOS
tar -xzf river-v1.0.0-linux-x86_64.tar.gz
cd linux-x86_64
./river server

# Windows (PowerShell)
Expand-Archive river-v1.0.0-windows-x86_64.zip -DestinationPath river-win
cd river-win
.\\river.exe server

# Then connect (another terminal)
river cli   # PING → PONG`}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <a href={dl("SHA256SUMS")} className="river-btn river-btn-secondary" style={{ fontSize: 13 }}>
              SHA256SUMS
            </a>
            <a href={RELEASE} target="_blank" rel="noreferrer" className="river-btn river-btn-secondary" style={{ fontSize: 13 }}>
              Release notes
            </a>
          </div>
          <p className="river-mono" style={{ fontSize: 12, color: "var(--muted-fg)", marginTop: 16, lineHeight: 1.7 }}>
            Verify: `sha256sum -c SHA256SUMS` (Linux/macOS) or compare `Get-FileHash` output on Windows.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
