import React, { useState, useEffect, useRef } from "react";
import EnhancedSearchBar from "../components/EnhancedSearchBar";
import ArtistView from "../components/ArtistView";
import TrackRow from "../components/TrackRow";
import GenreGrid from "../components/GenreGrid";
import AlbumGrid from "../components/AlbumGrid";
import { gsap } from "gsap";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const contentRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "sine",
        stagger: 0.2,
      }
    );

    const trackCards = document.querySelectorAll(".track-card");
    trackCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 8px 24px rgba(255, 255, 255, 0.2)",
          duration: 0.3,
          ease: "sine.inOut",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          duration: 0.3,
          ease: "sine.inOut",
        });
      });
    });
  }, [searchResults, artistResults, selectedArtist]);

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen ">
      <div ref={contentRef}>
        {selectedArtist ? (
          <ArtistView
            artist={selectedArtist}
            onBack={() => setSelectedArtist(null)}
          />
        ) : (
          <>
            <div className="mb-8">
              <EnhancedSearchBar
                onResults={setSearchResults}
                onArtistResults={setArtistResults}
              />
            </div>

            {searchResults.length > 0 ? (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Search Results
                </h2>
                <div className="space-y-2 z-30">
                  {searchResults.slice(0, 20).map((track, index) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      index={index}
                      playlist={searchResults}
                      className="track-card bg-gray-900/80 backdrop-blur-md rounded-lg shadow-md border border-gray-700"
                    />
                  ))}
                </div>
              </div>
            ) : artistResults.length > 0 ? (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {artistResults.map((artist) => (
                    <button
                      key={artist.id}
                      onClick={() => setSelectedArtist(artist)}
                      className="track-card bg-gray-900/80 backdrop-blur-md p-4 rounded-xl hover:bg-gray-800/90 transition-colors text-left border border-gray-700"
                    >
                      <img
                        src={
                          artist.images[0]?.url ||
                          "https://via.placeholder.com/200x200"
                        }
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-full mb-4 shadow-lg"
                      />
                      <h3 className="text-white font-semibold truncate">
                        {artist.name}
                      </h3>
                      <p className="text-gray-300 text-sm">Artist</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Browse All
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Genres
                    </h3>
                    <GenreGrid />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Albums
                    </h3>
                    <AlbumGrid />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
