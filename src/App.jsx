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
            <div className="fixed inset-0 z-0 w-full h-full">
              <Spline
                scene="https://prod.spline.design/RkfcyXR0qMTiIQYP/scene.splinecode"
                className="w-full h-full"
              />
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

            {!isPlayerOpen && (
              <Link to="https://www.abhaybansal.in" target="_blank">
                <button
                  className="fixed bottom-4 right-4 flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 rounded-md border cursor-pointer z-80 bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white border-gray-700"
                  aria-label="Built by AbhayBansal"
                >
                  <User />
                  <span>Built by AbhayBansal</span>
                </button>
              </Link>
            )}
          </div>
        </BrowserRouter>
        {/* </Provider> */}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
