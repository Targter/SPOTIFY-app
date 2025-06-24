# Musicify - A Premium Music Discovery Platform

![Musicify Navbar](https://github.com/Targter/SpotifyClone1-Celebal/blob/2a18e806aa6e161cad18dafc630afc368cd0b8c9/public/search.png)  
*Screenshot of the responsive navbar featuring search, playlists, liked songs, and user profile options.*

## Overview

Musicify is a modern, feature-rich music discovery application built with React, Redux, and the Shazam Core API. Designed to deliver a premium, Spotify-inspired experience, Musicify allows users to explore songs, artists, and albums, create and manage playlists, like their favorite tracks, and enjoy a visually stunning, responsive interface. With a sleek frosted glass UI, smooth GSAP animations, and a music-wave aesthetic, Musicify is optimized for seamless performance across all devices, from mobile phones to desktops.

## Features

- **Enhanced Search Functionality**:
  - Search for songs, artists, and albums using an intuitive, debounced search bar powered by the Shazam Core API.
  - Filter results by type (all, track, artist, album) with dynamic query formatting for precise results.
  - Display real-time search results with artist details, album artwork, and track previews.

- **Playlist Management**:
  - Create, edit, and delete custom playlists with a user-friendly modal interface.
  - Add or remove songs from playlists with a single click via a context menu.
  - View all playlists in a dedicated library view, with track counts and seamless navigation.

- **Music Playback**:
  - Play song previews with a responsive player, featuring play/pause controls and a dynamic equalizer visualizer for the current track.
  - Queue tracks from playlists or search results for continuous playback.
  - Add recently played tracks to a dedicated history for quick access.

- **Like Songs**:
  - Save favorite tracks to a "Liked Songs" playlist with a single click.
  - Toggle likes with a smooth GSAP animation, visually indicating favorited tracks.

- **Responsive Design**:
  - Fully responsive UI optimized for mobile, tablet, and desktop devices.
  - Frosted glass effects, gradient accents, and music-wave animations for a premium aesthetic.

- **Dynamic Visuals**:
  - GSAP-powered animations for track rows, playlist menus, and sidebar interactions, creating a fluid, engaging experience.
  - Wave-like oscillations for the currently playing track, enhancing the music-inspired theme.

- **Library and Personalization**:
  - Explore recently played tracks, liked songs, and custom playlists in a unified library view.
  - Personalized greeting ("Good Morning," "Good Afternoon," or "Good Evening") based on the time of day.

## Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **API**: Shazam Core API (via RapidAPI)
- **Icons**: Lucide React
- **State Management**: Redux for managing player state, playlists, and liked songs
- **Build Tools**: Vite for fast development and production builds
- **Dependencies**: Axios for API requests, React Router for navigation

## Installation

To set up Musicify locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Targter/SpotifyClone1-Celebal.git
   cd musicify
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your Shazam Core API key:
   ```env
   VITE_RAPIDAPI_KEY=your-rapidapi-key
   VITE_RAPIDAPI_HOST=shazam-core.p.rapidapi.com
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

5. **Build for Production**:
   ```bash
   npm run build
   ```

## Usage

1. **Search for Music**:
   - Use the search bar in the "Search" view to find songs, artists, or albums.
   - Filter results by selecting the desired type (track, artist, album).

2. **Create and Manage Playlists**:
   - Navigate to the sidebar and click "Create Playlist" to open the modal.
   - Add songs to playlists via the context menu (three dots) on any track row.
   - Remove songs from playlists or delete playlists in the library view.

3. **Play Music**:
   - Click a track row to play its preview. The row highlights with a green gradient and shows an equalizer for the current track.
   - Pause playback using the pause button that appears on hover.

4. **Like Songs**:
   - Click the heart icon on a track row to add or remove it from "Liked Songs."
   - Liked songs are accessible in the library view under "Liked Songs."

5. **Explore Views**:
   - **Home**: View recently played tracks, featured tracks, and personalized recommendations.
   - **Search**: Browse search results or explore genres and albums.
   - **Library**: Access playlists, liked songs, and manage your music collection.

## Project Structure

```plaintext
musicify/
├── public/
│   ├── search.png           # Navbar screenshot
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx      # Responsive sidebar with navigation and playlist management
│   │   ├── MainContent.jsx  # Main content area with home, search, and library views
│   │   ├── TrackRow.jsx     # Track row component with playback and playlist options
│   │   ├── TrackCard.jsx    # Card component for recently played and recommended tracks
│   │   ├── EnhancedSearchBar.jsx  # Debounced search bar for querying the Shazam API
│   │   ├── ArtistView.jsx   # Artist details view
│   │   ├── GenreGrid.jsx    # Genre browsing grid
│   │   ├── AlbumGrid.jsx    # Album browsing grid
│   │   └── Library.jsx      # Library view for playlists and liked songs
│   ├── store/
│   │   ├── slices/
│   │   │   ├── playerSlice.js  # Redux slice for player state
│   │   │   └── playlistSlice.js  # Redux slice for playlists and liked songs
│   │   └── store.js         # Redux store configuration
│   ├── services/
│   │   └── ShazamCore.js    # API service for Shazam Core integration
│   ├── hooks/
│   │   └── useTypedSelector.js  # Custom hook for typed Redux state
│   ├── App.jsx              # Main app component
│   ├── index.jsx            # Entry point
│   └── index.css            # Global Tailwind CSS styles
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── README.md                # This file
```

## Contributing

Contributions are welcome! To contribute to Musicify:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description of your changes.

Please ensure your code follows the project's ESLint and Prettier configurations.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Shazam Core API** for providing music data.
- **React** and **Redux Toolkit** for a robust frontend and state management.
- **GSAP** for smooth, music-inspired animations.
- **Lucide React** for modern, lightweight icons.
- **Tailwind CSS** for rapid, responsive styling.

## Contact

For questions, suggestions, or feedback, please open an issue on the [GitHub repository]https://github.com/Targter/SpotifyClone1-Celebal.git) or contact the project maintainer at bansalabhay00@gmail.com].

---

*Built with 🎵 by the Musicify Team*