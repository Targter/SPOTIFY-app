import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./slices/playerSlice";
import playlistSlice from "./slices/playlistSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice,
    playlist: playlistSlice,
  },
});

export const getState = store.getState;
export const dispatch = store.dispatch;
