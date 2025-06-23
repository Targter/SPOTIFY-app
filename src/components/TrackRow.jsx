// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Play, Pause, Heart, MoreHorizontal, Plus, Trash2 } from "lucide-react";
// import {
//   setCurrentTrack,
//   setIsPlaying,
//   setQueue,
//   setCurrentIndex,
//   setDuration,
// } from "../store/slices/playerSlice";
// import {
//   addToLikedSongs,
//   addToRecentlyPlayed,
//   removeFromLikedSongs,
//   addToPlaylist,
//   removeFromPlaylist,
// } from "../store/slices/playlistSlice";
// import { useTypedSelector } from "../hooks/useTypedSelector";

// const TrackRow = ({
//   track,
//   index,
//   playlist,
//   playlistId,
//   showDeleteOption = false,
// }) => {
//   const dispatch = useDispatch();
//   const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
//   const { likedSongs, playlists } = useTypedSelector((state) => state.playlist);

//   const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
//   const isCurrentTrack = currentTrack?.id === track.id;
//   //   if (isCurrentTrack) {
//   //     console.log("Current Track:", currentTrack.id);
//   //     console.log("Track ID:", track.id);
//   //   }
//   //   console.log("ID", currentTrack?.id, "mainId", track?.id);
//   const isLiked = likedSongs.some((song) => song.id === track.id);
//   //   console.log("TrackRow", { track, index, playlist });
//   //   console.log("TrackImage:", track);
//   //   console.log("TrackImage:", track?.images?.coverarthq);
//   //   console.log("TrackImage:", track?.images?.coverart);

//   const handlePlay = (e) => {
//     // e.stopPropagation();
//     // if (isCurrentTrack) {
//     //   dispatch(setIsPlaying(!isPlaying));
//     // } else {
//     //   //   console.log("trackSet:", track);
//     //   const trackIndex = playlist.findIndex((t) => t.id === track.id);
//     //   dispatch(setCurrentTrack(track));
//     //   dispatch(setQueue(playlist));
//     //   dispatch(setIsPlaying(true));
//     //   dispatch(setCurrentIndex(trackIndex >= 0 ? trackIndex : 0));
//     //   dispatch(addToRecentlyPlayed(track));
//     e.stopPropagation();
//     console.log("Playing track:", track.title);

//     const trackIndex = playlist.findIndex((t) => t.id === track.id);
//     dispatch(setCurrentTrack(track));

//     dispatch(setQueue(playlist));
//     dispatch(setCurrentIndex(trackIndex >= 0 ? trackIndex : 0));
//     dispatch(setIsPlaying(true));
//     dispatch(addToRecentlyPlayed(track));
//   };

//   const handlePause = (e) => {
//     e.stopPropagation();
//     dispatch(setIsPlaying(false));
//   };
//   const handleLike = (e) => {
//     e.stopPropagation();
//     if (isLiked) {
//       dispatch(removeFromLikedSongs(track.id));
//       //   toast.success("Removed from Liked Songs");
//     } else {
//       dispatch(addToLikedSongs(track));
//       //   toast.success("Added to Liked Songs");
//     }
//   };
//   const handleAddToPlaylist = (e, targetPlaylistId, playlistName) => {
//     e.stopPropagation();
//     console.log("Adding to playlist:", targetPlaylistId, playlistName, track);

//     const selectedPlaylist = playlists.find((p) => p.id === targetPlaylistId);
//     const trackExists = selectedPlaylist?.tracks.some((t) => t.id === track.id);

//     if (trackExists) {
//       //   toast.error(`"${track.title}" already exists in ${playlistName}`);
//       return;
//     }

//     dispatch(addToPlaylist({ playlistId: targetPlaylistId, track }));
//     setShowPlaylistMenu(false);
//     // toast.success(`Added "${track.title}" to ${playlistName}`);
//   };

