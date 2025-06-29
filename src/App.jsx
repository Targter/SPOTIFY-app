import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Indexx";
import NotFound from "./pages/NotFound";
import SongDetails from "./pages/SongDetails";
import SearchPage from "./pages/SearchPage";
import Library from "./components/Library";
import Layout from "./pages/Layout";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import Player from "./components/Player";
import ChatJamPage from "./pages/ChatJamPages";

const queryClient = new QueryClient();

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
          <div className="flex flex-col min-h-screen bg-green-500">
            <div className={`flex-1 ${isPlayerOpen ? "pb-[100px]" : ""}`}>
              <Routes>
                <Route element={<Layout isPlayerOpen={isPlayerOpen} />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/song/:songId" element={<SongDetails />} />
                  <Route path="/liked" element={<Library />} />
                  <Route path="/chat-jam" element={<ChatJamPage />} />
                  <Route path="/playlist/:playlistId" element={<Library />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            {isPlayerOpen && <Player />}
          </div>
        </BrowserRouter>
        {/* </Provider> */}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
