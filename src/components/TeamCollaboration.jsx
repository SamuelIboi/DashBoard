import { useState } from "react";

const members = [
  {
    id: 1,
    name: "Alexandra Deff",
    task: "Working on Github Project Repository",
    status: "Completed",
    avatar: "AD",
    avatarBg: "#fce7f3",
    avatarColor: "#db2777",
    avatarImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra&backgroundColor=fce7f3",
  },
  {
    id: 2,
    name: "Edwin Adenike",
    task: "Integrate User Authentication System",
    status: "In Progress",
    avatar: "EA",
    avatarBg: "#dcfce7",
    avatarColor: "#16a34a",
    avatarImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Edwin&backgroundColor=dcfce7",
  },
  {
    id: 3,
    name: "Isaac Oluwatemilorun",
    task: "Develop Search and Filter Functionality",
    status: "Pending",
    avatar: "IO",
    avatarBg: "#e0e7ff",
    avatarColor: "#4f46e5",
    avatarImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isaac&backgroundColor=e0e7ff",
  },
  {
    id: 4,
    name: "David Oshodi",
    task: "Responsive Layout for Homepage",
    status: "In Progress",
    avatar: "DO",
    avatarBg: "#fef3c7",
    avatarColor: "#d97706",
    avatarImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=fef3c7",
  },
];

const statusConfig = {
  Completed: { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
  "In Progress": { bg: "#fef9c3", color: "#a16207", dot: "#eab308" },
  Pending: { bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" },
};

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="#1a6b3a" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const Avatar = ({ member }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      width: "38px", height: "38px", borderRadius: "50%",
      background: member.avatarBg, flexShrink: 0,
      overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
      border: "2px solid #fff",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    }}>
      {!imgError ? (
        <img
          src={member.avatarImg}
          alt={member.name}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ fontSize: "12px", fontWeight: "700", color: member.avatarColor }}>
          {member.avatar}
        </span>
      )}
    </div>
  );
};

export default function TeamCollaboration() {
  const [hovered, setHovered] = useState(null);
  const [items, setItems] = useState(members);

  const cycleStatus = (id) => {
    const order = ["Pending", "In Progress", "Completed"];
    setItems(prev => prev.map(m =>
      m.id === id
        ? { ...m, status: order[(order.indexOf(m.status) + 1) % order.length] }
        : m
    ));
  };

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "20px",
      padding: "20px 20px 16px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: "12px",
      }}>
        <span style={{
          fontSize: "15px", fontWeight: "700",
          color: "#111827", letterSpacing: "-0.3px",
        }}>
          Team Collaboration
        </span>
        <button
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: "transparent",
            border: "1.5px solid #d1fae5",
            borderRadius: "20px", padding: "5px 11px",
            fontSize: "12px", fontWeight: "600",
            color: "#1a6b3a", cursor: "pointer",
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
          <PlusIcon /> Add Member
        </button>
      </div>

      {/* Member rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map((member, idx) => {
          const s = statusConfig[member.status];
          return (
            <div
              key={member.id}
              onMouseEnter={() => setHovered(member.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", alignItems: "center", gap: "11px",
                padding: "8px 10px",
                borderRadius: "13px",
                background: hovered === member.id ? "#f9fafb" : "transparent",
                cursor: "default",
                transition: "background 0.15s",
                animation: `slideIn 0.3s ease both`,
                animationDelay: `${idx * 0.07}s`,
              }}
            >
              {/* Avatar */}
              <Avatar member={member} />

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0, fontSize: "13px", fontWeight: "700",
                  color: "#111827", letterSpacing: "-0.2px",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {member.name}
                </p>
                <p style={{
                  margin: "2px 0 0", fontSize: "11px",
                  color: "#9ca3af", fontWeight: "400",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  Working on{" "}
                  <span style={{ color: "#6b7280", fontWeight: "600" }}>
                    {member.task}
                  </span>
                </p>
              </div>

              {/* Status badge — click to cycle */}
              <button
                onClick={() => cycleStatus(member.id)}
                title="Click to change status"
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  background: s.bg, color: s.color,
                  border: "none", borderRadius: "20px",
                  padding: "4px 9px", fontSize: "11px", fontWeight: "600",
                  cursor: "pointer", flexShrink: 0,
                  transition: "opacity 0.15s, transform 0.12s",
                  letterSpacing: "0.1px",
                }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.94)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <span style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: s.dot, display: "inline-block", flexShrink: 0,
                }} />
                {member.status}
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
