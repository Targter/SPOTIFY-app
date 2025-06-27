// Using multiple CORS proxies as fallbacks
const CORS_PROXIES = [
  "https://api.allorigins.win/get?url=",
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?quest=",
];

const DEEZER_BASE = "https://api.deezer.com";

const makeRequest = async (url) => {
  // Try each proxy in order
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxy = CORS_PROXIES[i];
    try {
      console.log(`Trying proxy ${i + 1}: ${proxy}`);

      let requestUrl;
      let response;

      if (proxy.includes("allorigins")) {
        requestUrl = `${proxy}${encodeURIComponent(url)}`;
        response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        if (result.contents) {
          return JSON.parse(result.contents);
        } else {
          throw new Error("No contents in response");
        }
      } else {
        requestUrl = `${proxy}${encodeURIComponent(url)}`;
        response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
      }
    } catch (error) {
      console.error(`Proxy ${i + 1} failed:`, error);

      // If this is the last proxy, try direct request (might work in some cases)
      if (i === CORS_PROXIES.length - 1) {
        try {
          console.log("Trying direct request as last resort...");
          const directResponse = await fetch(url);
          if (directResponse.ok) {
            return await directResponse.json();
          }
        } catch (directError) {
          console.error("Direct request also failed:", directError);
        }
      }
    }
  }

  // If all proxies fail, return mock data to show the app works
  console.log("All proxies failed, returning mock data");
  return getMockData();
};

const getMockData = () => {
  return {
    data: [
      {
        id: "1",
        title: "Blinding Lights",
        artist: {
          name: "The Weeknd",
          picture_small: "https://picsum.photos/56/56?random=1",
        },
        album: {
          title: "After Hours",
          cover_small: "https://picsum.photos/56/56?random=1",
          cover_medium: "https://picsum.photos/300/300?random=1",
        },
        preview: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        duration: 200,
      },
      {
        id: "2",
        title: "Shape of You",
        artist: {
          name: "Ed Sheeran",
          picture_small: "https://picsum.photos/56/56?random=2",
        },
        album: {
          title: "÷ (Divide)",
          cover_small: "https://picsum.photos/56/56?random=2",
          cover_medium: "https://picsum.photos/300/300?random=2",
        },
        preview: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        duration: 233,
      },
      {
        id: "3",
        title: "Someone Like You",
        artist: {
          name: "Adele",
          picture_small: "https://picsum.photos/56/56?random=3",
        },
        album: {
          title: "21",
          cover_small: "https://picsum.photos/56/56?random=3",
          cover_medium: "https://picsum.photos/300/300?random=3",
        },
        preview: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        duration: 285,
      },
      {
        id: "4",
        title: "Bad Guy",
        artist: {
          name: "Billie Eilish",
          picture_small: "https://picsum.photos/56/56?random=4",
        },
        album: {
          title: "When We All Fall Asleep, Where Do We Go?",
          cover_small: "https://picsum.photos/56/56?random=4",
          cover_medium: "https://picsum.photos/300/300?random=4",
        },
        preview: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        duration: 194,
      },
      {
        id: "5",
        title: "Levitating",
        artist: {
          name: "Dua Lipa",
          picture_small: "https://picsum.photos/56/56?random=5",
        },
        album: {
          title: "Future Nostalgia",
          cover_small: "https://picsum.photos/56/56?random=5",
          cover_medium: "https://picsum.photos/300/300?random=5",
        },
        preview: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        duration: 203,
      },
    ],
    total: 5,
  };
};

export const deezerApi = {
  searchTracks: async (query, limit = 25) => {
    const url = `${DEEZER_BASE}/search?q=${encodeURIComponent(
      query
    )}&limit=${limit}`;
    return await makeRequest(url);
  },

  getChart: async (limit = 25) => {
    const url = `${DEEZER_BASE}/chart/0/tracks?limit=${limit}`;
    return await makeRequest(url);
  },

  getGenreTracks: async (genreId, limit = 25) => {
    try {
      const artistsUrl = `${DEEZER_BASE}/genre/${genreId}/artists?limit=5`;
      const artistsData = await makeRequest(artistsUrl);

      if (artistsData.data && artistsData.data.length > 0) {
        const artistId = artistsData.data[0].id;
        const tracksUrl = `${DEEZER_BASE}/artist/${artistId}/top?limit=${limit}`;
        return await makeRequest(tracksUrl);
      }

      return getMockData();
    } catch (error) {
      console.error("Error fetching genre tracks:", error);
      return getMockData();
    }
  },
};
