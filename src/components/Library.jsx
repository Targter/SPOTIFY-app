// // // import React from 'react';
// // // import { useTypedSelector } from '../hooks/useTypedSelector';
// // // import TrackRow from './TrackRow';

// // // const Library = ({ currentView, onViewChange }) => {
// // //   const { playlists, likedSongs } = useTypedSelector(state => state.playlist);

// // //   const renderPlaylistView = (playlistId) => {
// // //     const playlist = playlists.find(p => p.id === playlistId);
// // //     if (!playlist) return null;

// // //     return (
// // //       <div>
// // //         <div className="flex items-center gap-4 mb-6">
// // //           <button
// // //             onClick={() => onViewChange('library')}
// // //             className="text-green-500 hover:text-green-400 transition-colors"
// // //           >
// // //             ← Back to Library
// // //           </button>
// // //         </div>

// // //         <div className="flex items-start gap-6 mb-8">
// // //           <img
// // //             src={playlist.cover || 'https://picsum.photos/300/300?random=playlist'}
// // //             alt={playlist.name}
// // //             className="w-48 h-48 object-cover rounded-lg shadow-lg"
// // //           />
// // //           <div className="flex-1">
// // //             <h1 className="text-4xl font-bold text-white mb-2">{playlist.name}</h1>
// // //             <p className="text-gray-400">{playlist.tracks.length} songs</p>
// // //           </div>
// // //         </div>

// // //         {playlist.tracks.length === 0 ? (
// // //           <div className="text-center py-12">
// // //             <p className="text-gray-400 text-lg">This playlist is empty</p>
// // //             <p className="text-gray-500">Add some songs to get started</p>
// // //           </div>
// // //         ) : (
// // //           <div className="space-y-1">
// // //             {playlist.tracks.map((track, index) => (
// // //               <TrackRow
// // //                 key={track.id}
// // //                 track={track}
// // //                 index={index}
// // //                 playlist={playlist.tracks}
// // //               />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   const renderLikedSongs = () => {
// // //     return (
// // //       <div>
// // //         <div className="flex items-center gap-4 mb-6">
// // //           <button
// // //             onClick={() => onViewChange('library')}
// // //             className="text-green-500 hover:text-green-400 transition-colors"
// // //           >
// // //             ← Back to Library
// // //           </button>
// // //         </div>

// // //         <div className="flex items-start gap-6 mb-8">
// // //           <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg shadow-lg flex items-center justify-center">
// // //             <span className="text-white text-6xl">♥</span>
// // //           </div>
// // //           <div className="flex-1">
// // //             <h1 className="text-4xl font-bold text-white mb-2">Liked Songs</h1>
// // //             <p className="text-gray-400">{likedSongs.length} songs</p>
// // //           </div>
// // //         </div>

// // //         {likedSongs.length === 0 ? (
// // //           <div className="text-center py-12">
// // //             <p className="text-gray-400 text-lg">No liked songs yet</p>
// // //             <p className="text-gray-500">Like some songs to see them here</p>
// // //           </div>
// // //         ) : (
// // //           <div className="space-y-1">
// // //             {likedSongs.map((track, index) => (
// // //               <TrackRow
// // //                 key={track.id}
// // //                 track={track}
// // //                 index={index}
// // //                 playlist={likedSongs}
// // //               />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   if (currentView === 'liked') {
// // //     return renderLikedSongs();
// // //   }

// // //   if (currentView.startsWith('playlist-')) {
// // //     const playlistId = currentView.replace('playlist-', '');
// // //     return renderPlaylistView(playlistId);
// // //   }

// // //   return (
// // //     <div>
// // //       <h2 className="text-3xl font-bold text-white mb-6">Your Library</h2>

// // //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
// // //         {/* Liked Songs */}
// // //         <button
// // //           onClick={() => onViewChange('liked')}
// // //           className="group bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors text-left"
// // //         >
// // //           <div className="w-full aspect-square bg-gradient-to-br from-purple-400 to-blue-400 rounded-md mb-3 flex items-center justify-center">
// // //             <span className="text-white text-4xl">♥</span>
// // //           </div>
// // //           <h3 className="text-white font-medium truncate mb-1">Liked Songs</h3>
// // //           <p className="text-gray-400 text-sm">{likedSongs.length} songs</p>
// // //         </button>

