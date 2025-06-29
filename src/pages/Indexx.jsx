// import React, { useState } from "react";
// // import { Provider } from "react-redux";
// // import { store } from "../store/store";
// import Sidebar from "../components/Sidebar";
// import MainContent from "../components/MainContent";
// import Player from "../components/Player";

// const Index = () => {
//   const [currentView, setCurrentView] = useState("home");

//   return (
//     // <Provider store={store}>
//     <div className="h-screen flex ">
//       {/* <Sidebar currentView={currentView} onViewChange={setCurrentView} /> */}
//       {/* <MainContent currentView={currentView} onViewChange={setCurrentView} /> */}
//       {/* <Player /> */}

//       <MainContent />
//     </div>
//     // </Provider>
//   );
// };

// export default Index;

import React from "react";
import MainContent from "../components/MainContent";
import { useIsSmallScreen } from "../hooks/useSmallScreen";

const Index = () => {
  const isSmallScreen = useIsSmallScreen();
  return (
    <>
      <div className="flex">
        <div className="flex-1 overflow-y-auto hide-scrollbar rounded-3xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50 mr-0 md:mr-2">
          <MainContent />
        </div>
        {/* {!isSmallScreen && (
          <div className="log max-w-96 w-64 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-3xl p-4 max-h-screen">
            <h2 className="text-white text-lg font-bold mb-3">Now Playing</h2>
            <div className="text-gray-300 text-sm">
              <p>Song: Nothing playing</p>
              <p>Artist: -</p>
              <p>Album: -</p>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Index;
