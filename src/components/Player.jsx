import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
} from "../store/slices/playerSlice";
import { addToLikedSongs } from "../store/slices/playlistSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
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

  const { likedSongs } = useTypedSelector((state) => state.playlist);
  const isLiked = currentTrack
    ? likedSongs.some((song) => song.id === currentTrack.id)
    : false;

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isNaN(audio.currentTime)) {
        dispatch(setCurrentTime(audio.currentTime));
      }
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        dispatch(setDuration(audio.duration));
      }
    };

    const handleEnded = () => {
      dispatch(nextTrack());
    };

    const handleCanPlay = () => {
      console.log("Audio can play");
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      dispatch(setIsPlaying(false));
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
  }, [dispatch]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Play failed:", error);
          dispatch(setIsPlaying(false));
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, dispatch]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Load new track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.load();
    dispatch(setCurrentTime(0));
    dispatch(setDuration(0));
  }, [currentTrack, dispatch]);

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
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
    if (currentTrack) {
      dispatch(addToLikedSongs(currentTrack));
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
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

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3 z-50">
      <audio
        ref={audioRef}
        src={currentTrack.preview}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-0">
          <img
            src={
              currentTrack.album.cover_small || "https://via.placeholder.com/56"
            }
            alt={currentTrack.album.title}
            className="w-14 h-14 rounded object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/56";
            }}
          />
          <div className="min-w-0">
            <p className="text-white font-medium truncate">
              {currentTrack.title}
            </p>
            <p className="text-gray-400 text-sm truncate">
              {currentTrack.artist.name}
            </p>
          </div>
          <button
            onClick={handleLike}
            className={`p-1 rounded-full hover:scale-110 transition-transform ml-2 ${
              isLiked ? "text-green-500" : "text-gray-400 hover:text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 w-2/4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleShuffle())}
              className={`p-1 rounded-full hover:scale-110 transition-transform ${
                shuffle ? "text-green-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={() => dispatch(previousTrack())}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black" />
              ) : (
                <Play className="w-4 h-4 text-black ml-0.5" />
              )}
            </button>

            <button
              onClick={() => dispatch(nextTrack())}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={() => dispatch(toggleRepeat())}
              className={`p-1 rounded-full hover:scale-110 transition-transform ${
                repeat !== "off"
                  ? "text-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {React.createElement(getRepeatIcon(), { className: "w-4 h-4" })}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-1/4 justify-end">
          <button
            onClick={handleMute}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {React.createElement(getVolumeIcon(), { className: "w-4 h-4" })}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
