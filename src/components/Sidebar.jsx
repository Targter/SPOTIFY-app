// // import React, { useState, useEffect, useRef } from "react";
// // import { useDispatch } from "react-redux";
// // import { useTypedSelector } from "../hooks/useTypedSelector";
// // import { createPlaylist } from "../store/slices/playlistSlice";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { Home, Search, BookAudio, Heart, Plus, Music, X } from "lucide-react";
// // import { gsap } from "gsap";
// // import { Link } from "react-router-dom";
// // // import SidebarSkeleton from "./SidebarSkeleton";
// // import SidebarSkeleton from "../skeletons/SidebarSkeleton";

// // const Sidebar = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
// //   const [showCreateModal, setShowCreateModal] = useState(false);
// //   const [playlistName, setPlaylistName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const sidebarRef = useRef(null);
// //   const modalRef = useRef(null);

// //   useEffect(() => {
// //     // Simulate 2-second loading
// //     const timer = setTimeout(() => {
// //       setLoading(false);
// //     }, 2000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   useEffect(() => {
// //     if (!loading) {
// //       // Animate sidebar entrance after loading
// //       gsap.fromTo(
// //         sidebarRef.current,
// //         { x: -64, opacity: 0 },
// //         { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
// //       );

// //       const navItems = sidebarRef.current.querySelectorAll(".nav-item");
// //       navItems.forEach((item) => {
// //         item.addEventListener("mouseenter", () => {
// //           gsap.to(item, {
// //             scale: 1.05,
// //             x: 4,
// //             duration: 0.3,
// //             ease: "power2.out",
// //           });
// //           gsap.to(item.querySelector(".nav-icon") || item, {
// //             color: "#10b981",
// //             duration: 0.3,
// //             ease: "power2.out",
// //           });
// //         });
// //         item.addEventListener("mouseleave", () => {
// //           gsap.to(item, {
// //             scale: 1,
// //             x: 0,
// //             duration: 0.3,
// //             ease: "power2.out",
// //           });
// //           gsap.to(item.querySelector(".nav-icon") || item, {
// //             color:
// //               item.classList.contains("active") ||
// //               location.pathname === item.getAttribute("data-path")
// //                 ? "#10b981"
// //                 : "#d1d5db",
// //             duration: 0.3,
// //             ease: "power2.out",
// //           });
// //         });
// //       });
// //     }

// //     if (showCreateModal && modalRef.current) {
// //       gsap.fromTo(
// //         modalRef.current,
// //         { scale: 0.8, opacity: 0, y: 20 },
// //         { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
// //       );
// //     }
// //   }, [showCreateModal, location.pathname, loading]);

// //   const handleCreatePlaylist = () => {
// //     if (playlistName.trim()) {
// //       dispatch(
// //         createPlaylist({
// //           name: playlistName.trim(),
// //           description: description.trim() || undefined,
// //         })
// //       );
// //       setPlaylistName("");
// //       setDescription("");
// //       setShowCreateModal(false);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       handleCreatePlaylist();
// //     }
// //   };

// //   const getNavClass = (path) =>
// //     `nav-item flex items-center gap-4 transition-colors w-full text-left py-3 px-4 rounded-lg ${
// //       location.pathname === path
// //         ? "text-white bg-gray-800/50"
// //         : "text-gray-300 hover:bg-gray-800/30"
// //     }`;

// //   const getPlaylistNavClass = (playlistId) =>
// //     `nav-item transition-colors block truncate w-full text-left py-2 px-4 rounded-lg ${
// //       location.pathname === `/playlist/${playlistId}`
// //         ? "text-white bg-gray-800/50"
// //         : "text-gray-300 hover:bg-gray-800/30"
// //     }`;

