import React, { useState, useEffect } from "react";
import { deezerApi } from "../services/deezerApi";

import TrackCard from "./TrackCard";

const genres = [
  { id: 132, name: "Pop", color: "bg-pink-500" },
  { id: 116, name: "Rap/Hip Hop", color: "bg-orange-500" },
  { id: 113, name: "Dance", color: "bg-purple-500" },
  { id: 152, name: "Rock", color: "bg-red-500" },
  { id: 129, name: "Jazz", color: "bg-blue-500" },
  { id: 98, name: "Reggae", color: "bg-green-500" },
  { id: 85, name: "Alternative", color: "bg-indigo-500" },
  { id: 106, name: "Electro", color: "bg-yellow-500" },
];

const GenreGrid = () => {
  const [selectedGenre, setSelectedGenre] = (useState < number) | (null > null);
  const [genreTracks, setGenreTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadGenreTracks = async (genreId) => {
    setIsLoading(true);
    setSelectedGenre(genreId);
    try {
      const response = await deezerApi.getGenreTracks(genreId);
      const formattedTracks = response.data.map((track) => ({
        id: track.id,
        title: track.title,
        artist: track.artist,
        album: track.album,
        preview: track.preview,
        duration: track.duration,
      }));
      setGenreTracks(formattedTracks);
    } catch (error) {
      console.error("Error loading genre tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedGenre) {
    const genre = genres.find((g) => g.id === selectedGenre);
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedGenre(null)}
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            ← Back to Genres
          </button>
          <h2 className="text-3xl font-bold text-white">{genre?.name}</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {genreTracks.map((track) => (
              <TrackCard key={track.id} track={track} playlist={genreTracks} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Browse by Genre</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => loadGenreTracks(genre.id)}
            className={`${genre.color} p-6 rounded-lg hover:scale-105 transition-transform relative overflow-hidden`}
          >
            <h3 className="text-white text-xl font-bold text-left">
              {genre.name}
            </h3>
            <div className="absolute -bottom-2 -right-2 transform rotate-25">
              <div className="w-20 h-20 bg-black bg-opacity-20 rounded-lg"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreGrid;
