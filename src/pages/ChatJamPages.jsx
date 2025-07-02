import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../hooks/useSocket";
import {
  setConnectedUsers,
  addMessage,
  setSelectedUser,
} from "../store/slices/jamSlice";
import TrackCard from "../components/TrackCard";
import { data } from "../components/FakeData";
import {
  setCurrentTrack,
  setIsPlaying,
  setCurrentTime,
  setDuration,
} from "../store/slices/playerSlice";

const convertAppleMusicTrack = (track) => ({
  key: track.id,
  id: track.id,
  title: track.attributes.name,
  artist: {
    name: track.attributes.artistName || "Unknown Artist",
    id: track.relationships?.artists?.data?.[0]?.id || "",
    picture_small:
      track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
      "https://via.placeholder.com/64x64",
  },
  album: {
    id: track.id,
    title: track.attributes.albumName,
    cover_small:
      track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
      "https://via.placeholder.com/64x64",
    cover_medium:
      track.attributes.artwork?.url || "https://via.placeholder.com/300x300",
  },
  preview: track.attributes.previews?.[0]?.url || "",
  duration: Math.floor(track.attributes.durationInMillis / 1000) || 0,
  explicit: track.attributes.contentRating === "explicit",
  genres: track.attributes.genreNames || [],
  releaseDate: track.attributes.releaseDate || "",
  isrc: track.attributes.isrc || "",
});

