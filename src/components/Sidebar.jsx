// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useTypedSelector } from "../hooks/useTypedSelector";
// import { createPlaylist } from "../store/slices/playlistSlice";
// import { Home, Search, BookAudio, Heart, Plus, Music, X } from "lucide-react";

// const Sidebar = ({ currentView, onViewChange }) => {
//   const dispatch = useDispatch();
//   const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [playlistName, setPlaylistName] = useState("");
//   const [description, setDescription] = useState("");
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
//   return (
//     <>
//       <div className="w-64 bg-black text-white h-screen flex flex-col">
//         {/* Logo */}
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//             <Music className="w-8 h-8 text-green-500" />
//             Spotify
//           </h1>
//         </div>

//         {/* Navigation */}
//         <nav className="px-6 mb-8">
//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => onViewChange("home")}
//                 className={`flex items-center gap-4 transition-colors group w-full text-left ${
//                   currentView === "home"
//                     ? "text-white"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <Home
//                   className={`w-6 h-6 ${
//                     currentView === "home"
//                       ? "text-green-500"
//                       : "group-hover:text-green-500"
//                   }`}
//                 />
//                 <span className="font-semibold">Home</span>
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => onViewChange("search")}
//                 className={`flex items-center gap-4 transition-colors group w-full text-left ${
//                   currentView === "search"
//                     ? "text-white"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <Search
//                   className={`w-6 h-6 ${
//                     currentView === "search"
//                       ? "text-green-500"
//                       : "group-hover:text-green-500"
//                   }`}
//                 />
//                 <span className="font-semibold">Search</span>
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => onViewChange("library")}
//                 className={`flex items-center gap-4 transition-colors group w-full text-left ${
//                   currentView === "library"
//                     ? "text-white"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <BookAudio
//                   className={`w-6 h-6 ${
//                     currentView === "library"
//                       ? "text-green-500"
//                       : "group-hover:text-green-500"
//                   }`}
//                 />
//                 <span className="font-semibold">Your Library</span>
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {/* Create Playlist */}
//         <div className="px-6 mb-8">
//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group w-full text-left"
//               >
//                 <div className="w-6 h-6 bg-gray-300 group-hover:bg-white transition-colors flex items-center justify-center">
//                   <Plus className="w-4 h-4 text-black" />
//                 </div>
//                 <span className="font-semibold">Create Playlist</span>
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => onViewChange("liked")}
//                 className={`flex items-center gap-4 transition-colors group w-full text-left ${
//                   currentView === "liked"
//                     ? "text-white"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
//                   <Heart className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="font-semibold">
//                   Liked Songs ({likedSongs.length})
//                 </span>
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Playlists */}
//         <div className="px-6 flex-1 overflow-y-auto">
//           <div className="border-t border-gray-800 pt-4">
//             {playlists.map((playlist) => (
//               <div key={playlist.id} className="py-2">
//                 <button
//                   onClick={() => onViewChange(`playlist-${playlist.id}`)}
//                   className={`transition-colors block truncate w-full text-left ${
//                     currentView === `playlist-${playlist.id}`
//                       ? "text-white"
//                       : "text-gray-300 hover:text-white"
//                   }`}
//                 >
//                   {playlist.name}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* Create Playlist Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-6 rounded-lg w-96 max-w-[90vw]">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-white text-xl font-bold">Create Playlist</h3>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-300 text-sm font-medium mb-2">
//                   Playlist Name *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="My Awesome Playlist"
//                   value={playlistName}
//                   onChange={(e) => setPlaylistName(e.target.value)}
//                   className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
//                   onKeyPress={handleKeyPress}
//                   autoFocus
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-300 text-sm font-medium mb-2">
//                   Description (optional)
//                 </label>
//                 <textarea
//                   placeholder="Add a description for your playlist..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700 resize-none"
//                   rows={3}
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreatePlaylist}
//                 disabled={!playlistName.trim()}
//                 className="flex-1 bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { createPlaylist } from "../store/slices/playlistSlice";
import { Home, Search, BookAudio, Heart, Plus, Music, X } from "lucide-react";
import { gsap } from "gsap";

