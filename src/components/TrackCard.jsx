import React, { useState, useEffect, useRef } from "react";
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
import { gsap } from "gsap";

const TrackCard = ({ track, playlist = [], index = 0 }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { likedSongs, playlists } = useTypedSelector((state) => state.playlist);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const playButtonRef = useRef(null);

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedSongs.some((song) => song.id === track.id);

  // GSAP animations
  useEffect(() => {
    // Initial animation on mount
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    // Hover animation for card
    const handleMouseEnter = () => {
      gsap.to(cardRef.current, {
        scale: 1.03,
        boxShadow: "0 8px 24px rgba(255, 255, 255, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "sine.out",
      });
      gsap.to(playButtonRef.current, {
        y: -5,
        opacity: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "sine.out",
      });
      gsap.to(playButtonRef.current, {
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const card = cardRef.current;
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
    // Trigger like button animation
    gsap.fromTo(
      e.currentTarget,
      { scale: 1.3 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );
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
    <div
      ref={cardRef}
      className="group bg-gray-900/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 hover:bg-gray-800/90 transition-colors cursor-pointer relative overflow-hidden"
    >
      <div className="relative mb-4">
        <img
          ref={imageRef}
          src={track.album.cover_medium || track.album.cover_small}
          alt={track.album.title}
          className="w-full aspect-square object-cover rounded-md shadow-md"
        />
        <button
          ref={playButtonRef}
          onClick={handlePlay}
          className="absolute bottom-3 right-3 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-6 h-6 text-black" />
          ) : (
            <Play className="w-6 h-6 text-black ml-1" />
          )}
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-white text-base truncate">
          {track.title}
        </h3>
        <p className="text-gray-300 text-sm truncate">{track.artist.name}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-xs">
            {formatDuration(track.duration)}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-1 rounded-full hover:scale-110 transition-transform ${
                isLiked ? "text-green-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlaylistMenu(!showPlaylistMenu);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showPlaylistMenu && (
                <div className="absolute right-0 top-8 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl py-2 z-20 min-w-48 border border-gray-700">
                  <div className="px-4 py-2 text-xs text-gray-300 font-semibold">
                    Add to playlist
                  </div>
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.id}
                      onClick={() => handleAddToPlaylist(playlist.id)}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700/80 transition-colors"
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
