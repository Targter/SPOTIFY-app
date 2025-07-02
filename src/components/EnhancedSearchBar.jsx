// import React, { useState, useEffect } from "react";
// import { Search, User, Music, Album, SendHorizontal } from "lucide-react";
// import { useGetSongsBySearchQuery } from "../services/ShazamCore"; // Adjust path as needed
// // import { data } from "./FakeData";
// // Helper function to convert Shazam track to standardized format
// const convertShazamTrack = (track) => ({
//   id: track.key || track.id,
//   title: track.title,
//   artist: {
//     name: track.subtitle || "Unknown Artist",
//     id: track.artists?.[0]?.adamid || "",
//   },
//   album: {
//     id: track.albumadamid || "",
//     title: track.title,
//     cover_medium:
//       track.images?.coverarthq ||
//       track.images?.coverart ||
//       "https://via.placeholder.com/300x300",
//   },
//   preview:
//     track.hub?.actions?.find((action) => action.type === "uri")?.uri || "",
//   duration: 0,
// });

// // Helper function to convert Shazam artist to standardized format
// const convertShazamArtist = (artist) => ({
//   id: artist.adamid,
//   name: artist.name || "Unknown Artist",
//   images: [{ url: artist.avatar || "https://via.placeholder.com/200x200" }],
//   genres: artist.genres?.primary ? [artist.genres.primary] : [],
//   followers: { total: 0 }, // Shazam doesn't provide follower count
//   popularity: 0,
//   verified: artist.verified || false,
// });

// const EnhancedSearchBar = ({ onResults, onArtistResults }) => {
//   const [query, setQuery] = useState("");
//   const [searchType, setSearchType] = useState("all");
//   const [formattedQuery, setFormattedQuery] = useState("");
//   const [skipSearch, setSkipSearch] = useState(true);
//   // const isLoading = false;
//   // Fetch search results only when skipSearch is false
//   console.log("Formatted query:", formattedQuery, "Skip search:", skipSearch);
//   const { data, isLoading } = useGetSongsBySearchQuery(formattedQuery, {
//     skip: skipSearch,
//   });
//   console.log("Search query:", data, "Loading:", isLoading);
//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Search submitted:", query, searchType);
//     if (query.trim().length > 2) {
//       let shazamQuery = query;
//       if (searchType === "track") {
//         shazamQuery = `track:${query}`;
//       } else if (searchType === "artist") {
//         shazamQuery = `artist:${query}`;
//       } else if (searchType === "album") {
//         shazamQuery = `album:${query}`;
//       }
//       setFormattedQuery(shazamQuery);
//       setSkipSearch(false);
//     } else {
//       setSkipSearch(true);
//       console.log("REsult 1....");
//       onResults([]);
//       if (onArtistResults) onArtistResults([]);
//     }
//   };

//   // Process search results
//   useEffect(() => {
//     if (data && !isLoading) {
//       // Handle tracks
//       console.log("this track called...", data);
//       let tracks =
//         data.tracks?.hits?.map((hit) => convertShazamTrack(hit.track)) || [];

//       // For album search, group tracks by album
//       console.log("Processing search Typee:", searchType, tracks);
//       if (searchType === "album") {
//         const uniqueAlbums = tracks.reduce((acc, track) => {
//           const albumId = track.album.id;
//           if (!acc.find((album) => album.id === albumId)) {
//             acc.push({
//               id: albumId,
//               title: track.album.title,
//               cover_medium: track.album.cover_medium,
//               artist: track.artist,
//             });
//           }
//           return acc;
//         }, []);
//         tracks = uniqueAlbums.map((album) => ({
//           id: album.id,
//           title: album.title,
//           artist: album.artist,
//           album: {
//             id: album.id,
//             title: album.title,
//             cover_medium: album.cover_medium,
//           },
//           preview: "", // Albums don't have previews
//           duration: 0,
//         }));
//       }

//       console.log("REsult 2....", tracks);
//       onResults(tracks);

