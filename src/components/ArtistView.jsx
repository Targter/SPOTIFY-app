import React, { useState, useEffect } from "react";
import { spotifyApi, convertSpotifyTrack } from "../services/spotifyApi";
import TrackRow from "./TrackRow";

const ArtistView = ({ artist, onBack }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArtistData = async () => {
      setIsLoading(true);
      try {
        const [tracks, artistAlbums] = await Promise.all([
          spotifyApi.getArtistTopTracks(artist.id),
          spotifyApi.getArtistAlbums(artist.id, 10),
        ]);

        setTopTracks(tracks.map(convertSpotifyTrack));
        setAlbums(artistAlbums);
      } catch (error) {
        console.error("Error loading artist data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArtistData();
  }, [artist.id]);

  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Artist Header */}
      <div className="flex items-start gap-6 mb-8">
        <img
          src={artist.images[0]?.url || "https://via.placeholder.com/200x200"}
          alt={artist.name}
          className="w-48 h-48 object-cover rounded-full shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-white mb-4">{artist.name}</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-4">
            <span>{formatFollowers(artist.followers.total)} followers</span>
            <span>•</span>
            <span>Popularity: {artist.popularity}/100</span>
          </div>
          {artist.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {artist.genres.slice(0, 5).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Tracks */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
            <div className="space-y-1">
              {topTracks.slice(0, 10).map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={index}
                  playlist={topTracks}
                />
              ))}
            </div>
          </section>

          {/* Albums */}
          {albums.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <img
                      src={
                        album.images[0]?.url ||
                        "https://via.placeholder.com/300x300"
                      }
                      alt={album.name}
                      className="w-full aspect-square object-cover rounded-md mb-3"
                    />
                    <h3 className="text-white font-medium truncate mb-1">
                      {album.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {album.release_date?.split("-")[0]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistView;
