// import { configureStore } from "@reduxjs/toolkit";
// import playerSlice from "./slices/playerSlice";
// import playlistSlice from "./slices/playlistSlice";
// import { shazamCoreApi } from "../services/ShazamCore";
// import jamReducer from "./slices/jamSlice";
// export const store = configureStore({
//   reducer: {
//     [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
//     player: playerSlice,
//     playlist: playlistSlice,
//     jam: jamReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(shazamCoreApi.middleware),
// });

// export const getState = store.getState;
// export const dispatch = store.dispatch;

import { configureStore, createSlice } from "@reduxjs/toolkit";
import playerSlice from "./slices/playerSlice";
import playlistSlice from "./slices/playlistSlice";
import { shazamCoreApi } from "../services/ShazamCore";
import jamReducer from "./slices/jamSlice";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerSlice,
    playlist: playlistSlice,
    jam: jamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});

export const getState = store.getState;
export const dispatch = store.dispatch;
