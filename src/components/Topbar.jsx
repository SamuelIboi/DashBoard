import { useState } from "react";
import { IconSearch, IconMail, IconBell } from "@tabler/icons-react";
import avatar from "../assets/avatar.jfif"; // swap with your actual avatar asset

const Topbar = ({
  userName = "Totok Michael",
  userEmail = "tmichael20@mail.com",
  avatarSrc = avatar,
  onSearch,
  onMailClick,
  onBellClick,
}) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) onSearch(query);
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-64 group focus-within:border-gray-300 focus-within:bg-white transition-all">
        <IconSearch size={15} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search task"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1 min-w-0"
        />
        <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded-md px-1.5 py-0.5 flex-shrink-0">
          <span className="text-[11px]">⌘</span> F
        </kbd>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Mail */}
        <button
          onClick={onMailClick}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <IconMail size={17} />
        </button>

        {/* Bell */}
        <button
          onClick={onBellClick}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors relative"
        >
          <IconBell size={17} />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* User profile */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-green-200 transition-all flex-shrink-0">
            <img
              src={avatarSrc}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-900">
              {userName}
            </span>
            <span className="text-[11px] text-gray-400">{userEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
