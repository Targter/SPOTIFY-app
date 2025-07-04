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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const TrackCard = ({ track, playlist = [], index = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { likedSongs, playlists } = useTypedSelector((state) => state.playlist);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const playButtonRef = useRef(null);
  const menuRef = useRef(null);

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedSongs.some((song) => song.id === track.id);

  // GSAP animations
  // useEffect(() => {
  //   // Initial animation on mount
  //   gsap.fromTo(
  //     cardRef.current,
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
  //   );

  //   // Hover animation for card
  //   const handleMouseEnter = () => {
  //     gsap.to(cardRef.current, {
  //       scale: 1.03,
  //       boxShadow: "0 8px 24px rgba(255, 255, 255, 0.15)",
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //     gsap.to(imageRef.current, {
  //       scale: 1.1,
  //       duration: 0.5,
  //       ease: "sine.out",
  //     });
  //     gsap.to(playButtonRef.current, {
  //       y: -5,
  //       opacity: 1,
  //       duration: 0.3,
  //       ease: "elastic.out(1, 0.5)",
  //     });
  //   };

  //   const handleMouseLeave = () => {
  //     gsap.to(cardRef.current, {
  //       scale: 1,
  //       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //     gsap.to(imageRef.current, {
  //       scale: 1,
  //       duration: 0.5,
  //       ease: "sine.out",
  //     });
  //     gsap.to(playButtonRef.current, {
  //       y: 0,
  //       opacity: 0,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //   };

  //   const card = cardRef.current;
  //   card.addEventListener("mouseenter", handleMouseEnter);
  //   card.addEventListener("mouseleave", handleMouseLeave);

  //   return () => {
  //     card.removeEventListener("mouseenter", handleMouseEnter);
  //     card.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, []);

  // Handle outside click to close playlist menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowPlaylistMenu(false);
      }
    };

    if (showPlaylistMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPlaylistMenu]);

  const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    if (target.closest("button") || target.closest(".dropdown-menu")) {
      // console.log("Clicked on button or dropdown menu, not navigating.");
      return;
    }
    console.log("Navigating to song details for:", track.id);

    if (isCurrentTrack) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      const trackIndex = playlist.findIndex((t) => t.id === track.id);
      dispatch(setCurrentTrack(track));
      dispatch(setQueue(playlist.length > 0 ? playlist : [track]));
      dispatch(setCurrentIndex(trackIndex >= 0 ? trackIndex : 0));
      dispatch(setIsPlaying(true));
      dispatch(addToRecentlyPlayed(track));
      navigate(`/song/${track.id}`);
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();
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
      toast.success(`Remove From Liked Songs"`);
    } else {
      dispatch(addToLikedSongs(track));
      toast.success(`Added to Liked Songs"`);
    }
    // gsap.fromTo(
    //   e.currentTarget,
    //   { scale: 1.1 },
    //   { scale: 1, duration: 0.1, ease: "elastic.out(1, 0.5)" }
    // );
  };

  const handleAddToPlaylist = (e, playlistId) => {
    e.stopPropagation();
    dispatch(addToPlaylist({ playlistId, track }));
    setShowPlaylistMenu(false);
    toast.success(`Added to Playlist"`);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={cardRef}
      className="group bg-zinc-900/80 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:bg-zinc-800/90 transition-colors cursor-pointer relative  overflow-visible z-30
       "
      onClick={handleCardClick}
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
          className="absolute bottom-3 right-3 w-12 h-12 bg-gradient-to-r from-zinc-700 to-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform"
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
                isLiked ? "text-white-900" : "text-gray-400 hover:text-white"
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
                className="p-1 rounded-full text-gray-400 hover:text-white transition-colors "
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showPlaylistMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 top-8 bg-gradient-to-r from-zinc-700 to-gray-900 backdrop-blur-md rounded-lg shadow-xl py-2  min-w-48 border border-gray-700 thin-dark-scrollbar z-50 "
                >
                  <div className="px-4 py-1  text-xs font-ligth">
                    Add to playlist
                  </div>
                  <div className="max-h-48 overflow-y-auto thin-dark-scrollbar">
                    {playlists.length > 0 ? (
                      playlists.map((playlist) => (
                        <button
                          key={playlist.id}
                          onClick={(e) => handleAddToPlaylist(e, playlist.id)}
                          className="w-full text-left px-4 py-2 text-lg text-white hover:bg-zinc-900/80 transition-colors"
                        >
                          {playlist.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-400 text-center">
                        No playlists available
                      </div>
                    )}
                  </div>
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
