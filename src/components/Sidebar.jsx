import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { createPlaylist } from "../store/slices/playlistSlice";
import { Home, Search, BookAudio, Heart, Plus, Music, X } from "lucide-react";

const Sidebar = ({ currentView, onViewChange }) => {
  const dispatch = useDispatch();
  const { playlists, likedSongs } = useTypedSelector((state) => state.playlist);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
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
  return (
    <>
      <div className="w-64 bg-black text-white h-screen flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Music className="w-8 h-8 text-green-500" />
            Spotify
          </h1>
        </div>

        {/* Navigation */}
        <nav className="px-6 mb-8">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => onViewChange("home")}
                className={`flex items-center gap-4 transition-colors group w-full text-left ${
                  currentView === "home"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Home
                  className={`w-6 h-6 ${
                    currentView === "home"
                      ? "text-green-500"
                      : "group-hover:text-green-500"
                  }`}
                />
                <span className="font-semibold">Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("search")}
                className={`flex items-center gap-4 transition-colors group w-full text-left ${
                  currentView === "search"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Search
                  className={`w-6 h-6 ${
                    currentView === "search"
                      ? "text-green-500"
                      : "group-hover:text-green-500"
                  }`}
                />
                <span className="font-semibold">Search</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("library")}
                className={`flex items-center gap-4 transition-colors group w-full text-left ${
                  currentView === "library"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <BookAudio
                  className={`w-6 h-6 ${
                    currentView === "library"
                      ? "text-green-500"
                      : "group-hover:text-green-500"
                  }`}
                />
                <span className="font-semibold">Your Library</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Create Playlist */}
        <div className="px-6 mb-8">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group w-full text-left"
              >
                <div className="w-6 h-6 bg-gray-300 group-hover:bg-white transition-colors flex items-center justify-center">
                  <Plus className="w-4 h-4 text-black" />
                </div>
                <span className="font-semibold">Create Playlist</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("liked")}
                className={`flex items-center gap-4 transition-colors group w-full text-left ${
                  currentView === "liked"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">
                  Liked Songs ({likedSongs.length})
                </span>
              </button>
            </li>
          </ul>
        </div>

        {/* Playlists */}
        <div className="px-6 flex-1 overflow-y-auto">
          <div className="border-t border-gray-800 pt-4">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="py-2">
                <button
                  onClick={() => onViewChange(`playlist-${playlist.id}`)}
                  className={`transition-colors block truncate w-full text-left ${
                    currentView === `playlist-${playlist.id}`
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {playlist.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96 max-w-[90vw]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl font-bold">Create Playlist</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Playlist"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
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
                  className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700 resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                disabled={!playlistName.trim()}
                className="flex-1 bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
