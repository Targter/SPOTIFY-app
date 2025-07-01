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
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-gray-950 to-black border-t border-gray-800 px-2 sm:px-4 py-2 z-50 h-[80px] sm:h-[100px]"
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
                  className="text-white font-medium text-xs sm:text-sm truncate hover:text-green-400 cursor-pointer transition-colors"
                >
                  {currentTrack.title}
                </p>
                <p
                  onClick={handleTrackClick}
                  className="text-gray-400 text-[10px] sm:text-xs truncate hover:text-green-400 cursor-pointer transition-colors"
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
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform mx-1"
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-black ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => dispatch(nextTrack())}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
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
                  isLiked ? "text-green-500" : "text-gray-400 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleClose}
                className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
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

// import React, { useRef, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Play,
//   Pause,
//   SkipBack,
//   SkipForward,
//   Volume2,
//   Volume1,
//   VolumeX,
//   Shuffle,
//   Repeat,
//   Repeat1,
//   Heart,
//   X,
// } from "lucide-react";
// import {
//   setIsPlaying,
//   setCurrentTime,
//   setDuration,
//   nextTrack,
//   previousTrack,
//   setVolume,
//   toggleShuffle,
//   toggleRepeat,
//   setCurrentTrack,
// } from "../store/slices/playerSlice";
// import {
//   addToLikedSongs,
//   removeFromLikedSongs,
// } from "../store/slices/playlistSlice";
// import { useTypedSelector } from "../hooks/useTypedSelector";
// import { toast } from "sonner";
// import { gsap } from "gsap";
// import useSocket from "../hooks/useSocket";

// const Player = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const audioRef = useRef(null);
//   const playerRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [previousVolume, setPreviousVolume] = useState(0.7);

//   const {
//     currentTrack,
//     isPlaying,
//     volume,
//     currentTime,
//     duration,
//     shuffle,
//     repeat,
//   } = useTypedSelector((state) => state.player);
//   const { jamSession, users } = useTypedSelector((state) => state.jam);
//   const { userId, username, email } = useTypedSelector((state) => state.auth);
//   const { likedSongs } = useTypedSelector((state) => state.playlist);
//   const socket = useSocket(userId, "Player");
//   const isLiked = currentTrack
//     ? likedSongs.some((song) => song.id === currentTrack.id)
//     : false;
//   const isSongDetailsPage = location.pathname.startsWith("/song/");

//   // GSAP animation for player entrance
//   useEffect(() => {
//     if (playerRef.current && currentTrack) {
//       playerRef.current.style.display = "block";
//       gsap.fromTo(
//         playerRef.current,
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
//       );
//     }
//   }, [currentTrack]);

//   // Sync audio.currentTime with Redux currentTime
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio || !currentTrack || isNaN(currentTime)) return;

//     if (Math.abs(audio.currentTime - currentTime) > 0.5) {
//       audio.currentTime = currentTime;
//     }
//   }, [currentTime, currentTrack]);

//   // Handle WebSocket events for jam session
//   useEffect(() => {
//     if (!socket || !jamSession) return;

//     socket.on(
//       "jam_session_updated",
//       ({ currentTime, isPlaying, sessionId, track }) => {
//         if (
//           jamSession.sessionId === sessionId &&
//           userId !== jamSession.hostId
//         ) {
//           console.log("Received jam_session_updated:", {
//             currentTime,
//             isPlaying,
//             sessionId,
//             track,
//           });
//           if (track && track.id !== currentTrack?.id) {
//             dispatch(setCurrentTrack(track));
//           }
//           dispatch(setCurrentTime(currentTime));
//           dispatch(setIsPlaying(isPlaying));
//         }
//       }
//     );

//     socket.on(
//       "jam_session_joined",
//       ({ hostId, track, currentTime = 0, isPlaying = false, sessionId }) => {
//         if (jamSession.sessionId === sessionId && userId !== hostId) {
//           console.log("Received jam_session_joined:", {
//             hostId,
//             track,
//             currentTime,
//             isPlaying,
//             sessionId,
//           });
//           dispatch(setCurrentTrack(track));
//           dispatch(setCurrentTime(currentTime));
//           dispatch(setIsPlaying(isPlaying));
//         }
//       }
//     );

//     return () => {
//       socket.off("jam_session_updated");
//       socket.off("jam_session_joined");
//     };
//   }, [socket, jamSession, userId, currentTrack, dispatch]);

//   // Handle audio events and track changes
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio || !currentTrack) return;

//     console.log("Current track:", {
//       title: currentTrack.title,
//       preview: currentTrack.preview,
//       trackDuration: currentTrack.duration,
//     });

