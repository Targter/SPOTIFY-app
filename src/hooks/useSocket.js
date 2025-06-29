import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  createSocketListeners,
  disconnectSocket,
} from "../store/slices/jamSlice";
// import { createSocketListeners } from "../store/slices/jamSlice";
import { toast } from "sonner";
const useSocket = (userId, caller) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      console.warn(`No userId provided for socket in ${caller}`);
      toast.error(`Please log in to use ${caller}`);
      return;
    }

    socketRef.current = createSocketListeners(dispatch, userId, caller);
    if (!socketRef.current) {
      toast.error(`Failed to initialize socket in ${caller}`);
      return;
    }

    socketRef.current.on("connect_error", (err) => {
      console.error(`Socket connection error in ${caller}:`, err);
      toast.error("Failed to connect to server");
    });

    socketRef.current.on("connect", () => {
      console.log(`Socket connected in ${caller}`);
      // Request server to check for existing session
      socketRef.current.emit("check_session", { userId }, (response) => {
        if (response.session) {
          console.log(`Rejoining session in ${caller}:`, response.session);
          dispatch(setJamSession(response.session));
          dispatch(setCurrentTrack(response.session.track));
          dispatch(setCurrentTime(response.session.currentTime));
          dispatch(setIsPlaying(response.session.isPlaying));
        }
      });
    });

    socketRef.current.on("error", ({ message }) => {
      console.error(`Socket error in ${caller}:`, message);
      toast.error(`Server error: ${message}`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect_error");
        socketRef.current.off("connect");
        socketRef.current.off("error");
        dispatch(disconnectSocket());
      }
    };
  }, [dispatch, userId, caller]);

  return socketRef;
};

export default useSocket;
