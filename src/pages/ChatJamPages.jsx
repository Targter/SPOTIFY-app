import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  fetchMessages,
  setSelectedUser,
  setJamSession,
  disconnectSocket,
} from "../store/slices/jamSlice";
import {
  setCurrentTrack,
  setIsPlaying,
  setCurrentTime,
} from "../store/slices/playerSlice";
import { MessageSquare, Send, Music, Users } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
// import Player from "../components/Player";
import { toast } from "sonner";
import useSocket from "../hooks/useSocket";
import { setUserId } from "../store/store";

const ChatJamPage = () => {
  const dispatch = useDispatch();
  const {
    users,
    onlineUsers,
    messages,
    selectedUser,
    jamSession,
    status,
    error,
  } = useSelector((state) => state.jam);
  const { currentTrack } = useSelector((state) => state.player);
  const [messageContent, setMessageContent] = useState("");
  const isMobile = useIsMobile();
  const userId = useSelector((state) => state.auth?.userId);
  const messagesEndRef = useRef(null);
  const socketRef = useSocket(userId, "ChatJamPage");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && !userId) {
      dispatch(setUserId(storedUserId));
    }
    dispatch(fetchUsers());

    if (!userId) {
      toast.error("Please log in to start chatting");
      return;
    }

    if (!socketRef.current) return;

    socketRef.current.on(
      "jam_session_started",
      ({ hostId, track, currentTime = 0, isPlaying = false }) => {
        console.log("Received jam_session_started in ChatJamPage:", {
          hostId,
          track,
          currentTime,
          isPlaying,
        });
        dispatch(setJamSession({ hostId, track, currentTime, isPlaying }));
        dispatch(setCurrentTrack(track));
        dispatch(setCurrentTime(currentTime));
        dispatch(setIsPlaying(isPlaying));
      }
    );

    socketRef.current.on(
      "jam_session_joined",
      ({ hostId, track, currentTime = 0, isPlaying = false }) => {
        console.log("Received jam_session_joined in ChatJamPage:", {
          hostId,
          track,
          currentTime,
          isPlaying,
        });
        dispatch(setJamSession({ hostId, track, currentTime, isPlaying }));
        dispatch(setCurrentTrack(track));
        dispatch(setCurrentTime(currentTime));
        dispatch(setIsPlaying(isPlaying));
      }
    );

    socketRef.current.on("jam_session_ended", () => {
      console.log("Jam session ended in ChatJamPage");
      dispatch(setJamSession(null));
      dispatch(setCurrentTrack(null));
      dispatch(setIsPlaying(false));
      dispatch(setCurrentTime(0));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("jam_session_started");
        socketRef.current.off("jam_session_joined");
        socketRef.current.off("jam_session_ended");
      }
    };
  }, [dispatch, userId, socketRef]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchMessages(selectedUser.id));
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!userId) {
      toast.error("Please log in to send messages");
      return;
    }
    if (!socketRef.current) {
      toast.error("Socket not initialized");
      return;
    }
    if (messageContent.trim() && selectedUser) {
      socketRef.current.emit("send_message", {
        senderId: userId,
        receiverId: selectedUser.id,
        content: messageContent,
      });
      setMessageContent("");
      toast.success("Message sent!");
    } else if (!selectedUser) {
      toast.error("Select a user to send a message");
    } else {
      toast.error("Message cannot be empty");
    }
  };

  const handleShareSong = () => {
    console.log("handleShareSong called", { userId, currentTrack, jamSession });
    if (!userId) {
      toast.error("Please log in to start a jam session");
      return;
    }
    if (!socketRef.current) {
      toast.error("Socket not initialized");
      console.error("Socket not initialized in handleShareSong");
      return;
    }
    if (!currentTrack) {
      toast.error("Select a track to share");
      console.error("No currentTrack selected in handleShareSong");
      return;
    }
    if (!currentTrack.id || !currentTrack.preview || !currentTrack.title) {
      toast.error("Selected track is missing required data");
      console.error("Invalid currentTrack:", currentTrack);
      return;
    }
    if (jamSession) {
      toast.info("You are already in a jam session");
      console.warn("Jam session already exists:", jamSession);
      return;
    }
    console.log("Emitting start_jam", { hostId: userId, track: currentTrack });
    socketRef.current.emit(
      "start_jam",
      {
        hostId: userId,
        track: currentTrack,
        currentTime: 0,
        isPlaying: false,
      },
      (response) => {
        if (response?.error) {
          console.error("Failed to start jam session:", response.error);
          toast.error(`Failed to start jam session: ${response.error}`);
        } else {
          console.log("Jam session started successfully");
          toast.success("Jam session started!");
        }
      }
    );
  };

  const handleJoinSession = (hostId) => {
    console.log("handleJoinSession called", { hostId, userId });
    if (!userId) {
      toast.error("Please log in to join a jam session");
      return;
    }
    if (!socketRef.current) {
      toast.error("Socket not initialized");
      return;
    }
    if (jamSession) {
      toast.info("You are already in a jam session");
      return;
    }
    socketRef.current.emit("join_jam", { hostId }, (response) => {
      if (response?.error) {
        console.error("Failed to join jam session:", response.error);
        toast.error(`Failed to join jam session: ${response.error}`);
      } else {
        toast.success(
          `Joined ${
            users.find((u) => u.id === hostId)?.username || "user"
          }'s jam session`
        );
      }
    });
  };

  const handleLeaveSession = () => {
    console.log("handleLeaveSession called", { userId });
    if (!userId) {
      toast.error("Please log in to leave a jam session");
      return;
    }
    if (!socketRef.current) {
      toast.error("Socket not initialized");
      return;
    }
    socketRef.current.emit("leave_jam");
    toast.info("Left jam session");
  };

  return (
    <div className="flex h-full bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-3xl p-4">
      <div
        className={`${
          isMobile ? "w-full mb-4" : "w-64 pr-4 border-r border-gray-700/50"
        } overflow-y-auto thin-dark-scrollbar`}
      >
        <h2 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-500" /> Users
        </h2>
        {status === "loading" && (
          <div className="text-gray-400">Loading users...</div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        <ul className="space-y-2">
          {users
            .filter((user) => user.id !== userId)
            .map((user) => (
              <li
                key={user.id}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                  selectedUser?.id === user.id
                    ? "bg-gray-800/50"
                    : "hover:bg-gray-800/30"
                }`}
                onClick={() => dispatch(setSelectedUser(user))}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    onlineUsers.includes(user.id)
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />
                <span className="text-white text-sm truncate">
                  {user.username}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col pl-4">
        {selectedUser ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-500" /> Chat with{" "}
                {selectedUser.username}
              </h2>
              {onlineUsers.includes(selectedUser.id) && !jamSession && (
                <button
                  onClick={() => handleJoinSession(selectedUser.id)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-1 px-3 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-colors"
                >
                  Join Jam
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto thin-dark-scrollbar mb-3">
              {messages
                .filter(
                  (msg) =>
                    (msg.senderId === userId &&
                      msg.receiverId === selectedUser?.id) ||
                    (msg.senderId === selectedUser?.id &&
                      msg.receiverId === userId)
                )
                .map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.senderId === userId
                        ? "bg-green-500/20 ml-auto"
                        : "bg-gray-800/50"
                    } max-w-[70%]`}
                  >
                    <p className="text-white text-sm">{msg.content}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-gray-800/80 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700/50"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {jamSession && (
              <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                <h3 className="text-white text-sm font-bold flex items-center gap-2">
                  <Music className="w-5 h-5 text-green-500" /> Jamming with{" "}
                  {users.find((u) => u.id === jamSession.hostId)?.username ||
                    "Unknown"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {jamSession.track?.title || "No track"} -{" "}
                  {jamSession.track?.artist?.name || "-"}
                </p>
                <button
                  onClick={handleLeaveSession}
                  className="mt-2 bg-red-500/80 text-white py-1 px-3 rounded-lg hover:bg-red-400/80 transition-colors"
                >
                  Leave Session
                </button>
              </div>
            )}
            {currentTrack && !jamSession && (
              <button
                onClick={() => {
                  console.log("Start Jam clicked");
                  handleShareSong();
                }}
                className="mt-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-1 px-3 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-colors"
              >
                Start Jam
              </button>
            )}
            {/* <Player /> */}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatJamPage;