//     if (!currentTrack.preview) {
//       console.warn("Invalid preview URL for track:", currentTrack.title);
//       toast.error("No preview available for this track");
//       dispatch(setIsPlaying(false));
//       dispatch(setCurrentTime(0));
//       dispatch(setDuration(currentTrack.duration || 0));
//       if (userId === jamSession?.hostId) {
//         dispatch(nextTrack());
//       }
//       return;
//     }

//     audio.pause();
//     audio.currentTime = 0;
//     audio.src = currentTrack.preview;

//     if (currentTrack.duration && !isNaN(currentTrack.duration)) {
//       console.log(
//         "Setting initial duration from track:",
//         currentTrack.duration
//       );
//       dispatch(setDuration(currentTrack.duration));
//     } else {
//       console.warn("Invalid track.duration:", currentTrack.duration);
//       dispatch(setDuration(0));
//     }

//     audio.load();

//     const updateTime = () => {
//       if (!isNaN(audio.currentTime)) {
//         dispatch(setCurrentTime(audio.currentTime));
//         if (socket && jamSession && userId === jamSession.hostId) {
//           socket.emit("update_playback", {
//             currentTime: audio.currentTime,
//             isPlaying,
//             sessionId: jamSession.sessionId,
//             track: currentTrack,
//           });
//         }
//       }
//     };

//     const updateDuration = () => {
//       if (!isNaN(audio.duration) && audio.duration > 0) {
//         console.log("Updated duration from audio:", audio.duration);
//         dispatch(setDuration(audio.duration));
//       } else {
//         console.warn("Invalid audio.duration:", audio.duration);
//         if (currentTrack.duration && !isNaN(currentTrack.duration)) {
//           dispatch(setDuration(currentTrack.duration));
//         } else {
//           dispatch(setDuration(0));
//         }
//       }
//     };

//     const handleEnded = () => {
//       if (userId === jamSession?.hostId || !jamSession) {
//         dispatch(nextTrack());
//         if (socket && jamSession) {
//           socket.emit("update_playback", {
//             currentTime: 0,
//             isPlaying: false,
//             sessionId: jamSession.sessionId,
//             track: null,
//           });
//         }
//       }
//     };

//     const handleCanPlay = () => {
//       console.log("Audio can play for track:", currentTrack.title);
//       if (isPlaying && (!jamSession || userId === jamSession.hostId)) {
//         const playPromise = audio.play();
//         if (playPromise !== undefined) {
//           playPromise.catch((error) => {
//             console.error("Play failed:", error);
//             dispatch(setIsPlaying(false));
//             toast.error("Failed to play audio. Please try again.");
//           });
//         }
//       }
//     };

//     const handleError = (e) => {
//       console.error("Audio error:", e);
//       dispatch(setIsPlaying(false));
//       dispatch(setCurrentTime(0));
//       dispatch(setDuration(currentTrack.duration || 0));
//       toast.error("Error loading audio. Skipping to next track.");
//       if (userId === jamSession?.hostId || !jamSession) {
//         dispatch(nextTrack());
//       }
//     };

//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", updateDuration);
//     audio.addEventListener("ended", handleEnded);
//     audio.addEventListener("canplay", handleCanPlay);
//     audio.addEventListener("error", handleError);

//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", updateDuration);
//       audio.removeEventListener("ended", handleEnded);
//       audio.removeEventListener("canplay", handleCanPlay);
//       audio.removeEventListener("error", handleError);
//     };
//   }, [currentTrack, isPlaying, dispatch, socket, jamSession, userId]);

//   // Handle volume changes
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.volume = isMuted ? 0 : volume;
//   }, [volume, isMuted]);

//   const handlePlayPause = () => {
//     if (jamSession && userId !== jamSession.hostId) {
//       toast.error("Only the host can control playback");
//       return;
//     }
//     dispatch(setIsPlaying(!isPlaying));
//     if (socket && jamSession) {
//       socket.emit("update_playback", {
//         currentTime,
//         isPlaying: !isPlaying,
//         sessionId: jamSession.sessionId,
//         track: currentTrack,
//       });
//     }
//   };

//   const handleSeek = (e) => {
//     if (jamSession && userId !== jamSession.hostId) {
//       toast.error("Only the host can seek the track");
//       return;
//     }
//     const newTime = parseFloat(e.target.value);
//     dispatch(setCurrentTime(newTime));
//     if (socket && jamSession) {
//       socket.emit("update_playback", {
//         currentTime: newTime,
//         isPlaying,
//         sessionId: jamSession.sessionId,
//         track: currentTrack,
//       });
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     dispatch(setVolume(newVolume));
//     if (newVolume > 0) {
//       setIsMuted(false);
//     }
//   };