// //   return (
// //     <>
// //       {loading ? (
// //         <SidebarSkeleton />
// //       ) : (
// //         <div
// //           ref={sidebarRef}
// //           className="w-64 bg-gradient-to-b from-gray-950 to-black text-white h-auto flex flex-col border-r border-gray-800/50 backdrop-blur-md"
// //         >
// //           <div className="p-6">
// //             <Link to="/">
// //               <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
// //                 <Music className="w-9 h-9 text-green-500" />
// //                 Musicify
// //               </h1>
// //             </Link>
// //           </div>
// //           <nav className="px-6 mb-8 bg-red-400 rounded-4xl mb-11">
// //             <ul className="space-y-3">
// //               <li>
// //                 <button
// //                   onClick={() => navigate("/")}
// //                   className={getNavClass("/")}
// //                   data-path="/"
// //                 >
// //                   <Home
// //                     className={`nav-icon w-6 h-6 ${
// //                       location.pathname === "/"
// //                         ? "text-green-500"
// //                         : "text-gray-300"
// //                     }`}
// //                   />
// //                   <span className="font-semibold text-base">Home</span>
// //                 </button>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={() => navigate("/search")}
// //                   className={getNavClass("/search")}
// //                   data-path="/search"
// //                 >
// //                   <Search
// //                     className={`nav-icon w-6 h-6 ${
// //                       location.pathname === "/search"
// //                         ? "text-green-500"
// //                         : "text-gray-300"
// //                     }`}
// //                   />
// //                   <span className="font-semibold text-base">Search</span>
// //                 </button>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={() => navigate("/library")}
// //                   className={getNavClass("/library")}
// //                   data-path="/library"
// //                 >
// //                   <BookAudio
// //                     className={`nav-icon w-6 h-6 ${
// //                       location.pathname === "/library"
// //                         ? "text-green-500"
// //                         : "text-gray-300"
// //                     }`}
// //                   />
// //                   <span className="font-semibold text-base">Your Library</span>
// //                 </button>
// //               </li>
// //             </ul>
// //           </nav>
// //           <div className="px-6 mb-8 bg-red-600">
// //             <ul className="space-y-3">
// //               <li>
// //                 <button
// //                   onClick={() => setShowCreateModal(true)}
// //                   className="nav-item flex items-center gap-4 text-gray-300 hover:bg-gray-800/30 transition-colors w-full text-left py-3 px-4 rounded-lg"
// //                 >
// //                   <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
// //                     <Plus className="w-4 h-4 text-white" />
// //                   </div>
// //                   <span className="font-semibold text-base">
// //                     Create Playlist
// //                   </span>
// //                 </button>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={() => navigate("/liked")}
// //                   className={getNavClass("/liked")}
// //                   data-path="/liked"
// //                 >
// //                   <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
// //                     <Heart className="w-4 h-4 text-white" />
// //                   </div>
// //                   <span className="font-semibold text-base">
// //                     Liked Songs ({likedSongs.length})
// //                   </span>
// //                 </button>
// //               </li>
// //             </ul>
// //           </div>
// //           <div className="px-6 flex-1 overflow-y-auto thin-dark-scrollbar">
// //             <div className="border-t border-gray-800/50 pt-4">
// //               {playlists.map((playlist) => (
// //                 <div key={playlist.id} className="py-2">
// //                   <button
// //                     onClick={() => navigate(`/playlist/${playlist.id}`)}
// //                     className={getPlaylistNavClass(playlist.id)}
// //                     data-path={`/playlist/${playlist.id}`}
// //                   >
// //                     <span className="font-medium text-sm">{playlist.name}</span>
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       {showCreateModal && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
// //           <div
// //             ref={modalRef}
// //             className="bg-gray-900/95 backdrop-blur-md p-8 rounded-2xl w-96 max-w-[90vw] border border-gray-700/50 shadow-2xl"
// //           >
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-white text-2xl font-bold">Create Playlist</h3>
// //               <button
// //                 onClick={() => setShowCreateModal(false)}
// //                 className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
// //               >
// //                 <X className="w-6 h-6" />
// //               </button>
// //             </div>
// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-gray-300 text-sm font-medium mb-2">
// //                   Playlist Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="My Awesome Playlist"
// //                   value={playlistName}
// //                   onChange={(e) => setPlaylistName(e.target.value)}
// //                   className="w-full bg-gray-800/80 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50"
// //                   onKeyPress={handleKeyPress}
// //                   autoFocus
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-300 text-sm font-medium mb-2">
// //                   Description (optional)
// //                 </label>
// //                 <textarea
// //                   placeholder="Add a description for your playlist..."
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   className="w-full bg-gray-800/80 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50 resize-none"
// //                   rows={4}
// //                 />
// //               </div>
// //             </div>
// //             <div className="flex gap-4 mt-8">
// //               <button
// //                 onClick={() => setShowCreateModal(false)}
// //                 className="flex-1 bg-gray-700/80 text-white py-3 px-4 rounded-lg hover:bg-gray-600/80 transition-colors font-medium"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleCreatePlaylist}
// //                 disabled={!playlistName.trim()}
// //                 className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 Create
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Sidebar;

// //
// import React, { useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { useTypedSelector } from "../hooks/useTypedSelector";
// import { createPlaylist } from "../store/slices/playlistSlice";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Home,
//   Search,
//   BookAudio,
//   Heart,
//   Plus,
//   Music,
//   X,
//   Menu,
// } from "lucide-react";
// import { gsap } from "gsap";
// import { Link } from "react-router-dom";
// import SidebarSkeleton from "../skeletons/SidebarSkeleton";
// // import { useIsMobile } from "../hooks/useIsMobile";
// import { useIsMobile } from "../hooks/use-mobile";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isMobile = useIsMobile();
//   const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
//   const [showCreateModal, setShowCreateModal] = React.useState(false);
//   const [playlistName, setPlaylistName] = React.useState("");
//   const [description, setDescription] = React.useState("");
//   const [loading, setLoading] = React.useState(true);
//   const sidebarRef = useRef(null);
//   const modalRef = useRef(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       gsap.fromTo(
//         sidebarRef.current,
//         { x: isMobile ? 0 : -64, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
//       );

//       const navItems = sidebarRef.current.querySelectorAll(".nav-item");
//       navItems.forEach((item) => {
//         item.addEventListener("mouseenter", () => {
//           if (!isMobile) {
//             gsap.to(item, {
//               scale: 1.05,
//               x: 4,
//               duration: 0.3,
//               ease: "power2.out",
//             });
//             gsap.to(item.querySelector(".nav-icon") || item, {
//               color: "#10b981",
//               duration: 0.3,
//               ease: "power2.out",
//             });
//           }
//         });
//         item.addEventListener("mouseleave", () => {
//           if (!isMobile) {
//             gsap.to(item, {
//               scale: 1,
//               x: 0,
//               duration: 0.3,
//               ease: "power2.out",
//             });
//             gsap.to(item.querySelector(".nav-icon") || item, {
//               color:
//                 item.classList.contains("active") ||
//                 location.pathname === item.getAttribute("data-path")
//                   ? "#10b981"
//                   : "#d1d5db",
//               duration: 0.3,
//               ease: "power2.out",
//             });
//           }
//         });
//       });
//     }

//     if (showCreateModal && modalRef.current) {
//       gsap.fromTo(
//         modalRef.current,
//         { scale: 0.8, opacity: 0, y: 20 },
//         { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
//       );
//     }
//   }, [showCreateModal, location.pathname, loading, isMobile]);

//   const handleCreatePlaylist = () => {
//     if (playlistName.trim()) {
//       dispatch(
//         createPlaylist({
//           name: playlistName.trim(),
//           description: description.trim() || undefined,
//         })
//       );
//       setPlaylistName("");
//       setDescription("");
//       setShowCreateModal(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleCreatePlaylist();
//     }
//   };

//   const getNavClass = (path) =>
//     `nav-item flex items-center gap-3 transition-colors w-full text-left py-3 px-4 rounded-lg ${
//       location.pathname === path
//         ? "text-white bg-gray-800/50"
//         : "text-gray-300 hover:bg-gray-800/30"
//     }`;
//   //  className="nav-item flex items-center gap-4 text-gray-300 hover:bg-gray-800/30 transition-colors w-full text-left py-3 px-4 rounded-lg"
//   const getPlaylistNavClass = (playlistId) =>
//     `nav-item transition-colors block truncate w-full text-left py-1 px-2 rounded-lg ${
//       location.pathname === `/playlist/${playlistId}`
//         ? "text-white bg-gray-800/50"
//         : "text-gray-300 hover:bg-gray-800/30"
//     }`;

//   return (
//     <>
//       {loading ? (
//         <SidebarSkeleton isMobile={isMobile} />
//       ) : (
//         <div
//           ref={sidebarRef}
//           className={`${
//             isMobile ? "w-16" : "w-64"
//           } bg-gradient-to-b from-gray-950 to-black text-white min-h-full flex flex-col border-r border-gray-800/50 backdrop-blur-md transition-all duration-300 `}
//         >
//           <div className="p-3 flex items-center justify-between">
//             <Link to="/" className="flex items-center gap-2">
//               <Music className="w-7 h-7 text-green-500" />
//               {!isMobile && (
//                 <h1 className="text-xl font-extrabold text-white">Musicify</h1>
//               )}
//             </Link>
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-700/50"
//               aria-label={isMobile ? "Open menu" : "Create playlist"}
//             >
//               {isMobile ? (
//                 <Menu className="w-5 h-5" />
//               ) : (
//                 <Plus className="w-5 h-5" />
//               )}
//             </button>
//           </div>

//           <div className="px-3 space-y-5 flex-1 flex flex-col">
//             {/* Navigation Box */}
//             <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2">
//               <nav>
//                 <ul className="space-y-1">
//                   <li>
//                     <button
//                       onClick={() => navigate("/")}
//                       className={getNavClass("/")}
//                       data-path="/"
//                       aria-label="Home"
//                     >
//                       <Home
//                         className={`nav-icon w-5 h-5 ${
//                           location.pathname === "/"
//                             ? "text-green-500"
//                             : "text-gray-300"
//                         }`}
//                       />
//                       {!isMobile && (
//                         <span className="font-semibold text-sm">Home</span>
//                       )}
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => navigate("/search")}
//                       className={getNavClass("/search")}
//                       data-path="/search"
//                       aria-label="Search"
//                     >
//                       <Search
//                         className={`nav-icon w-5 h-5 ${
//                           location.pathname === "/search"
//                             ? "text-green-500"
//                             : "text-gray-300"
//                         }`}
//                       />
//                       {!isMobile && (
//                         <span className="font-semibold text-sm">Search</span>
//                       )}
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => navigate("/library")}
//                       className={getNavClass("/library")}
//                       data-path="/library"
//                       aria-label="Your Library"
//                     >
//                       <BookAudio
//                         className={`nav-icon w-5 h-5 ${
//                           location.pathname === "/library"
//                             ? "text-green-500"
//                             : "text-gray-300"
//                         }`}
//                       />
//                       {!isMobile && (
//                         <span className="font-semibold text-sm">
//                           Your Library
//                         </span>
//                       )}
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>

