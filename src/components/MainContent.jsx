import React, { useState, useEffect } from "react";
import { spotifyApi, convertSpotifyTrack } from "../services/spotifyApi";
import TrackCard from "./TrackCard";
import TrackRow from "./TrackRow";
import EnhancedSearchBar from "./EnhancedSearchBar";
import ArtistView from "./ArtistView";
import GenreGrid from "./GenreGrid";
import AlbumGrid from "./AlbumGrid";
import Library from "./Library";
import { useTypedSelector } from "../hooks/useTypedSelector";

const MainContent = ({ currentView, onViewChange }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [featuredTracks, setFeaturedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { recentlyPlayed } = useTypedSelector((state) => state.playlist);

  useEffect(() => {
    if (currentView === "home") {
      loadFeaturedContent();
    }
  }, [currentView]);

  const loadFeaturedContent = async () => {
    setIsLoading(true);
    try {
      // Get recommendations for popular tracks
      const recommendations = await spotifyApi.getRecommendations(
        ["pop", "rock"],
        20
      );
      const formattedTracks = recommendations.map(convertSpotifyTrack);
      setFeaturedTracks(formattedTracks);
    } catch (error) {
      console.error("Error loading featured content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSearchView = () => {
    if (selectedArtist) {
      return (
        <ArtistView
          artist={selectedArtist}
          onBack={() => setSelectedArtist(null)}
        />
      );
    }

    return (
      <div>
        <div className="mb-8">
          <EnhancedSearchBar
            onResults={setSearchResults}
            onArtistResults={setArtistResults}
          />
        </div>

        {searchResults.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Search Results
            </h2>
            <div className="space-y-1">
              {searchResults.slice(0, 20).map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={index}
                  playlist={searchResults}
                />
              ))}
            </div>
          </div>
        ) : artistResults.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {artistResults.map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => setSelectedArtist(artist)}
                  className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors text-left"
                >
                  <img
                    src={
                      artist.images[0]?.url ||
                      "https://via.placeholder.com/200x200"
                    }
                    alt={artist.name}
                    className="w-full aspect-square object-cover rounded-full mb-3"
                  />
                  <h3 className="text-white font-medium truncate">
                    {artist.name}
                  </h3>
                  <p className="text-gray-400 text-sm">Artist</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Browse All</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Genres</h3>
                <GenreGrid />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Albums</h3>
                <AlbumGrid />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderHomeView = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Good afternoon</h1>
      </div>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Recently Played
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyPlayed.slice(0, 6).map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                playlist={recentlyPlayed}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Content */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Featured Tracks</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-1">
            {featuredTracks.slice(0, 10).map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                playlist={featuredTracks}
              />
            ))}
          </div>
        )}
      </section>

      {/* Made for You */}
      {!isLoading && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Made for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredTracks.slice(10, 20).map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                playlist={featuredTracks}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case "search":
        return renderSearchView();
      case "library":
      case "liked":
        return (
          <Library currentView={currentView} onViewChange={onViewChange} />
        );
      default:
        if (currentView.startsWith("playlist-")) {
          return (
            <Library currentView={currentView} onViewChange={onViewChange} />
          );
        }
        return renderHomeView();
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white p-6 overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default MainContent;
