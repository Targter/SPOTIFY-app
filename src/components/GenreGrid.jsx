// import React, { useState, useEffect } from "react";
// // import { useGetSongsByGenreQuery } from "../services/shazamCoreApi"; // Adjust path as needed
// import { useGetSongsByGenreQuery } from "../services/ShazamCore";
// import TrackCard from "./TrackCard";
// import { data } from "./FakeData";
// const genres = [
//   { code: "POP", name: "Pop", color: "bg-pink-500" },
//   { code: "HIP_HOP_RAP", name: "Rap/Hip Hop", color: "bg-orange-500" },
//   { code: "DANCE", name: "Dance", color: "bg-purple-500" },
//   { code: "ROCK", name: "Rock", color: "bg-red-500" },
//   { code: "JAZZ", name: "Jazz", color: "bg-blue-500" },
//   { code: "REGGAE", name: "Reggae", color: "bg-green-500" },
//   { code: "ALTERNATIVE", name: "Alternative", color: "bg-indigo-500" },
//   { code: "ELECTRONIC", name: "Electro", color: "bg-yellow-500" },
// ];

// // Helper function to convert Shazam track to standardized format
// const convertAppleMusicTrack = (track) => ({
//   key: track.id,
//   id: track.id,
//   title: track.attributes.name,
//   artist: {
//     name: track.attributes.artistName || "Unknown Artist",
//     id: track.relationships?.artists?.data?.[0]?.id || "",
//     picture_small:
//       track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
//       "https://via.placeholder.com/64x64",
//   },
//   album: {
//     id: track.id,
//     title: track.attributes.albumName,
//     cover_small:
//       track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
//       "https://via.placeholder.com/64x64",
//     cover_medium:
//       track.attributes.artwork?.url || "https://via.placeholder.com/300x300",
//   },
//   preview: track.attributes.previews?.[0]?.url || "",
//   duration: Math.floor(track.attributes.durationInMillis / 1000) || 0,
//   explicit: track.attributes.contentRating === "explicit",
//   genres: track.attributes.genreNames || [],
//   releaseDate: track.attributes.releaseDate || "",
//   isrc: track.attributes.isrc || "",
// });

// const GenreGrid = () => {
//   const [selectedGenre, setSelectedGenre] = useState(null);
//   const [genreTracks, setGenreTracks] = useState([]);
//   const [skipQuery, setSkipQuery] = useState(true);
//   const isLoading = false;
//   // Fetch tracks for selected genre
//   const { error } = useGetSongsByGenreQuery(
//     { genre: selectedGenre, countryCode: "IN" },
//     { skip: skipQuery }
//   );

//   useEffect(() => {
//     if (data && !isLoading && !error) {
//       const formattedTracks = data.map(convertAppleMusicTrack);
//       console.log(formattedTracks);
//       setGenreTracks(formattedTracks);
//     }
//     if (error) {
//       console.error("Error loading genre tracks:", error);
//       setGenreTracks([]);
//     }
//   }, [data, isLoading, error]);

//   const loadGenreTracks = (genreCode) => {
//     setSelectedGenre(genreCode);
//     setSkipQuery(false);
//   };