//             {/* Actions Box */}
//             <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2">
//               <ul className="space-y-1">
//                 <li>
//                   <button
//                     onClick={() => setShowCreateModal(true)}
//                     className="nav-item flex items-center gap-4 text-gray-300 hover:bg-gray-800/30 transition-colors w-full text-left py-3 px-4 rounded-lg"
//                   >
//                     <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
//                       <Plus className="w-4 h-4 text-white" />
//                     </div>
//                     {!isMobile && (
//                       <span className="font-semibold text-base">
//                         Create Playlist
//                       </span>
//                     )}
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => navigate("/liked")}
//                     className={getNavClass("/liked")}
//                     data-path="/liked"
//                     aria-label={`Liked Songs (${likedSongs.length})`}
//                   >
//                     <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
//                       <Heart className="w-3 h-3 text-white" />
//                     </div>
//                     {!isMobile && (
//                       <span className="font-semibold text-sm">
//                         Liked Songs ({likedSongs.length})
//                       </span>
//                     )}
//                   </button>
//                 </li>
//               </ul>
//             </div>

//             {/* Playlists Box */}
//             <div className="bg-gray-900/80 backdrop-blur-md border overflow-y-scroll border-gray-700/50 rounded-lg p-2  flex-1  thin-dark-scrollbar mt-5 hide-scrollbar">
//               <div className=" max-h-[200px] ">
//                 {playlists.length > 0 ? (
//                   playlists.map((playlist) => (
//                     <div key={playlist.id} className="py-1">
//                       <button
//                         onClick={() => navigate(`/playlist/${playlist.id}`)}
//                         className={getPlaylistNavClass(playlist.id)}
//                         data-path={`/playlist/${playlist.id}`}
//                         aria-label={playlist.name}
//                       >
//                         <span className="font-medium text-sm">
//                           {playlist.name}
//                         </span>
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-400 text-sm p-2">No playlists yet</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div
//             ref={modalRef}
//             className="bg-gray-900/95 backdrop-blur-md p-6 rounded-2xl w-80 max-w-[90vw] border border-gray-700/50 shadow-2xl"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-white text-xl font-bold">Create Playlist</h3>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
//                 aria-label="Close"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-300 text-sm font-medium mb-1">
//                   Playlist Name *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="My Awesome Playlist"
//                   value={playlistName}
//                   onChange={(e) => setPlaylistName(e.target.value)}
//                   className="w-full bg-gray-800/80 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50"
//                   onKeyPress={handleKeyPress}
//                   autoFocus
//                   aria-required="true"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-300 text-sm font-medium mb-1">
//                   Description (optional)
//                 </label>
//                 <textarea
//                   placeholder="Add a description..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full bg-gray-800/80 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50 resize-none"
//                   rows={3}
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="flex-1 bg-gray-700/80 text-white py-2 px-3 rounded-lg hover:bg-gray-600/80 transition-colors font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreatePlaylist}
//                 disabled={!playlistName.trim()}
//                 className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

