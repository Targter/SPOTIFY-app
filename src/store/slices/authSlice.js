import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "", // String
  username: "",
  email: "",
};

// Load userId from localStorage on app start
const persistedUserId = localStorage.getItem("userId");
// const initialUserId = persistedUserId ? persistedUserId : null;
const initialUserId = 1;

const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState, userId: initialUserId },

  reducers: {
    setUserId(state, action) {
      state.userId =
        typeof action.payload === "string" ? action.payload : action.payload.id;
      if (state.userId) {
        localStorage.setItem("userId", state.userId);
      }
    },
    setUser(state, action) {
      state.userId = action.payload.userId; // Store string ID
      state.username = action.payload.username;
      state.username = action.payload.email;
      if (state.userId) {
        localStorage.setItem("userId", state.userId);
        localStorage.setItem("username", state.username); // Persist username
        localStorage.setItem("email", state.email);
      }
    },
    clearUser(state) {
      state.userId = null;
      state.username = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
    },
  },
});

export const { setUserId, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
