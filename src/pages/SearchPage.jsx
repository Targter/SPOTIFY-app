import React, { useState, useEffect, useRef } from "react";
import EnhancedSearchBar from "../components/EnhancedSearchBar";
import ArtistView from "../components/ArtistView";
import TrackRow from "../components/TrackRow";
import GenreGrid from "../components/GenreGrid";
import AlbumGrid from "../components/AlbumGrid";
import { gsap } from "gsap";
import { X } from "lucide-react";
const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [clearTrigger, setClearTrigger] = useState(0); // Trigger for clearing EnhancedSearchBar
  const contentRef = useRef(null);

  // Function to clear all results and artist selection
  const clearResults = () => {
    setSearchResults([]);
    setArtistResults([]);
    setSelectedArtist(null);
    setClearTrigger((prev) => prev + 1); // Trigger EnhancedSearchBar clear
  };

  // GSAP animations
  useEffect(() => {
    const trackCards = document.querySelectorAll(".track-card");
    trackCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.0,
          y: -5,
          boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, [searchResults, artistResults, selectedArtist]);

  // Handle image loading errors
  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
    e.target.src = "https://via.placeholder.com/400x400";
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-950 text-white p-6 md:p-8 overflow-y-auto min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="space-y-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-3xl">
              <EnhancedSearchBar
                onResults={setSearchResults}
                onArtistResults={setArtistResults}
                className="max-w-3xl mx-auto"
                onClear={{ clearTriggered: clearTrigger }}
              />
            </div>
            {(searchResults.length > 0 ||
              artistResults.length > 0 ||
              selectedArtist) && (
              <button
                onClick={clearResults}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-red-600 transition-colors"
                title="Clear all results"
              >
                <X className="w-5 h-5" />
                Clear Results
              </button>
            )}
          </div>
          {selectedArtist ? (
            <ArtistView
              artist={selectedArtist}
              onBack={() => setSelectedArtist(null)}
            />
          ) : (
            <>
              {searchResults.length > 0 ? (
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Search Results
                  </h2>
                  <div className="space-y-3">
                    {searchResults.slice(0, 20).map((track, index) => (
                      <TrackRow
                        key={track.id}
                        track={track}
                        index={index}
                        playlist={searchResults}
                        className="track-card bg-gray-800/50 hover:bg-gray-700/70 backdrop-blur-md rounded-xl p-4 transition-all duration-300 border border-gray-700/50 hover:border-blue-400/30"
                      />
                    ))}
                  </div>
                </div>
              ) : artistResults.length > 0 ? (
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Artists
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {artistResults.map((artist) => (
                      <button
                        key={artist.id}
                        onClick={() => setSelectedArtist(artist)}
                        className="track-card group bg-gray-800/50 hover:bg-gray-700/70 backdrop-blur-md p-4 rounded-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-700/50 hover:border-blue-400/30"
                      >
                        <div className="relative w-full aspect-square mb-4 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                          <img
                            src={
                              artist.images?.[0]?.url ||
                              "https://via.placeholder.com/400x400"
                            }
                            alt={artist.name || "Unknown Artist"}
                            onError={handleImageError}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                            <span className="text-white font-medium">View</span>
                          </div>
                        </div>
                        <h3 className="text-white font-semibold truncate w-full">
                          {artist.name || "Unknown Artist"}
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">Artist</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  <h2 className="md:text-5xl font-bold mb-8 bg-gradient-to-r text-center from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Discover Music
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-4">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">
                          Popular Genres
                        </h3>
                      </div>
                      <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl lg:p-5 p-1 border border-gray-700/50">
                        <GenreGrid />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">
                          Trending Albums
                        </h3>
                      </div>
                      <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-5 border border-gray-700/50">
                        <AlbumGrid />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
