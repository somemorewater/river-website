import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function useTerminalScript({ steps, speed = 18, startDelay = 250 }) {
  const [rendered, setRendered] = useState([]);
  const [active, setActive] = useState({ stepIndex: 0, charIndex: 0, done: false });

  useEffect(() => {
    let timeout = null;
    let interval = null;

    const tick = () => {
      setActive((prev) => {
        if (prev.done) return prev;

        const step = steps[prev.stepIndex];
        if (!step) return { ...prev, done: true };

        if (step.mode === "instant") {
          setRendered((r) => [...r, { ...step, text: step.text }]);
          return { stepIndex: prev.stepIndex + 1, charIndex: 0, done: false };
        }

        const nextCharIndex = Math.min(step.text.length, prev.charIndex + 1);
        const isLineDone = nextCharIndex >= step.text.length;

        setRendered((r) => {
          const next = [...r];
          const existing = next[next.length - 1];
          if (!existing || existing.__key !== step.__key) {
            next.push({ ...step, text: step.text.slice(0, nextCharIndex) });
            return next;
          }
          next[next.length - 1] = { ...existing, text: step.text.slice(0, nextCharIndex) };
          return next;
        });

        if (isLineDone) {
          return { stepIndex: prev.stepIndex + 1, charIndex: 0, done: false };
        }

        return { ...prev, charIndex: nextCharIndex };
      });
    };

    timeout = window.setTimeout(() => {
      interval = window.setInterval(tick, speed);
    }, startDelay);

    return () => {
      if (timeout) window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [steps, speed, startDelay]);

  return { rendered, active };
}

function makeSteps() {
  const mk = (step, idx) => ({ ...step, __key: `${step.kind}:${idx}:${step.text}` });

  const boot = [
    { kind: "boot", mode: "type", text: "[boot] riverd v0.2 — starting" },
    { kind: "boot", mode: "type", text: "[net]  tcp://0.0.0.0:6379 — accepting connections" },
    { kind: "boot", mode: "type", text: "[store] in-memory hashmap — shared state enabled" },
    { kind: "boot", mode: "type", text: "[persist] snapshot: loaded (keys=12)" },
    { kind: "boot", mode: "instant", text: "" },
  ];

  const prompt = "river>";
  const session = [
    { kind: "cmd", mode: "type", prompt, text: "SET name Water" },
    { kind: "out", mode: "instant", text: "OK" },
    { kind: "instant", mode: "instant", text: "" },

    { kind: "cmd", mode: "type", prompt, text: "GET name" },
    { kind: "out", mode: "instant", text: "Water" },
    { kind: "instant", mode: "instant", text: "" },

    { kind: "cmd", mode: "type", prompt, text: "PING" },
    { kind: "out", mode: "instant", text: "PONG" },
    { kind: "instant", mode: "instant", text: "" },

    { kind: "cmd", mode: "type", prompt, text: "STATS" },
    { kind: "out", mode: "instant", text: "keys: 12" },
    { kind: "out", mode: "instant", text: "operations: 48" },
    { kind: "instant", mode: "instant", text: "" },

    { kind: "cmd", mode: "type", prompt, text: "HEALTH" },
    { kind: "out", mode: "instant", text: "status: OK" },
  ];

  return [...boot, ...session].map(mk);
}

export function Terminal() {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);

  const steps = useMemo(() => makeSteps(), []);
  const typed = useTerminalScript({
    steps: reduceMotion ? steps.map((s) => ({ ...s, mode: "instant" })) : steps,
    speed: 14,
    startDelay: 220,
  });

  const lines = reduceMotion ? steps : typed.rendered;
  const isDone = reduceMotion ? true : typed.active.done;

  useEffect(() => {
    if (!reduceMotion && isDone) {
      const t = window.setTimeout(() => setRunId((id) => id + 1), 6500);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [reduceMotion, isDone]);

  return (
    <motion.div
      key={runId}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="river-glass river-glow"
      style={{ borderRadius: 14, overflow: "hidden", maxWidth: 820, width: "100%", margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-soft)",
          background: "oklch(0.18 0.02 250 / 0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f" }} />
          <span className="river-mono" style={{ marginLeft: 12, fontSize: 12, color: "var(--muted-fg)" }}>
            ~/river — tcp://127.0.0.1:6379
          </span>
        </div>

        <button
          type="button"
          onClick={() => setRunId((id) => id + 1)}
          className="river-mono"
          style={{
            fontSize: 12,
            color: "var(--muted-fg)",
            padding: "6px 10px",
            borderRadius: 10,
            border: "1px solid var(--border-soft)",
            background: "oklch(0.22 0.02 250 / 0.5)",
            cursor: "pointer",
          }}
        >
          replay
        </button>
      </div>

      <div className="river-mono" style={{ padding: "18px 20px", fontSize: 13.5, lineHeight: 1.85, minHeight: 280 }}>
        {lines.map((l, idx) => {
          if (l.kind === "instant" && l.text === "") return <div key={l.__key ?? idx} style={{ height: 10 }} />;

          if (l.kind === "cmd") {
            return (
              <div key={l.__key ?? idx} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "oklch(0.85 0.14 200)" }}>{l.prompt}</span>
                <span style={{ color: "var(--foreground)" }}>{l.text}</span>
              </div>
            );
          }

          if (l.kind === "boot") {
            return (
              <div key={l.__key ?? idx} style={{ color: "oklch(0.7 0.02 250)", opacity: 0.95 }}>
                {l.text}
              </div>
            );
          }

          return (
            <div key={l.__key ?? idx} style={{ color: "var(--muted-fg)", paddingLeft: 18 }}>
              {l.text}
            </div>
          );
        })}

        {!reduceMotion && (
          <span
            className="river-cursor"
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 8,
              height: 16,
              background: "oklch(0.85 0.14 200)",
              verticalAlign: "middle",
              marginTop: 4,
              marginLeft: 2,
              borderRadius: 2,
            }}
          />
        )}
      </div>

      <style>{`
        .river-cursor { animation: riverBlink 1s step-end infinite; }
        @keyframes riverBlink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .river-cursor { animation: none; }
        }
      `}</style>
    </motion.div>
  );
}
