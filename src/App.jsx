import React from "react";
// import { Toaster } from "../ui/toaster";
import { Toaster } from "./ui/toaster";
// import { Toaster as Sonner } from "../ui/sonner";
import { Toaster as Sonner } from "./ui/toaster";
// import { TooltipProvider } from "../ui/tooltip";
import { TooltipProvider } from "./ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Index from "./pages/Indexx";
import NotFound from "./pages/NotFound";
import SongDetails from "./pages/SongDetails";
import SearchPage from "./pages/SearchPage";
import Library from "./components/Library";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Player from "./components/Player";
import ChatJamPage from "./pages/ChatJamPages";
import Spline from "@splinetool/react-spline";
import UserProfilePage from "./pages/UserProfilePage";
import { User } from "lucide-react";

const queryClient = new QueryClient();

//
const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/" replace />;
};
const App = () => {
  const isPlayerOpen = useSelector(
    (state) => state.player.currentTrack !== null
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* <Provider store={store}> */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-black">
            <div className="fixed inset-0 w-full h-full">
              <Spline
                scene="https://prod.spline.design/RkfcyXR0qMTiIQYP/scene.splinecode"
                className="w-full h-full z-[-1]"
              />
              <button
                className="fixed bottom-4 right-4 flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium transition-colors border cursor-default bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 pointer-events-none rounded-md border-gray-700 px-4 h-10 z-[0]"
                aria-label="Watermark by AbhayBansal"
              >
                {/* <User /> */}
                <span>Built by AbhayBansal</span>
              </button>
            </div>

            <div className={`flex-1 ${isPlayerOpen ? "pb-[100px]" : ""} `}>
              <Routes>
                <Route element={<Layout isPlayerOpen={isPlayerOpen} />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/song/:songId" element={<SongDetails />} />
                  <Route path="/liked" element={<Library />} />

                  <Route
                    path="/chat-jam"
                    element={
                      <ProtectedRoute>
                        <ChatJamPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/playlist/:playlistId" element={<Library />} />
                  <Route path="/userProfile" element={<UserProfilePage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            {isPlayerOpen && <Player />}

            {/* <Link to="https://www.abhaybansal.in" target="_blank"> */}
            {/* </Link> */}
          </div>
        </BrowserRouter>
        {/* </Provider> */}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
