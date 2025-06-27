// // // import React, { useState, useEffect, useRef } from "react";
// // // import { useGetTopChartsQuery } from "../services/ShazamCore"; // Adjust path as needed
// // // import TrackCard from "./TrackCard";
// // // import TrackRow from "./TrackRow";
// // // import EnhancedSearchBar from "./EnhancedSearchBar";
// // // import ArtistView from "./ArtistView";
// // // import GenreGrid from "./GenreGrid";
// // // import AlbumGrid from "./AlbumGrid";
// // // import Library from "./Library";
// // // import { useTypedSelector } from "../hooks/useTypedSelector";
// // // import { gsap } from "gsap";

// // // // Helper function to convert Shazam track to standardized format
// // // // Helper function to convert Apple Music track to standardized format
// // // const convertAppleMusicTrack = (track) => ({
// // //   key: track.id,
// // //   id: track.id,
// // //   title: track.attributes.name,
// // //   artist: {
// // //     name: track.attributes.artistName || "Unknown Artist",
// // //     id: track.relationships?.artists?.data?.[0]?.id || "",
// // //     picture_small:
// // //       track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
// // //       "https://via.placeholder.com/64x64",
// // //   },
// // //   album: {
// // //     id: track.id, // Use song ID as a fallback, as Apple Music doesn't provide a separate album ID here
// // //     title: track.attributes.albumName,
// // //     cover_small:
// // //       track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
// // //       "https://via.placeholder.com/64x64",
// // //     cover_medium:
// // //       track.attributes.artwork?.url || "https://via.placeholder.com/300x300",
// // //   },
// // //   preview: track.attributes.previews?.[0]?.url || "",
// // //   duration: Math.floor(track.attributes.durationInMillis / 1000) || 0,
// // //   explicit: track.attributes.contentRating === "explicit",
// // //   genres: track.attributes.genreNames || [],
// // //   releaseDate: track.attributes.releaseDate || "",
// // //   isrc: track.attributes.isrc || "",
// // // });

// // // const MainContent = ({ currentView, onViewChange }) => {
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [artistResults, setArtistResults] = useState([]);
// // //   const [selectedArtist, setSelectedArtist] = useState(null);
// // //   const { recentlyPlayed } = useTypedSelector((state) => state.playlist);
// // //   const bannerRef = useRef(null);
// // //   const contentRef = useRef(null);
// // //   // Fetch top charts with caching
// // //   const { data, isLoading, error } = useGetTopChartsQuery({
// // //     countryCode: "IN",
// // //     page: 1,
// // //     pageSize: 20,
// // //   });
// // //   if (isLoading) console.log("Loading top charts...", data);
// // //   // Log errors if any
// // //   if (error) {
// // //     console.error("Error loading top charts:", error);
// // //   }

// // //   // Convert Shazam tracks to standardized format
// // //   const featuredTracks = data ? data.map(convertAppleMusicTrack) : [];

// // //   // GSAP animations
// // //   useEffect(() => {
// // //     // Banner wave animation
// // //     gsap.to(bannerRef.current, {
// // //       backgroundPositionX: "100%",
// // //       duration: 10,
// // //       repeat: -1,
// // //       yoyo: true,
// // //       ease: "sine.inOut",
// // //     });

// // //     // Fade in content sections
// // //     gsap.from(contentRef.current.children, {
// // //       opacity: 1,
// // //       y: 50,
// // //       stagger: 0.2,
// // //       duration: 0.2,
// // //       ease: "power3.out",
// // //     });