// // //         {/* User Playlists */}
// // //         {playlists.map((playlist) => (
// // //           <button
// // //             key={playlist.id}
// // //             onClick={() => onViewChange(`playlist-${playlist.id}`)}
// // //             className="group bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors text-left"
// // //           >
// // //             <img
// // //               src={playlist.cover || 'https://picsum.photos/300/300?random=playlist'}
// // //               alt={playlist.name}
// // //               className="w-full aspect-square object-cover rounded-md mb-3"
// // //             />
// // //             <h3 className="text-white font-medium truncate mb-1">{playlist.name}</h3>
// // //             <p className="text-gray-400 text-sm">{playlist.tracks.length} songs</p>
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Library;

// // //

// // import React from "react";
// // import { useTypedSelector } from "../hooks/useTypedSelector";
// // import TrackRow from "./TrackRow";

// // const Library = ({ currentView, onViewChange }) => {
// //   const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);

// //   const renderPlaylistView = (playlistId) => {
// //     const playlist = playlists.find((p) => p.id === playlistId);
// //     if (!playlist) return null;

// //     console.log(
// //       "Rendering playlist:",
// //       playlist.name,
// //       "with tracks:",
// //       playlist.tracks
// //     );

// //     return (
// //       <div className="space-y-6">
// //         <div className="flex items-center gap-4 mb-6">
// //           <button
// //             onClick={() => onViewChange("library")}
// //             className="text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
// //           >
// //             ← Back to Library
// //           </button>
// //         </div>

// //         <div className="flex items-start gap-8 mb-10 p-6 bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
// //           <img
// //             src={
// //               playlist.cover || "https://picsum.photos/300/300?random=playlist"
// //             }
// //             alt={playlist.name}
// //             className="w-52 h-52 object-cover rounded-2xl shadow-2xl border border-gray-600/30"
// //           />
// //           <div className="flex-1 space-y-4">
// //             <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
// //               {playlist.name}
// //             </h1>
// //             <p className="text-gray-300 text-lg">
// //               {playlist.description || "No description"}
// //             </p>
// //             <p className="text-gray-400 font-medium">
// //               {playlist.tracks.length} songs
// //             </p>
// //           </div>
// //         </div>

// //         {playlist.tracks.length === 0 ? (
// //           <div className="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800/50">
// //             <p className="text-gray-400 text-xl mb-2">This playlist is empty</p>
// //             <p className="text-gray-500">
// //               Add some songs to get started by clicking the "..." menu on any
// //               track
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="space-y-2 bg-gray-900/20 rounded-2xl p-6 border border-gray-800/30">
// //             <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 text-gray-400 text-sm border-b border-gray-800/50 font-semibold">
// //               <span>#</span>
// //               <span>Title</span>
// //               <span></span>
// //               <span></span>
// //               <span>Duration</span>
// //             </div>
// //             {playlist.tracks.map((track, index) => (
// //               <TrackRow
// //                 key={`${track.id}-${index}`}
// //                 track={track}
// //                 index={index}
// //                 playlist={playlist.tracks}
// //                 playlistId={playlistId}
// //                 showDeleteOption={true}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   const renderLikedSongs = () => {
// //     console.log("Rendering liked songs:", likedSongs);

// //     return (
// //       <div className="space-y-6">
// //         <div className="flex items-center gap-4 mb-6">
// //           <button
// //             onClick={() => onViewChange("library")}
// //             className="text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
// //           >
// //             ← Back to Library
// //           </button>
// //         </div>

// //         <div className="flex items-start gap-8 mb-10 p-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
// //           <div className="w-52 h-52 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center border border-purple-400/30">
// //             <span className="text-white text-8xl">♥</span>
// //           </div>
// //           <div className="flex-1 space-y-4">
// //             <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
// //               Liked Songs
// //             </h1>
// //             <p className="text-gray-300 text-lg">Your favorite tracks</p>
// //             <p className="text-gray-400 font-medium">
// //               {likedSongs.length} songs
// //             </p>
// //           </div>
// //         </div>

