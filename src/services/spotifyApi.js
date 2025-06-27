// const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID_HERE"; // User will replace this
// const CLIENT_SECRET = "YOUR_SPOTIFY_CLIENT_SECRET_HERE"; // Optional for client credentials flow
// const token =
//   "BQDQya2raSDJWaR3SO6wxuhQoxdF-HB0ql1EzZmEX_q98yJZF-xd-GPe67N77G0m4GYvgf0W4AmINqsc4IDhegIb7EgWiVL8cMeDmGR4Nal28_T2V5k_PjPxW9VmYLyDHbnI8R6UuGQTjDy5GyiNRGbaauo0ITxd7qNYeXfsDwnDdd3Uxm4WsQLsZFQbS5-RaFWQTuOPHmQ6mxBi5SF8uIAukh1Tz0MeG1bv9nZ3CycHBJEWzhBarX0U9SsaAoEiDFfosr8VBbg6IUlOGSeih-__sVjYqRVESf-9bMsYauHSDrE4IgY4OaXu-1405x5t";
// let accessToken = null;
// let tokenExpiry = null;

// const getAccessToken = async () => {
//   if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
//     return accessToken;
//   }

//   try {
//     const response = await fetch(
//       "https://accounts.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5'",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get access token");
//     }

//     const data = await response.json();
//     console.log("spotifyResponse:", data);
//     accessToken = data.access_token;
//     tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // Refresh 1 minute early

//     return accessToken;
//   } catch (error) {
//     console.error("Error getting Spotify access token:", error);
//     throw error;
//   }
// };

// const makeSpotifyRequest = async (endpoint) => {
//   try {
//     const token = await getAccessToken();
//     const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Spotify API error: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Spotify API request failed:", error);
//     throw error;
//   }
// };

// export const spotifyApi = {
//   // Search for tracks with various options
//   searchTracks: async (query, limit = 25) => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`
//       );
//       return data.tracks?.items || [];
//     } catch (error) {
//       console.error("Error searching tracks:", error);
//       return [];
//     }
//   },

//   // Search by artist name
//   searchByArtist: async (artistName, limit = 25) => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/search?q=artist:${encodeURIComponent(
//           artistName
//         )}&type=track&limit=${limit}`
//       );
//       return data.tracks?.items || [];
//     } catch (error) {
//       console.error("Error searching by artist:", error);
//       return [];
//     }
//   },

//   // Search by song name specifically
//   searchBySongName: async (songName, limit = 25) => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/search?q=track:${encodeURIComponent(
//           songName
//         )}&type=track&limit=${limit}`
//       );
//       return data.tracks?.items || [];
//     } catch (error) {
//       console.error("Error searching by song name:", error);
//       return [];
//     }
//   },

//   // Search artists
//   searchArtists: async (query, limit = 25) => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}`
//       );
//       return data.artists?.items || [];
//     } catch (error) {
//       console.error("Error searching artists:", error);
//       return [];
//     }
//   },

//   // Get artist's top tracks
//   getArtistTopTracks: async (artistId, country = "US") => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/artists/${artistId}/top-tracks?market=${country}`
//       );
//       return data.tracks || [];
//     } catch (error) {
//       console.error("Error getting artist top tracks:", error);
//       return [];
//     }
//   },

//   // Get artist's albums
//   getArtistAlbums: async (artistId, limit = 25) => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/artists/${artistId}/albums?include_groups=album,single&limit=${limit}`
//       );
//       return data.items || [];
//     } catch (error) {
//       console.error("Error getting artist albums:", error);
//       return [];
//     }
//   },

//   // Get album tracks
//   getAlbumTracks: async (albumId, limit = 50) => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/albums/${albumId}/tracks?limit=${limit}`
//       );
//       return data.items || [];
//     } catch (error) {
//       console.error("Error getting album tracks:", error);
//       return [];
//     }
//   },

//   // Get recommendations based on genres
//   getRecommendations: async (genres, limit = 25) => {
//     try {
//       const genreQuery = genres.join(",");
//       const data = await makeSpotifyRequest(
//         `/recommendations?seed_genres=${genreQuery}&limit=${limit}`
//       );
//       return data.tracks || [];
//     } catch (error) {
//       console.error("Error getting recommendations:", error);
//       return [];
//     }
//   },

//   // Get featured playlists
//   getFeaturedPlaylists: async (limit = 25) => {
//     try {
//       const data = await makeSpotifyRequest(
//         `/browse/featured-playlists?limit=${limit}`
//       );
//       return data.playlists?.items || [];
//     } catch (error) {
//       console.error("Error getting featured playlists:", error);
//       return [];
//     }
//   },

//   // Get available genres
//   getAvailableGenres: async () => {
//     try {
//       const data = await makeSpotifyRequest(
//         "/recommendations/available-genre-seeds"
//       );
//       return data.genres || [];
//     } catch (error) {
//       console.error("Error getting genres:", error);
//       return [];
//     }
//   },
// };