//       // Handle artists for artist search
//       if (searchType === "artist" && onArtistResults) {
//         const artists =
//           data.artists?.hits?.map((hit) => convertShazamArtist(hit.artist)) ||
//           [];
//         onArtistResults(artists);
//       }
//     } else if (!isLoading && !skipSearch) {
//       console.log("this Called...3");
//       onResults([]);
//       if (onArtistResults) onArtistResults([]);
//     }
//   }, [data, isLoading, searchType, onResults, onArtistResults, skipSearch]);

//   const searchTypeIcons = {
//     all: <Search className="w-4 h-4" />,
//     track: <Music className="w-4 h-4" />,
//     artist: <User className="w-4 h-4" />,
//     album: <Album className="w-4 h-4" />,
//   };

//   return (
//     <div className="space-y-4 ">
//       {/* Search Type Selector */}
//       <div className="flex gap-2">
//         {["all", "track", "artist", "album"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setSearchType(type)}
//             className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
//               searchType === type
//                 ? "bg-green-500 text-black"
//                 : "bg-gray-800 text-white hover:bg-gray-700"
//             }`}
//           >
//             {searchTypeIcons[type]}
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Search Input */}
//       <form onSubmit={handleSubmit} className="relative max-w-md">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder={`Search for ${
//             searchType === "all" ? "songs, artists, albums" : searchType + "s"
//           }...`}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full bg-gray-800 text-white pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-700 transition-colors"
//         />
//         {isLoading ? (
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <button
//             type="submit"
//             disabled={query.trim().length <= 2}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 disabled:text-gray-600"
//           >
//             <SendHorizontal className="w-5 h-5" />
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default EnhancedSearchBar;

//

import React, { useState, useEffect, useRef } from "react";
import { Search, User, Music, Album, SendHorizontal, X } from "lucide-react";
import { useGetSongsBySearchQuery } from "../services/ShazamCore"; // Adjust path as needed
import TrackRow from "./TrackRow"; // Adjust path as needed
import ArtistView from "./ArtistView"; // Adjust path as needed
import GenreGrid from "./GenreGrid"; // Adjust path as needed
import AlbumGrid from "./AlbumGrid"; // Adjust path as needed
import { gsap } from "gsap";
// import { data } from "./FakeData";
// Helper function to convert Shazam track to standardized format
const convertShazamTrack = (track) => {
  const coverArtUrl =
    track.images?.coverarthq ||
    track.images?.coverart ||
    "https://via.placeholder.com/300x300";
  return {
    id: track.key || track.id || "",
    title: track.title || "Unknown Title",
    artist: {
      name: track.subtitle || "Unknown Artist",
      id: track.artists?.[0]?.adamid || "",
    },
    album: {
      id: track.albumadamid || "",
      title: track.title || "Unknown Album",
      cover_small:
        coverArtUrl.replace(/400x400cc\.jpg$/, "64x64cc.jpg") ||
        "https://via.placeholder.com/64x64",
      cover_medium: coverArtUrl,
    },
    preview:
      track.hub?.actions?.find((action) => action.type === "uri")?.uri || "",
    duration: 0,
  };
};

// Helper function to convert Shazam artist to standardized format
const convertShazamArtist = (artist) => {
  // console.log("Converting artist:", artist);
  return {
    id: artist.adamid || "",
    name: artist.name || "Unknown Artist",
    images: [
      {
        url: artist.avatar
          ? artist.avatar.replace(/800x800cc\.jpg$/, "400x400cc.jpg")
          : "https://via.placeholder.com/400x400",
      },
    ],
    genres: artist.genres?.primary ? [artist.genres.primary] : [],
    followers: { total: 0 },
    popularity: 0,
    verified: artist.verified || false,
  };
};

