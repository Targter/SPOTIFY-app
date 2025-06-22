import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import {
  setCurrentTrack,
  setIsPlaying,
  setQueue,
  setCurrentIndex,
} from "../store/slices/playerSlice";
import {
  addToLikedSongs,
  removeFromLikedSongs,
  addToRecentlyPlayed,
  addToPlaylist,
} from "../store/slices/playlistSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";

const TrackCard = ({ track, playlist = [], index = 0 }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { likedSongs, playlists } = useTypedSelector((state) => state.playlist);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedSongs.some((song) => song.id === track.id);

  const handlePlay = () => {
    if (isCurrentTrack) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      const trackIndex = playlist.findIndex((t) => t.id === track.id);
      dispatch(setCurrentTrack(track));
      dispatch(setQueue(playlist.length > 0 ? playlist : [track]));
      dispatch(setCurrentIndex(trackIndex >= 0 ? trackIndex : 0));
      dispatch(setIsPlaying(true));
      dispatch(addToRecentlyPlayed(track));
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      dispatch(removeFromLikedSongs(track.id));
    } else {
      dispatch(addToLikedSongs(track));
    }
  };

  const handleAddToPlaylist = (playlistId) => {
    dispatch(addToPlaylist({ playlistId, track }));
    setShowPlaylistMenu(false);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="group bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer relative">
      <div className="relative mb-4">
        <img
          src={track.album.cover_medium || track.album.cover_small}
          alt={track.album.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105 transform"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-6 h-6 text-black" />
          ) : (
            <Play className="w-6 h-6 text-black ml-1" />
          )}
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-white truncate">{track.title}</h3>
        <p className="text-gray-400 text-sm truncate">{track.artist.name}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs">
            {formatDuration(track.duration)}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={`p-1 rounded-full hover:scale-110 transition-transform ${
                isLiked ? "text-green-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlaylistMenu(!showPlaylistMenu);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showPlaylistMenu && (
                <div className="absolute right-0 top-6 bg-gray-800 rounded-lg shadow-lg py-2 z-10 min-w-40">
                  <div className="px-3 py-1 text-xs text-gray-400">
                    Add to playlist
                  </div>
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.id}
                      onClick={() => handleAddToPlaylist(playlist.id)}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                    >
                      {playlist.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
