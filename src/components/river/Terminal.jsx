import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Deterministic frontend playback of a real `cargo run -- cli` workflow.
 *
 * No server, network, or random values: every line below mirrors output
 * shapes produced by `src/cli/repl.rs` (`River CLI v…`, `Connected to …`,
 * human-readable frames, `(nil)` for missing keys, `Bye.` on QUIT).
 * STATS/HEALTH numbers are illustrative — the field names and shapes are real.
 */

const PROMPT = "river> ";

const TRANSCRIPT = [
  { kind: "shell", text: "cargo run -- cli", typed: true },
  { kind: "boot", text: "River CLI v1.0.0" },
  { kind: "boot", text: "Connected to 127.0.0.1:2007" },
  { kind: "boot", text: "Type HELP for available commands." },
  { kind: "gap" },

  { kind: "cmd", text: "PING", typed: true },
  { kind: "out", text: "PONG" },
  { kind: "gap" },

  { kind: "cmd", text: "SET language Rust", typed: true },
  { kind: "out", text: "OK" },
  { kind: "gap" },

  { kind: "cmd", text: "GET language", typed: true },
  { kind: "out", text: "Rust" },
  { kind: "gap" },

  { kind: "cmd", text: "SETEX session active 30", typed: true },
  { kind: "out", text: "OK" },
  { kind: "gap" },

  { kind: "cmd", text: "GET session", typed: true },
  { kind: "out", text: "active" },
  { kind: "gap" },

  { kind: "cmd", text: "EXPIRE language 60", typed: true },
  { kind: "out", text: "1" },
  { kind: "gap" },

  { kind: "cmd", text: "STATS", typed: true },
  { kind: "out", text: "keys: 2" },
  { kind: "out", text: "operations: 6" },
  { kind: "out", text: "uptime: 12s" },
  { kind: "out", text: "commands: 8" },
  { kind: "gap" },

  { kind: "cmd", text: "HEALTH", typed: true },
  { kind: "out", text: "status: OK" },
  { kind: "out", text: "keys: 2" },
  { kind: "out", text: "operations: 6" },
  { kind: "gap" },

  { kind: "cmd", text: "HELP", typed: true },
  { kind: "out", text: "Commands:" },
  { kind: "out", text: "  SET <key> <value>  ·  GET <key>  ·  DEL <key>" },
  { kind: "out", text: "  EXPIRE / SETEX for TTLs  ·  PING  ·  STATS  ·  HEALTH" },
  { kind: "gap" },

  { kind: "cmd", text: "QUIT", typed: true },
  { kind: "out", text: "Bye." },
];

const STATIC_TEXT = TRANSCRIPT.map((l) =>
  l.kind === "cmd" ? `${PROMPT}${l.text}` : (l.text ?? ""),
).join("\n");

