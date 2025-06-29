import React from "react";
import { useIsMobile } from "../hooks/use-mobile";

const SidebarSkeleton = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`${
        isMobile ? "w-16" : "w-64"
      } bg-gradient-to-b from-gray-950 to-black text-white h-full flex flex-col border-r border-gray-800/50 backdrop-blur-md transition-all duration-300`}
    >
      <div className="p-3 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-800 rounded-md animate-pulse"></div>
          {!isMobile && (
            <div className="h-5 w-20 bg-gray-800 rounded animate-pulse"></div>
          )}
        </div>
      </div>

      <div className="px-3 space-y-5 flex-1 flex flex-col">
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2">
          <ul className="space-y-1">
            {[...Array(4)].map((_, index) => (
              <li key={index}>
                <div className="skeleton flex items-center gap-3 py-2 px-2 rounded-lg">
                  <div className="w-5 h-5 bg-gray-800 rounded animate-pulse"></div>
                  {!isMobile && (
                    <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2">
          <ul className="space-y-1">
            {[...Array(2)].map((_, index) => (
              <li key={index}>
                <div className="skeleton flex items-center gap-3 py-2 px-2 rounded-lg">
                  <div className="w-5 h-5 bg-gray-800 rounded animate-pulse"></div>
                  {!isMobile && (
                    <div className="h-4 w-28 bg-gray-800 rounded animate-pulse"></div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2 flex-1 overflow-y-auto thin-dark-scrollbar mt-5">
          <div className="border-t border-gray-800/50 pt-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="py-1">
                <div className="skeleton h-4 w-28 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
