import { motion } from "framer-motion";

function TradeoffCard({ title, points, tone = "neutral" }) {
  return (
    <motion.article
      className={`tradeoffs-card tradeoffs-card-${tone}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="tradeoffs-card-title">{title}</h3>
      <ul className="tradeoffs-card-list">
        {points.map((point) => (
          <li key={point} className="tradeoffs-card-item">
            <span className="tradeoffs-dot" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function QuoteBlock() {
  return (
    <motion.figure
      className="tradeoffs-quote"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <blockquote className="tradeoffs-quote-text">
        Not built to replace Redis.
        <br />
        Built to understand systems deeply.
      </blockquote>
      <figcaption className="tradeoffs-quote-caption">— River project notes</figcaption>
    </motion.figure>
  );
}

export function Tradeoffs() {
  return (
    <section id="tradeoffs" className="tradeoffs-section">
      <div className="river-container tradeoffs-container">
        <motion.div
          className="tradeoffs-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="section-eyebrow">Philosophy · Tradeoffs · Systems</span>
        </motion.div>

        <div className="tradeoffs-grid">
          <motion.div
            className="tradeoffs-left"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="tradeoffs-lines" aria-hidden="true">
              <span className="tradeoffs-line tradeoffs-line-1" />
              <span className="tradeoffs-line tradeoffs-line-2" />
              <span className="tradeoffs-line tradeoffs-line-3" />
            </div>

            <h2 className="tradeoffs-title">
              River chases <span className="tradeoffs-accent">understanding</span>, not hype.
            </h2>
            <p className="tradeoffs-subtitle">
              The goal is to learn systems programming deeply by building a real networked database:
              protocol framing (RESP), concurrency tradeoffs, persistence design, and observability.
              River borrows inspiration from Redis, but stays intentionally humble and explicit about constraints.
            </p>

            <div className="tradeoffs-mini">
              <div className="tradeoffs-mini-pill">Early-stage</div>
              <div className="tradeoffs-mini-pill">Performance-oriented</div>
              <div className="tradeoffs-mini-pill">Open-source</div>
            </div>
          </motion.div>

          <motion.div
            className="tradeoffs-right"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
          >
            <div className="tradeoffs-cards" role="list">
              <div role="listitem">
                <TradeoffCard
                  title="Redis"
                  tone="steady"
                  points={[
                    "Battle-tested",
                    "Mature ecosystem",
                    "Extremely optimized",
                    "Opinionated, pragmatic design",
                  ]}
                />
              </div>
              <div role="listitem">
                <TradeoffCard
                  title="River"
                  tone="explore"
                  points={[
                    "Modular systems architecture",
                    "Protocol + persistence experiments",
                    "Health/stats instrumentation",
                    "Learning-focused iteration",
                  ]}
                />
              </div>
            </div>

            <QuoteBlock />
          </motion.div>
        </div>
      </div>

      <style>{`
        .tradeoffs-section {
          position: relative;
          padding: 96px 0;
          overflow: hidden;
        }

        .tradeoffs-section::before {
          content: "";
          position: absolute;
          inset: -1px;
          pointer-events: none;
          background:
            radial-gradient(800px 400px at 20% 30%, oklch(0.78 0.16 220 / 0.12), transparent 60%),
            radial-gradient(900px 500px at 80% 70%, oklch(0.85 0.14 200 / 0.10), transparent 60%);
        }

        .tradeoffs-container {
          position: relative;
        }

        .tradeoffs-header {
          margin-bottom: 28px;
          text-align: center;
        }

        .tradeoffs-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 32px;
          align-items: start;
        }

        .tradeoffs-left {
          position: relative;
          padding: 28px 22px;
          border-radius: 18px;
        }

        .tradeoffs-lines {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 18px;
          pointer-events: none;
        }

        .tradeoffs-line {
          position: absolute;
          left: -20%;
          right: -20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, oklch(0.85 0.14 200 / 0.35), transparent);
          filter: blur(0.2px);
          opacity: 0.7;
          transform: translate3d(0, 0, 0);
          animation: tradeoffsFlow 7.5s linear infinite;
        }

        .tradeoffs-line-1 { top: 26%; animation-duration: 8.5s; }
        .tradeoffs-line-2 { top: 48%; opacity: 0.55; animation-duration: 10.5s; }
        .tradeoffs-line-3 { top: 70%; opacity: 0.45; animation-duration: 12s; }

        @keyframes tradeoffsFlow {
          0% { transform: translateX(-18%); }
          100% { transform: translateX(18%); }
        }

        .tradeoffs-title {
          font-size: clamp(28px, 3.6vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 14px;
          position: relative;
        }

        .tradeoffs-accent {
          background: var(--gradient-river);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 30px oklch(0.78 0.16 220 / 0.10);
        }

        .tradeoffs-subtitle {
          margin: 0;
          max-width: 54ch;
          color: var(--muted-fg);
          font-size: 16px;
          line-height: 1.7;
          position: relative;
        }

        .tradeoffs-mini {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
          position: relative;
        }

        .tradeoffs-mini-pill {
          font-size: 12px;
          letter-spacing: 0.02em;
          color: oklch(0.97 0.01 240 / 0.92);
          background: oklch(0.21 0.02 250 / 0.65);
          border: 1px solid oklch(1 0 0 / 10%);
          padding: 6px 10px;
          border-radius: 999px;
          box-shadow: 0 0 30px oklch(0.78 0.16 220 / 0.05);
        }

        .tradeoffs-right {
          display: grid;
          gap: 14px;
        }

        .tradeoffs-cards {
          display: grid;
          gap: 14px;
        }

        .tradeoffs-card {
          border-radius: 18px;
          padding: 18px 16px;
          background: oklch(0.21 0.02 250 / 0.55);
          border: 1px solid oklch(1 0 0 / 10%);
          box-shadow: 0 0 0 1px oklch(0.78 0.16 220 / 0.05) inset;
          transition: box-shadow 220ms ease, border-color 220ms ease, transform 220ms ease;
        }

        .tradeoffs-card:hover {
          border-color: oklch(0.85 0.14 200 / 0.28);
          box-shadow:
            0 0 0 1px oklch(0.85 0.14 200 / 0.12) inset,
            0 18px 60px oklch(0.78 0.16 220 / 0.12);
        }

        .tradeoffs-card-steady:hover {
          border-color: oklch(0.85 0.14 200 / 0.20);
        }

        .tradeoffs-card-explore:hover {
          border-color: oklch(0.78 0.16 220 / 0.30);
        }

        .tradeoffs-card-title {
          margin: 0 0 10px;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: oklch(0.97 0.01 240 / 0.9);
        }

        .tradeoffs-card-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 9px;
        }

        .tradeoffs-card-item {
          display: grid;
          grid-template-columns: 10px 1fr;
          align-items: start;
          gap: 10px;
          color: var(--muted-fg);
          font-size: 14px;
          line-height: 1.4;
        }

        .tradeoffs-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          margin-top: 4px;
          background: radial-gradient(circle at 30% 30%, oklch(0.85 0.14 200), oklch(0.78 0.16 220));
          box-shadow: 0 0 18px oklch(0.78 0.16 220 / 0.25);
        }

        .tradeoffs-quote {
          margin: 0;
          border-radius: 18px;
          padding: 16px 16px 14px;
          background: linear-gradient(180deg, oklch(0.21 0.02 250 / 0.65), oklch(0.21 0.02 250 / 0.45));
          border: 1px solid oklch(1 0 0 / 10%);
          position: relative;
          overflow: hidden;
        }

        .tradeoffs-quote::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(500px 240px at 20% 30%, oklch(0.85 0.14 200 / 0.12), transparent 60%);
          pointer-events: none;
        }

        .tradeoffs-quote-text {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
          color: oklch(0.97 0.01 240 / 0.92);
          position: relative;
          letter-spacing: -0.01em;
        }

        .tradeoffs-quote-caption {
          margin-top: 10px;
          font-size: 12px;
          color: var(--muted-fg);
          opacity: 0.9;
          position: relative;
        }

        @media (max-width: 900px) {
          .tradeoffs-grid {
            grid-template-columns: 1fr;
          }
          .tradeoffs-header { text-align: left; }
          .tradeoffs-left { padding: 22px 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tradeoffs-line { animation: none; }
        }
      `}</style>
    </section>
  );
}