const EnhancedSearchBar = ({
  onResults,
  onArtistResults,
  className,
  onClear,
}) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [formattedQuery, setFormattedQuery] = useState("");
  const [skipSearch, setSkipSearch] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);

  // Fetch search results only when skipSearch is false
  const { data, isLoading } = useGetSongsBySearchQuery(formattedQuery, {
    skip: skipSearch,
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length > 2) {
      let shazamQuery = query.trim();
      if (searchType === "track") {
        shazamQuery = `track:${query.trim()}`;
      } else if (searchType === "artist") {
        shazamQuery = `artist:${query.trim()}`;
      } else if (searchType === "album") {
        shazamQuery = `album:${query.trim()}`;
      }
      setFormattedQuery(shazamQuery);
      setSkipSearch(false);
      // Add to search history
      setSearchHistory((prev) => {
        const newHistory = [
          shazamQuery,
          ...prev.filter((q) => q !== shazamQuery),
        ].slice(0, 5);
        return newHistory;
      });
    } else {
      setSkipSearch(true);
      onResults([]);
      if (onArtistResults) onArtistResults([]);
    }
  };

  // Clear search query and history
  const clearSearch = () => {
    setQuery("");
    setFormattedQuery("");
    setSkipSearch(true);
    setSearchHistory([]);
    onResults([]);
    if (onArtistResults) onArtistResults([]);
  };

  // Listen for clear signal from parent
  useEffect(() => {
    if (onClear && onClear.clearTriggered) {
      clearSearch();
    }
  }, [onClear]);

  // Process search results
  useEffect(() => {
    if (data && !isLoading) {
      // Handle tracks
      let tracks =
        data.tracks?.hits?.map((hit) => convertShazamTrack(hit.track)) || [];

      // For album search, group tracks by album
      if (searchType === "album") {
        const uniqueAlbums = tracks.reduce((acc, track) => {
          const albumId = track.album.id;
          if (!acc.find((album) => album.id === albumId)) {
            acc.push({
              id: albumId,
              title: track.album.title,
              cover_small: track.album.cover_small,
              cover_medium: track.album.cover_medium,
              artist: track.artist,
            });
          }
          return acc;
        }, []);
        tracks = uniqueAlbums.map((album) => ({
          id: album.id,
          title: album.title,
          artist: album.artist,
          album: {
            id: album.id,
            title: album.title,
            cover_small: album.cover_small,
            cover_medium: album.cover_medium,
          },
          preview: "",
          duration: 0,
        }));
      }

      onResults(tracks);

      // Handle artists for artist search
      if (searchType === "artist" && onArtistResults) {
        console.log("Artist hits:", data.artists?.hits); // Debug log
        const artists =
          data.artists?.hits?.map((hit) => convertShazamArtist(hit.artist)) ||
          [];
        onArtistResults(artists);
      }
    } else if (!isLoading && !skipSearch) {
      onResults([]);
      if (onArtistResults) onArtistResults([]);
    }
  }, [data, isLoading, searchType, onResults, onArtistResults, skipSearch]);

  const searchTypeIcons = {
    all: <Search className="w-4 h-4" />,
    track: <Music className="w-4 h-4" />,
    artist: <User className="w-4 h-4" />,
    album: <Album className="w-4 h-4" />,
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Type Selector */}
      <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {["all", "track", "artist", "album"].map((type) => (
          <button
            key={type}
            onClick={() => setSearchType(type)}
            className={`flex-shrink-0 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm transition-colors ${
              searchType === type
                ? "bg-gradient-to-r from-gray-100 to-zinc-400 text-black font-medium"
                : "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <span className="hidden sm:inline-block">
              {searchTypeIcons[type]}
            </span>
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={`Search for ${
            searchType === "all" ? "songs, artists, albums" : searchType + "s"
          }...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-600/40 pl-10 pr-16 py-3 rounded-lg focus:outline-none focus:ring-2   transition-colors"
        />
        {(query.length > 0 || searchHistory.length > 0) && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-9 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-zinc-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {isLoading ? (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            type="submit"
            disabled={query.trim().length <= 2}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-zinc-500 disabled:text-gray-600"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mt-2">
          <h3 className="text-sm text-white">Recent Searches</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(item.replace(/^(track|artist|album):/, ""));
                  setFormattedQuery(item);
                  setSkipSearch(false);
                }}
                className="text-sm bg-zinc-500/30 text-white px-3 py-1 rounded-full hover:bg-gray-700"
              >
                {item.replace(/^(track|artist|album):/, "")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