// //         {likedSongs.length === 0 ? (
// //           <div className="text-center py-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
// //             <p className="text-gray-400 text-xl mb-2">No liked songs yet</p>
// //             <p className="text-gray-500">
// //               Like some songs by clicking the heart icon to see them here
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="space-y-2 bg-gray-900/20 rounded-2xl p-6 border border-gray-800/30">
// //             <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 text-gray-400 text-sm border-b border-gray-800/50 font-semibold">
// //               <span>#</span>
// //               <span>Title</span>
// //               <span></span>
// //               <span></span>
// //               <span>Duration</span>
// //             </div>
// //             {likedSongs.map((track, index) => (
// //               <TrackRow
// //                 key={`liked-${track.id}-${index}`}
// //                 track={track}
// //                 index={index}
// //                 playlist={likedSongs}
// //                 showDeleteOption={false}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   if (currentView === "liked") {
// //     return renderLikedSongs();
// //   }

// //   if (currentView.startsWith("playlist-")) {
// //     const playlistId = currentView.replace("playlist-", "");
// //     return renderPlaylistView(playlistId);
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
// //         Your Library
// //       </h2>

// //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
// //         {/* Liked Songs */}
// //         <button
// //           onClick={() => onViewChange("liked")}
// //           className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl hover:from-gray-800/90 hover:to-gray-700/80 transition-all text-left border border-gray-800/50 hover:border-gray-600/70 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
// //         >
// //           <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4 flex items-center justify-center shadow-lg border border-purple-400/30">
// //             <span className="text-white text-5xl">♥</span>
// //           </div>
// //           <h3 className="text-white font-bold truncate mb-2 text-lg group-hover:text-gray-100">
// //             Liked Songs
// //           </h3>
// //           <p className="text-gray-400 text-sm font-medium">
// //             {likedSongs.length} songs
// //           </p>
// //         </button>

// //         {/* User Playlists */}
// //         {playlists.map((playlist) => (
// //           <button
// //             key={playlist.id}
// //             onClick={() => onViewChange(`playlist-${playlist.id}`)}
// //             className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl hover:from-gray-800/90 hover:to-gray-700/80 transition-all text-left border border-gray-800/50 hover:border-gray-600/70 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
// //           >
// //             <img
// //               src={
// //                 playlist.cover ||
// //                 "https://picsum.photos/300/300?random=playlist"
// //               }
// //               alt={playlist.name}
// //               className="w-full aspect-square object-cover rounded-xl mb-4 shadow-lg border border-gray-600/30"
// //             />
// //             <h3 className="text-white font-bold truncate mb-2 text-lg group-hover:text-gray-100">
// //               {playlist.name}
// //             </h3>
// //             <p className="text-gray-400 text-sm font-medium">
// //               {playlist.tracks.length} songs
// //             </p>
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Library;

// import React, { useEffect, useRef } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { useTypedSelector } from "../hooks/useTypedSelector";
// import TrackRow from "./TrackRow";
// import { gsap } from "gsap";

// const Library = () => {
//   const { playlistId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
//   const contentRef = useRef(null);

//   const isLibrary = location.pathname === "/library";
//   const isLiked = location.pathname === "/liked";
//   const isPlaylist = playlistId && location.pathname.startsWith("/playlist/");
//   const playlist = isPlaylist
//     ? playlists.find((p) => p.id === playlistId)
//     : null;

//   // GSAP animations
//   useEffect(() => {
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

//     const trackCards = document.querySelectorAll(".track-card, .group");
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
//   }, [isLibrary, isLiked, isPlaylist, playlist, likedSongs]);

//   const renderPlaylistView = () => {
//     if (!playlist) {
//       return (
//         <div className="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800/50">
//           <p className="text-gray-400 text-xl">Playlist Not Found</p>
//         </div>
//       );
//     }

//     console.log(
//       "Rendering playlist:",
//       playlist.name,
//       "with tracks:",
//       playlist.tracks
//     );

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate("/library")}
//             className="text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
//           >
//             ← Back to Library
//           </button>
//         </div>

//         <div className="flex items-start gap-8 mb-10 p-6 bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
//           <img
//             src={
//               playlist.cover || "https://picsum.photos/300/300?random=playlist"
//             }
//             alt={playlist.name}
//             className="w-52 h-52 object-cover rounded-2xl shadow-2xl border border-gray-600/30"
//           />
//           <div className="flex-1 space-y-4">
//             <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               {playlist.name}
//             </h1>
//             <p className="text-gray-300 text-lg">
//               {playlist.description || "No description"}
//             </p>
//             <p className="text-gray-400 font-medium">
//               {playlist.tracks.length} songs
//             </p>
//           </div>
//         </div>

