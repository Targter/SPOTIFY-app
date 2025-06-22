import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { deezerApi } from "../services/deezerApi";

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTracks = async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        try {
          const response = await deezerApi.searchTracks(query);
          const formattedTracks = response.data.map((track) => ({
            id: track.id,
            title: track.title,
            artist: track.artist,
            album: track.album,
            preview: track.preview,
            duration: track.duration,
          }));
          onResults(formattedTracks);
        } catch (error) {
          console.error("Search error:", error);
          onResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        onResults([]);
      }
    };

    const debounceTimer = setTimeout(searchTracks, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, onResults]);

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for songs, artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-700 transition-colors"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
