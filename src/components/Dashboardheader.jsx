import {
  IconPlus,
  IconArrowUpRight,
  IconTrendingUp,
} from "@tabler/icons-react";

const stats = [
  {
    label: "Total Projects",
    value: 24,
    note: "Increased from last month",
    highlight: true,
  },
  {
    label: "Ended Projects",
    value: 10,
    note: "Increased from last month",
  },
  {
    label: "Running Projects",
    value: 12,
    note: "Increased from last month",
  },
  {
    label: "Pending Project",
    value: 2,
    note: "On Discuss",
  },
];

const StatCard = ({ label, value, note, highlight }) => (
  <div
    className={`relative flex-1 min-w-[130px] rounded-2xl p-4 flex flex-col justify-between gap-4 border transition-all ${
      highlight
        ? "bg-green-700 border-green-600 text-white"
        : "bg-white border-gray-300 text-gray-900"
    }`}
  >
    {/* Top row */}
    <div className="flex items-start justify-between">
      <span
        className={`text-sm font-medium leading-tight ${
          highlight ? "text-green-100" : "text-gray-500"
        }`}
      >
        {label}
      </span>
      <button
        className={`w-7 h-7 flex items-center justify-center rounded-full border transition-colors flex-shrink-0 ${
          highlight
            ? "border-green-500 text-green-100 hover:bg-green-600"
            : "border-gray-200 text-gray-400 hover:bg-gray-50"
        }`}
      >
        <IconArrowUpRight size={14} />
      </button>
    </div>

    {/* Value */}
    <span
      className={`text-4xl font-bold tracking-tight ${
        highlight ? "text-white" : "text-gray-900"
      }`}
    >
      {value}
    </span>

    {/* Note */}
    <div className="flex items-center gap-1.5">
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0 ${
          highlight ? "bg-green-600" : "bg-gray-100"
        }`}
      >
        <IconTrendingUp
          size={11}
          className={highlight ? "text-green-200" : "text-gray-400"}
        />
      </div>
      <span
        className={`text-[11px] font-medium ${
          highlight ? "text-green-200" : "text-gray-400"
        }`}
      >
        {note}
      </span>
    </div>
  </div>
);

const DashboardHeader = ({
  title = "Dashboard",
  subtitle = "Plan, prioritize, and accomplish your tasks with ease.",
  statsData = stats,
  onAddProject,
  onImportData,
}) => {
  return (
    <div className="flex flex-col m-5 gap-5">
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onAddProject}
            className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <IconPlus size={16} />
            Add Project
          </button>
          <button
            onClick={onImportData}
            className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            Import Data
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="flex gap-3">
        {statsData.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default DashboardHeader;