//   if (selectedGenre) {
//     const genre = genres.find((g) => g.code === selectedGenre);
//     return (
//       <div>
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => {
//               setSelectedGenre(null);
//               setSkipQuery(true);
//               setGenreTracks([]);
//             }}
//             className="text-green-500 hover:text-green-400 transition-colors"
//           >
//             ← Back to Genres
//           </button>
//           <h2 className="text-3xl font-bold text-white">{genre?.name}</h2>
//         </div>

//         {isLoading ? (
//           <div className="flex items-center justify-center py-12">
//             <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             <p>hello</p>
//             {genreTracks.map((track) => (
//               <TrackCard key={track.id} track={track} playlist={genreTracks} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-white mb-6">Browse by Genre</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {genres.map((genre) => (
//           <button
//             key={genre.code}
//             onClick={() => loadGenreTracks(genre.code)}
//             className={`${genre.color} p-6 rounded-lg hover:scale-105 transition-transform relative overflow-hidden`}
//           >
//             <h3 className="text-white text-xl font-bold text-left">
//               {genre.name}
//             </h3>
//             <div className="absolute -bottom-2 -right-2 transform rotate-25">
//               <div className="w-20 h-20 bg-black bg-opacity-20 rounded-lg"></div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GenreGrid;

import React, { useState, useEffect } from "react";
import { useGetSongsByGenreQuery } from "../services/ShazamCore";
import TrackCard from "./TrackCard";
import { data } from "./FakeData";
// import { Loader } from "./Loader"; // Assuming you have a Loader component
import Loading from "./Loading";
// import { data } from "./FakeData";

const genres = [
  { code: "POP", name: "Pop", color: "bg-pink-500" },
  { code: "HIP_HOP_RAP", name: "Hip-Hop", color: "bg-orange-500" },
  { code: "DANCE", name: "Dance", color: "bg-purple-500" },
  { code: "ROCK", name: "Rock", color: "bg-red-500" },
  { code: "JAZZ", name: "Jazz", color: "bg-blue-500" },
  { code: "REGGAE", name: "Reggae", color: "bg-green-500" },
  { code: "ALTERNATIVE", name: "Alternative", color: "bg-indigo-500" },
  { code: "ELECTRONIC", name: "Electronic", color: "bg-yellow-500" },
];

const convertAppleMusicTrack = (track) => ({
  key: track.id,
  id: track.id,
  title: track.attributes.name,
  artist: {
    name: track.attributes.artistName || "Unknown Artist",
    id: track.relationships?.artists?.data?.[0]?.id || "",
    picture_small:
      track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
      "https://via.placeholder.com/64x64",
  },
  album: {
    id: track.id,
    title: track.attributes.albumName,
    cover_small:
      track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
      "https://via.placeholder.com/64x64",
    cover_medium:
      track.attributes.artwork?.url || "https://via.placeholder.com/300x300",
  },
  preview: track.attributes.previews?.[0]?.url || "",
  duration: Math.floor(track.attributes.durationInMillis / 1000) || 0,
  explicit: track.attributes.contentRating === "explicit",
  genres: track.attributes.genreNames || [],
  releaseDate: track.attributes.releaseDate || "",
  isrc: track.attributes.isrc || "",
});

const GenreGrid = () => {
  const apiData = data;
  const [selectedGenre, setSelectedGenre] = useState();
  const [genreTracks, setGenreTracks] = useState([]);
  const [skipQuery, setSkipQuery] = useState(true);

  // Fetch tracks for selected genre
  // const { error, isLoading } = useGetSongsByGenreQuery(
  //   { genre: selectedGenre, countryCode: "IN" },
  //   { skip: skipQuery }
  // );
  const error = false;
  const isLoading = false;
  useEffect(() => {
    if (!skipQuery && apiData && !isLoading && !error) {
      const formattedTracks = apiData
        .map(convertAppleMusicTrack)
        .filter(Boolean);
      setGenreTracks(formattedTracks);
    }
    if (error) {
      console.error("Error loading genre tracks:", error);
      setGenreTracks([]);
    }
  }, [apiData, isLoading, error, skipQuery]);

  const loadGenreTracks = (genreCode) => {
    console.log(genreCode);
    setSelectedGenre(genreCode);
    setSkipQuery(false);
    setGenreTracks([]); // Clear previous tracks when loading new genre
  };

  const resetGenreSelection = () => {
    setSelectedGenre(null);
    setSkipQuery(true);
    setGenreTracks([]);
  };

  if (selectedGenre) {
    const genre = genres.find((g) => g.code === selectedGenre);

    return (
      <div className="px-4 sm:px-6 w-full ">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={resetGenreSelection}
            className="flex items-center gap-1 text-green-500 hover:text-green-400 transition-colors text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Genres
          </button>
          <h2 className="text-xl sm:text-3xl font-bold text-white">
            {genre?.name}
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loading size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">
            Failed to load tracks. Please try again.
          </div>
        ) : genreTracks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No tracks found for this genre.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6  ">
            {genreTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                playlist={genreTracks}
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold  mb-6 sm:mb-8 text-center sm:text-left text-zinc-300 bg-clip-text ">
        Explore Music Genres
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 @7xl:grid-cols-cols-2 xl:grid-cols-3 gap-2 lg:gap-2">
        {genres.map((genre) => (
          <button
            key={genre.code}
            onClick={() => loadGenreTracks(genre.code)}
            className={`
          ${genre.color} 
          p-5 sm:p-6 rounded-xl 
          hover:scale-[1.03] active:scale-95 
          transition-all duration-300 
          relative overflow-hidden 
          aspect-square 
          flex flex-col flex-1 flex-shrink  justify-between
          shadow-lg hover:shadow-xl
          transform hover:-translate-y-1
          group lg:w-[100px] xl:w-[120px] md:w-[110px]
        `}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Genre name with cool text effect */}
            <h3
              className="text-white text-sm sm:text-lg font-extrabold text-left z-10 
            drop-shadow-lg group-hover:drop-shadow-xl transition-all w-[80px] truncate"
            >
              {genre.name}
            </h3>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 transform rotate-12 z-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black/10 rounded-xl backdrop-blur-sm"></div>
            </div>

            {/* Floating music notes animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-30 transition-opacity">
              <svg
                className="w-16 h-16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>

            {/* Pulse animation on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-white/10 group-hover:border-white/20 transition-all duration-500"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreGrid;
