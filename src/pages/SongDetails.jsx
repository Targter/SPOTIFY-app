// import React, { useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   Play,
//   Pause,
//   Heart,
//   ArrowLeft,
//   Clock,
//   Calendar,
//   Music,
//   User,
//   Disc3,
//   Volume2,
//   MoreHorizontal,
//   Plus,
//   Share,
//   Download,
// } from "lucide-react";
// import gsap from "gsap";
// import {
//   setCurrentTrack,
//   setIsPlaying,
//   setQueue,
//   setCurrentIndex,
//   setCurrentTime,
//   setVolume,
// } from "../store/slices/playerSlice";
// import {
//   addToLikedSongs,
//   removeFromLikedSongs,
//   addToRecentlyPlayed,
//   addToPlaylist,
// } from "../store/slices/playlistSlice";
// import { useTypedSelector } from "../hooks/useTypedSelector";
// import { toast } from "sonner";

// const SongDetails = () => {
//   const { songId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { currentTrack, isPlaying, queue, currentTime, duration, volume } =
//     useTypedSelector((state) => state.player);
//   const { likedSongs, playlists } = useTypedSelector((state) => state.playlist);
//   const progressBarRef = useRef(null);

//   // Refs for GSAP animations
//   const albumArtRef = useRef(null);
//   const titleRef = useRef(null);
//   const controlsRef = useRef(null);
//   const visualizationRef = useRef(null);

//   // Find the song from various sources
//   const findSong = () => {
//     console.log("Finding song with ID:", songId);
//     const queueSong = queue.find((track) => String(track.id) === songId);
//     if (queueSong) return queueSong;

//     const likedSong = likedSongs.find((track) => String(track.id) === songId);
//     if (likedSong) return likedSong;

//     for (const playlist of playlists) {
//       const playlistSong = playlist.tracks.find(
//         (track) => String(track.id) === songId
//       );
//       if (playlistSong) return playlistSong;
//     }

//     return null;
//   };

//   const song = findSong();
//   const isCurrentSong = currentTrack
//     ? String(currentTrack.id) === songId
//     : false;
//   const isLiked = song ? likedSongs.some((s) => s.id === song.id) : false;

//   // Auto-play on mount
//   useEffect(() => {
//     if (song) {
//       console.log("Song preview URL:", song.preview);
//       if (!song.preview) {
//         toast.error("No preview available for this song");
//       }
//       if (!isCurrentSong) {
//         dispatch(setCurrentTrack(song));
//         dispatch(setQueue([song]));
//         dispatch(setCurrentIndex(0));
//         dispatch(setIsPlaying(true));
//         dispatch(addToRecentlyPlayed(song));
//         toast.success(`Playing "${song.title}"`);
//       }
//     } else {
//       toast.error("Song not found");
//       navigate("/");
//     }
//   }, [song, isCurrentSong, dispatch, navigate]);

//   // GSAP animations on mount
//   useEffect(() => {
//     gsap.fromTo(
//       albumArtRef.current,
//       { scale: 0.8, opacity: 0, y: 50 },
//       { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
//     );
//     gsap.fromTo(
//       titleRef.current,
//       { opacity: 0, x: -50 },
//       { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
//     );
//     gsap.fromTo(
//       controlsRef.current,
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
//     );
//     gsap.fromTo(
//       visualizationRef.current,
//       { opacity: 0, scale: 0.9 },
//       { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", delay: 0.6 }
//     );
//   }, []);

//   // GSAP animation for progress bar thumb
//   useEffect(() => {
//     if (progressBarRef.current) {
//       gsap.to(progressBarRef.current, {
//         "--thumb-scale": isCurrentSong && isPlaying ? 1.2 : 1,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     }
//   }, [isCurrentSong, isPlaying]);

//   if (!song) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
//         <div className="text-white text-xl">Song not found</div>
//       </div>
//     );
//   }

//   const handlePlay = () => {
//     console.log("Playing song:", song);
//     if (!song.preview) {
//       console.warn("No preview URL for song:", song.title);
//       toast.error("No preview available for this song");
//       return;
//     }
//     dispatch(setCurrentTrack(song));
//     dispatch(setQueue([song]));
//     dispatch(setCurrentIndex(0));
//     dispatch(setIsPlaying(true));
//     dispatch(addToRecentlyPlayed(song));
//     toast.success(`Playing "${song.title}"`);
//   };

