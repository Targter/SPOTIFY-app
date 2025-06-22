import React, { useState, useEffect } from "react";
import { Search, User, Music, Album } from "lucide-react";
import { spotifyApi, convertSpotifyTrack } from "../services/spotifyApi";

const EnhancedSearchBar = ({ onResults, onArtistResults }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTracks = async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        try {
          let spotifyTracks = [];

          switch (searchType) {
            case "all":
              spotifyTracks = await spotifyApi.searchTracks(query);
              break;
            case "track":
              spotifyTracks = await spotifyApi.searchBySongName(query);
              break;
            case "artist":
              spotifyTracks = await spotifyApi.searchByArtist(query);
              if (onArtistResults) {
                const artists = await spotifyApi.searchArtists(query);
                onArtistResults(artists);
              }
              break;
            case "album":
              // For album search, we'll search tracks and group by album
              spotifyTracks = await spotifyApi.searchTracks(`album:${query}`);
              break;
          }

          const formattedTracks = spotifyTracks.map(convertSpotifyTrack);
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
  }, [query, searchType, onResults, onArtistResults]);

  const searchTypeIcons = {
    all: <Search className="w-4 h-4" />,
    track: <Music className="w-4 h-4" />,
    artist: <User className="w-4 h-4" />,
    album: <Album className="w-4 h-4" />,
  };

  return (
    <div className="space-y-4">
      {/* Search Type Selector */}
      <div className="flex gap-2">
        {["all", "track", "artist", "album"].map((type) => (
          <button
            key={type}
            onClick={() => setSearchType(type)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
              searchType === type
                ? "bg-green-500 text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {searchTypeIcons[type]}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={`Search for ${
            searchType === "all" ? "songs, artists, albums" : searchType + "s"
          }...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-700 transition-colors"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSearchBar;
