import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import io from "socket.io-client";
// import { axiosInstance } from "../lib/axios";
import { axiosInstance } from "../../lib/axios";

const initialState = {
  users: [],
  onlineUsers: [],
  messages: [],
  selectedUser: null,
  jamSession: null,
  status: "idle",
  error: null,
};

let socketInstance = null;
let initializationAttempts = 0;

export const fetchUsers = createAsyncThunk("jam/fetchUsers", async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
});

export const fetchMessages = createAsyncThunk(
  "jam/fetchMessages",
  async (userId) => {
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
);

export const initializeSocket = (userId, caller = "unknown") => {
  initializationAttempts += 1;
  console.log(
    `Socket initialization attempt #${initializationAttempts} by ${caller}, userId:`,
    userId
  );
  if (!userId) {
    console.error(`No userId provided for socket initialization by ${caller}`);
    return null;
  }
  if (!socketInstance || !socketInstance.connected) {
    try {
      const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      console.log(
        `Attempting to initialize socket with URL: ${socketUrl}, userId: ${userId}`
      );
      socketInstance = io(socketUrl, {
        withCredentials: true,
        auth: { userId },
      });
      console.log("Socket initialized with userId:", userId);
    } catch (error) {
      console.error(`Failed to initialize socket by ${caller}:`, error.message);
      return null;
    }
  } else {
    console.log(
      `Socket already initialized for userId: ${userId}, reusing instance`
    );
  }
  return socketInstance;
};

export const disconnectSocket = () => (dispatch) => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    initializationAttempts = 0;
    console.log("Socket disconnected");
  }
};

export const createSocketListeners = (dispatch, userId, caller = "unknown") => {
  console.log(`createSocketListeners called by ${caller}, userId:`, userId);
  const socket = initializeSocket(userId, caller);
  if (!socket) {
    console.error(`Socket not initialized by ${caller}, cannot set listeners`);
    return null;
  }

  socket.on("connect", () => {
    console.log("Socket connected for userId:", userId);
    dispatch(setOnlineUsers(["user1", "user2"])); // Update with actual logic
  });

  socket.on("receive_message", (message) => {
    console.log("Received message:", message);
    dispatch(addMessage(message));
  });

  socket.on("message_sent", (message) => {
    console.log("Message sent:", message);
    dispatch(addMessage(message));
  });

  socket.on(
    "jam_session_started",
    ({ hostId, track, currentTime = 0, isPlaying = false }) => {
      console.log("Jam session started:", {
        hostId,
        track,
        currentTime,
        isPlaying,
      });
      dispatch(setJamSession({ hostId, track, currentTime, isPlaying }));
    }
  );

  socket.on(
    "jam_session_joined",
    ({ hostId, track, currentTime = 0, isPlaying = false }) => {
      console.log("Jam session joined:", {
        hostId,
        track,
        currentTime,
        isPlaying,
      });
      dispatch(setJamSession({ hostId, track, currentTime, isPlaying }));
    }
  );

  socket.on("jam_session_updated", ({ currentTime, isPlaying }) => {
    console.log("Jam session updated:", { currentTime, isPlaying });
    dispatch(updateJamSession({ currentTime, isPlaying }));
  });

  socket.on("jam_session_ended", () => {
    console.log("Jam session ended");
    dispatch(setJamSession(null));
  });

  socket.on("error", ({ message }) => {
    console.error("Socket error:", message);
  });

  return socket;
};

const jamSlice = createSlice({
  name: "jam",
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setJamSession(state, action) {
      state.jamSession = action.payload;
    },
    updateJamSession(state, action) {
      if (state.jamSession) {
        state.jamSession = { ...state.jamSession, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedUser,
  addMessage,
  setOnlineUsers,
  setJamSession,
  updateJamSession,
} = jamSlice.actions;
export default jamSlice.reducer;