// Timing tuned for a ~20s loop: typing + short pauses + end hold.
const TYPE_MS = 42;
const SHELL_TYPE_MS = 46;
const PAUSE_AFTER_CMD_MS = 420;
const PAUSE_AFTER_OUT_MS = 300;
const PAUSE_AFTER_GAP_MS = 120;
const END_HOLD_MS = 4500;
const START_DELAY_MS = 350;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Terminal() {
  const [lines, setLines] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [runId, setRunId] = useState(0);
  const wrapRef = useRef(null);
  const bodyRef = useRef(null);
  const stateRef = useRef({ timers: [], cancelled: false, visible: true });

  const staticLines = useMemo(() => TRANSCRIPT, []);

  // Detect reduced motion once (plus live changes).
  useEffect(() => {
    setReduced(prefersReducedMotion());
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const clearTimers = useCallback(() => {
    const s = stateRef.current;
    s.timers.forEach((t) => window.clearTimeout(t));
    s.timers = [];
  }, []);

  // Autoplay when the section enters the viewport; freeze while off-screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const vis = entry.isIntersecting;
        stateRef.current.visible = vis;
        setPlaying(vis);
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Core playback loop. Re-runs on replay (runId) or visibility change.
  useEffect(() => {
    if (reduced) {
      setLines(staticLines);
      return undefined;
    }
    const s = stateRef.current;
    s.cancelled = false;

    if (!playing) {
      // Freeze: drop pending timers but keep rendered progress.
      clearTimers();
      return undefined;
    }

    clearTimers();
    setLines([]);

    let step = 0;
    let cancelled = false;
    s.cancelled = false;

    const schedule = (fn, ms) => {
      const id = window.setTimeout(() => {
        s.timers = s.timers.filter((t) => t !== id);
        if (!cancelled && !s.cancelled && s.visible) fn();
        else if (!cancelled && !s.cancelled && !s.visible) {
          // Re-queue while hidden instead of advancing.
          schedule(fn, 400);
        }
      }, ms);
      s.timers.push(id);
    };

    const pushLine = (line) => setLines((prev) => [...prev, line]);

    const playStep = () => {
      if (cancelled || s.cancelled) return;
      if (step >= TRANSCRIPT.length) {
        schedule(() => {
          if (!cancelled && !s.cancelled) setRunId((id) => id + 1);
        }, END_HOLD_MS);
        return;
      }
      const item = TRANSCRIPT[step];
      step += 1;

      if (item.kind === "gap") {
        pushLine(item);
        schedule(playStep, PAUSE_AFTER_GAP_MS);
        return;
      }

      if (!item.typed) {
        // Server output / boot text appears instantly after a beat.
        schedule(() => {
          pushLine(item);
          schedule(playStep, PAUSE_AFTER_OUT_MS);
        }, item.kind === "out" ? PAUSE_AFTER_CMD_MS : 160);
        return;
      }

      // Typed line: shell or `river>` command, character by character.
      const full = item.text;
      const speed = item.kind === "shell" ? SHELL_TYPE_MS : TYPE_MS;
      let chars = 0;
      pushLine({ ...item, text: "" });
      const typeNext = () => {
        if (cancelled || s.cancelled) return;
        chars += 1;
        const slice = full.slice(0, chars);
        setLines((prev) => {
          const next = [...prev];
          next[next.length - 1] = { ...item, text: slice };
          return next;
        });
        if (chars < full.length) {
          schedule(typeNext, speed);
        } else {
          schedule(playStep, item.kind === "cmd" ? PAUSE_AFTER_CMD_MS : PAUSE_AFTER_OUT_MS);
        }
      };
      schedule(typeNext, speed);
    };

    const startId = window.setTimeout(
      () => {
        if (!cancelled && !s.cancelled && s.visible) playStep();
        else if (!cancelled && !s.cancelled) {
          // Wait for visibility before starting.
          const wait = () => {
            if (cancelled || s.cancelled) return;
            if (s.visible) playStep();
            else schedule(wait, 400);
          };
          wait();
        }
      },
      step === 0 && lines.length === 0 ? START_DELAY_MS : 60,
    );
    s.timers.push(startId);

    return () => {
      cancelled = true;
      window.clearTimeout(startId);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, playing, runId]);

  // Keep the newest output in view inside the terminal body.
  useEffect(() => {
    const el = bodyRef.current;
    if (el && !reduced) el.scrollTop = el.scrollHeight;
  }, [lines, reduced]);

  const replay = useCallback(() => {
    clearTimers();
    setLines([]);
    setPlaying(true);
    stateRef.current.visible = true;
    setRunId((id) => id + 1);
  }, [clearTimers]);

  const visibleLines = reduced ? staticLines : lines;

  return (
    <div
      ref={wrapRef}
      className="river-glass"
      style={{ borderRadius: 14, overflow: "hidden", maxWidth: 840, width: "100%", margin: "0 auto" }}
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
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f", flexShrink: 0 }} />
          <span className="river-mono" style={{ marginLeft: 12, fontSize: 12, color: "var(--muted-fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            river — cli · 127.0.0.1:2007
          </span>
        </div>

        {!reduced && (
          <button
            type="button"
            onClick={replay}
            className="river-mono"
            style={{
              fontSize: 12,
              color: "var(--muted-fg)",
              padding: "6px 12px",
              borderRadius: 10,
              border: "1px solid var(--border-soft)",
              background: "oklch(0.22 0.02 250 / 0.5)",
              cursor: "pointer",
            }}
          >
            ↻ Replay
          </button>
        )}
      </div>

      <div
        ref={bodyRef}
        role="log"
        aria-label="River CLI demo transcript (animated playback, no live server)"
        className="river-mono"
        style={{
          padding: "18px 20px",
          fontSize: "clamp(12px, 1.6vw, 13.5px)",
          lineHeight: 1.8,
          minHeight: 300,
          maxHeight: 420,
          overflowY: "auto",
          overflowX: "auto",
          textAlign: "left",
        }}
      >
        {visibleLines.map((l, idx) => {
          if (l.kind === "gap") return <div key={idx} aria-hidden="true" style={{ height: 10 }} />;
          if (l.kind === "shell") {
            return (
              <div key={idx} style={{ display: "flex", gap: 8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <span style={{ color: "var(--muted-fg)" }}>$</span>
                <span style={{ color: "var(--foreground)" }}>
                  {l.text}
                  {!reduced && idx === visibleLines.length - 1 && <Cursor />}
                </span>
              </div>
            );
          }
          if (l.kind === "cmd") {
            const isLast = idx === visibleLines.length - 1;
            return (
              <div key={idx} style={{ display: "flex", gap: 10, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <span style={{ color: "oklch(0.85 0.14 200)", flexShrink: 0 }}>{PROMPT}</span>
                <span style={{ color: "var(--foreground)" }}>
                  {l.text}
                  {!reduced && isLast && <Cursor />}
                </span>
              </div>
            );
          }
          if (l.kind === "boot") {
            return (
              <div key={idx} style={{ color: "oklch(0.7 0.02 250)", opacity: 0.95, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {l.text}
              </div>
            );
          }
          return (
            <div key={idx} style={{ color: "var(--muted-fg)", paddingLeft: 18, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {l.text}
            </div>
          );
        })}

        {!reduced && visibleLines.length > 0 && visibleLines[visibleLines.length - 1]?.kind !== "cmd" &&
          visibleLines[visibleLines.length - 1]?.kind !== "shell" && (
          <span aria-hidden="true" className="river-mono" style={{ color: "oklch(0.85 0.14 200)" }}>
            {PROMPT}
            <Cursor />
          </span>
        )}
        {/* Screen-reader fallback: full transcript regardless of animation state. */}
        <span className="sr-only">{STATIC_TEXT}</span>
      </div>

      <style>{`
        .river-cursor { display: inline-block; width: 8px; height: 15px; background: oklch(0.85 0.14 200); vertical-align: -2px; margin-left: 3px; border-radius: 2px; animation: riverBlink 1s step-end infinite; }
        @keyframes riverBlink { 50% { opacity: 0; } }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
        @media (prefers-reduced-motion: reduce) {
          .river-cursor { animation: none; }
        }
      `}</style>
    </div>
  );
}

function Cursor() {
  return <span className="river-cursor" aria-hidden="true" />;
}
