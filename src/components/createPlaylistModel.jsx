import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../store/slices/playlistSlice";
import { X } from "lucide-react";
import { toast } from "sonner";

const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
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
      toast.success(`Playlist "${playlistName}" created successfully!`);
      setPlaylistName("");
      setDescription("");
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreatePlaylist();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-96 max-w-[90vw]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-bold">Create Playlist</h3>
          <button
            onClick={onClose}
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
            onClick={onClose}
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
  );
};

export default CreatePlaylistModal;
