// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// const Layout = () => {
//   return (
//     <div className="h-screen flex p-3 gap-4 bg-black">
//       <Sidebar />
//       <div className="flex-1 overflow-y-scroll hide-scrollbar rounded-3xl">
//         <Outlet />
//       </div>
//       <div className="log max-w-96 w-auto bg-gray-900 rounded-3xl">
//         {" "}
//         div container
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import { useIsSmallScreen } from "../hooks/useIsSmallScreen";
import { useIsSmallScreen } from "../hooks/useSmallScreen";

const Layout = ({ isPlayerOpen }) => {
  const isSmallScreen = useIsSmallScreen();

  return (
    <div
      className={`${isPlayerOpen ? "h-[calc(100vh-100px)]" : "h-screen"} flex ${
        isSmallScreen ? "p-2 gap-2" : "p-3 gap-4"
      } bg-black`}
    >
      <Sidebar />
      <div className="flex-1 h-full overflow-y-auto hide-scrollbar rounded-3xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
