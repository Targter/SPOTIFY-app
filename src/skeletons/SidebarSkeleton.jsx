import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-950 to-black text-white h-auto flex flex-col border-r border-gray-800/50 backdrop-blur-md">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-7 w-24 bg-gray-800 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-6 mb-8">
        <ul className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <li key={index}>
              <div className="skeleton flex items-center gap-4 py-3 px-4 rounded-lg">
                <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Create Playlist / Liked Songs */}
      <div className="px-6 mb-8">
        <ul className="space-y-3">
          {[...Array(2)].map((_, index) => (
            <li key={index}>
              <div className="skeleton flex items-center gap-4 py-3 px-4 rounded-lg">
                <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Playlists */}
      <div className="px-6 flex-1 overflow-y-auto thin-dark-scrollbar">
        <div className="border-t border-gray-800/50 pt-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="py-2">
              <div className="skeleton h-5 w-28 bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
