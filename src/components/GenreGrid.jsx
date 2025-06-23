import React, { useState, useEffect } from "react";
// import { useGetSongsByGenreQuery } from "../services/shazamCoreApi"; // Adjust path as needed
import { useGetSongsByGenreQuery } from "../services/ShazamCore";
import TrackCard from "./TrackCard";

const genres = [
  { code: "POP", name: "Pop", color: "bg-pink-500" },
  { code: "HIP_HOP_RAP", name: "Rap/Hip Hop", color: "bg-orange-500" },
  { code: "DANCE", name: "Dance", color: "bg-purple-500" },
  { code: "ROCK", name: "Rock", color: "bg-red-500" },
  { code: "JAZZ", name: "Jazz", color: "bg-blue-500" },
  { code: "REGGAE", name: "Reggae", color: "bg-green-500" },
  { code: "ALTERNATIVE", name: "Alternative", color: "bg-indigo-500" },
  { code: "ELECTRONIC", name: "Electro", color: "bg-yellow-500" },
];

// Helper function to convert Shazam track to standardized format
const convertShazamTrack = (track) => ({
  id: track.key,
  title: track.title,
  artist: {
    name: track.subtitle || "Unknown Artist",
    id: track.artists?.[0]?.adamid || "",
  },
  album: {
    id: track.albumadamid || "",
    title: track.title,
    cover_medium:
      track.images?.coverarthq || "https://via.placeholder.com/300x300",
  },
  preview:
    track.hub?.actions?.find((action) => action.type === "uri")?.uri || "",
  duration: track.duration || 0,
});

const GenreGrid = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreTracks, setGenreTracks] = useState([]);
  const [skipQuery, setSkipQuery] = useState(true);

  // Fetch tracks for selected genre
  const { data, isLoading, error } = useGetSongsByGenreQuery(
    { genre: selectedGenre, countryCode: "IN" },
    { skip: skipQuery }
  );

  useEffect(() => {
    if (data && !isLoading && !error) {
      const formattedTracks = data.map(convertShazamTrack);
      setGenreTracks(formattedTracks);
    }
    if (error) {
      console.error("Error loading genre tracks:", error);
      setGenreTracks([]);
    }
  }, [data, isLoading, error]);

  const loadGenreTracks = (genreCode) => {
    setSelectedGenre(genreCode);
    setSkipQuery(false);
  };

  if (selectedGenre) {
    const genre = genres.find((g) => g.code === selectedGenre);
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              setSelectedGenre(null);
              setSkipQuery(true);
              setGenreTracks([]);
            }}
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
            key={genre.code}
            onClick={() => loadGenreTracks(genre.code)}
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
