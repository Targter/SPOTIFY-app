import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Indexx";
import NotFound from "./pages/NotFound";
import SongDetails from "./pages/SongDetails";

// import SearchPage from "./pages/SearchPage";
// import EnhancedSearchBar from "./components/EnhancedSearchBar";
import SearchPage from "./pages/SearchPage";
// import LibraryPage from "./pages/LibraryPage";
// import LikedSongsPage from "./pages/LikedSongsPage";
import Library from "./components/Library";
// import PlaylistPage from "./pages/PlaylistPage";
// import Layout from "./components/Layout";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Player from "./components/Player";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Provider store={store}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Player />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route path="/song/:songId" element={<SongDetails />} />
              <Route path="/liked" element={<Library />} />
              <Route path="/playlist/:playlistId" element={<Library />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
