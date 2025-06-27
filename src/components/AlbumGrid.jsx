import React, { useState } from "react";
import {
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
} from "../services/ShazamCore"; // Adjust path as needed
import TrackRow from "./TrackRow";

// Helper function to convert Shazam track to standardized format
const convertShazamTrack = (track) => ({
  id: track.key || track.track?.key,
  title: track.title || track.track?.title,
  artist: {
    name: track.subtitle || track.track?.subtitle || "Unknown Artist",
    id: track.artists?.[0]?.adamid || "",
  },
  album: {
    id: track.albumadamid || track.track?.albumadamid || "",
    title: track.title || track.track?.title,
    cover_medium:
      track.images?.coverarthq ||
      track.track?.images?.coverarthq ||
      "https://via.placeholder.com/300x300",
  },
  preview:
    track.hub?.actions?.find((action) => action.type === "uri")?.uri || "",
  duration: track.duration || track.track?.duration || 0,
});

const AlbumGrid = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [skipSearch, setSkipSearch] = useState(true); // Control search query

  // Fetch top charts
  const {
    data: topCharts,
    isLoading: isChartsLoading,
    error: chartsError,
  } = useGetTopChartsQuery({
    countryCode: "IN",
    page: 1,
    pageSize: 20,
  });

  // Fetch tracks for selected album
  const { data: searchResults, isLoading: isSearchLoading } =
    useGetSongsBySearchQuery(
      selectedAlbum
        ? `album:"${selectedAlbum.title}" artist:"${selectedAlbum.artist.name}"`
        : "",
      { skip: skipSearch }
    );

  // Process top charts into unique albums
  React.useEffect(() => {
    if (topCharts && !isChartsLoading && !chartsError) {
      const uniqueAlbums = topCharts.reduce((acc, track) => {
        const albumId = track.albumadamid?.toString() || track.key;
        const existingAlbum = acc.find((album) => album.id === albumId);
        if (!existingAlbum) {
          acc.push({
            id: albumId,
            title: track.title,
            cover_medium:
              track.images?.coverarthq || "https://via.placeholder.com/300x300",
            artist: {
              name: track.subtitle || "Unknown Artist",
              id: track.artists?.[0]?.adamid || "",
            },
          });
        }
        return acc;
      }, []);
      setAlbums(uniqueAlbums.slice(0, 12));
    }
    if (chartsError) {
      console.error("Error loading albums:", chartsError);
    }
  }, [topCharts, isChartsLoading, chartsError]);

  // Process search results into album tracks
  React.useEffect(() => {
    if (searchResults && !isSearchLoading && !skipSearch) {
      const formattedTracks =
        searchResults.tracks?.hits?.map((hit) => convertShazamTrack(hit)) || [];
      setAlbumTracks(formattedTracks);
    }
  }, [searchResults, isSearchLoading, skipSearch]);

  const loadAlbumTracks = (album) => {
    setSelectedAlbum(album);
    setSkipSearch(false); // Trigger search query
  };

  if (selectedAlbum) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              setSelectedAlbum(null);
              setSkipSearch(true); // Stop search query
              setAlbumTracks([]);
            }}
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            ← Back to Albums
          </button>
        </div>

        <div className="flex items-start gap-6 mb-8">
          <img
            src={selectedAlbum.cover_medium}
            alt={selectedAlbum.title}
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">
              {selectedAlbum.title}
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              by {selectedAlbum.artist.name}
            </p>
            <p className="text-gray-400">{albumTracks.length} songs</p>
          </div>
        </div>

        {isSearchLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-1">
            {albumTracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                playlist={albumTracks}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Popular Albums</h2>

      {isChartsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => loadAlbumTracks(album)}
              className="group bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors text-left"
            >
              <img
                src={album.cover_medium}
                alt={album.title}
                className="w-full aspect-square object-cover rounded-md mb-3"
              />
              <h3 className="text-white font-medium truncate mb-1">
                {album.title}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                {album.artist.name}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumGrid;
