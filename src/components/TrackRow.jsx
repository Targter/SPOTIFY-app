import React from "react";
import { useDispatch } from "react-redux";
import { Play, Pause, Heart } from "lucide-react";
import {
  setCurrentTrack,
  setIsPlaying,
  setQueue,
} from "../store/slices/playerSlice";
import {
  addToLikedSongs,
  addToRecentlyPlayed,
} from "../store/slices/playlistSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";

const TrackRow = ({ track, index, playlist }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { likedSongs } = useTypedSelector((state) => state.playlist);

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedSongs.some((song) => song.id === track.id);

  const handlePlay = () => {
    if (isCurrentTrack) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setQueue(playlist));
      dispatch(setIsPlaying(true));
      dispatch(addToRecentlyPlayed(track));
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(addToLikedSongs(track));
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`group grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer ${
        isCurrentTrack ? "bg-gray-800" : ""
      }`}
      onClick={handlePlay}
    >
      <div className="w-4 text-center">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500"></div>
          </div>
        ) : (
          <span
            className={`text-sm ${
              isCurrentTrack ? "text-green-500" : "text-gray-400"
            } group-hover:hidden`}
          >
            {index + 1}
          </span>
        )}
        <Play className="w-4 h-4 text-white hidden group-hover:block" />
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <img
          src={track.album.cover_small}
          alt={track.album.title}
          className="w-10 h-10 rounded"
        />
        <div className="min-w-0">
          <p
            className={`font-medium truncate ${
              isCurrentTrack ? "text-green-500" : "text-white"
            }`}
          >
            {track.title}
          </p>
          <p className="text-sm text-gray-400 truncate">{track.artist.name}</p>
        </div>
      </div>

      <button
        onClick={handleLike}
        className={`p-1 rounded-full hover:scale-110 transition-transform ${
          isLiked ? "text-green-500" : "text-gray-400 hover:text-white"
        }`}
      >
        <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
      </button>

      <div className="text-sm text-gray-400 text-right">
        {formatDuration(track.duration)}
      </div>
    </div>
  );
};

export default TrackRow;