//   const handleMute = () => {
//     if (isMuted) {
//       setIsMuted(false);
//       dispatch(setVolume(previousVolume));
//     } else {
//       setPreviousVolume(volume);
//       setIsMuted(true);
//     }
//   };

//   const handleLike = () => {
//     if (!currentTrack) return;
//     if (isLiked) {
//       dispatch(removeFromLikedSongs(currentTrack.id));
//       toast.success("Removed from Liked Songs");
//     } else {
//       dispatch(addToLikedSongs(currentTrack));
//       toast.success("Added to Liked Songs");
//     }
//   };

//   const handleClose = () => {
//     if (jamSession && userId === jamSession.hostId) {
//       toast.error("Host cannot close player during a jam session");
//       return;
//     }
//     dispatch(setIsPlaying(false));
//     dispatch(setCurrentTime(0));
//     dispatch(setCurrentTrack(null));
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//     gsap.to(playerRef.current, {
//       opacity: 0,
//       y: 50,
//       duration: 0.3,
//       ease: "power2.in",
//       onComplete: () => {
//         playerRef.current.style.display = "none";
//       },
//     });
//   };

//   const handleTrackClick = (e) => {
//     e.stopPropagation();
//     if (currentTrack?.id) {
//       navigate(`/song/${currentTrack.id}`);
//     }
//   };

//   const formatTime = (time) => {
//     if (isNaN(time) || time <= 0) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const getVolumeIcon = () => {
//     if (isMuted || volume === 0) return VolumeX;
//     if (volume < 0.5) return Volume1;
//     return Volume2;
//   };

//   const getRepeatIcon = () => {
//     if (repeat === "track") return Repeat1;
//     return Repeat;
//   };

//   return (
//     <>
//       <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />
//       {!isSongDetailsPage && currentTrack && (
//         <div
//           ref={playerRef}
//           className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-gray-950 to-black border-t border-gray-800 px-4 py-4 z-50 thin-dark-scrollbar h-[100px]"
//         >
//           <div className="flex">
//             <div className="flex items-center justify-between max-w-screen-xl mx-auto w-[80%]">
//               {/* Track Info */}
//               <div className="flex items-center gap-3 w-1/4 min-w-0">
//                 <img
//                   src={
//                     currentTrack.album?.cover_small ||
//                     "https://via.placeholder.com/56"
//                   }
//                   alt={currentTrack.album?.title}
//                   className="w-14 h-14 rounded object-cover cursor-pointer"
//                   onError={(e) => {
//                     e.currentTarget.src = "https://via.placeholder.com/56";
//                   }}
//                   onClick={handleTrackClick}
//                 />
//                 <div className="min-w-0">
//                   <p
//                     onClick={handleTrackClick}
//                     className="text-white font-medium truncate hover:text-green-400 cursor-pointer transition-colors"
//                   >
//                     {currentTrack.title}
//                   </p>
//                   <p
//                     onClick={handleTrackClick}
//                     className="text-gray-400 text-sm truncate hover:text-green-400 cursor-pointer transition-colors"
//                   >
//                     {currentTrack.artist?.name}
//                   </p>
//                   {jamSession && (
//                     <p className="text-gray-400 text-xs truncate">
//                       Hosted by:{" "}
//                       {users.find((u) => u.id === jamSession.hostId)
//                         ?.username || "Unknown"}{" "}
//                       (
//                       {users.find((u) => u.id === jamSession.hostId)?.email ||
//                         "Unknown"}
//                       )
//                     </p>
//                   )}
//                   <p className="text-gray-400 text-xs truncate">
//                     You: {username || "Guest"} ({email || "No email"})
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleLike}
//                   className={`p-1 rounded-full hover:scale-110 transition-transform ml-2 ${
//                     isLiked
//                       ? "text-green-500"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   <Heart
//                     className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
//                   />
//                 </button>
//               </div>

