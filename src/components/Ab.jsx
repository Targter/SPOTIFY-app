import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Play, Pause, Heart, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
  setCurrentTrack,
  setIsPlaying,
  setQueue,
  setCurrentIndex,
} from "../store/slices/playerSlice";
import {
  addToLikedSongs,
  addToRecentlyPlayed,
  removeFromLikedSongs,
  addToPlaylist,
  removeFromPlaylist,
} from "../store/slices/playlistSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { gsap } from "gsap";

const TrackRow = ({
  track,
  index,
  playlist,
  playlistId,
  showDeleteOption = false,
}) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { likedSongs, playlists } = useTypedSelector((state) => state.playlist);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const rowRef = useRef(null);
  const playButtonRef = useRef(null);
  const likeButtonRef = useRef(null);
  const menuRef = useRef(null);
  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedSongs.some((song) => song.id === track.id);

  // GSAP animations
  useEffect(() => {
    // Entrance animation for row
    gsap.fromTo(
      rowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Wave-like oscillation for current playing track
    if (isCurrentTrack && isPlaying) {
      gsap.to(rowRef.current, {
        y: "+=5",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(rowRef.current, {
        scale: 1.02,
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(playButtonRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(likeButtonRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(rowRef.current, {
        scale: 1,
        backgroundColor: isCurrentTrack
          ? "rgba(31, 41, 55, 0.8)"
          : "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(playButtonRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(likeButtonRef.current, {
        opacity: isLiked ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Playlist menu animation
    if (showPlaylistMenu && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { scale: 0.95, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.4)" }
      );
    }

    const row = rowRef.current;
    row.addEventListener("mouseenter", handleMouseEnter);
    row.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      row.removeEventListener("mouseenter", handleMouseEnter);
      row.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isCurrentTrack, isPlaying, showPlaylistMenu, isLiked]);

  const handlePlay = (e) => {
    e.stopPropagation();
    console.log("Playing track:", track.title);

    if (!track.preview) {
      console.warn("No preview URL for track:", track.title);
      return;
    }

    const trackIndex = playlist.findIndex((t) => t.id === track.id);
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(playlist));
    dispatch(setCurrentIndex(trackIndex >= 0 ? trackIndex : 0));
    dispatch(setIsPlaying(true));
    dispatch(addToRecentlyPlayed(track));
  };

  const handlePause = (e) => {
    e.stopPropagation();
    dispatch(setIsPlaying(false));
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      dispatch(removeFromLikedSongs(track.id));
    } else {
      dispatch(addToLikedSongs(track));
    }
    // Like button animation
    gsap.fromTo(
      likeButtonRef.current,
      { scale: 1.3 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );
  };

  const handleAddToPlaylist = (e, targetPlaylistId, playlistName) => {
    e.stopPropagation();
    console.log("Adding to playlist:", targetPlaylistId, playlistName, track);

    const selectedPlaylist = playlists.find((p) => p.id === targetPlaylistId);
    const trackExists = selectedPlaylist?.tracks.some((t) => t.id === track.id);

    if (trackExists) {
      return;
    }

    dispatch(addToPlaylist({ playlistId: targetPlaylistId, track }));
    setShowPlaylistMenu(false);
  };

  const handleRemoveFromPlaylist = (e) => {
    e.stopPropagation();
    if (playlistId) {
      dispatch(removeFromPlaylist({ playlistId, trackId: track.id }));
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds <= 0) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Validate track prop
  if (!track || !track.id) {
    return null;
  }

  return (
    <div
      ref={rowRef}
      className={`group grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-3 rounded-xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50 hover:bg-gray-800/90 transition-colors cursor-pointer ${
        isCurrentTrack ? "bg-gray-800/80" : ""
      }`}
      onClick={handlePlay}
    >
      <div className="w-8 text-center relative">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 animate-pulse rounded-full"></div>
              <div
                className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 animate-pulse rounded-full"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 animate-pulse rounded-full"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <span
              className={`text-sm font-medium ${
                isCurrentTrack ? "text-green-500" : "text-gray-300"
              } group-hover:hidden`}
            >
              {index + 1}
            </span>
            <button
              ref={playButtonRef}
              onClick={isCurrentTrack && isPlaying ? handlePause : handlePlay}
              className="w-8 h-8 text-white hidden group-hover:flex items-center justify-center absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full hover:bg-green-500/30 transition-colors opacity-0"
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 min-w-0">
        <img
          src={track.album.cover_medium || "https://via.placeholder.com/40"}
          alt={track.album.title || "No title"}
          className="w-12 h-12 rounded-md shadow-md"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/40";
          }}
        />
        <div className="min-w-0">
          <p
            className={`font-semibold text-base truncate ${
              isCurrentTrack ? "text-green-400" : "text-white"
            }`}
          >
            {track.title}
          </p>
          <p className="text-sm text-gray-300 truncate">
            {track.artist.name || "Unknown Artist"}
          </p>
        </div>
      </div>
      <button
        ref={likeButtonRef}
        onClick={handleLike}
        className={`p-2 rounded-full hover:scale-110 transition-transform ${
          isLiked ? "text-green-400" : "text-gray-300 hover:text-white"
        } ${isLiked ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
      </button>
      <div className="text-sm text-gray-300 text-right">
        {formatDuration(track.duration)}
      </div>
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistMenu(!showPlaylistMenu);
          }}
          className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all opacity-0 group-hover:opacity-100 duration-200"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
        {showPlaylistMenu && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistMenu(false);
              }}
            />
            <div
              ref={menuRef}
              className="absolute right-0 top-12 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl py-3 min-w-64 border border-gray-700/50 z-50"
            >
              {showDeleteOption && playlistId && (
                <>
                  <button
                    onClick={handleRemoveFromPlaylist}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Remove from playlist</span>
                  </button>
                  <div className="mx-4 my-2 h-px bg-gray-700/50"></div>
                </>
              )}
              <div className="px-4 py-2 text-xs text-gray-300 font-semibold border-b border-gray-700/50 mb-2">
                ADD TO PLAYLIST
              </div>
              <div className="max-h-48 overflow-y-auto">
                {playlists.length > 0 ? (
                  playlists.map((targetPlaylist) => (
                    <button
                      key={targetPlaylist.id}
                      onClick={(e) =>
                        handleAddToPlaylist(
                          e,
                          targetPlaylist.id,
                          targetPlaylist.name
                        )
                      }
                      className="w-full text-left px-4 py-3 text-sm text-white hover:bg-gray-800/60 transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover/item:bg-gray-600 transition-colors">
                        <Plus className="w-4 h-4 text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {targetPlaylist.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {targetPlaylist.tracks.length} songs
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-400 text-center">
                    No playlists available
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackRow;
