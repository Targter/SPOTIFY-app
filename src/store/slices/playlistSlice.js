import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [
    {
      id: "1",
      name: "My Playlist #1",
      tracks: [],
      cover: "https://picsum.photos/300/300?random=1",
    },
    {
      id: "2",
      name: "Favorites",
      tracks: [],
      cover: "https://picsum.photos/300/300?random=2",
    },
  ],
  likedSongs: [],
  recentlyPlayed: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addToLikedSongs: (state, action) => {
      const exists = state.likedSongs.find(
        (track) => track.id === action.payload.id
      );
      if (!exists) {
        state.likedSongs.push(action.payload);
      }
    },
    removeFromLikedSongs: (state, action) => {
      state.likedSongs = state.likedSongs.filter(
        (track) => track.id !== action.payload
      );
    },
    addToRecentlyPlayed: (state, action) => {
      const exists = state.recentlyPlayed.find(
        (track) => track.id === action.payload.id
      );
      if (!exists) {
        state.recentlyPlayed.unshift(action.payload);
        if (state.recentlyPlayed.length > 20) {
          state.recentlyPlayed.pop();
        }
      } else {
        state.recentlyPlayed = state.recentlyPlayed.filter(
          (track) => track.id !== action.payload.id
        );
        state.recentlyPlayed.unshift(action.payload);
      }
    },
    createPlaylist: (state, action) => {
      const newPlaylist = {
        id: Date.now().toString(),
        name: action.payload.name,
        tracks: [],
        cover: `https://picsum.photos/300/300?random=${Date.now()}`,
      };
      state.playlists.push(newPlaylist);
    },
    addToPlaylist: (state, action) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (playlist) {
        const exists = playlist.tracks.find(
          (track) => track.id === action.payload.track.id
        );
        if (!exists) {
          playlist.tracks.push(action.payload.track);
        }
      }
    },
  },
});

export const {
  addToLikedSongs,
  removeFromLikedSongs,
  addToRecentlyPlayed,
  createPlaylist,
  addToPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