//   const handlePause = () => {
//     dispatch(setIsPlaying(false));
//     toast.success(`Paused "${song.title}"`);
//   };

//   const handleLike = () => {
//     if (isLiked) {
//       dispatch(removeFromLikedSongs(song.id));
//       toast.success("Removed from Liked Songs");
//     } else {
//       dispatch(addToLikedSongs(song));
//       toast.success("Added to Liked Songs");
//     }
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     dispatch(setCurrentTime(newTime));
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     dispatch(setVolume(newVolume));
//   };

//   const formatDuration = (seconds) => {
//     if (isNaN(seconds) || seconds <= 0) return "0:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown";
//     return new Date(dateString).getFullYear();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
//       {/* Background Gradient Overlay */}
//       <div
//         className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 blur-3xl"
//         style={{ zIndex: -1 }}
//       />

//       {/* Header */}
//       <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
//         <div className="flex items-center gap-4 p-6 max-w-7xl  ">
//           <button
//             onClick={() => navigate(-1)}
//             className="transition-all duration-300 hover:scale-110 w-[50%]"
//           >
//             <ArrowLeft className="w-11 h-11 bg-gray-800/60 hover:bg-gray-700/80 rounded-full p-2" />
//           </button>
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//             Now Playing
//           </h1>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//           {/* Album Art Section */}
//           <div className="space-y-8">
//             <div ref={albumArtRef} className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-3xl blur-2xl transform scale-105 opacity-50" />
//               <img
//                 src={
//                   song.album.cover_xl ||
//                   song.album.cover_big ||
//                   song.album.cover_medium ||
//                   song.album.cover_small ||
//                   "https://via.placeholder.com/640x640"
//                 }
//                 alt={song.album.title}
//                 className="relative w-full max-w-2xl mx-auto aspect-square object-cover rounded-3xl shadow-2xl border border-gray-700/30 transition-transform duration-300 group-hover:scale-105"
//                 onError={(e) => {
//                   e.currentTarget.src = "https://via.placeholder.com/640x640";
//                 }}
//               />
//               {isCurrentSong && isPlaying && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl backdrop-blur-sm">
//                   <div className="flex space-x-2">
//                     {Array.from({ length: 4 }).map((_, i) => (
//                       <div
//                         key={i}
//                         className="w-3 h-12 bg-white rounded-full animate-pulse"
//                         style={{ animationDelay: `${i * 0.1}s` }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Vinyl Record Animation */}
//             <div className="relative w-32 h-32 mx-auto">
//               <div
//                 className={`w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black border-4 border-gray-700 ${
//                   isCurrentSong && isPlaying ? "animate-spin" : ""
//                 }`}
//                 style={{ animationDuration: "3s" }}
//               >
//                 <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900">
//                   <div className="absolute inset-4 rounded-full bg-black flex items-center justify-center">
//                     <Disc3 className="w-6 h-6 text-gray-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Song Info Section */}
//           <div className="space-y-8">
//             {/* Title and Artist */}
//             <div ref={titleRef} className="space-y-4">
//               <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
//                 {song.title}
//               </h1>
//               <div className="flex items-center gap-3">
//                 <User className="w-6 h-6 text-gray-400" />
//                 <h2 className="text-2xl lg:text-3xl font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer">
//                   {song.artist.name}
//                 </h2>
//               </div>
//             </div>