//         {playlist.tracks.length === 0 ? (
//           <div className="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800/50">
//             <p className="text-gray-400 text-xl mb-2">This playlist is empty</p>
//             <p className="text-gray-500">
//               Add some songs to get started by clicking the "..." menu on any
//               track
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-2 bg-gray-900/20 rounded-2xl p-6 border border-gray-800/30">
//             <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 text-gray-400 text-sm border-b border-gray-800/50 font-semibold">
//               <span>#</span>
//               <span>Title</span>
//               <span></span>
//               <span></span>
//               <span>Duration</span>
//             </div>
//             {playlist.tracks.map((track, index) => (
//               <TrackRow
//                 key={`${track.id}-${index}`}
//                 track={track}
//                 index={index}
//                 playlist={playlist.tracks}
//                 playlistId={playlistId}
//                 showDeleteOption={true}
//                 className="track-card"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderLikedSongs = () => {
//     console.log("Rendering liked songs:", likedSongs);

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate("/library")}
//             className="text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
//           >
//             ← Back to Library
//           </button>
//         </div>

//         <div className="flex items-start gap-8 mb-10 p-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
//           <div className="w-52 h-52 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center border border-purple-400/30">
//             <span className="text-white text-8xl">♥</span>
//           </div>
//           <div className="flex-1 space-y-4">
//             <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//               Liked Songs
//             </h1>
//             <p className="text-gray-300 text-lg">Your favorite tracks</p>
//             <p className="text-gray-400 font-medium">
//               {likedSongs.length} songs
//             </p>
//           </div>
//         </div>

//         {likedSongs.length === 0 ? (
//           <div className="text-center py-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
//             <p className="text-gray-400 text-xl mb-2">No liked songs yet</p>
//             <p className="text-gray-500">
//               Like some songs by clicking the heart icon to see them here
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-2 bg-gray-900/20 rounded-2xl p-6 border border-gray-800/30">
//             <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 text-gray-400 text-sm border-b border-gray-800/50 font-semibold">
//               <span>#</span>
//               <span>Title</span>
//               <span></span>
//               <span></span>
//               <span>Duration</span>
//             </div>
//             {likedSongs.map((track, index) => (
//               <TrackRow
//                 key={`liked-${track.id}-${index}`}
//                 track={track}
//                 index={index}
//                 playlist={likedSongs}
//                 showDeleteOption={false}
//                 className="track-card"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderLibraryView = () => {
//     return (
//       <div className="space-y-8">
//         <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//           Your Library
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {/* Liked Songs */}
//           <button
//             onClick={() => navigate("/liked")}
//             className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl hover:from-gray-800/90 hover:to-gray-700/80 transition-all text-left border border-gray-800/50 hover:border-gray-600/70 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
//           >
//             <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4 flex items-center justify-center shadow-lg border border-purple-400/30">
//               <span className="text-white text-5xl">♥</span>
//             </div>
//             <h3 className="text-white font-bold truncate mb-2 text-lg group-hover:text-gray-100">
//               Liked Songs
//             </h3>
//             <p className="text-gray-400 text-sm font-medium">
//               {likedSongs.length} songs
//             </p>
//           </button>

//           {/* User Playlists */}
//           {playlists.map((playlist) => (
//             <button
//               key={playlist.id}
//               onClick={() => navigate(`/playlist/${playlist.id}`)}
//               className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl hover:from-gray-800/90 hover:to-gray-700/80 transition-all text-left border border-gray-800/50 hover:border-gray-600/70 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
//             >
//               <img
//                 src={
//                   playlist.cover ||
//                   "https://picsum.photos/300/300?random=playlist"
//                 }
//                 alt={playlist.name}
//                 className="w-full aspect-square object-cover rounded-xl mb-4 shadow-lg border border-gray-600/30"
//               />
//               <h3 className="text-white font-bold truncate mb-2 text-lg group-hover:text-gray-100">
//                 {playlist.name}
//               </h3>
//               <p className="text-gray-400 text-sm font-medium">
//                 {playlist.tracks.length} songs
//               </p>
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen">
//       <div ref={contentRef}>
//         {isLibrary && renderLibraryView()}
//         {isLiked && renderLikedSongs()}
//         {isPlaylist && renderPlaylistView()}
//       </div>
//     </div>
//   );
// };

// export default Library;

//

import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import TrackRow from "./TrackRow";

import Loading from "./Loading";
import { ArrowLeft, Plus } from "lucide-react";
import TrackCard from "./TrackCard";
import { gsap } from "gsap";

