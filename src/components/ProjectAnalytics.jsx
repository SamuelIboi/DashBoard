const days = [
  { label: "S", value: 30, active: false },
  { label: "M", value: 55, active: false },
  { label: "T", value: 74, active: true  },  // highlighted with percentage label
  { label: "W", value: 45, active: false },
  { label: "T", value: 35, active: false },
  { label: "F", value: 28, active: false },
  { label: "S", value: 20, active: false },
];

// Diagonal stripe pattern via SVG for inactive bars
const StripePattern = ({ id }) => (
  <defs>
    <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#d1d5db" strokeWidth="2.5" />
    </pattern>
  </defs>
);

const Bar = ({ value, active, label, maxValue = 100 }) => {
  const heightPct = (value / maxValue) * 100;

  // Color logic matching the design:
  // active (T=74%) → light green (lime-ish)
  // high values (M) → dark green
  // rest → striped gray
  const getBarStyle = () => {
    if (active) return { fill: "#4ade80" }; // light green
    if (value >= 50) return { fill: "#166534" }; // dark green
    return { fill: "url(#stripe)" }; // striped
  };

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      {/* Bar container */}
      <div className="relative w-full flex items-end justify-center" style={{ height: 120 }}>
        {/* Percentage label above active bar */}
        {active && (
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-gray-700">
            {value}%
          </span>
        )}

        <svg
          width="100%"
          height={`${heightPct}%`}
          viewBox="0 0 40 120"
          preserveAspectRatio="none"
          className="overflow-visible"
          style={{ maxWidth: 40 }}
        >
          <StripePattern id="stripe" />
          {/* Pill-shaped bar using rect with large rx */}
          <rect
            x="0"
            y="0"
            width="40"
            height="120"
            rx="20"
            ry="20"
            {...getBarStyle()}
          />
        </svg>
      </div>

      {/* Day label */}
      <span className="text-xs text-gray-400 font-medium">{label}</span>
    </div>
  );
};

const ProjectAnalytics = ({ data = days }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full flex flex-col gap-4">
      <h2 className="text-sm font-bold text-gray-900">Project Analytics</h2>

      {/* Chart */}
      <div className="flex items-end gap-2 flex-1 pt-6">
        {data.map((day, i) => (
          <Bar
            key={i}
            label={day.label}
            value={day.value}
            active={day.active}
            maxValue={maxValue}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectAnalytics;
