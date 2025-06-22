import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  queue: [],
  currentIndex: 0,
  shuffle: false,
  repeat: "off",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.currentTime = 0;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
      if (state.queue[action.payload]) {
        state.currentTrack = state.queue[action.payload];
      }
    },
    nextTrack: (state) => {
      if (state.repeat === "track") {
        // Stay on current track
        state.currentTime = 0;
        return;
      }

      let nextIndex = state.currentIndex + 1;

      if (state.shuffle) {
        // Generate random index different from current
        const availableIndices = state.queue
          .map((_, index) => index)
          .filter((index) => index !== state.currentIndex);
        if (availableIndices.length > 0) {
          nextIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
        }
      }

      if (nextIndex >= state.queue.length) {
        if (state.repeat === "playlist") {
          nextIndex = 0;
        } else {
          state.isPlaying = false;
          return;
        }
      }

      if (state.queue[nextIndex]) {
        state.currentIndex = nextIndex;
        state.currentTrack = state.queue[nextIndex];
        state.currentTime = 0;
      }
    },
    previousTrack: (state) => {
      if (state.currentTime > 3) {
        // If more than 3 seconds into the track, restart current track
        state.currentTime = 0;
        return;
      }

      let prevIndex = state.currentIndex - 1;

      if (prevIndex < 0) {
        if (state.repeat === "playlist") {
          prevIndex = state.queue.length - 1;
        } else {
          prevIndex = 0;
        }
      }

      if (state.queue[prevIndex]) {
        state.currentIndex = prevIndex;
        state.currentTrack = state.queue[prevIndex];
        state.currentTime = 0;
      }
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat: (state) => {
      const modes = ["off", "track", "playlist"];
      const currentIndex = modes.indexOf(state.repeat);
      state.repeat = modes[(currentIndex + 1) % modes.length];
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setVolume,
  setCurrentTime,
  setDuration,
  setQueue,
  setCurrentIndex,
  nextTrack,
  previousTrack,
  toggleShuffle,
  toggleRepeat,
} = playerSlice.actions;

export default playerSlice.reducer;