const Library = () => {
  const { recentlyPlayed } = useTypedSelector((state) => state.playlist);

  const [recentlyPlayedLimit, setRecentlyPlayedLimit] = useState(3);
  const handleLoadMoreRecentlyPlayed = () => {
    setRecentlyPlayedLimit((prev) => prev + 3);
  };
  const { playlistId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
  const contentRef = useRef(null);

  const isLibrary = location.pathname === "/library";
  const isLiked = location.pathname === "/liked";
  const isPlaylist = playlistId && location.pathname.startsWith("/playlist/");
  const playlist = isPlaylist
    ? playlists.find((p) => p.id === playlistId)
    : null;

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "sine",
        stagger: 0.2,
      }
    );

    const trackCards = document.querySelectorAll(".track-card, .group");
    // trackCards.forEach((card) => {
    //   card.addEventListener("mouseenter", () => {
    //     gsap.to(card, {
    //       // scale: 1.0,
    //       // boxShadow: "0 8px 24px rgba(255, 255, 255, 0.2)",
    //       // duration: 0.3,
    //       ease: "sine.inOut",
    //     });
    //   });
    //   card.addEventListener("mouseleave", () => {
    //     gsap.to(card, {
    //       // scale: 1,
    //       // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    //       duration: 0.3,
    //       ease: "sine.inOut",
    //     });
    //   });
    // });
  }, [isLibrary, isLiked, isPlaylist, playlist, likedSongs]);

  const renderPlaylistView = () => {
    if (!playlist) {
      return (
        <div className="text-center py-16 bg-gradient-to-r from-zinc-900 to-gray-500  hover:bg-gradient-to-r hover:from-zinc-500 hover:to-gray-900 rounded-2xl border border-gray-800/50">
          <p className="text-gray-400 text-xl">Playlist Not Found</p>
        </div>
      );
    }

    // console.log(
    //   "Rendering playlist:",
    //   playlist.name,
    //   "with tracks:",
    //   playlist.tracks
    // );

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/library")}
            className="text-zinc-700 hover:text-zinc-700 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-zinc-500/10"
          >
            ← Back to Library
          </button>
        </div>

        <div className="flex items-start gap-8 mb-10 p-4 sm:p-6 bg-zinc-900/40 backdrop-blur-sm  disabled:opacity-50 hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-900  rounded-2xl border border-gray-700/30">
          <img
            src={
              playlist.cover || "https://picsum.photos/300/300?random=playlist"
            }
            alt={playlist.name}
            className="w-52 h-52 object-cover rounded-2xl shadow-2xl border border-gray-600/30"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-5xl font-bold  mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {playlist.name}
            </h1>
            <p className="text-gray-300 text-lg">
              {playlist.description || "No description"}
            </p>
            <p className="text-gray-400 font-medium">
              {playlist.tracks.length} songs
            </p>
          </div>
        </div>

        {playlist.tracks.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800/50">
            <p className="text-gray-400 text-xl mb-2">This playlist is empty</p>
            <p className="text-gray-500">
              Add some songs to get started by clicking the "..." menu on any
              track
            </p>
          </div>
        ) : (
          <div className="space-y-2 bg-zinc-900/20 backdrop-blur-md rounded-2xl p-6 border border-gray-800/30">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 text-gray-400 text-sm border-b border-gray-800/50 font-semibold">
              <span>#</span>
              <span>Title</span>
              <span></span>
              <span></span>
              <span>Duration</span>
            </div>
            {playlist.tracks.map((track, index) => (
              <TrackRow
                key={`${track.id}-${index}`}
                track={track}
                index={index}
                playlist={playlist.tracks}
                playlistId={playlistId}
                showDeleteOption={true}
                className="track-card"
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLikedSongs = () => {
    // console.log("Rendering liked songs:", likedSongs);

    return (
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-6">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/library")}
            className="text-zinc-500 hover:text-zinc-300 transition-colors font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg  text-sm sm:text-base flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Library</span>
          </button>
        </div>

        {/* Liked Songs Header */}
        <div className="flex flex-col bg-zinc-900/80 backdrop-blur-md sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-10 p-4 sm:p-6  rounded-xl sm:rounded-2xl border border-zinc-500/20 ">
          <div className="w-24 h-24 sm:w-40 sm:h-40 md:w-52 md:h-52  rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl flex items-center justify-center border border-zinc-700 mx-auto sm:mx-0">
            <span className="text-white text-4xl sm:text-6xl md:text-8xl">
              ♥
            </span>
          </div>
          <div className="flex-1 space-y-2 sm:space-y-4 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold  bg-clip-text text-transparent">
              Liked Songs
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg">
              Your favorite tracks
            </p>
            <p className="text-zinc-400 font-medium text-sm sm:text-base">
              {likedSongs.length} {likedSongs.length === 1 ? "song" : "songs"}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {likedSongs.length === 0 ? (
          <div className="text-center py-10 sm:py-16  rounded-xl sm:rounded-2xl border border-zinc-500/20 bg-zinc-800/40  ">
            <p className="text-gray-400 text-base sm:text-xl mb-2">
              No liked songs yet
            </p>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              Like some songs by clicking the heart icon to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-2 bg-zinc-900/80  rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-zinc-800/30 overflow-x-auto">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 text-gray-400 text-sm border-b border-zinc-800/50 font-semibold">
              <span>#</span>
              <span>Title</span>
              <span></span>
              <span></span>
              <span>Duration</span>
            </div>

            {/* Mobile Table Header */}
            <div className="sm:hidden grid grid-cols-[auto_1fr_auto] gap-2 items-center px-2 py-3 text-gray-400 text-xs border-b border-gray-800/50 font-semibold">
              <span>#</span>
              <span>Title</span>
              <span className="text-right">Duration</span>
            </div>

            {/* Tracks List */}
            {likedSongs.map((track, index) => (
              <TrackRow
                key={`liked-${track.id}-${index}`}
                track={track}
                index={index}
                playlist={likedSongs}
                showDeleteOption={false}
                className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto_auto] gap-2 sm:gap-4 items-center p-2 sm:p-4 hover:bg-gray-800/30 rounded-lg transition-colors"
                mobileLayout={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLibraryView = () => {
    return (
      <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 pb-20">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent pt-4">
          Your Library
        </h2>

        {/* Playlists Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {/* Liked Songs Card */}
          <button
            onClick={() => navigate("/liked")}
            className="group bg-zinc-900/40 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg md:rounded-2xl hover:from-zinc-700/90 hover:to-zinc-700/80 transition-all text-left border border-zinc-800/50 hover:border-zinc-600/70 shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            <div className="w-full aspect-square rounded-lg md:rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-inner border border-zinc-400/30">
              <span className="text-white text-3xl sm:text-4xl md:text-5xl">
                ♥
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-bold truncate text-sm sm:text-base md:text-lg group-hover:text-gray-100">
                Liked Songs
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">
                {likedSongs.length} {likedSongs.length === 1 ? "song" : "songs"}
              </p>
            </div>
          </button>

          {/* Playlist Cards */}
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              className="group bg-zinc-900/40 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg md:rounded-2xl hover:from-zinc-800/90 hover:to-zinc-700/80 transition-all text-left border border-zinc-800/50 hover:border-zinc-600/70 shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
            >
              <div className="relative w-full aspect-square rounded-lg md:rounded-xl mb-2 sm:mb-3 md:mb-4 overflow-hidden shadow-inner border border-zinc-600/30">
                <img
                  src={
                    playlist.cover ||
                    "https://picsum.photos/300/300?random=playlist"
                  }
                  alt={playlist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://picsum.photos/300/300?random=playlist";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold truncate text-sm sm:text-base md:text-lg group-hover:text-gray-100">
                  {playlist.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">
                  {playlist.tracks.length}{" "}
                  {playlist.tracks.length === 1 ? "song" : "songs"}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Recently Played Section */}
        {recentlyPlayed.length > 0 && (
          <section className="mt-8 sm:mt-12 ">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Recently Played
              </h2>
              {recentlyPlayedLimit < recentlyPlayed.length && (
                <button onClick={handleLoadMoreRecentlyPlayed}>
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">More</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {recentlyPlayed.slice(0, recentlyPlayedLimit).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playlist={recentlyPlayed}
                  className=" rounded-lg md:rounded-xl shadow-mdtransition-all"
                  mobileLayout={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1  text-white p-8 overflow-y-auto min-h-screen">
      <div ref={contentRef}>
        {isLibrary && renderLibraryView()}
        {isLiked && renderLikedSongs()}
        {isPlaylist && renderPlaylistView()}
      </div>
    </div>
  );
};

export default Library;