//             {/* Album Info */}
//             <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 backdrop-blur-md shadow-lg">
//               <div className="flex items-center gap-3 mb-4">
//                 <Music className="w-5 h-5 text-purple-400" />
//                 <h3 className="text-lg font-semibold text-gray-300">
//                   Album Information
//                 </h3>
//               </div>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-400 mb-1">Album</p>
//                   <p className="text-white font-medium">{song.album.title}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 mb-1">Release Date</p>
//                   <p className="text-white font-medium">
//                     {formatDate(song.releaseDate)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 mb-1">Duration</p>
//                   <p className="text-white font-medium flex items-center gap-1">
//                     <Clock className="w-4 h-4" />
//                     {formatDuration(song.duration)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 mb-1">Popularity</p>
//                   <div className="flex items-center gap-2">
//                     <div className="flex-1 bg-gray-700 rounded-full h-2">
//                       <div
//                         className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full"
//                         style={{ width: `${song.rank || 50}%` }}
//                       />
//                     </div>
//                     <span className="text-white text-xs font-medium">
//                       {song.rank || 50}%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div ref={controlsRef} className="flex flex-col gap-4">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <button
//                   onClick={
//                     isCurrentSong && isPlaying ? handlePause : handlePlay
//                   }
//                   className="group flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
//                   onMouseEnter={() =>
//                     gsap.to(".group", { scale: 1.1, duration: 0.3 })
//                   }
//                   onMouseLeave={() =>
//                     gsap.to(".group", { scale: 1, duration: 0.3 })
//                   }
//                 >
//                   {isCurrentSong && isPlaying ? (
//                     <Pause className="w-6 h-6" />
//                   ) : (
//                     <Play className="w-6 h-6 ml-1" />
//                   )}
//                   {isCurrentSong && isPlaying ? "Pause" : "Play"}
//                 </button>

//                 <button
//                   onClick={handleLike}
//                   className={`group p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
//                     isLiked
//                       ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
//                       : "bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white"
//                   }`}
//                   onMouseEnter={() =>
//                     gsap.to(".group", { scale: 1.1, duration: 0.3 })
//                   }
//                   onMouseLeave={() =>
//                     gsap.to(".group", { scale: 1, duration: 0.3 })
//                   }
//                 >
//                   <Heart
//                     className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`}
//                   />
//                 </button>

//                 <button className="group p-4 rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg">
//                   <Share className="w-6 h-6" />
//                 </button>

//                 <button className="group p-4 rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg">
//                   <Download className="w-6 h-6" />
//                 </button>

//                 <button className="group p-4 rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg">
//                   <MoreHorizontal className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Progress Bar */}
//               <div className="flex items-center gap-2 w-full max-w-md">
//                 <span className="text-xs text-gray-400 w-10 text-center">
//                   {formatDuration(currentTime)}
//                 </span>
//                 <input
//                   ref={progressBarRef}
//                   type="range"
//                   min="0"
//                   max={duration > 0 ? duration : song.duration || 0}
//                   value={currentTime || 0}
//                   onChange={handleSeek}
//                   disabled={
//                     duration <= 0 && (!song.duration || song.duration <= 0)
//                   }
//                   className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{
//                     background: `linear-gradient(to right, #34D399 ${
//                       ((currentTime || 0) / (duration || song.duration || 1)) *
//                       100
//                     }%, #4B5563 ${
//                       ((currentTime || 0) / (duration || song.duration || 1)) *
//                       100
//                     }%)`,
//                     "--thumb-scale": 1,
//                   }}
//                 />
//                 <span className="text-xs text-gray-400 w-10 text-center">
//                   {formatDuration(duration > 0 ? duration : song.duration || 0)}
//                 </span>
//               </div>