const Sidebar = ({ currentView, onViewChange }) => {
  const dispatch = useDispatch();
  const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const sidebarRef = useRef(null);
  const modalRef = useRef(null);

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

  // GSAP animations
  useEffect(() => {
    // Sidebar entrance animation
    gsap.fromTo(
      sidebarRef.current,
      { x: -64, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Navigation and playlist item hover animations
    const navItems = sidebarRef.current.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.05,
          x: 4,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(item.querySelector(".nav-icon"), {
          color: "#10b981",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(item.querySelector(".nav-icon"), {
          color: item.classList.contains("active") ? "#10b981" : "#d1d5db",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Modal animation
    if (showCreateModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  }, [showCreateModal]);

  return (
    <>
      <div
        ref={sidebarRef}
        className="w-64 bg-gradient-to-b from-gray-950 to-black text-white h-screen flex flex-col border-r border-gray-800/50 backdrop-blur-md"
      >
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Music className="w-9 h-9 text-green-500" />
            Musicify
          </h1>
        </div>

        {/* Navigation */}
        <nav className="px-6 mb-8">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => onViewChange("home")}
                className={`nav-item flex items-center gap-4 transition-colors w-full text-left py-3 px-4 rounded-lg ${
                  currentView === "home"
                    ? "text-white bg-gray-800/50"
                    : "text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <Home
                  className={`nav-icon w-6 h-6 ${
                    currentView === "home" ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className="font-semibold text-base">Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("search")}
                className={`nav-item flex items-center gap-4 transition-colors w-full text-left py-3 px-4 rounded-lg ${
                  currentView === "search"
                    ? "text-white bg-gray-800/50"
                    : "text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <Search
                  className={`nav-icon w-6 h-6 ${
                    currentView === "search"
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                />
                <span className="font-semibold text-base">Search</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("library")}
                className={`nav-item flex items-center gap-4 transition-colors w-full text-left py-3 px-4 rounded-lg ${
                  currentView === "library"
                    ? "text-white bg-gray-800/50"
                    : "text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <BookAudio
                  className={`nav-icon w-6 h-6 ${
                    currentView === "library"
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                />
                <span className="font-semibold text-base">Your Library</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Create Playlist and Liked Songs */}
        <div className="px-6 mb-8">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setShowCreateModal(true)}
                className="nav-item flex items-center gap-4 text-gray-300 hover:bg-gray-800/30 transition-colors w-full text-left py-3 px-4 rounded-lg"
              >
                <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-base">Create Playlist</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("liked")}
                className={`nav-item flex items-center gap-4 transition-colors w-full text-left py-3 px-4 rounded-lg ${
                  currentView === "liked"
                    ? "text-white bg-gray-800/50"
                    : "text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-base">
                  Liked Songs ({likedSongs.length})
                </span>
              </button>
            </li>
          </ul>
        </div>

        {/* Playlists */}
        <div className="px-6 flex-1 overflow-y-auto">
          <div className="border-t border-gray-800/50 pt-4">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="py-2">
                <button
                  onClick={() => onViewChange(`playlist-${playlist.id}`)}
                  className={`nav-item transition-colors block truncate w-full text-left py-2 px-4 rounded-lg ${
                    currentView === `playlist-${playlist.id}`
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                >
                  <span className="font-medium text-sm">{playlist.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-gray-900/95 backdrop-blur-md p-8 rounded-2xl w-96 max-w-[90vw] border border-gray-700/50 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-2xl font-bold">Create Playlist</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Playlist"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="w-full bg-gray-800/80 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50"
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description (optional)
                </label>
                <textarea
                  placeholder="Add a description for your playlist..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-800/80 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50 resize-none"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-700/80 text-white py-3 px-4 rounded-lg hover:bg-gray-600/80 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                disabled={!playlistName.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
