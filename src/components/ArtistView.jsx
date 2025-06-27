import React, { useState, useEffect } from "react";
import {
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
} from "../services/ShazamCore"; // Adjust path as needed
import TrackRow from "./TrackRow";

// Helper function to convert Shazam track to standardized format
const convertShazamTrack = (track) => ({
  id: track.key || track.id,
  title: track.title,
  artist: {
    name: track.subtitle || "Unknown Artist",
    id: track.artists?.[0]?.adamid || "",
  },
  album: {
    id: track.albumadamid || "",
    title: track.title,
    cover_medium:
      track.images?.coverarthq || "https://via.placeholder.com/300x300",
  },
  preview:
    track.hub?.actions?.find((action) => action.type === "uri")?.uri || "",
  duration: track.duration || 0,
});

const ArtistView = ({ artist, onBack }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skipSearch, setSkipSearch] = useState(true);

  // Fetch artist details (including top songs)
  const {
    data: artistData,
    isLoading: isArtistLoading,
    error: artistError,
  } = useGetArtistDetailsQuery(artist.id);

  // Fetch tracks to extract albums
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useGetSongsBySearchQuery(`artist:"${artist.name}"`, { skip: skipSearch });

  useEffect(() => {
    setSkipSearch(false); // Trigger album search on mount
    if (artistData && !isArtistLoading && !artistError) {
      const tracks = artistData?.data?.[0]?.attributes?.topSongs?.data || [];
      setTopTracks(tracks.map(convertShazamTrack));
    }
    if (artistError) {
      console.error("Error loading artist details:", artistError);
    }
  }, [artistData, isArtistLoading, artistError]);

  useEffect(() => {
    if (searchResults && !isSearchLoading && !searchError) {
      const uniqueAlbums =
        searchResults.tracks?.hits?.reduce((acc, hit) => {
          const track = hit.track;
          const albumId = track.albumadamid?.toString() || track.key;
          const existingAlbum = acc.find((album) => album.id === albumId);
          if (!existingAlbum) {
            acc.push({
              id: albumId,
              name: track.title,
              images: [
                {
                  url:
                    track.images?.coverarthq ||
                    "https://via.placeholder.com/300x300",
                },
              ],
              release_date: track.releaseDate || "Unknown",
            });
          }
          return acc;
        }, []) || [];
      setAlbums(uniqueAlbums.slice(0, 10)); // Limit to 10 albums
    }
    if (searchError) {
      console.error("Error loading albums:", searchError);
    }
    setIsLoading(isArtistLoading || isSearchLoading);
  }, [searchResults, isSearchLoading, searchError, isArtistLoading]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Artist Header */}
      <div className="flex items-start gap-6 mb-8">
        <img
          src={
            artist.images?.background || "https://via.placeholder.com/200x200"
          }
          alt={artist.name}
          className="w-48 h-48 object-cover rounded-full shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-white mb-4">{artist.name}</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-4">
            <span>N/A followers</span>{" "}
            {/* Shazam doesn't provide follower count */}
            <span>•</span>
            <span>Popularity: N/A</span>{" "}
            {/* Shazam doesn't provide popularity */}
          </div>
          {artistData?.data?.[0]?.attributes?.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {artistData.data[0].attributes.genres.slice(0, 5).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Tracks */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
            <div className="space-y-1">
              {topTracks.slice(0, 10).map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={index}
                  playlist={topTracks}
                />
              ))}
            </div>
          </section>

          {/* Albums */}
          {albums.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <img
                      src={
                        album.images[0]?.url ||
                        "https://via.placeholder.com/300x300"
                      }
                      alt={album.name}
                      className="w-full aspect-square object-cover rounded-md mb-3"
                    />
                    <h3 className="text-white font-medium truncate mb-1">
                      {album.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {album.release_date?.split("-")[0] || "Unknown"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistView;