//               {/* Volume Control */}
//               <div className="flex items-center gap-2 w-full max-w-xs">
//                 <Volume2 className="w-5 h-5 text-gray-400" />
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.01"
//                   value={volume}
//                   onChange={handleVolumeChange}
//                   className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
//                   style={{
//                     background: `linear-gradient(to right, #34D399 ${
//                       volume * 100
//                     }%, #4B5563 ${volume * 100}%)`,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Add to Playlist */}
//             {playlists.length > 0 && (
//               <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 backdrop-blur-md shadow-lg">
//                 <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
//                   <Plus className="w-5 h-5 text-blue-400" />
//                   Add to Playlist
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {playlists.slice(0, 4).map((playlist) => (
//                     <button
//                       key={playlist.id}
//                       onClick={() => {
//                         const trackExists = playlist.tracks.some(
//                           (t) => t.id === song.id
//                         );
//                         if (trackExists) {
//                           toast.error(
//                             `"${song.title}" already exists in ${playlist.name}`
//                           );
//                           return;
//                         }
//                         dispatch(
//                           addToPlaylist({
//                             playlistId: playlist.id,
//                             track: song,
//                           })
//                         );
//                         toast.success(
//                           `Added "${song.title}" to ${playlist.name}`
//                         );
//                       }}
//                       className="group flex items-center gap-3 p-3 bg-gray-700/30 hover:bg-gray-600/50 rounded-lg transition-all duration-300 hover:scale-105 text-left"
//                     >
//                       <img
//                         src={
//                           playlist.cover ||
//                           "https://picsum.photos/48/48?random=playlist"
//                         }
//                         alt={playlist.name}
//                         className="w-12 h-12 rounded-lg object-cover"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-white truncate">
//                           {playlist.name}
//                         </p>
//                         <p className="text-sm text-gray-400">
//                           {playlist.tracks.length} songs
//                         </p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Audio Visualization */}
//             <div
//               ref={visualizationRef}
//               className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 backdrop-blur-md shadow-lg"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <Volume2 className="w-5 h-5 text-green-400" />
//                 <h3 className="text-lg font-semibold text-gray-300">
//                   Audio Visualization
//                 </h3>
//               </div>
//               <div className="flex items-end justify-center gap-1 h-24">
//                 {Array.from({ length: 40 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className={`bg-gradient-to-t from-green-500 to-emerald-400 rounded-full transition-all duration-300 ${
//                       isCurrentSong && isPlaying ? "animate-pulse" : ""
//                     }`}
//                     style={{
//                       width: "3px",
//                       height:
//                         isCurrentSong && isPlaying
//                           ? `${Math.random() * 60 + 20}%`
//                           : "20%",
//                       animationDelay: `${i * 0.05}s`,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SongDetails;

import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Play,
  Pause,
  Heart,
  ArrowLeft,
  Clock,
  Calendar,
  Music,
  User,
  Disc3,
  Volume2,
  MoreHorizontal,
  Plus,
  Share,
  Download,
} from "lucide-react";
import gsap from "gsap";
import {
  setCurrentTrack,
  setIsPlaying,
  setQueue,
  setCurrentIndex,
  setCurrentTime,
  setVolume,
} from "../store/slices/playerSlice";
import {
  addToLikedSongs,
  removeFromLikedSongs,
  addToRecentlyPlayed,
  addToPlaylist,
} from "../store/slices/playlistSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { toast } from "sonner";

const SongDetails = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, queue, currentTime, duration, volume } =
    useTypedSelector((state) => state.player);
  const { likedSongs, playlists } = useTypedSelector((state) => state.playlist);
  const [showPlaylistDropdown, setShowPlaylistDropdown] = useState(false);
  const progressBarRef = useRef(null);
  const albumArtRef = useRef(null);
  const titleRef = useRef(null);
  const controlsRef = useRef(null);
  const visualizationRef = useRef(null);
  const dropdownRef = useRef(null);

  const findSong = () => {
    // console.log("Finding song with ID:", songId);
    const queueSong = queue.find((track) => String(track.id) === songId);
    if (queueSong) return queueSong;

    const likedSong = likedSongs.find((track) => String(track.id) === songId);
    if (likedSong) return likedSong;

    for (const playlist of playlists) {
      const playlistSong = playlist.tracks.find(
        (track) => String(track.id) === songId
      );
      if (playlistSong) return playlistSong;
    }

    return null;
  };

  const song = findSong();
  const isCurrentSong = currentTrack
    ? String(currentTrack.id) === songId
    : false;
  const isLiked = song ? likedSongs.some((s) => s.id === song.id) : false;

  useEffect(() => {
    if (song) {
      // console.log("Song preview URL:", song.preview);
      if (!song.preview) {
        toast.error("No preview available for this song");
      }
      if (!isCurrentSong) {
        dispatch(setCurrentTrack(song));
        dispatch(setQueue([song]));
        dispatch(setCurrentIndex(0));
        dispatch(setIsPlaying(true));
        dispatch(addToRecentlyPlayed(song));
        toast.success(`Playing "${song.title}"`);
      }
    } else {
      toast.error("Song not found");
      navigate("/");
    }
  }, [song, isCurrentSong, dispatch, navigate]);

  useEffect(() => {
    // Entrance animations
    gsap.fromTo(
      albumArtRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
    );
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power4.out", delay: 0.2 }
    );
    gsap.fromTo(
      controlsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power4.out", delay: 0.4 }
    );
    gsap.fromTo(
      visualizationRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power4.out", delay: 0.6 }
    );

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      gsap.to(albumArtRef.current, {
        y: scrollY * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        "--thumb-scale": isCurrentSong && isPlaying ? 1.2 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isCurrentSong, isPlaying]);

  useEffect(() => {
    if (showPlaylistDropdown && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [showPlaylistDropdown]);

  if (!song) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Song not found</div>
      </div>
    );
  }

  const handlePlay = () => {
    // console.log("Playing song:", song);
    if (!song.preview) {
      console.warn("No preview URL for song:", song.title);
      toast.error("No preview available for this song");
      return;
    }
    dispatch(setCurrentTrack(song));
    dispatch(setQueue([song]));
    dispatch(setCurrentIndex(0));
    dispatch(setIsPlaying(true));
    dispatch(addToRecentlyPlayed(song));
    toast.success(`Playing "${song.title}"`);
  };

  const handlePause = () => {
    dispatch(setIsPlaying(false));
    toast.success(`Paused "${song.title}"`);
  };

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeFromLikedSongs(song.id));
      toast.success("Removed from Liked Songs");
    } else {
      dispatch(addToLikedSongs(song));
      toast.success("Added to Liked Songs");
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    dispatch(setCurrentTime(newTime));
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
  };

  const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden ">
      {/* Background Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 blur-3xl"
        style={{ zIndex: -1 }}
      >
        <div className="absolute inset-0 radial-gradient-circle from-green-500/10 to-transparent" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="flex items-center gap-4 p-4 sm:p-6 max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="group p-3 rounded-full bg-gray-800/60 hover:bg-gray-700/80 transition-all duration-300 hover:scale-110"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 group-hover:text-white" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Now Playing
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
          {/* Album Art */}
          <div ref={albumArtRef} className="relative group">
            <div
              className={`absolute inset-0 rounded-3xl blur-2xl transform scale-105 transition-opacity duration-300 ${
                isCurrentSong && isPlaying
                  ? "bg-gradient-to-br from-green-500/40 to-emerald-500/40 opacity-70"
                  : "bg-gradient-to-br from-purple-500/30 to-blue-500/30 opacity-50"
              }`}
            />
            <img
              src={
                song.album.cover_xl ||
                song.album.cover_big ||
                song.album.cover_medium ||
                song.album.cover_small ||
                "https://via.placeholder.com/640x640"
              }
              alt={song.album.title}
              className="relative w-full max-w-md mx-auto aspect-square object-cover rounded-3xl shadow-2xl border border-gray-700/30 transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/640x640";
              }}
            />
            {isCurrentSong && isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl backdrop-blur-sm">
                <div className="flex space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 sm:w-3 h-10 sm:h-12 bg-gradient-to-t from-green-500 to-emerald-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* Vinyl Record */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mt-6">
              <div
                className={`w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black border-4 border-gray-700 shadow-lg ${
                  isCurrentSong && isPlaying ? "animate-spin-slow" : ""
                }`}
              >
                <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Disc3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Song Info */}
          <div ref={titleRef} className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-green-300 to-green-500 bg-clip-text text-transparent leading-tight">
                {song.title}
              </h1>
              <button
                onClick={() => navigate(`/artist/${song.artist.id}`)}
                className="flex items-center gap-3 group"
              >
                <User className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {song.artist.name}
                </h2>
              </button>
            </div>

            {/* Controls */}
            <div ref={controlsRef} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={
                    isCurrentSong && isPlaying ? handlePause : handlePlay
                  }
                  className="group flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  aria-label={isCurrentSong && isPlaying ? "Pause" : "Play"}
                >
                  {isCurrentSong && isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
                  )}
                  {isCurrentSong && isPlaying ? "Pause" : "Play"}
                </button>

                <button
                  onClick={handleLike}
                  className={`group p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    isLiked
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      : "bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white"
                  }`}
                  aria-label={isLiked ? "Unlike song" : "Like song"}
                >
                  <Heart
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      isLiked ? "fill-current" : ""
                    }`}
                  />
                </button>

                <button
                  onClick={() => setShowPlaylistDropdown(!showPlaylistDropdown)}
                  className="group p-3 sm:p-4 rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Add to playlist"
                >
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  className="group p-3 sm:p-4 rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Share song"
                >
                  <Share className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  className="group p-3 sm:p-4 rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Download song"
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Playlist Dropdown */}
              {showPlaylistDropdown && playlists.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 p-2 max-h-64 overflow-y-auto thin-dark-scrollbar"
                >
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.id}
                      onClick={() => {
                        const trackExists = playlist.tracks.some(
                          (t) => t.id === song.id
                        );
                        if (trackExists) {
                          toast.error(
                            `"${song.title}" already exists in ${playlist.name}`
                          );
                          return;
                        }
                        dispatch(
                          addToPlaylist({
                            playlistId: playlist.id,
                            track: song,
                          })
                        );
                        toast.success(
                          `Added "${song.title}" to ${playlist.name}`
                        );
                        setShowPlaylistDropdown(false);
                      }}
                      className="group w-full flex items-center gap-2 p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-300 text-left"
                    >
                      <img
                        src={
                          playlist.cover ||
                          "https://picsum.photos/32/32?random=playlist"
                        }
                        alt={playlist.name}
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">
                          {playlist.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {playlist.tracks.length} songs
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Progress Bar */}
              <div className="flex items-center gap-2 w-full max-w-md">
                <span className="text-xs text-gray-400 w-10 text-center">
                  {formatDuration(currentTime)}
                </span>
                <input
                  ref={progressBarRef}
                  type="range"
                  min="0"
                  max={duration > 0 ? duration : song.duration || 0}
                  value={currentTime || 0}
                  onChange={handleSeek}
                  disabled={
                    duration <= 0 && (!song.duration || song.duration <= 0)
                  }
                  className="flex-1 h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(to right, #34D399 ${
                      ((currentTime || 0) / (duration || song.duration || 1)) *
                      100
                    }%, #4B5563 ${
                      ((currentTime || 0) / (duration || song.duration || 1)) *
                      100
                    }%)`,
                    "--thumb-scale": isCurrentSong && isPlaying ? 1.2 : 1,
                  }}
                />
                <span className="text-xs text-gray-400 w-10 text-center">
                  {formatDuration(duration > 0 ? duration : song.duration || 0)}
                </span>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2 w-full max-w-xs">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{
                    background: `linear-gradient(to right, #34D399 ${
                      volume * 100
                    }%, #4B5563 ${volume * 100}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Album Info */}
        <div className="mt-12 bg-gray-900/80 rounded-xl p-6 sm:p-8 border border-gray-700/30 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-200">
              Album Information
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <p className="text-gray-400 mb-1">Album</p>
              <p className="text-white font-medium">{song.album.title}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Release Date</p>
              <p className="text-white font-medium">
                {formatDate(song.releaseDate)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Duration</p>
              <p className="text-white font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDuration(song.duration)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Popularity</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full"
                    style={{ width: `${song.rank || 50}%` }}
                  />
                </div>
                <span className="text-white text-xs font-medium">
                  {song.rank || 50}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Visualization */}
        <div
          ref={visualizationRef}
          className="mt-12 bg-gray-900/80 rounded-xl p-6 sm:p-8 border border-gray-700/30 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-5 h-5 text-green-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-200">
              Audio Visualization
            </h3>
          </div>
          <div className="flex items-end justify-center gap-1 h-24 sm:h-32">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className={`bg-gradient-to-t from-green-500 to-emerald-400 rounded-full transition-all duration-300 ${
                  isCurrentSong && isPlaying ? "animate-wave" : ""
                }`}
                style={{
                  width: "3px",
                  height:
                    isCurrentSong && isPlaying
                      ? `${Math.sin(i * 0.2 + Date.now() * 0.002) * 40 + 50}%`
                      : "20%",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