// // //     // Hover animations for track cards and artist buttons
// // //     const trackCards = document.querySelectorAll(".track-card");
// // //     trackCards.forEach((card) => {
// // //       card.addEventListener("mouseenter", () => {
// // //         gsap.to(card, {
// // //           scale: 1.05,
// // //           //   boxShadow: "0 8px 24px rgba(255, 255, 255, 0.2)",
// // //           duration: 0.3,
// // //           ease: "power2.out",
// // //         });
// // //       });
// // //       card.addEventListener("mouseleave", () => {
// // //         gsap.to(card, {
// // //           scale: 1,
// // //           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
// // //           duration: 0.3,
// // //           ease: "power2.out",
// // //         });
// // //       });
// // //     });
// // //   }, [currentView, searchResults, artistResults, featuredTracks]);

// // //   // Dynamic greeting based on time of day
// // //   const getGreeting = () => {
// // //     const hour = new Date().getHours();
// // //     if (hour < 12) return "Good Morning";
// // //     if (hour < 18) return "Good Afternoon";
// // //     return "Good Evening";
// // //   };
// // //   const renderSearchView = () => {
// // //     if (selectedArtist) {
// // //       return (
// // //         <ArtistView
// // //           artist={selectedArtist}
// // //           onBack={() => setSelectedArtist(null)}
// // //         />
// // //       );
// // //     }

// // //     return (
// // //       <div>
// // //         <div className="mb-8">
// // //           <EnhancedSearchBar
// // //             onResults={setSearchResults}
// // //             onArtistResults={setArtistResults}
// // //           />
// // //         </div>

