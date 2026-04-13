import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Search, Zap } from "lucide-react";

const Navbar = ({ title, showBack = false, search, setSearch }) => {
  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#F0F2F5]/80 backdrop-blur-xl border-b border-white/40">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-3 ml:px-4 sm:px-6 md:px-8 py-3 sm:py-5">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0">

          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 shrink-0"
            >
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>

              <span className="hidden sm:inline text-sm sm:text-base">
                Back
              </span>
            </button>
          )}

          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">

            {/* Logo */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shrink-0">
              <Zap size={14} className="text-white sm:w-4 sm:h-4" />
            </div>

            {/* 🧠 RESPONSIVE TITLE */}
            <h1
              className="
                font-black text-slate-800 truncate
                text-sm ml:text-base sm:text-lg md:text-xl
              "
            >
              {title || "THINKBOARD"}
            </h1>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* DESKTOP SEARCH */}
          <div className="relative hidden md:block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              type="text"
              placeholder="Search notes..."
              className="bg-white/50 border rounded-2xl py-2.5 pl-11 pr-6 w-52 lg:w-64 outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* 📱 MOBILE SEARCH BUTTON */}
          <button
            onClick={() => setShowMobileSearch((p) => !p)}
            className="md:hidden p-2 ml:p-2.5 bg-white rounded-xl shadow-sm"
          >
            <Search size={18} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* 📱 MOBILE SEARCH BAR */}
      {showMobileSearch && (
        <div className="px-3 ml:px-4 pb-3 md:hidden">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              autoFocus
              type="text"
              placeholder="Search notes..."
              className="
                w-full bg-white border rounded-xl
                py-2.5 pl-10 pr-3
                text-sm ml:text-base
                outline-none
              "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;