const ChatJamPage = () => {
  const dispatch = useDispatch();
  const connectedUsers = useSelector((state) => state.jam.connectedUsers);
  const messages = useSelector((state) => state.jam.messages);
  const selectedUserId = useSelector((state) => state.jam.selectedUserId);
  const { currentTrack, isPlaying, currentTime, duration } = useSelector(
    (state) => state.player
  );
  const isPlayerOpen = useSelector(
    (state) => state.player.currentTrack !== null
  );

  const currentUser = {
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  };
  const [messageInput, setMessageInput] = useState("");
  const [currentFolder, setCurrentFolder] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const tracksPerPage = 4;
  const audioRef = useRef(null);
  const chatRef = useRef(null);
  const lastSeekTime = useRef(0);

  const folders = {
    Featured: data ? data.map(convertAppleMusicTrack) : [],
    Pop: data
      ? data
          .map(convertAppleMusicTrack)
          .filter((track) => track.genres.includes("Pop"))
      : [],
    Rock: data
      ? data
          .map(convertAppleMusicTrack)
          .filter((track) => track.genres.includes("Rock"))
      : [],
  };

  const currentTracks = folders[currentFolder] || [];
  const totalPages = Math.ceil(currentTracks.length / tracksPerPage);
  const paginatedTracks = currentTracks.slice(
    (currentPage - 1) * tracksPerPage,
    currentPage * tracksPerPage
  );

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, selectedUserId]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (!currentUser.userId || !currentUser.username) {
      console.error("Missing user data in localStorage:", currentUser);
      return;
    }

    if (!socket.connected) {
      //  console.log("Socket not connected, attempting to connect...");
      socket.connect();
    }

    const userData = {
      userId: currentUser.userId,
      email: currentUser.email,
      username: currentUser.username,
      socketId: socket.id,
    };
    socket.emit("join", userData);

    socket.on("userList", (users) => {
      //  console.log("Received userList:", users);
      dispatch(setConnectedUsers(users));
    });

    socket.on(
      "receiveMessage",
      ({ senderId, recipientId, message, timestamp, type, track }) => {
        // console.log("Received message:", {
        //   senderId,
        //   recipientId,
        //   message,
        //   timestamp,
        //   type,
        //   track,
        // });
        dispatch(
          addMessage({
            senderId,
            recipientId,
            message,
            timestamp,
            type: type || "text",
            track,
          })
        );
        if (
          type === "trackMessage" &&
          recipientId === currentUser.userId &&
          senderId !== selectedUserId
        ) {
          console.log(`Auto-selecting sender for track message: ${senderId}`);
          dispatch(setSelectedUser(senderId));
        }
      }
    );

    socket.on("selectTrack", ({ senderId, recipientId, track }) => {
      console.log("Received selectTrack:", { senderId, recipientId, track });
      if (
        recipientId === currentUser.userId ||
        senderId === currentUser.userId
      ) {
        dispatch(setCurrentTrack(track));
        dispatch(setIsPlaying(true));
        // if (audioRef.current) {
        //   audioRef.current.src = track.preview;
        //   audioRef.current.currentTime = 0;
        //   audioRef.current
        //     .play()
        // .catch((err) =>  console.error("Audio play error:", err));
        // }
      }
    });

    socket.on(
      "playAudio",
      ({ senderId, recipientId, currentTime, previewUrl }) => {
        // console.log("Received playAudio:", {
        //   senderId,
        //   recipientId,
        //   currentTime,
        //   previewUrl,
        // });
        if (
          recipientId === currentUser.userId ||
          senderId === currentUser.userId
        ) {
          if (currentTrack?.preview === previewUrl) {
            dispatch(setIsPlaying(true));
            dispatch(setCurrentTime(currentTime));
            // if (audioRef.current) {
            //   audioRef.current.currentTime = currentTime;
            //   audioRef.current.play().catch((err) => {
            //  console.error("Audio play error in playAudio:", err);
            //     setToastMessage("Failed to play audio. Please try again.");
            //   });
            // }
          }
        }
      }
    );

    socket.on(
      "pauseAudio",
      ({ senderId, recipientId, currentTime, previewUrl }) => {
        // console.log("Received pauseAudio:", {
        //   senderId,
        //   recipientId,
        //   currentTime,
        //   previewUrl,
        // });
        if (
          recipientId === currentUser.userId ||
          senderId === currentUser.userId
        ) {
          if (currentTrack?.preview === previewUrl) {
            dispatch(setIsPlaying(false));
            dispatch(setCurrentTime(currentTime));
            // if (audioRef.current) {
            //   audioRef.current.pause();
            //   audioRef.current.currentTime = currentTime;
            // }
          }
        }
      }
    );

    socket.on(
      "seekAudio",
      ({ senderId, recipientId, currentTime, previewUrl }) => {
        // console.log("Received seekAudio:", {
        //   senderId,
        //   recipientId,
        //   currentTime,
        //   previewUrl,
        // });
        if (
          recipientId === currentUser.userId &&
          currentTrack?.preview === previewUrl
        ) {
          dispatch(setCurrentTime(currentTime));
          // if (audioRef.current) {
          //   audioRef.current.currentTime = currentTime;
          // }
        }
      }
    );

    socket.on("connect", () => {
      // console.log("WebSocket connected:", socket.id);
      socket.emit("join", userData);
    });

    socket.on("connect_error", (err) => {
      // console.error("WebSocket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      // console.log("WebSocket disconnected:", reason);
      dispatch(setIsPlaying(false));
    });

    return () => {
      // console.log("Cleaning up WebSocket listeners");
      socket.off("userList");
      socket.off("receiveMessage");
      socket.off("selectTrack");
      socket.off("playAudio");
      socket.off("pauseAudio");
      socket.off("seekAudio");
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("reconnect_attempt");
    };
  }, [dispatch, currentUser.userId]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedUserId) {
      const timestamp = new Date().toISOString();
      socket.emit(
        "sendMessage",
        {
          recipientId: selectedUserId,
          message: messageInput,
          senderId: currentUser.userId,
          timestamp,
          type: "text",
        },
        (response) => {
          // console.log("sendMessage response:", response);
          if (response.status === "error") {
            console.error("Failed to send message:", response.error);
            setToastMessage("Failed to send message.");
          }
        }
      );
      setMessageInput("");
    } else if (!selectedUserId) {
      setToastMessage("Please select a user to send a message.");
    }
  };

  const handleTrackSelect = (track) => {
    // console.log("Selected track:", track);
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
    // if (audioRef.current) {
    //   audioRef.current.src = track.preview;
    //   audioRef.current.currentTime = 0;
    //   audioRef.current.play().catch((err) => {
    //  console.error("Audio play error in handleTrackSelect:", err);
    //     setToastMessage("Failed to play track. Please try another.");
    //   });
    // }
    if (selectedUserId) {
      socket.emit(
        "selectTrack",
        {
          recipientId: selectedUserId,
          senderId: currentUser.userId,
          track,
        },
        (response) => {
          // console.log("selectTrack response:", response);
          if (response.status === "error") {
            console.error("Failed to select track:", response.error);
            setToastMessage("Failed to share track.");
          }
        }
      );
      const message = `${currentUser.username} started jamming to ${track.title} by ${track.artist.name}`;
      const timestamp = new Date().toISOString();
      socket.emit(
        "sendMessage",
        {
          recipientId: selectedUserId,
          message,
          senderId: currentUser.userId,
          timestamp,
          type: "trackMessage",
          track,
        },
        (response) => {
          // console.log("sendMessage response:", response);
          if (response.status === "error") {
            console.error("Failed to send track message:", response.error);
            setToastMessage("Failed to send track message.");
          }
        }
      );
    } else {
      setToastMessage("Please select a user to jam with.");
    }
  };

  const handlePlay = (track = currentTrack) => {
    if (!track) {
      setToastMessage("No track selected to play.");
      return;
    }
    dispatch(setIsPlaying(true));
    dispatch(setDuration(duration));
    dispatch(setCurrentTime(currentTime));
    // audioRef.current.play().catch((err) => {
    //  console.error("Audio play error in handlePlay:", err);
    //   setToastMessage("Failed to play track.");
    // });
    if (selectedUserId) {
      const currentTime = currentTime;
      socket.emit(
        "playAudio",
        {
          recipientId: selectedUserId,
          senderId: currentUser.userId,
          currentTime,
          previewUrl: track.preview,
        },
        (response) => {
          // console.log("playAudio response:", response);
          if (response.status === "error") {
            console.error("Failed to play audio:", response.error);
            setToastMessage("Failed to sync play.");
          }
        }
      );
    }
  };

  const handlePause = (track = currentTrack) => {
    if (!track) {
      setToastMessage("No track selected to pause.");
      return;
    }
    dispatch(setIsPlaying(false));
    // audioRef.current.pause();
    if (selectedUserId) {
      const currentTime = currentTime;
      socket.emit(
        "pauseAudio",
        {
          recipientId: selectedUserId,
          senderId: currentUser.userId,
          currentTime,
          previewUrl: track.preview,
        },
        (response) => {
          // console.log("pauseAudio response:", response);
          if (response.status === "error") {
            console.error("Failed to pause audio:", response.error);
            setToastMessage("Failed to sync pause.");
          }
        }
      );
    }
  };

  const handleSeek = (event) => {
    if (!currentTrack || !audioRef.current) {
      setToastMessage("No track selected to seek.");
      return;
    }
    const currentTime = parseFloat(event.target.value);
    dispatch(setCurrentTime(currentTime));
    // audioRef.current.currentTime = currentTime;
    if (selectedUserId) {
      socket.emit(
        "seekAudio",
        {
          recipientId: selectedUserId,
          senderId: currentUser.userId,
          currentTime,
          previewUrl: currentTrack.preview,
        },
        (response) => {
          // console.log("seekAudio response:", response);
          if (response.status === "error") {
            console.error("Failed to seek audio:", response.error);
            setToastMessage("Failed to sync seek.");
          }
        }
      );
    }
  };

  const handleTimeUpdate = () => {
    if (isPlaying) {
      // const currentTime = audioRef.current.currentTime;
      const currentTime = currentTime;
      dispatch(setCurrentTime(currentTime));
      const now = Date.now();
      if (selectedUserId && now - lastSeekTime.current >= 1000) {
        lastSeekTime.current = now;
        socket.emit(
          "seekAudio",
          {
            recipientId: selectedUserId,
            senderId: currentUser.userId,
            currentTime,
            previewUrl: currentTrack.preview,
          },
          (response) => {
            // console.log("seekAudio response (time update):", response);
            if (response.status === "error") {
              console.error("Failed to sync time update:", response.error);
            }
          }
        );
      }
    }
  };

  const getConversationMessages = () => {
    if (!selectedUserId) return [];
    const allMessages = [];
    if (messages[currentUser.userId]) {
      messages[currentUser.userId].forEach((msg) => {
        if (msg.recipientId === selectedUserId) {
          allMessages.push(msg);
        }
      });
    }
    if (messages[selectedUserId]) {
      messages[selectedUserId].forEach((msg) => {
        if (msg.recipientId === currentUser.userId) {
          allMessages.push(msg);
        }
      });
    }
    return allMessages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const conversationMessages = getConversationMessages();

  return (
    <div className="min-h-screen  text-white font-sans relative z-1">
      <header className=" p-4 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          ChatJam: Connect & Jam with Friends
        </h1>
      </header>
      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto ">
        <div className="lg:w-1/3  rounded-xl p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Music Library</h2>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {Object.keys(folders).map((folder) => (
              <button
                key={folder}
                onClick={() => {
                  setCurrentFolder(folder);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentFolder === folder
                    ? "bg-gradient-to-r from-gray-100 to-zinc-400 text-black"
                    : "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {folder}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paginatedTracks.length > 0 ? (
              paginatedTracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className="group  rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                  disabled={false}
                >
                  <TrackCard
                    track={track}
                    playlist={currentTracks}
                    className={`bg-gray-700/80 p-3 ${
                      currentTrack?.id === track.id
                        ? "ring-2 ring-gray-800"
                        : ""
                    }`}
                  />
                  <div className="bg-gradient-to-r from-gray-500 to-zinc-900  text-white text-center py-2 group-hover:bg-blue-500 transition-colors">
                    Play Now
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-2 text-center">
                No tracks in this folder
              </p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gradient-to-r from-zinc-900 to-gray-500  hover:bg-gradient-to-r hover:from-zinc-500 hover:to-gray-900 rounded-md disabled:opacity-50 hover:bg-gray-600"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gradient-to-r from-zinc-900 to-gray-500  hover:bg-gradient-to-r hover:from-zinc-500 hover:to-gray-900 rounded-md disabled:opacity-50 hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="lg:w-2/3 flex flex-col gap-4 z-81">
          <div className=" rounded-xl p-4 shadow-lg bg-gradient-to-r from-zinc-900 via-black to-zinc-900 disabled:opacity-50 hover:bg-gradient-to-r hover:from-zinc-800 hover:via-black hover:to-zinc-700 flex flex-col items-start ">
            <h2 className="font-semibold mb-4 text-center text-3xl">
              Connected Users
            </h2>
            {/* { console.log("connectusers", connectedUsers)} */}
            {connectedUsers.length <= 1 ? (
              <p className="text-zinc-400">No users connected</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {connectedUsers
                  .filter((user) => user.userId !== currentUser.userId)
                  .map((user) => (
                    <div
                      key={user.userId}
                      onClick={() => {
                        dispatch(setSelectedUser(user.userId));
                        localStorage.setItem(
                          `lastRead_${user.userId}`,
                          Date.now()
                        );
                      }}
                      className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${
                        selectedUserId === user.userId
                          ? "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600"
                          : "bg-zinc-900 hover:bg-zinc-600"
                      } ${
                        messages[user.userId]?.some(
                          (msg) =>
                            msg.senderId === user.userId &&
                            msg.recipientId === currentUser.userId &&
                            msg.timestamp >
                              (localStorage.getItem(
                                `lastRead_${user.userId}`
                              ) || 0)
                        )
                          ? "border-l-4 border-gray-800"
                          : ""
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold">
                        {user.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold">{user.username}</div>
                        <div className="text-sm text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div
            className={`flex-1 rounded-xl bg-white/10 backdrop-blur-xl  p-4 shadow-lg flex flex-col hide-scrollbar  ${
              isPlayerOpen ? "max-h-[500px]" : "max-h-[600px]"
            }  overflow-y-scroll `}
          >
            <h3 className="text-xl font-semibold mb-4 text-white ">
              {selectedUserId
                ? `Chatting with ${
                    connectedUsers.find((u) => u.userId === selectedUserId)
                      ?.username || "Unknown"
                  }`
                : "Select a user to chat"}
            </h3>
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4  rounded-lg mb-4 hide-scrollbar "
            >
              {selectedUserId ? (
                conversationMessages.length > 0 ? (
                  conversationMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.senderId === currentUser.userId
                          ? "justify-end"
                          : "justify-start"
                      } mb-4`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[70%] p-2 rounded-xl ${
                          msg.senderId === currentUser.userId
                            ? msg.type === "trackMessage"
                              ? "bg-white/10 backdrop-blur-5xl text-white"
                              : "bg-white/10 backdrop-blur-5xl text-white"
                            : msg.type === "trackMessage"
                            ? "bg-white/10 backdrop-blur-5xl text-white"
                            : "bg-white/10 backdrop-blur-5xl text-white"
                        }`}
                      >
                        <div>
                          {msg.type === "trackMessage" ? (
                            <div className="flex flex-col gap-3  rounded-lg w-full">
                              {/* Album art + message row */}
                              <div className="flex gap-3 items-start ">
                                {msg.track?.album.cover_small && (
                                  <img
                                    src={msg.track.album.cover_small}
                                    alt={msg.track.title}
                                    className="w-12 h-12 rounded-md flex-shrink-0 object-cover"
                                  />
                                )}
                                <p className="text-zinc-100 flex-1 text-sm sm:text-base break-words">
                                  {msg.message}
                                </p>
                              </div>

                              {/* Button group */}
                              <div className="flex gap-2 flex-wrap">
                                <button
                                  onClick={() => handlePlay(msg.track)}
                                  disabled={
                                    isPlaying &&
                                    currentTrack?.id === msg.track?.id
                                  }
                                  className={`px-4 py-2 text-lg sm:text-sm rounded-md transition-colors ${
                                    isPlaying &&
                                    currentTrack?.id === msg.track?.id
                                      ? "bg-gradient-to-r from-gray-100 to-zinc-400 text-black cursor-not-allowed"
                                      : "bg-gradient-to-r from-gray-100 to-zinc-400 text-black hover:bg-gray-600 "
                                  }`}
                                >
                                  {isPlaying &&
                                  currentTrack?.id === msg.track?.id
                                    ? "Playing"
                                    : "Play"}
                                </button>

                                <button
                                  onClick={() => handlePause(msg.track)}
                                  disabled={
                                    !isPlaying ||
                                    currentTrack?.id !== msg.track?.id
                                  }
                                  className={`px-3 py-2 text-lg sm:text-sm rounded-md transition-colors ${
                                    !isPlaying ||
                                    currentTrack?.id !== msg.track?.id
                                      ? "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600 cursor-not-allowed"
                                      : "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600 "
                                  }`}
                                >
                                  Pause
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p>{msg.message}</p>
                          )}
                          <div className="flex w-full  justify-end gap-3">
                            <p className="text-xs text-gray-400">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                            <div className="w-8 h-8 p-1 rounded-full  bg-zinc-800 flex items-center justify-center text-white font-semibold">
                              {connectedUsers
                                .find((u) => u.userId === msg.senderId)
                                ?.username[0]?.toUpperCase() || "?"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white text-lg text-center">
                    No messages yet
                  </p>
                )
              ) : (
                <p className="text-white text-center">Select a user to chat</p>
              )}
            </div>
            {selectedUserId && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 rounded-lg bg-white/10 backdrop-blur-md  text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gradient-to-r hover:from-zinc-600  hover:to-zinc-800  rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </div>
                {currentTrack && (
                  <div className="bg-white/10 backdrop-blur-5xl  p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3">
                      {currentTrack.album.cover_small && (
                        <img
                          src={currentTrack.album.cover_small}
                          alt={currentTrack.title}
                          className="w-12 h-12 rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-semibold">
                          {currentTrack.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {currentTrack.artist.name}
                        </div>
                      </div>
                    </div>
                    <audio
                      ref={audioRef}
                      src={currentTrack.preview}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={() => {
                        if (audioRef.current) {
                          dispatch(setDuration(audioRef.current.duration));
                        }
                      }}
                    />
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => handlePlay()}
                        disabled={isPlaying || !currentTrack}
                        className={`px-4 py-2 rounded-lg ${
                          isPlaying || !currentTrack
                            ? "bg-gradient-to-r from-gray-100 to-zinc-400 text-black"
                            : "bg-gradient-to-r from-gray-100 to-zinc-400 text-black"
                        }`}
                      >
                        Play
                      </button>
                      <button
                        onClick={() => handlePause()}
                        disabled={!isPlaying || !currentTrack}
                        className={`px-4 py-2 rounded-lg ${
                          !isPlaying || !currentTrack
                            ? "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600"
                            : "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        Pause
                      </button>
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 h-2 bg-white/10 backdrop-white-md rounded-lg appearance-none cursor-pointer text-black"
                        disabled={!currentTrack}
                      />
                      <span className="text-sm text-white">
                        {Math.floor(currentTime / 60)}:
                        {Math.floor(currentTime % 60)
                          .toString()
                          .padStart(2, "0")}
                        /{Math.floor(duration / 60)}:
                        {Math.floor(duration % 60)
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}
      <style>
        {`
          @keyframes fade-in-out {
            0% { opacity: 0; transform: translate(-50%, 10px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            90% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, 10px); }
          }
          .animate-fade-in-out {
            animation: fade-in-out 3s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ChatJamPage;
