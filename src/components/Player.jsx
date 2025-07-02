//

import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  X,
} from "lucide-react";
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  nextTrack,
  previousTrack,
  setVolume,
  toggleShuffle,
  toggleRepeat,
  setCurrentTrack,
} from "../store/slices/playerSlice";
import {
  addToLikedSongs,
  removeFromLikedSongs,
} from "../store/slices/playlistSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { toast } from "sonner";
import { gsap } from "gsap";

const Player = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);

  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    shuffle,
    repeat,
  } = useTypedSelector((state) => state.player);

  // const { jamSession, users } = useTypedSelector((state) => state.jam);

  const { likedSongs } = useTypedSelector((state) => state.playlist);
  const isLiked = currentTrack
    ? likedSongs.some((song) => song.id === currentTrack.id)
    : false;

  const isSongDetailsPage = location.pathname.startsWith("/song/");

  // GSAP animation for player entrance
  useEffect(() => {
    if (playerRef.current) {
      gsap.fromTo(
        playerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [currentTrack]);

  // Sync audio.currentTime with Redux currentTime
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || isNaN(currentTime)) return;

    // Only update if the difference is significant to avoid jitter
    if (Math.abs(audio.currentTime - currentTime) > 0.5) {
      audio.currentTime = currentTime;
    }
  }, [currentTime, currentTrack]);

  // Handle audio events and track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // console.log("Current track:", {
    //   title: currentTrack.title,
    //   preview: currentTrack.preview,
    //   trackDuration: currentTrack.duration,
    // });

    if (!currentTrack.preview) {
      console.warn("Invalid preview URL for track:", currentTrack.title);
      toast.error("No preview available for this track");
      dispatch(setIsPlaying(false));
      dispatch(setCurrentTime(0));
      dispatch(setDuration(currentTrack.duration || 0));
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audio.src = currentTrack.preview;

    if (currentTrack.duration && !isNaN(currentTrack.duration)) {
      // console.log(
      //   "Setting initial duration from track:",
      //   currentTrack.duration
      // );
      dispatch(setDuration(currentTrack.duration));
    } else {
      console.warn("Invalid track.duration:", currentTrack.duration);
      dispatch(setDuration(0));
    }

    audio.load();

    const updateTime = () => {
      if (!isNaN(audio.currentTime)) {
        dispatch(setCurrentTime(audio.currentTime));
      }
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        // console.log("Updated duration from audio:", audio.duration);
        dispatch(setDuration(audio.duration));
      } else {
        console.warn("Invalid audio.duration:", audio.duration);
        if (currentTrack.duration && !isNaN(currentTrack.duration)) {
          dispatch(setDuration(currentTrack.duration));
        } else {
          dispatch(setDuration(0));
        }
      }
    };

    const handleEnded = () => {
      dispatch(nextTrack());
    };

    const handleCanPlay = () => {
      // console.log("Audio can play for track:", currentTrack.title);
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Play failed:", error);
            dispatch(setIsPlaying(false));
            toast.error("Failed to play audio. Please try again.");
          });
        }
      }
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      dispatch(setIsPlaying(false));
      dispatch(setCurrentTime(0));
      dispatch(setDuration(currentTrack.duration || 0));
      toast.error("Error loading audio");
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrack, isPlaying, dispatch]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    dispatch(setCurrentTime(newTime));
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      dispatch(setVolume(previousVolume));
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  const handleLike = () => {
    if (!currentTrack) return;
    if (isLiked) {
      dispatch(removeFromLikedSongs(currentTrack.id));
      toast.success("Removed from Liked Songs");
    } else {
      dispatch(addToLikedSongs(currentTrack));
      toast.success("Added to Liked Songs");
    }
  };

  const handleClose = () => {
    dispatch(setIsPlaying(false));
    dispatch(setCurrentTime(0));
    dispatch(setCurrentTrack(null));
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    gsap.to(playerRef.current, {
      opacity: 0,
      // y: 50,
      // duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        playerRef.current.style.display = "none";
      },
    });
  };

  const handleTrackClick = (e) => {
    e.stopPropagation();
    if (currentTrack?.id) {
      navigate(`/song/${currentTrack.id}`);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time <= 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  };

  const getRepeatIcon = () => {
    if (repeat === "track") return Repeat1;
    return Repeat;
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />
      {!isSongDetailsPage && currentTrack && (
        <div
          ref={playerRef}
          className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur text-gray-300 hover:bg-zinc-900/20  border-t border-gray-800 px-2 sm:px-4 py-2 z-50 h-[80px] sm:h-[100px]"
        >
          <div className="flex items-center justify-between h-full w-full max-w-screen-xl mx-auto">
            {/* Track Info - Takes less space on mobile */}
            <div className="flex items-center gap-2 sm:gap-3 w-[45%] sm:w-1/4 min-w-0">
              <img
                src={
                  currentTrack.album.cover_small ||
                  "https://via.placeholder.com/56"
                }
                alt={currentTrack.album.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover cursor-pointer"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/56";
                }}
                onClick={handleTrackClick}
              />
              <div className="min-w-0">
                <p
                  onClick={handleTrackClick}
                  className="text-white font-medium text-xs sm:text-sm truncate hover:text-zinc-400 cursor-pointer transition-colors"
                >
                  {currentTrack.title}
                </p>
                <p
                  onClick={handleTrackClick}
                  className="text-gray-400 text-[10px] sm:text-xs truncate hover:text-zinc-400 cursor-pointer transition-colors"
                >
                  {currentTrack.artist.name}
                </p>
              </div>
            </div>

            {/* Player Controls - Centered and properly contained */}
            <div className="flex flex-col items-center justify-center w-[55%] sm:w-2/4 px-1">
              <div className="flex items-center justify-center gap-1 sm:gap-2 w-full">
                <button
                  onClick={() => dispatch(previousTrack())}
                  className="p-1 text-white hover:text-zinc-900 transition-colors"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform mx-1"
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-900" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-900 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => dispatch(nextTrack())}
                  className="p-1 text-white hover:text-white transition-colors"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Progress Bar - Always visible */}
              <div className="w-full flex items-center gap-1 sm:gap-2 mt-1">
                <span className="text-[10px] text-gray-400 w-8 text-center hidden sm:block">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration > 0 ? duration : currentTrack.duration || 0}
                  value={currentTime || 0}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #34D399 ${
                      ((currentTime || 0) /
                        (duration || currentTrack.duration || 1)) *
                      100
                    }%, #4B5563 ${
                      ((currentTime || 0) /
                        (duration || currentTrack.duration || 1)) *
                      100
                    }%)`,
                  }}
                />
                <span className="text-[10px] text-gray-400 w-8 text-center hidden sm:block">
                  {formatTime(
                    duration > 0 ? duration : currentTrack.duration || 0
                  )}
                </span>
              </div>
            </div>

            {/* Right Side Controls - Hidden on mobile */}
            <div className="hidden sm:flex items-center justify-end gap-2 w-1/4">
              <button
                onClick={handleLike}
                className={`p-1 rounded-full hover:scale-110 transition-transform ${
                  isLiked ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleClose}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-zinc-500/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;

//
