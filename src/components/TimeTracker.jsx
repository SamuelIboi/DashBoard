import { useState, useEffect, useRef } from "react";

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="5" width="4" height="14" rx="1.5" fill="white" />
    <rect x="14" y="5" width="4" height="14" rx="1.5" fill="white" />
  </svg>
);

const StopIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="5" width="14" height="14" rx="2" fill="#ef4444" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 4.5l14 7.5-14 7.5V4.5z" fill="white" />
  </svg>
);

// Animated wave bars
const WaveBars = ({ running }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "28px" }}>
    {[0.6, 1, 0.75, 0.9, 0.5, 0.85, 0.65, 1, 0.7, 0.55, 0.9, 0.8].map((h, i) => (
      <div
        key={i}
        style={{
          width: "3px",
          borderRadius: "2px",
          background: `rgba(134,239,172,${0.35 + h * 0.45})`,
          height: `${h * 100}%`,
          animation: running ? `wave ${0.8 + (i % 4) * 0.15}s ease-in-out ${i * 0.07}s infinite alternate` : "none",
          transition: "height 0.3s",
        }}
      />
    ))}
  </div>
);

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(5048); // 01:24:08 as in screenshot
  const [running, setRunning] = useState(true);
  const [stopped, setStopped] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && !stopped) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, stopped]);

  const fmt = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return { h, m, sec };
  };

  const { h, m, sec } = fmt(seconds);

  const handleStop = () => {
    setStopped(true);
    setRunning(false);
    setTimeout(() => {
      setStopped(false);
      setSeconds(0);
      setRunning(false);
    }, 1800);
  };

  const handlePlayPause = () => {
    if (stopped) return;
    setRunning(r => !r);
  };

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #0d3320 0%, #1a6b3a 60%, #145c30 100%)",
        borderRadius: "20px",
        padding: "20px 20px 18px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        boxShadow: "0 2px 20px rgba(26,107,58,0.35)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture orbs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
        borderRadius: "20px",
      }}>
        <div style={{
          position: "absolute", width: "120px", height: "120px",
          background: "radial-gradient(circle, rgba(134,239,172,0.12) 0%, transparent 70%)",
          top: "-20px", right: "-20px", borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", width: "80px", height: "80px",
          background: "radial-gradient(circle, rgba(134,239,172,0.08) 0%, transparent 70%)",
          bottom: "10px", left: "-10px", borderRadius: "50%",
        }} />
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <span style={{
          fontSize: "14px", fontWeight: "700", color: "rgba(255,255,255,0.9)",
          letterSpacing: "-0.2px",
        }}>
          Time Tracker
        </span>
        <div style={{
          display: "flex", alignItems: "center", gap: "5px",
          background: "rgba(255,255,255,0.1)", borderRadius: "20px",
          padding: "3px 9px",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: running ? "#86efac" : "#6b7280",
            boxShadow: running ? "0 0 6px #86efac" : "none",
            animation: running ? "pulse 1.4s ease infinite" : "none",
          }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: "600" }}>
            {stopped ? "Stopped" : running ? "Live" : "Paused"}
          </span>
        </div>
      </div>

      {/* Wave visualizer */}
      <div style={{ position: "relative" }}>
        <WaveBars running={running} />
      </div>

      {/* Timer display */}
      <div style={{
        display: "flex", alignItems: "baseline", gap: "1px",
        position: "relative",
      }}>
        {[h, m, sec].map((unit, i) => (
          <span key={i} style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{
              fontSize: "38px",
              fontWeight: "800",
              color: stopped ? "rgba(255,255,255,0.4)" : "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
              transition: "color 0.4s",
              fontVariantNumeric: "tabular-nums",
            }}>
              {unit}
            </span>
            {i < 2 && (
              <span style={{
                fontSize: "28px", fontWeight: "300",
                color: running ? "rgba(134,239,172,0.8)" : "rgba(255,255,255,0.3)",
                margin: "0 1px",
                transition: "color 0.4s",
                animation: running ? "blink 1s step-end infinite" : "none",
              }}>:</span>
            )}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Pause / Play */}
        <button
          onClick={handlePlayPause}
          style={{
            width: "44px", height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: stopped ? "default" : "pointer",
            transition: "background 0.18s, transform 0.12s",
            opacity: stopped ? 0.4 : 1,
          }}
          onMouseEnter={e => { if (!stopped) e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
          onMouseDown={e => { if (!stopped) e.currentTarget.style.transform = "scale(0.92)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {running ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Stop */}
        <button
          onClick={handleStop}
          style={{
            width: "44px", height: "44px",
            borderRadius: "50%",
            background: "rgba(239,68,68,0.15)",
            border: "1.5px solid rgba(239,68,68,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: stopped ? "default" : "pointer",
            transition: "background 0.18s, transform 0.12s",
            opacity: stopped ? 0.4 : 1,
          }}
          onMouseEnter={e => { if (!stopped) e.currentTarget.style.background = "rgba(239,68,68,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
          onMouseDown={e => { if (!stopped) e.currentTarget.style.transform = "scale(0.92)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <StopIcon />
        </button>

        {/* Elapsed label */}
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: "500" }}>
            elapsed
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.65)", fontWeight: "600" }}>
            {Math.floor(seconds / 3600) > 0
              ? `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
              : `${Math.floor(seconds / 60)}m ${seconds % 60}s`}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.5); }
          to   { transform: scaleY(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