//   const handleRemoveFromPlaylist = (e) => {
//     e.stopPropagation();
//     if (playlistId) {
//       dispatch(removeFromPlaylist({ playlistId, trackId: track.id }));
//       //   toast.success(`Removed "${track.title}" from playlist`);
//     }
//   };
//   const formatDuration = (seconds) => {
//     console.log("Duration in seconds:", seconds);
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     console.log(
//       "Formatted duration duration duration TrackRow:",
//       `${mins}:${secs.toString().padStart(2, "0")}`
//     );
//     dispatch(setDuration(`${mins}:${secs.toString().padStart(2, "0")}`));
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div
//       className={`group grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer ${
//         isCurrentTrack ? "bg-gray-800" : ""
//       }`}
//       onClick={handlePlay}
//     >
//       <div className="w-6 text-center relative">
//         {isCurrentTrack && isPlaying ? (
//           <div className="flex items-center justify-center">
//             <div className="flex space-x-0.5">
//               <div className="w-1 h-4 bg-green-500 animate-pulse rounded-full"></div>
//               <div
//                 className="w-1 h-5 bg-green-500 animate-pulse rounded-full"
//                 style={{ animationDelay: "0.1s" }}
//               ></div>
//               <div
//                 className="w-1 h-3 bg-green-500 animate-pulse rounded-full"
//                 style={{ animationDelay: "0.2s" }}
//               ></div>
//             </div>
//           </div>
//         ) : (
//           <span
//             className={`text-sm font-medium ${
//               isCurrentTrack ? "text-green-500" : "text-gray-400"
//             } group-hover:hidden`}
//           >
//             {index + 1}
//           </span>
//         )}
//         {/* <Play className="w-4 h-4 text-white hidden group-hover:block" />
//       </div> */}
//         {isCurrentTrack && isPlaying ? (
//           <button
//             onClick={handlePause}
//             className="w-6 h-6 text-white hidden group-hover:flex items-center justify-center absolute inset-0 hover:text-green-400 transition-colors bg-gray-800/80 rounded-full"
//           >
//             <Pause className="w-4 h-4" />
//           </button>
//         ) : (
//           <button
//             onClick={handlePlay}
//             className="w-6 h-6 text-white hidden group-hover:flex items-center justify-center absolute inset-0 hover:text-green-400 transition-colors bg-gray-800/80 rounded-full"
//           >
//             <Play className="w-4 h-4" />
//           </button>
//         )}
//       </div>
//       <div className="flex items-center gap-3 min-w-0">
//         <img
//           src={track.album.cover_medium}
//           alt={track.album.title}
//           className="w-10 h-10 rounded"
//         />
//         <div className="min-w-0">
//           <p
//             className={`font-medium truncate ${
//               isCurrentTrack ? "text-green-500" : "text-white"
//             }`}
//           >
//             {track.title}
//           </p>
//           <p className="text-sm text-gray-400 truncate">{track.artist.name}</p>
//         </div>
//       </div>

//       <button
//         onClick={handleLike}
//         className={`p-1 rounded-full hover:scale-110 transition-transform ${
//           isLiked ? "text-green-500" : "text-gray-400 hover:text-white"
//         }`}
//       >
//         <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
//       </button>
//       <div className="relative">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowPlaylistMenu(!showPlaylistMenu);
//           }}
//           className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all opacity-0 group-hover:opacity-100 duration-200"
//         >
//           <MoreHorizontal className="w-5 h-5" />
//         </button>

//         {showPlaylistMenu && (
//           <>
//             <div
//               className="fixed inset-0 z-20"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowPlaylistMenu(false);
//               }}
//             />
//             <div className="absolute right-0 top-12 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl py-3 z-30 min-w-64 border border-gray-700/50">
//               {showDeleteOption && playlistId && (
//                 <>
//                   <button
//                     onClick={handleRemoveFromPlaylist}
//                     className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3"
//                   >
//                     <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
//                       <Trash2 className="w-4 h-4" />
//                     </div>
//                     <span className="font-medium">Remove from playlist</span>
//                   </button>
//                   <div className="mx-4 my-2 h-px bg-gray-700/50"></div>
//                 </>
//               )}

//               <div className="px-4 py-2 text-xs text-gray-400 font-semibold border-b border-gray-700/50 mb-2">
//                 ADD TO PLAYLIST
//               </div>
//               <div className="max-h-48 overflow-y-auto">
//                 {playlists.length > 0 ? (
//                   playlists.map((targetPlaylist) => (
//                     <button
//                       key={targetPlaylist.id}
//                       onClick={(e) =>
//                         handleAddToPlaylist(
//                           e,
//                           targetPlaylist.id,
//                           targetPlaylist.name
//                         )
//                       }
//                       className="w-full text-left px-4 py-3 text-sm text-white hover:bg-gray-800/60 transition-colors flex items-center gap-3 group/item"
//                     >
//                       <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover/item:bg-gray-600 transition-colors">
//                         <Plus className="w-4 h-4 text-gray-300" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="font-medium truncate">
//                           {targetPlaylist.name}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {targetPlaylist.tracks.length} songs
//                         </div>
//                       </div>
//                     </button>
//                   ))
//                 ) : (
//                   <div className="px-4 py-3 text-sm text-gray-400 text-center">
//                     No playlists available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="text-sm text-gray-400 text-right">
//         {formatDuration(track.duration)}
//       </div>
//     </div>
//   );
// };

// export default TrackRow;

//

import React, { useState } from "react";
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
  //   console.log("Current Track:", currentTrack);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedSongs.some((song) => song.id === track.id);

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
    // console.log("Duration in seconds:", seconds);
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
      className={`group grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer ${
        isCurrentTrack ? "bg-gray-800" : ""
      }`}
      onClick={handlePlay}
    >
      <div className="w-6 text-center relative">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-1 h-4 bg-green-500 animate-pulse rounded-full"></div>
              <div
                className="w-1 h-5 bg-green-500 animate-pulse rounded-full"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-3 bg-green-500 animate-pulse rounded-full"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        ) : (
          <span
            className={`text-sm font-medium ${
              isCurrentTrack ? "text-green-500" : "text-gray-400"
            } group-hover:hidden`}
          >
            {index + 1}
          </span>
        )}
        {isCurrentTrack && isPlaying ? (
          <button
            onClick={handlePause}
            className="w-6 h-6 text-white hidden group-hover:flex items-center justify-center absolute inset-0 hover:text-green-400 transition-colors bg-gray-800/80 rounded-full"
          >
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="w-6 h-6 text-white hidden group-hover:flex items-center justify-center absolute inset-0 hover:text-green-400 transition-colors bg-gray-800/80 rounded-full"
          >
            <Play className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={track.album.cover_medium || "https://via.placeholder.com/40"}
          alt={track.album.title || "No title"}
          className="w-10 h-10 rounded"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/40";
          }}
        />
        <div className="min-w-0">
          <p
            className={`font-medium truncate ${
              isCurrentTrack ? "text-green-500" : "text-white"
            }`}
          >
            {track.title}
          </p>
          <p className="text-sm text-gray-400 truncate">
            {track.artist.name || "Unknown Artist"}
          </p>
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
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistMenu(!showPlaylistMenu);
          }}
          className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all opacity-0 group-hover:opacity-100 duration-200"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {showPlaylistMenu && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistMenu(false);
              }}
            />
            <div className="absolute right-0 top-12 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl py-3 z-30 min-w-64 border border-gray-700/50">
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

              <div className="px-4 py-2 text-xs text-gray-400 font-semibold border-b border-gray-700/50 mb-2">
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

      <div className="text-sm text-gray-400 text-right">
        {formatDuration(track.duration)}
      </div>
    </div>
  );
};

export default TrackRow;
