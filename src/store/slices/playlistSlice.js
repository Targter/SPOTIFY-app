import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [
    {
      id: "1",
      name: "My Playlist",
      tracks: [],
      cover: "https://picsum.photos/300/300?random=1",
      description: "Your first playlist",
      createdAt: new Date().toISOString(),
    },
    // {
    //   id: "2",
    //   name: "Favorites",
    //   tracks: [],
    //   cover: "https://picsum.photos/300/300?random=2",
    //   description: "Your favorite tracks",
    //   createdAt: new Date().toISOString(),
    // },
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
        description: action.payload.description || "Created by you",
        createdAt: new Date().toISOString(),
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
    removeFromPlaylist: (state, action) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (playlist) {
        playlist.tracks = playlist.tracks.filter(
          (track) => track.id !== action.payload.trackId
        );
      }
    },
    deletePlaylist: (state, action) => {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
    updatePlaylist: (state, action) => {
      const playlist = state.playlists.find((p) => p.id === action.payload.id);
      if (playlist) {
        if (action.payload.name) playlist.name = action.payload.name;
        if (action.payload.description)
          playlist.description = action.payload.description;
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
  deletePlaylist,
  removeFromPlaylist,
  updatePlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
