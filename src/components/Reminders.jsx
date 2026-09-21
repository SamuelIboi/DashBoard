import { useState, useEffect } from "react";

const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.889L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#6b7280" strokeWidth="1.8" />
    <path d="M12 7v5l3 3" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      stroke="#1a6b3a"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const reminders = [
  {
    id: 1,
    title: "Meeting with Arc Company",
    time: "02:00 pm – 04:00 pm",
    type: "video",
    tag: "Today",
  },
  {
    id: 2,
    title: "Design Review Session",
    time: "04:30 pm – 05:00 pm",
    type: "general",
    tag: "Today",
  },
  {
    id: 3,
    title: "Sprint Planning Call",
    time: "10:00 am – 11:00 am",
    type: "video",
    tag: "Tomorrow",
  },
];

export default function Reminders() {
  const [active, setActive] = useState(0);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  // Auto-cycle reminder cards every 4s for a live feel
  useEffect(() => {
    const t = setInterval(() => {
      if (!joining && !joined) {
        setActive((p) => (p + 1) % reminders.length);
      }
    }, 4000);
    return () => clearInterval(t);
  }, [joining, joined]);

  const current = reminders[active];

  const handleStart = () => {
    setJoining(true);
    setTimeout(() => {
      setJoining(false);
      setJoined(true);
      setTimeout(() => setJoined(false), 2500);
    }, 1200);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "22px 24px 20px",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <BellIcon />
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#111827", letterSpacing: "-0.3px" }}>
            Reminders
          </span>
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: "#1a6b3a",
            background: "#e8f5ee",
            padding: "3px 9px",
            borderRadius: "20px",
            letterSpacing: "0.2px",
          }}
        >
          {current.tag}
        </span>
      </div>

      {/* Card body */}
      <div
        key={active}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "6px",
          animation: "fadeSlideIn 0.35s ease",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "800",
            color: "#0f1c13",
            lineHeight: "1.25",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          {current.title}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
          <ClockIcon />
          <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>{current.time}</span>
        </div>
      </div>

      {/* CTA button — only show for video meetings */}
      {current.type === "video" && (
        <button
          onClick={handleStart}
          disabled={joining || joined}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: joined ? "#22c55e" : joining ? "#145c30" : "#1a6b3a",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 0",
            fontSize: "14px",
            fontWeight: "700",
            cursor: joining || joined ? "default" : "pointer",
            width: "100%",
            letterSpacing: "-0.1px",
            transition: "background 0.25s, transform 0.15s",
            transform: joining ? "scale(0.98)" : "scale(1)",
            boxShadow: joined
              ? "0 4px 14px rgba(34,197,94,0.35)"
              : "0 4px 14px rgba(26,107,58,0.30)",
          }}
        >
          {joined ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Joined!
            </>
          ) : joining ? (
            <>
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Connecting…
            </>
          ) : (
            <>
              <VideoIcon />
              Start Meeting
            </>
          )}
        </button>
      )}

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: "5px", justifyContent: "center", paddingTop: "2px" }}>
        {reminders.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setJoined(false); }}
            style={{
              width: i === active ? "18px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === active ? "#1a6b3a" : "#d1d5db",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.25s, background 0.25s",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