// // //         {searchResults.length > 0 ? (
// // //           <div>
// // //             <h2 className="text-2xl font-bold text-white mb-4">
// // //               Search Results
// // //             </h2>
// // //             <div className="space-y">
// // //               {searchResults.slice(0, 20).map((track, index) => (
// // //                 <TrackRow
// // //                   key={track.id}
// // //                   track={track}
// // //                   index={index}
// // //                   playlist={searchResults}
// // //                   className="track-card"
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         ) : artistResults.length > 0 ? (
// // //           <div>
// // //             <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
// // //             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 ">
// // //               {artistResults.map((artist) => (
// // //                 <button
// // //                   key={artist.id}
// // //                   onClick={() => setSelectedArtist(artist)}
// // //                   className="track-card bg-gray-900/80 backdrop-blur-md p-4 rounded-xl hover:bg-gray-800/90 transition-colors text-left border border-gray-700"
// // //                 >
// // //                   <img
// // //                     src={
// // //                       artist.images[0]?.url ||
// // //                       "https://via.placeholder.com/200x200"
// // //                     }
// // //                     alt={artist.name}
// // //                     className="w-full aspect-square object-cover rounded-full mb-4 shadow-lg"
// // //                   />
// // //                   <h3 className="text-white font-medium truncate">
// // //                     {artist.name}
// // //                   </h3>
// // //                   <p className="text-gray-400 text-sm">Artist</p>
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div>
// // //             <h2 className="text-3xl font-bold text-white mb-6">Browse All</h2>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //               <div>
// // //                 <h3 className="text-2xl font-bold text-white mb-4">Genres</h3>
// // //                 <GenreGrid />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-2xl font-bold text-white mb-4">Albums</h3>
// // //                 <AlbumGrid />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   const renderHomeView = () => (
// // //     <div>
// // //       <div
// // //         ref={bannerRef}
// // //         className="relative mb-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 overflow-hidden"
// // //         style={{
// // //           backgroundImage:
// // //             "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
// // //           backgroundSize: "100px 100px",
// // //         }}
// // //       >
// // //         <div className="absolute inset-0 bg-black/50"></div>
// // //         <div className="relative z-10">
// // //           <h1 className="text-4xl font-extrabold text-white mb-2">
// // //             {getGreeting()}
// // //           </h1>
// // //           <p className="text-gray-200 text-lg">
// // //             Discover new music with Musicify
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {recentlyPlayed.length > 0 && (
// // //         <section className="mb-12">
// // //           <h2 className="text-3xl font-bold text-white mb-6">
// // //             Recently Played
// // //           </h2>
// // //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
// // //             {recentlyPlayed.slice(0, 6).map((track) => (
// // //               <TrackCard
// // //                 key={track.id}
// // //                 track={track}
// // //                 playlist={recentlyPlayed}
// // //                 className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
// // //               />
// // //             ))}
// // //           </div>
// // //         </section>
// // //       )}
// // //       {!isLoading && featuredTracks.length > 10 && (
// // //         <section>
// // //           <h2 className="text-3xl font-bold text-white mb-6">Made for You</h2>
// // //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
// // //             {featuredTracks.slice(10, 20).map((track) => (
// // //               <TrackCard
// // //                 key={track.id}
// // //                 track={track}
// // //                 playlist={featuredTracks}
// // //                 className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
// // //               />
// // //             ))}
// // //           </div>
// // //         </section>
// // //       )}
// // //       <section className="mb-12">
// // //         <h2 className="text-3xl font-bold text-white mb-6">Featured Tracks</h2>
// // //         {isLoading ? (
// // //           <div className="flex items-center justify-center py-12">
// // //             <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
// // //           </div>
// // //         ) : (
// // //           <div className="space-y-2">
// // //             {featuredTracks.slice(0, 10).map((track, index) => (
// // //               <TrackRow
// // //                 key={track.id}
// // //                 track={track}
// // //                 index={index}
// // //                 playlist={featuredTracks}
// // //                 className="track-card bg-gray-900/80 backdrop-blur-md rounded-lg shadow-md border border-gray-700"
// // //               />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </section>
// // //     </div>
// // //   );

// // //   const renderContent = () => {
// // //     switch (currentView) {
// // //       case "search":
// // //         return renderSearchView();
// // //       case "library":
// // //       case "liked":
// // //         return (
// // //           <Library currentView={currentView} onViewChange={onViewChange} />
// // //         );
// // //       default:
// // //         if (currentView.startsWith("playlist-")) {
// // //           return (
// // //             <Library currentView={currentView} onViewChange={onViewChange} />
// // //           );
// // //         }
// // //         return renderHomeView();
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen">
// // //       <div ref={contentRef}>{renderContent()}</div>
// // //     </div>
// // //   );
// // // };

// // // export default MainContent;

// // import React, { useState, useEffect, useRef } from "react";
// // import { useGetTopChartsQuery } from "../services/ShazamCore";
// // import TrackCard from "./TrackCard";
// // import TrackRow from "./TrackRow";
// // import EnhancedSearchBar from "./EnhancedSearchBar";
// // import ArtistView from "./ArtistView";
// // import GenreGrid from "./GenreGrid";
// // import AlbumGrid from "./AlbumGrid";
// // import Library from "./Library";
// // import { useTypedSelector } from "../hooks/useTypedSelector";
// // import { gsap } from "gsap";

// // // Helper function to convert Apple Music track to standardized format
// // const convertAppleMusicTrack = (track) => ({
// //   key: track.id,
// //   id: track.id,
// //   title: track.attributes.name,
// //   artist: {
// //     name: track.attributes.artistName || "Unknown Artist",
// //     id: track.relationships?.artists?.data?.[0]?.id || "",
// //     picture_small:
// //       track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
// //       "https://via.placeholder.com/64x64",
// //   },
// //   album: {
// //     id: track.id,
// //     title: track.attributes.albumName,
// //     cover_small:
// //       track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
// //       "https://via.placeholder.com/64x64",
// //     cover_medium:
// //       track.attributes.artwork?.url || "https://via.placeholder.com/300x300",
// //   },
// //   preview: track.attributes.previews?.[0]?.url || "",
// //   duration: Math.floor(track.attributes.durationInMillis / 1000) || 0,
// //   explicit: track.attributes.contentRating === "explicit",
// //   genres: track.attributes.genreNames || [],
// //   releaseDate: track.attributes.releaseDate || "",
// //   isrc: track.attributes.isrc || "",
// // });

// // const MainContent = ({ currentView, onViewChange }) => {
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [artistResults, setArtistResults] = useState([]);
// //   const [selectedArtist, setSelectedArtist] = useState(null);
// //   const { recentlyPlayed } = useTypedSelector((state) => state.playlist);
// //   const bannerRef = useRef(null);
// //   const contentRef = useRef(null);

// //   // Fetch top charts with caching
// //   const { data, isLoading, error } = useGetTopChartsQuery({
// //     countryCode: "IN",
// //     page: 1,
// //     pageSize: 20,
// //   });

// //   if (isLoading) console.log("Loading top charts...", data);
// //   if (error) console.error("Error loading top charts:", error);

// //   const featuredTracks = data ? data.map(convertAppleMusicTrack) : [];

// //   // GSAP animations
// //   useEffect(() => {
// //     // Banner wave animation
// //     gsap.to(bannerRef.current, {
// //       backgroundPositionX: "100%",
// //       duration: 2,
// //       repeat: -1,
// //       yoyo: true,
// //       //   ease: "sine.inOut",
// //       ease: "sine",
// //     });

// //     // Enhanced content animation with wave-like effect
// //     gsap.fromTo(
// //       contentRef.current.children,
// //       {
// //         opacity: 0,
// //         y: 50,
// //         // scale: 0.95,
// //       },
// //       {
// //         opacity: 1,
// //         y: 0,
// //         scale: 1,
// //         // stagger: 0.2,
// //         duration: 1.2,
// //         ease: "sine",
// //         // ease: "elastic.out(1, 0.5)", // Elastic ease for a wave-like bounce
// //         // onComplete: () => {
// //         //   // Subtle oscillation to mimic music waves
// //         //   gsap.to(contentRef.current.children, {
// //         //     y: "+=10",
// //         //     duration: 2,
// //         //     yoyo: true,
// //         //     repeat: -1,
// //         //     ease: "sine.inOut",
// //         //     // stagger: 0.1,
// //         //   });
// //         // },
// //       }
// //     );
// //     // Hover animations for track cards and artist buttons
// //     const trackCards = document.querySelectorAll(".track-card");
// //     trackCards.forEach((card) => {
// //       card.addEventListener("mouseenter", () => {
// //         gsap.to(card, {
// //           scale: 1.0,
// //           boxShadow: "0 8px 24px rgba(255, 255, 255, 0.2)",
// //           duration: 0.3,
// //           ease: "sine.inOut",
// //         });
// //       });
// //       card.addEventListener("mouseleave", () => {
// //         gsap.to(card, {
// //           scale: 1,
// //           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
// //           duration: 0.3,
// //           ease: "sine.inOut",
// //         });
// //       });
// //     });
// //   }, [currentView, searchResults, artistResults, featuredTracks]);

// //   // Dynamic greeting based on time of day
// //   const getGreeting = () => {
// //     const hour = new Date().getHours();
// //     if (hour < 12) return "Good Morning";
// //     if (hour < 18) return "Good Afternoon";
// //     return "Good Evening";
// //   };

// //   const renderSearchView = () => {
// //     if (selectedArtist) {
// //       return (
// //         <ArtistView
// //           artist={selectedArtist}
// //           onBack={() => setSelectedArtist(null)}
// //         />
// //       );
// //     }

// //     return (
// //       <div>
// //         <div className="mb-8">
// //           <EnhancedSearchBar
// //             onResults={setSearchResults}
// //             onArtistResults={setArtistResults}
// //           />
// //         </div>

// //         {searchResults.length > 0 ? (
// //           <div>
// //             <h2 className="text-3xl font-bold text-white mb-6">
// //               Search Results
// //             </h2>
// //             <div className="space-y-2 z-30">
// //               {searchResults.slice(0, 20).map((track, index) => (
// //                 <TrackRow
// //                   key={track.id}
// //                   track={track}
// //                   index={index}
// //                   playlist={searchResults}
// //                   className="track-card"
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         ) : artistResults.length > 0 ? (
// //           <div>
// //             <h2 className="text-3xl font-bold text-white mb-6">Artists</h2>
// //             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
// //               {artistResults.map((artist) => (
// //                 <button
// //                   key={artist.id}
// //                   onClick={() => setSelectedArtist(artist)}
// //                   className="track-card bg-gray-900/80 backdrop-blur-md p-4 rounded-xl hover:bg-gray-800/90 transition-colors text-left border border-gray-700"
// //                 >
// //                   <img
// //                     src={
// //                       artist.images[0]?.url ||
// //                       "https://via.placeholder.com/200x200"
// //                     }
// //                     alt={artist.name}
// //                     className="w-full aspect-square object-cover rounded-full mb-4 shadow-lg"
// //                   />
// //                   <h3 className="text-white font-semibold truncate">
// //                     {artist.name}
// //                   </h3>
// //                   <p className="text-gray-300 text-sm">Artist</p>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         ) : (
// //           <div>
// //             <h2 className="text-3xl font-bold text-white mb-6">Browse All</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //               <div>
// //                 <h3 className="text-2xl font-bold text-white mb-4">Genres</h3>
// //                 <GenreGrid />
// //               </div>
// //               <div>
// //                 <h3 className="text-2xl font-bold text-white mb-4">Albums</h3>
// //                 <AlbumGrid />
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   const renderHomeView = () => (
// //     <div>
// //       <div
// //         ref={bannerRef}
// //         className="relative mb-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 overflow-hidden"
// //         style={{
// //           backgroundImage:
// //             "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
// //           backgroundSize: "100px 100px",
// //         }}
// //       >
// //         <div className="absolute inset-0 bg-black/50"></div>
// //         <div className="relative z-10">
// //           <h1 className="text-4xl font-extrabold text-white mb-2">
// //             {getGreeting()}
// //           </h1>
// //           <p className="text-gray-200 text-lg">
// //             Discover new music with Musicify
// //           </p>
// //         </div>
// //       </div>

// //       {recentlyPlayed.length > 0 && (
// //         <section className="mb-12">
// //           <h2 className="text-3xl font-bold text-white mb-6">
// //             Recently Played
// //           </h2>
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
// //             {recentlyPlayed.slice(0, 6).map((track) => (
// //               <TrackCard
// //                 key={track.id}
// //                 track={track}
// //                 playlist={recentlyPlayed}
// //                 className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
// //               />
// //             ))}
// //           </div>
// //         </section>
// //       )}
// //       {!isLoading && featuredTracks.length > 10 && (
// //         <section>
// //           <h2 className="text-3xl font-bold text-white mb-6">Made for You</h2>
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
// //             {featuredTracks.slice(10, 20).map((track) => (
// //               <TrackCard
// //                 key={track.id}
// //                 track={track}
// //                 playlist={featuredTracks}
// //                 className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
// //               />
// //             ))}
// //           </div>
// //         </section>
// //       )}
// //       <section className="mb-12 mt-12">
// //         <h2 className="text-3xl font-bold text-white mb-6">Featured Tracks</h2>
// //         {isLoading ? (
// //           <div className="flex items-center justify-center py-12">
// //             <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
// //           </div>
// //         ) : (
// //           <div className="space-y-2">
// //             {featuredTracks.slice(0, 10).map((track, index) => (
// //               <TrackRow
// //                 key={track.id}
// //                 track={track}
// //                 index={index}
// //                 playlist={featuredTracks}
// //                 className="track-card bg-gray-900/80 backdrop-blur-md rounded-lg shadow-md border border-gray-700 mb-"
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );

// //   const renderContent = () => {
// //     switch (currentView) {
// //       case "search":
// //         return renderSearchView();
// //       case "library":
// //       case "liked":
// //         return (
// //           <Library currentView={currentView} onViewChange={onViewChange} />
// //         );
// //       default:
// //         if (currentView.startsWith("playlist-")) {
// //           return (
// //             <Library currentView={currentView} onViewChange={onViewChange} />
// //           );
// //         }
// //         return renderHomeView();
// //     }
// //   };

// //   return (
// //     <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen">
// //       <div ref={contentRef}>{renderContent()}</div>
// //     </div>
// //   );
// // };

// // export default MainContent;

// //

// import React, { useState, useEffect, useRef } from "react";
// import { useGetTopChartsQuery } from "../services/ShazamCore";
// import TrackCard from "./TrackCard";
// import TrackRow from "./TrackRow";
// import { useTypedSelector } from "../hooks/useTypedSelector";
// import { gsap } from "gsap";

// // Helper function to convert Apple Music track to standardized format
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

// const MainContent = () => {
//   const { recentlyPlayed } = useTypedSelector((state) => state.playlist);
//   const bannerRef = useRef(null);
//   const contentRef = useRef(null);

//   // Fetch top charts with caching
//   const { data, isLoading, error } = useGetTopChartsQuery({
//     countryCode: "IN",
//     page: 1,
//     pageSize: 20,
//   });

//   if (isLoading) console.log("Loading top charts...", data);
//   if (error) console.error("Error loading top charts:", error);

//   const featuredTracks = data ? data.map(convertAppleMusicTrack) : [];

//   // GSAP animations
//   useEffect(() => {
//     // Banner wave animation
//     gsap.to(bannerRef.current, {
//       backgroundPositionX: "100%",
//       duration: 2,
//       repeat: -1,
//       yoyo: true,
//       ease: "sine",
//     });

//     // Content animation
//     gsap.fromTo(
//       contentRef.current.children,
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 1.2,
//         ease: "sine",
//         stagger: 0.2,
//       }
//     );

//     // Hover animations for track cards
//     const trackCards = document.querySelectorAll(".track-card");
//     trackCards.forEach((card) => {
//       card.addEventListener("mouseenter", () => {
//         gsap.to(card, {
//           scale: 1.05,
//           boxShadow: "0 8px 24px rgba(255, 255, 255, 0.2)",
//           duration: 0.3,
//           ease: "sine.inOut",
//         });
//       });
//       card.addEventListener("mouseleave", () => {
//         gsap.to(card, {
//           scale: 1,
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//           duration: 0.3,
//           ease: "sine.inOut",
//         });
//       });
//     });
//   }, [featuredTracks, recentlyPlayed]);

//   // Dynamic greeting based on time of day
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   return (
//     <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen">
//       <div ref={contentRef}>
//         <div
//           ref={bannerRef}
//           className="relative mb-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 overflow-hidden"
//           style={{
//             backgroundImage:
//               "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
//             backgroundSize: "100px 100px",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/50"></div>
//           <div className="relative z-10">
//             <h1 className="text-4xl font-extrabold text-white mb-2">
//               {getGreeting()}
//             </h1>
//             <p className="text-gray-200 text-lg">
//               Discover new music with Musicify
//             </p>
//           </div>
//         </div>

//         {recentlyPlayed.length > 0 && (
//           <section className="mb-12">
//             <h2 className="text-3xl font-bold text-white mb-6">
//               Recently Played
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//               {recentlyPlayed.slice(0, 6).map((track) => (
//                 <TrackCard
//                   key={track.id}
//                   track={track}
//                   playlist={recentlyPlayed}
//                   className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//         {!isLoading && featuredTracks.length > 10 && (
//           <section>
//             <h2 className="text-3xl font-bold text-white mb-6">Made for You</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//               {featuredTracks.slice(10, 20).map((track) => (
//                 <TrackCard
//                   key={track.id}
//                   track={track}
//                   playlist={featuredTracks}
//                   className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//         <section className="mb-12 mt-12">
//           <h2 className="text-3xl font-bold text-white mb-6">
//             Featured Tracks
//           </h2>
//           {isLoading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {featuredTracks.slice(0, 10).map((track, index) => (
//                 <TrackRow
//                   key={track.id}
//                   track={track}
//                   index={index}
//                   playlist={featuredTracks}
//                   className="track-card bg-gray-900/80 backdrop-blur-md rounded-lg shadow-md border border-gray-700"
//                 />
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default MainContent;

//
import React, { useEffect, useRef, useState } from "react";
import { useGetTopChartsQuery } from "../services/ShazamCore";
import TrackCard from "./TrackCard";
import TrackRow from "./TrackRow";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { gsap } from "gsap";
import { Plus } from "lucide-react";

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

const MainContent = () => {
  const { recentlyPlayed } = useTypedSelector((state) => state.playlist);
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const [recentlyPlayedLimit, setRecentlyPlayedLimit] = useState(3);
  const [madeForYouLimit, setMadeForYouLimit] = useState(5);
  const [featuredTracksLimit, setFeaturedTracksLimit] = useState(3);

  const { data, isLoading, error } = useGetTopChartsQuery({
    countryCode: "IN",
    page: 1,
    pageSize: 20,
  });

  if (isLoading) console.log("Loading top charts...", data);
  if (error) console.error("Error loading top charts:", error);

  const featuredTracks = data ? data.map(convertAppleMusicTrack) : [];

  useEffect(() => {
    gsap.to(bannerRef.current, {
      backgroundPositionX: "100%",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine",
    });

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
  }, [
    featuredTracks,
    recentlyPlayed,
    recentlyPlayedLimit,
    madeForYouLimit,
    featuredTracksLimit,
  ]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLoadMoreRecentlyPlayed = () => {
    setRecentlyPlayedLimit((prev) => prev + 3);
  };

  const handleLoadMoreMadeForYou = () => {
    setMadeForYouLimit((prev) => prev + 5);
  };

  const handleLoadMoreFeaturedTracks = () => {
    setFeaturedTracksLimit((prev) => prev + 6);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen">
      <div ref={contentRef}>
        <div
          ref={bannerRef}
          className="relative mb-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
            backgroundSize: "100px 100px",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              {getGreeting()}
            </h1>
            <p className="text-gray-200 text-lg">
              Discover new music with Musicify
            </p>
          </div>
        </div>

        {recentlyPlayed.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Recently Played
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recentlyPlayed.slice(0, recentlyPlayedLimit).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playlist={recentlyPlayed}
                  className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
                />
              ))}
            </div>
            {recentlyPlayedLimit < recentlyPlayed.length && (
              <button
                onClick={handleLoadMoreRecentlyPlayed}
                className="mt-6 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
              >
                <Plus className="w-5 h-5" />
                More
              </button>
            )}
          </section>
        )}

        {!isLoading && featuredTracks.length > 5 && (
          <section className="mb-12">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Made for You
              </h2>
              {madeForYouLimit < featuredTracks.length && (
                <button
                  onClick={handleLoadMoreMadeForYou}
                  className="flex items-center  text-green-500 hover:text-green-400 transition-colors font-medium px-4  rounded-lg hover:bg-green-500/10"
                >
                  <Plus className="w-5 h-5" />
                  More
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {featuredTracks.slice(0, madeForYouLimit).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playlist={featuredTracks}
                  className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
                />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12 mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Featured Tracks
            </h2>
            {featuredTracksLimit < featuredTracks.length && (
              <button
                onClick={handleLoadMoreFeaturedTracks}
                className=" flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-medium px-4  rounded-lg hover:bg-green-500/10"
              >
                <Plus className="w-5 h-5" />
                More
              </button>
            )}
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {featuredTracks
                  .slice(0, featuredTracksLimit)
                  .map((track, index) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      index={index}
                      playlist={featuredTracks}
                      className="track-card bg-gray-900/80 backdrop-blur-md rounded-lg shadow-md border border-gray-700"
                    />
                  ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MainContent;
