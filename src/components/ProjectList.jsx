import { useState } from "react";

const projects = [
  {
    id: 1,
    name: "Develop API Endpoints",
    due: "Nov 26, 2024",
    icon: "⚡",
    iconBg: "#e0e7ff",
    iconColor: "#4f46e5",
  },
  {
    id: 2,
    name: "Onboarding Flow",
    due: "Nov 28, 2024",
    icon: "🔄",
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    id: 3,
    name: "Build Dashboard",
    due: "Nov 30, 2024",
    icon: "✦",
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    id: 4,
    name: "Optimize Page Load",
    due: "Dec 5, 2024",
    icon: "◈",
    iconBg: "#fce7f3",
    iconColor: "#db2777",
  },
  {
    id: 5,
    name: "Cross-Browser Testing",
    due: "Dec 6, 2024",
    icon: "⬡",
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
  },
];

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="#1a6b3a" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ProjectList() {
  const [hovered, setHovered] = useState(null);
  const [items, setItems] = useState(projects);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) { setAdding(false); return; }
    const icons = ["★", "◉", "▲", "◆", "●"];
    const bgs = ["#fef9c3","#fce7f3","#e0f2fe","#dcfce7","#ede9fe"];
    const colors = ["#ca8a04","#db2777","#0284c7","#16a34a","#7c3aed"];
    const i = items.length % icons.length;
    setItems(prev => [...prev, {
      id: Date.now(),
      name: newName.trim(),
      due: "TBD",
      icon: icons[i],
      iconBg: bgs[i],
      iconColor: colors[i],
    }]);
    setNewName("");
    setAdding(false);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px 20px 16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#111827",
            letterSpacing: "-0.3px",
          }}
        >
          Project
        </span>

        <button
          onClick={() => setAdding(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "transparent",
            border: "1.5px solid #d1fae5",
            borderRadius: "20px",
            padding: "5px 11px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#1a6b3a",
            cursor: "pointer",
            transition: "background 0.18s, border-color 0.18s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#f0fdf4";
            e.currentTarget.style.borderColor = "#86efac";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#d1fae5";
          }}
        >
          <PlusIcon /> New
        </button>
      </div>

      {/* Project rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {items.map((project, idx) => (
          <div
            key={project.id}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              padding: "9px 10px",
              borderRadius: "12px",
              background: hovered === project.id ? "#f9fafb" : "transparent",
              cursor: "pointer",
              transition: "background 0.15s",
              animation: `fadeIn 0.3s ease both`,
              animationDelay: `${idx * 0.06}s`,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "9px",
                background: project.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                flexShrink: 0,
                color: project.iconColor,
                fontWeight: "700",
              }}
            >
              {project.icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#111827",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  letterSpacing: "-0.2px",
                }}
              >
                {project.name}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  color: "#9ca3af",
                  fontWeight: "400",
                  marginTop: "1px",
                }}
              >
                Due date: {project.due}
              </p>
            </div>

            {/* Chevron */}
            <div
              style={{
                opacity: hovered === project.id ? 1 : 0,
                transition: "opacity 0.15s",
                flexShrink: 0,
              }}
            >
              <ChevronRight />
            </div>
          </div>
        ))}

        {/* Inline add input */}
        {adding && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 10px",
              borderRadius: "12px",
              background: "#f0fdf4",
              border: "1.5px solid #bbf7d0",
              animation: "fadeIn 0.2s ease both",
            }}
          >
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAdding(false); }}
              placeholder="Project name…"
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: "13px",
                fontWeight: "500",
                color: "#111827",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleAdd}
              style={{
                background: "#1a6b3a",
                color: "#fff",
                border: "none",
                borderRadius: "7px",
                padding: "4px 10px",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <button
              onClick={() => setAdding(false)}
              style={{
                background: "transparent",
                color: "#9ca3af",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                lineHeight: 1,
                padding: "0 2px",
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
