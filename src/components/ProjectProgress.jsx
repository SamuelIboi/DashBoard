import { useEffect, useRef } from "react";

const RADIUS = 80;
const STROKE = 14;
const CENTER = 100;
const START_ANGLE = Math.PI; // 180deg (left)
const END_ANGLE = 0;        // 0deg (right) — but we go clockwise so use 2*PI
const ARC_SPAN = Math.PI;   // half circle

// Converts a 0–1 progress value to an SVG arc path (clockwise, left→right)
function describeArc(cx, cy, r, startAngle, endAngle) {
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

// Track: from 180° to 0° (left to right, upper half)
const trackPath = describeArc(CENTER, CENTER, RADIUS, Math.PI, 2 * Math.PI);

// Segments: Completed = 41%, In Progress = 35%, Pending = 24%
const segments = [
  { pct: 0.41, color: "#1a5c37" },   // dark green — Completed
  { pct: 0.35, color: "#4caf78" },   // light green — In Progress
  { pct: 0.24, color: null },         // hatched — Pending
];

function buildSegmentPath(startPct, endPct) {
  const startAngle = Math.PI + startPct * Math.PI;
  const endAngle   = Math.PI + endPct   * Math.PI;
  return describeArc(CENTER, CENTER, RADIUS, startAngle, endAngle);
}

const HatchPattern = () => (
  <defs>
    <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#b0c8bb" strokeWidth="2.5" />
    </pattern>
    {/* Clip to the arc stroke width */}
    <clipPath id="arcClip">
      <path
        d={buildSegmentPath(0.76, 1.0)}
        fill="none"
        stroke="white"
        strokeWidth={STROKE + 2}
        strokeLinecap="butt"
      />
    </clipPath>
  </defs>
);

const LegendDot = ({ type, color }) => {
  if (type === "hatch") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
        <defs>
          <pattern id="legend-hatch" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#b0c8bb" strokeWidth="2" />
          </pattern>
        </defs>
        <circle cx="7" cy="7" r="6" fill="url(#legend-hatch)" stroke="#b0c8bb" strokeWidth="0.5" />
      </svg>
    );
  }
  return (
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
};

const ProjectProgress = () => {
  let cumulative = 0;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "20px 24px 18px",
        fontFamily: "'DM Sans', 'Nunito', sans-serif",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
        Project Progress
      </h2>

      {/* Gauge */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative", marginBottom: -10 }}>
        <svg
          viewBox="28 28 144 88"
          width="240"
          height="140"
          style={{ overflow: "visible" }}
        >
          <HatchPattern />

          {/* Track background */}
          <path
            d={trackPath}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />

          {/* Render segments */}
          {segments.map((seg, i) => {
            const start = cumulative;
            cumulative += seg.pct;
            const end = cumulative;
            const path = buildSegmentPath(start, end);

            if (seg.color === null) {
              // Hatched segment — render filled stroke + clip with hatch
              return (
                <g key={i}>
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#hatch)"
                    strokeWidth={STROKE}
                    strokeLinecap="butt"
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="#c8ddd3"
                    strokeWidth={STROKE}
                    strokeLinecap="butt"
                    style={{ opacity: 0.3 }}
                  />
                </g>
              );
            }

            return (
              <path
                key={i}
                d={path}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeLinecap={i === 0 ? "round" : "butt"}
              />
            );
          })}

          {/* End cap for last segment */}
          {(() => {
            const endPt = describeArc(CENTER, CENTER, RADIUS, Math.PI + 1.0 * Math.PI, Math.PI + 1.0 * Math.PI);
            const ex = CENTER + RADIUS * Math.cos(2 * Math.PI);
            const ey = CENTER + RADIUS * Math.sin(2 * Math.PI);
            return (
              <circle cx={ex} cy={ey} r={STROKE / 2} fill="#c8ddd3" />
            );
          })()}

          {/* Center label */}
          <text
            x={CENTER}
            y={CENTER - 6}
            textAnchor="middle"
            fontSize="22"
            fontWeight="800"
            fill="#1a1a1a"
            fontFamily="'DM Sans', sans-serif"
          >
            41%
          </text>
          <text
            x={CENTER}
            y={CENTER + 12}
            textAnchor="middle"
            fontSize="9"
            fill="#888"
            fontFamily="'DM Sans', sans-serif"
          >
            Project Ended
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          fontSize: 12,
          color: "#444",
          marginTop: 4,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <LegendDot color="#1a5c37" />
          Completed
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <LegendDot color="#4caf78" />
          In Progress
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <LegendDot type="hatch" />
          Pending
        </span>
      </div>
    </div>
  );
};

export default ProjectProgress;
