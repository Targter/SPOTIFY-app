import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import Player from "../components/Player";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");

  return (
    <Provider store={store}>
      <div className="h-screen flex bg-black">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <MainContent currentView={currentView} onViewChange={setCurrentView} />
        <Player />
      </div>
    </Provider>
  );
};

export default Index;