//               {/* Player Controls */}
//               <div className="flex flex-col items-center gap-2 w-2/4">
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => {
//                       if (jamSession && userId !== jamSession.hostId) {
//                         toast.error("Only the host can toggle shuffle");
//                         return;
//                       }
//                       dispatch(toggleShuffle());
//                     }}
//                     className={`p-1 rounded-full hover:scale-110 transition-transform ${
//                       shuffle
//                         ? "text-green-500"
//                         : "text-gray-400 hover:text-white"
//                     } ${
//                       jamSession && userId !== jamSession.hostId
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     disabled={jamSession && userId !== jamSession.hostId}
//                   >
//                     <Shuffle className="w-4 h-4" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       if (jamSession && userId !== jamSession.hostId) {
//                         toast.error("Only the host can skip tracks");
//                         return;
//                       }
//                       dispatch(previousTrack());
//                       if (socket && jamSession) {
//                         socket.emit("update_playback", {
//                           currentTime: 0,
//                           isPlaying: false,
//                           sessionId: jamSession.sessionId,
//                           track: null,
//                         });
//                       }
//                     }}
//                     className={`p-1 text-gray-400 hover:text-white transition-colors ${
//                       jamSession && userId !== jamSession.hostId
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     disabled={jamSession && userId !== jamSession.hostId}
//                   >
//                     <SkipBack className="w-5 h-5" />
//                   </button>

//                   <button
//                     onClick={handlePlayPause}
//                     className={`w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform ${
//                       jamSession && userId !== jamSession.hostId
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     disabled={jamSession && userId !== jamSession.hostId}
//                   >
//                     {isPlaying ? (
//                       <Pause className="w-4 h-4 text-black" />
//                     ) : (
//                       <Play className="w-4 h-4 text-black ml-0.5" />
//                     )}
//                   </button>

//                   <button
//                     onClick={() => {
//                       if (jamSession && userId !== jamSession.hostId) {
//                         toast.error("Only the host can skip tracks");
//                         return;
//                       }
//                       dispatch(nextTrack());
//                       if (socket && jamSession) {
//                         socket.emit("update_playback", {
//                           currentTime: 0,
//                           isPlaying: false,
//                           sessionId: jamSession.sessionId,
//                           track: null,
//                         });
//                       }
//                     }}
//                     className={`p-1 text-gray-400 hover:text-white transition-colors ${
//                       jamSession && userId !== jamSession.hostId
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     disabled={jamSession && userId !== jamSession.hostId}
//                   >
//                     <SkipForward className="w-5 h-5" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       if (jamSession && userId !== jamSession.hostId) {
//                         toast.error("Only the host can toggle repeat");
//                         return;
//                       }
//                       dispatch(toggleRepeat());
//                     }}
//                     className={`p-1 rounded-full hover:scale-110 transition-transform ${
//                       repeat !== "off"
//                         ? "text-green-500"
//                         : "text-gray-400 hover:text-white"
//                     } ${
//                       jamSession && userId !== jamSession.hostId
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     disabled={jamSession && userId !== jamSession.hostId}
//                   >
//                     {React.createElement(getRepeatIcon(), {
//                       className: "w-4 h-4",
//                     })}
//                   </button>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="flex items-center gap-2 w-full max-w-md">
//                   <span className="text-xs text-gray-400 w-10 text-center">
//                     {formatTime(currentTime)}
//                   </span>
//                   <input
//                     type="range"
//                     min="0"
//                     max={duration > 0 ? duration : currentTrack?.duration || 0}
//                     value={currentTime || 0}
//                     onChange={handleSeek}
//                     disabled={
//                       (duration <= 0 &&
//                         (!currentTrack?.duration ||
//                           currentTrack?.duration <= 0)) ||
//                       (jamSession && userId !== jamSession.hostId)
//                     }
//                     className={`flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider ${
//                       jamSession && userId !== jamSession.hostId
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     style={{
//                       background: `linear-gradient(to right, #34D399 ${
//                         ((currentTime || 0) /
//                           (duration || currentTrack?.duration || 1)) *
//                         100
//                       }%, #4B5563 ${
//                         ((currentTime || 0) /
//                           (duration || currentTrack?.duration || 1)) *
//                         100
//                       }%)`,
//                     }}
//                   />
//                   <span className="text-xs text-gray-400 w-10 text-center">
//                     {formatTime(
//                       duration > 0 ? duration : currentTrack?.duration || 0
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Volume Control and Close Button */}
//               <div className="flex items-center gap-2 w-1/4 justify-end">
//                 <button
//                   onClick={handleMute}
//                   className="p-1 text-gray-400 hover:text-white transition-colors"
//                 >
//                   {React.createElement(getVolumeIcon(), {
//                     className: "w-4 h-4",
//                   })}
//                 </button>
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.01"
//                   value={isMuted ? 0 : volume}
//                   onChange={handleVolumeChange}
//                   className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
//                   style={{
//                     background: `linear-gradient(to right, #34D399 ${
//                       (isMuted ? 0 : volume) * 100
//                     }%, #4B5563 ${(isMuted ? 0 : volume) * 100}%)`,
//                   }}
//                 />
//               </div>
//             </div>
//             <button
//               onClick={handleClose}
//               className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
//             >
//               <X className="w-7 h-7" />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Player;
