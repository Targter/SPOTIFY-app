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

import React, { useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import TrackRow from "./TrackRow";
import { gsap } from "gsap";

const Library = () => {
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

    const trackCards = document.querySelectorAll(".track-card, .group");
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
  }, [isLibrary, isLiked, isPlaylist, playlist, likedSongs]);

  const renderPlaylistView = () => {
    if (!playlist) {
      return (
        <div className="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800/50">
          <p className="text-gray-400 text-xl">Playlist Not Found</p>
        </div>
      );
    }

    console.log(
      "Rendering playlist:",
      playlist.name,
      "with tracks:",
      playlist.tracks
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/library")}
            className="text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
          >
            ← Back to Library
          </button>
        </div>

        <div className="flex items-start gap-8 mb-10 p-6 bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
          <img
            src={
              playlist.cover || "https://picsum.photos/300/300?random=playlist"
            }
            alt={playlist.name}
            className="w-52 h-52 object-cover rounded-2xl shadow-2xl border border-gray-600/30"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
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
          <div className="space-y-2 bg-gray-900/20 rounded-2xl p-6 border border-gray-800/30">
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
    console.log("Rendering liked songs:", likedSongs);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/library")}
            className="text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
          >
            ← Back to Library
          </button>
        </div>

        <div className="flex items-start gap-8 mb-10 p-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
          <div className="w-52 h-52 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center border border-purple-400/30">
            <span className="text-white text-8xl">♥</span>
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Liked Songs
            </h1>
            <p className="text-gray-300 text-lg">Your favorite tracks</p>
            <p className="text-gray-400 font-medium">
              {likedSongs.length} songs
            </p>
          </div>
        </div>

        {likedSongs.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <p className="text-gray-400 text-xl mb-2">No liked songs yet</p>
            <p className="text-gray-500">
              Like some songs by clicking the heart icon to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-2 bg-gray-900/20 rounded-2xl p-6 border border-gray-800/30">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 text-gray-400 text-sm border-b border-gray-800/50 font-semibold">
              <span>#</span>
              <span>Title</span>
              <span></span>
              <span></span>
              <span>Duration</span>
            </div>
            {likedSongs.map((track, index) => (
              <TrackRow
                key={`liked-${track.id}-${index}`}
                track={track}
                index={index}
                playlist={likedSongs}
                showDeleteOption={false}
                className="track-card"
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLibraryView = () => {
    return (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Your Library
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <button
            onClick={() => navigate("/liked")}
            className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl hover:from-gray-800/90 hover:to-gray-700/80 transition-all text-left border border-gray-800/50 hover:border-gray-600/70 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4 flex items-center justify-center shadow-lg border border-purple-400/30">
              <span className="text-white text-5xl">♥</span>
            </div>
            <h3 className="text-white font-bold truncate mb-2 text-lg group-hover:text-gray-100">
              Liked Songs
            </h3>
            <p className="text-gray-400 text-sm font-medium">
              {likedSongs.length} songs
            </p>
          </button>

          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl hover:from-gray-800/90 hover:to-gray-700/80 transition-all text-left border border-gray-800/50 hover:border-gray-600/70 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
            >
              <img
                src={
                  playlist.cover ||
                  "https://picsum.photos/300/300?random=playlist"
                }
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-xl mb-4 shadow-lg border border-gray-600/30"
              />
              <h3 className="text-white font-bold truncate mb-2 text-lg group-hover:text-gray-100">
                {playlist.name}
              </h3>
              <p className="text-gray-400 text-sm font-medium">
                {playlist.tracks.length} songs
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen">
      <div ref={contentRef}>
        {isLibrary && renderLibraryView()}
        {isLiked && renderLikedSongs()}
        {isPlaylist && renderPlaylistView()}
      </div>
    </div>
  );
};

export default Library;