// // Helper function to convert Spotify track to our Track interface
// export const convertSpotifyTrack = (spotifyTrack) => ({
//   id: spotifyTrack.id,
//   title: spotifyTrack.name,
//   artist: {
//     name: spotifyTrack.artists[0]?.name || "Unknown Artist",
//     picture_small:
//       spotifyTrack.artists[0]?.images?.[0]?.url ||
//       "https://via.placeholder.com/56x56",
//   },
//   album: {
//     title: spotifyTrack.album.name,
//     cover_small:
//       spotifyTrack.album.images[2]?.url ||
//       spotifyTrack.album.images[0]?.url ||
//       "https://via.placeholder.com/56x56",
//     cover_medium:
//       spotifyTrack.album.images[1]?.url ||
//       spotifyTrack.album.images[0]?.url ||
//       "https://via.placeholder.com/300x300",
//   },
//   preview: spotifyTrack.preview_url || "",
//   duration: Math.floor(spotifyTrack.duration_ms / 1000),
// });

//

// Authorization token that must have been created previously. See: https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQDQya2raSDJWaR3SO6wxuhQoxdF-HB0ql1EzZmEX_q98yJZF-xd-GPe67N77G0m4GYvgf0W4AmINqsc4IDhegIb7EgWiVL8cMeDmGR4Nal28_T2V5k_PjPxW9VmYLyDHbnI8R6UuGQTjDy5GyiNRGbaauo0ITxd7qNYeXfsDwnDdd3Uxm4WsQLsZFQbS5-RaFWQTuOPHmQ6mxBi5SF8uIAukh1Tz0MeG1bv9nZ3CycHBJEWzhBarX0U9SsaAoEiDFfosr8VBbg6IUlOGSeih-__sVjYqRVESf-9bMsYauHSDrE4IgY4OaXu-1405x5t";

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  console.log("spotifyResponse:", res.json());
  return await res.json();
}

export const spotifyApi = {
  // Get user's top tracks
  getTopTracks: async (timeRange = "long_term", limit = 5) => {
    return (
      (
        await fetchWebApi(
          `v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
          "GET"
        )
      ).items || []
    );
  },

  //   console.log()

  // Search for tracks with various options
  searchTracks: async (query, limit = 25) => {
    const data = await fetchWebApi(
      `v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
      "GET"
    );
    return data.tracks?.items || [];
  },

  // Search by artist name
  searchByArtist: async (artistName, limit = 25) => {
    const data = await fetchWebApi(
      `v1/search?q=artist:${encodeURIComponent(
        artistName
      )}&type=track&limit=${limit}`,
      "GET"
    );
    return data.tracks?.items || [];
  },

  // Search by song name specifically
  searchBySongName: async (songName, limit = 25) => {
    const data = await fetchWebApi(
      `v1/search?q=track:${encodeURIComponent(
        songName
      )}&type=track&limit=${limit}`,
      "GET"
    );
    return data.tracks?.items || [];
  },

  // Search artists
  searchArtists: async (query, limit = 25) => {
    const data = await fetchWebApi(
      `v1/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}`,
      "GET"
    );
    return data.artists?.items || [];
  },

  // Get artist's top tracks
  getArtistTopTracks: async (artistId, country = "US") => {
    const data = await fetchWebApi(
      `v1/artists/${artistId}/top-tracks?market=${country}`,
      "GET"
    );
    return data.tracks || [];
  },

  // Get artist's albums
  getArtistAlbums: async (artistId, limit = 25) => {
    const data = await fetchWebApi(
      `v1/artists/${artistId}/albums?include_groups=album,single&limit=${limit}`,
      "GET"
    );
    return data.items || [];
  },

  // Get album tracks
  getAlbumTracks: async (albumId, limit = 50) => {
    const data = await fetchWebApi(
      `v1/albums/${albumId}/tracks?limit=${limit}`,
      "GET"
    );
    return data.items || [];
  },

  // Get recommendations based on genres
  getRecommendations: async (genres, limit = 25) => {
    const genreQuery = genres.join(",");
    const data = await fetchWebApi(
      `v1/recommendations?seed_genres=${genreQuery}&limit=${limit}`,
      "GET"
    );
    return data.tracks || [];
  },

  // Get featured playlists
  getFeaturedPlaylists: async (limit = 25) => {
    const data = await fetchWebApi(
      `v1/browse/featured-playlists?limit=${limit}`,
      "GET"
    );
    return data.playlists?.items || [];
  },

  // Get available genres
  getAvailableGenres: async () => {
    const data = await fetchWebApi(
      "v1/recommendations/available-genre-seeds",
      "GET"
    );
    return data.genres || [];
  },
};

// Helper function to convert Spotify track to our Track interface
export const convertSpotifyTrack = (spotifyTrack) => ({
  id: spotifyTrack.id,
  title: spotifyTrack.name,
  artist: {
    name: spotifyTrack.artists[0]?.name || "Unknown Artist",
    picture_small:
      spotifyTrack.artists[0]?.images?.[0]?.url ||
      "https://via.placeholder.com/56x56",
  },
  album: {
    title: spotifyTrack.album.name,
    cover_small:
      spotifyTrack.album.images[2]?.url ||
      spotifyTrack.album.images[0]?.url ||
      "https://via.placeholder.com/56x56",
    cover_medium:
      spotifyTrack.album.images[1]?.url ||
      spotifyTrack.album.images[0]?.url ||
      "https://via.placeholder.com/300x300",
  },
  preview: spotifyTrack.preview_url || "",
  duration: Math.floor(spotifyTrack.duration_ms / 1000),
});