//

import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { createPlaylist } from "../store/slices/playlistSlice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  BookAudio,
  Heart,
  Plus,
  Music,
  X,
  MessageSquare,
} from "lucide-react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { useIsMobile } from "../hooks/use-mobile";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [playlistName, setPlaylistName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const sidebarRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        sidebarRef.current,
        { x: isMobile ? 0 : -64, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      const navItems = sidebarRef.current.querySelectorAll(".nav-item");
      navItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          if (!isMobile) {
            gsap.to(item, {
              scale: 1.05,
              x: 4,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(item.querySelector(".nav-icon") || item, {
              color: "#10b981",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
        item.addEventListener("mouseleave", () => {
          if (!isMobile) {
            gsap.to(item, {
              scale: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(item.querySelector(".nav-icon") || item, {
              color:
                item.classList.contains("active") ||
                location.pathname === item.getAttribute("data-path")
                  ? "#10b981"
                  : "#d1d5db",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });
    }

    if (showCreateModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  }, [showCreateModal, location.pathname, loading, isMobile]);

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      dispatch(
        createPlaylist({
          name: playlistName.trim(),
          description: description.trim() || undefined,
        })
      );
      setPlaylistName("");
      setDescription("");
      setShowCreateModal(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreatePlaylist();
    }
  };

  const getNavClass = (path) =>
    `nav-item flex items-center gap-3 transition-colors w-full text-left py-2 px-2 rounded-lg ${
      location.pathname === path
        ? "text-white bg-gray-800/50"
        : "text-gray-300 hover:bg-gray-800/30"
    }`;

  const getPlaylistNavClass = (playlistId) =>
    `nav-item transition-colors block truncate w-full text-left py-1 px-2 rounded-lg ${
      location.pathname === `/playlist/${playlistId}`
        ? "text-white bg-gray-800/50"
        : "text-gray-300 hover:bg-gray-800/30"
    }`;

  return (
    <>
      {loading ? (
        <SidebarSkeleton isMobile={isMobile} />
      ) : (
        <div
          ref={sidebarRef}
          className={`${
            isMobile ? "w-16" : "w-64"
          } bg-gradient-to-b from-gray-950 to-black text-white h-full flex flex-col border-r border-gray-800/50 backdrop-blur-md transition-all duration-300`}
        >
          <div className="p-3 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Music className="w-7 h-7 text-green-500" />
              {!isMobile && (
                <h1 className="text-xl font-extrabold text-white">Musicify</h1>
              )}
            </Link>
          </div>

          <div className="md:px-3 px-1 space-y-5 flex-1 flex flex-col">
            {/* Navigation Box */}
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2">
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => navigate("/")}
                      className={getNavClass("/")}
                      data-path="/"
                      aria-label="Home"
                    >
                      <Home
                        className={`nav-icon w-5 h-5 ${
                          location.pathname === "/"
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      {!isMobile && (
                        <span className="font-semibold text-sm">Home</span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/search")}
                      className={getNavClass("/search")}
                      data-path="/search"
                      aria-label="Search"
                    >
                      <Search
                        className={`nav-icon w-5 h-5 ${
                          location.pathname === "/search"
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      {!isMobile && (
                        <span className="font-semibold text-sm">Search</span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/library")}
                      className={getNavClass("/library")}
                      data-path="/library"
                      aria-label="Your Library"
                    >
                      <BookAudio
                        className={`nav-icon w-5 h-5 ${
                          location.pathname === "/library"
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      {!isMobile && (
                        <span className="font-semibold text-sm">
                          Your Library
                        </span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/chat-jam")}
                      className={getNavClass("/chat-jam")}
                      data-path="/chat-jam"
                      aria-label="Chat & Jam"
                    >
                      <MessageSquare
                        className={`nav-icon w-5 h-5 ${
                          location.pathname === "/chat-jam"
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      {!isMobile && (
                        <span className="font-semibold text-sm">
                          Chat & Jam
                        </span>
                      )}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Actions Box */}
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className={getNavClass("/create-playlist")}
                    data-path="/create-playlist"
                    aria-label="Create Playlist"
                  >
                    <div className="w-5 h-5 bg-gray-700 rounded flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                    {!isMobile && (
                      <span className="font-semibold text-sm">
                        Create Playlist
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/liked")}
                    className={getNavClass("/liked")}
                    data-path="/liked"
                    aria-label={`Liked Songs (${likedSongs.length})`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    {!isMobile && (
                      <span className="font-semibold text-sm">
                        Liked Songs ({likedSongs.length})
                      </span>
                    )}
                  </button>
                </li>
              </ul>
            </div>

            {/* Playlists Box */}
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg p-2 flex-1 overflow-y-auto thin-dark-scrollbar mt-5 max-h-[250px] truncate ">
              <div className="border-t border-gray-800/50 pt-2">
                {playlists.length > 0 ? (
                  playlists.map((playlist) => (
                    <div key={playlist.id} className="py-1">
                      <button
                        onClick={() => navigate(`/playlist/${playlist.id}`)}
                        className={getPlaylistNavClass(playlist.id)}
                        data-path={`/playlist/${playlist.id}`}
                        aria-label={playlist.name}
                      >
                        <span className="font-medium text-sm">
                          {playlist.name}
                        </span>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm p-2">No playlists yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-gray-900/95 backdrop-blur-md p-6 rounded-2xl w-80 max-w-[90vw] border border-gray-700/50 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl font-bold">Create Playlist</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Playlist"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="w-full bg-gray-800/80 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50"
                  onKeyPress={handleKeyPress}
                  autoFocus
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Description (optional)
                </label>
                <textarea
                  placeholder="Add a description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-800/80 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50 resize-none"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-700/80 text-white py-2 px-3 rounded-lg hover:bg-gray-600/80 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                disabled={!playlistName.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
