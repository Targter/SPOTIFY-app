import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./slices/playerSlice";
import playlistSlice from "./slices/playlistSlice";
import { shazamCoreApi } from "../services/ShazamCore";
export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerSlice,
    playlist: playlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});

export const getState = store.getState;
export const dispatch = store.dispatch;
