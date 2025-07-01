import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectedUsers: [],
  messages: {},
  selectedUserId: null,
  audioState: {
    isPlaying: false,
    currentTime: 0,
    jamPartnerId: null, // Track which user we're jamming with
  },
};

const jamSlice = createSlice({
  name: "jam",
  initialState,
  reducers: {
    setConnectedUsers: (state, action) => {
      state.connectedUsers = action.payload;
    },
    // able to communicated
    addMessage: (state, action) => {
      const { senderId, recipientId, message, timestamp, type, track } =
        action.payload;
      // Store message for both sender and recipient
      if (senderId === recipientId) {
        console.warn(
          `Skipping self-message from ${senderId} to ${recipientId}`
        );
        return;
      }
      [senderId, recipientId].forEach((id) => {
        if (!state.messages[id]) {
          state.messages[id] = [];
        }
        state.messages[id].push({
          senderId,
          recipientId,
          message,
          timestamp,
          type,
          track,
        });
      });
    },
    setSelectedUser: (state, action) => {
      console.log("setSelectedUser:", action.payload);
      state.selectedUserId = action.payload;
      state.audioState.jamPartnerId = action.payload;
      state.audioState.isPlaying = false;
      state.audioState.currentTime = 0;
      state.audioState.previewUrl = null; // Reset track on user change
    },

    clearMessages: (state) => {
      state.messages = {};
      state.selectedUserId = null;
    },
  },
});

export const {
  setConnectedUsers,
  addMessage,
  setSelectedUser,
  clearMessages,
 
} = jamSlice.actions;
export default jamSlice.reducer;
