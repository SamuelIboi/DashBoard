import { useNavigate, useLocation } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconCheckbox,
  IconCalendar,
  IconChartBar,
  IconUsers,
  IconSettings,
  IconHelp,
  IconLogout,
  IconDeviceMobile,
} from "@tabler/icons-react";
import logo from "../assets/logoW.png";

const menuItems = [
  { label: "Dashboard", icon: IconLayoutDashboard, path: "/dashboard" },
  { label: "Tasks", icon: IconCheckbox, path: "/tasks", badge: 12 },
  { label: "Calendar", icon: IconCalendar, path: "/calendar" },
  { label: "Analytics", icon: IconChartBar, path: "/analytics" },
  { label: "Team", icon: IconUsers, path: "/team" },
];

const generalItems = [
  { label: "Settings", icon: IconSettings, path: "/settings" },
  { label: "Help", icon: IconHelp, path: "/help" },
  { label: "Logout", icon: IconLogout, path: "/logout" },
];

const NavItem = ({ label, icon: Icon, path, badge }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={`relative flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
        isActive
          ? "bg-green-700 text-white font-semibold shadow-sm"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-medium"
      }`}
    >
      {/* Left accent bar for active item */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-400 rounded-r-full" />
      )}

      <div className="flex items-center gap-3 pl-1">
        <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
        {label}
      </div>

      {badge && (
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
            isActive ? "bg-green-500 text-white" : "bg-green-700 text-white"
          }`}
        >
          {badge}+
        </span>
      )}
    </button>
  );
};

const MobileAppCard = () => (
  <div
    className="mx-1 mt-auto rounded-2xl p-4 flex flex-col gap-3 overflow-hidden relative"
    style={{
      background:
        "linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)",
    }}
  >
    {/* Decorative blobs */}
    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-green-500 opacity-20 blur-xl" />
    <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-emerald-400 opacity-10 blur-lg" />

    <div className="relative z-10">
      <div className="bg-white/20 rounded-lg w-8 h-8 flex items-center justify-center mb-2">
        <IconDeviceMobile size={18} className="text-white" />
      </div>
      <p className="text-white font-bold text-sm leading-tight">
        Download our
        <br />
        Mobile App
      </p>
      <p className="text-green-200 text-[11px] mt-1">Get easy in another way</p>
    </div>

    <button className="relative z-10 bg-white text-green-800 text-xs font-bold py-2 rounded-xl hover:bg-green-50 transition-colors">
      Download
    </button>
  </div>
);

const Sidebar = () => {
  return (
    <div className="w-56 mt-2 rounded-xl flex-shrink-0 h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col py-5 px-3">
      {/* Scrollable top section */}
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none min-h-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 mb-8">
          <img src={logo} alt="Donezo" className="h-8 w-8 object-contain" />
          <span className="text-base font-bold text-gray-900 tracking-tight">
            Donezo
          </span>
        </div>

        {/* Menu section */}
        <div className="flex flex-col gap-0.5 mb-6">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase px-3 mb-1">
            Menu
          </p>
          {menuItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>

        {/* General section */}
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase px-3 mb-1">
            General
          </p>
          {generalItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* Mobile App Promo Card — always visible at bottom */}
      <div className="pt-4 flex-shrink-0">
        <MobileAppCard />
      </div>
    </div>
  );
};

export default Sidebar;
