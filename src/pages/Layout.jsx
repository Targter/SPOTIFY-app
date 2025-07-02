import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu, Phone } from "lucide-react";
import { PhoneIsMobile } from "../hooks/ReallySmallScreen";
import { useIsSmallScreen } from "../hooks/useSmallScreen";
const Layout = ({ isPlayerOpen }) => {
  const isMobile = PhoneIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Close sidebar when switching to desktop view
  const isSmallScreen = useIsSmallScreen();
  React.useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  //

  // Handle clicks on the sidebar to close it on mobile
  const handleSidebarClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  return (
    <div
      className={`${isPlayerOpen ? "h-[calc(100vh-100px)]" : "h-screen"} flex ${
        isSmallScreen ? "p-2 gap-2" : "p-3 gap-4"
      }`}
    >
      {/* Sidebar - hidden on mobile unless sidebarOpen is true */}
      {(!isMobile || sidebarOpen) && (
        <div
          className={isMobile ? "absolute z-50 h-full" : ""}
          onClick={handleSidebarClick}
        >
          <Sidebar />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-y-scroll hide-scrollbar relative">
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute left-2 top-2 z-2 p-2 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Overlay when sidebar is open on mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 h-full overflow-y-auto hide-scrollbar rounded-3xl border border-gray-700/50 pt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
