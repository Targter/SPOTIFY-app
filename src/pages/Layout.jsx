import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex ">
      <Sidebar />
      <div className="flex-1 overflow-y-scroll hide-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
