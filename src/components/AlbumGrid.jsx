import React, { useState } from "react";
import TrackRow from "./TrackRow";
import { data } from "./FakeData";

const convertAppleMusicTrack = (track) => {
  if (!track || !track.attributes) return null;

  return {
    key: track.id,
    id: track.id,
    title: track.attributes.name || "Unknown Track",
    artist: {
      name: track.attributes.artistName || "Unknown Artist",
      id: track.relationships?.artists?.data?.[0]?.id || "",
      picture_small:
        track.attributes.artwork?.url?.replace(
          /440x440bb\.jpg$/,
          "64x64bb.jpg"
        ) || "https://via.placeholder.com/64x64",
    },
    album: {
      id: track.id,
      title: track.attributes.albumName || "Unknown Album",
      cover_small:
        track.attributes.artwork?.url?.replace(
          /440x440bb\.jpg$/,
          "64x64bb.jpg"
        ) || "https://via.placeholder.com/64x64",
      cover_medium:
        track.attributes.artwork?.url || "https://via.placeholder.com/300x300",
    },
    preview: track.attributes.previews?.[0]?.url || "",
    duration: Math.floor(track.attributes.durationInMillis / 1000) || 0,
    explicit: track.attributes.contentRating === "explicit",
    genres: track.attributes.genreNames || [],
    releaseDate: track.attributes.releaseDate || "",
    isrc: track.attributes.isrc || "",
  };
};
const ITEMS_PER_PAGE = 6; // Number of albums per page
const AlbumGrid = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Process top charts into unique albums
  React.useEffect(() => {
    if (data && data.length > 0) {
      const uniqueAlbums = data.reduce((acc, track) => {
        // Use album name as ID since we don't have separate album IDs
        const albumId = track.attributes?.albumName || track.id;

        // Skip if we already have this album
        if (acc.some((album) => album.id === albumId)) return acc;

        // Get all artists
        const artists = track.relationships?.artists?.data || [];
        const artistNames = artists
          .map((artist) => artist.attributes?.name)
          .filter(Boolean);
        const primaryArtist =
          artistNames[0] || track.attributes?.artistName || "Various Artists";

        acc.push({
          id: albumId,
          title: track.attributes?.albumName || "Unknown Album",
          cover_medium:
            track.attributes?.artwork?.url?.replace(
              /440x440bb\.jpg$/,
              "600x600bb.jpg"
            ) || "https://via.placeholder.com/600x600",
          artist: {
            name: artistNames.join(", ") || primaryArtist,
            id: artists[0]?.id || "",
          },
          releaseDate: track.attributes?.releaseDate,
          genre: track.attributes?.genreNames?.[0],
          explicit: track.attributes?.contentRating === "explicit",
          tracks: [convertAppleMusicTrack(track)], // Include the track itself
        });
        return acc;
      }, []);

      setAlbums(uniqueAlbums);
      setTotalPages(Math.ceil(uniqueAlbums.length / ITEMS_PER_PAGE));
    }
  }, [data]);

  const loadAlbumTracks = (album) => {
    setSelectedAlbum(album);
    setIsLoading(true);

    // Simulate loading tracks (in a real app, you'd fetch these)
    setTimeout(() => {
      // Find all tracks that belong to this album
      const albumTracks = data
        .filter((track) => track.attributes?.albumName === album.title)
        .map(convertAppleMusicTrack)
        .filter(Boolean);

      setAlbumTracks(albumTracks);
      setIsLoading(false);
    }, 500);
  };

  //
  // Get current albums for the page
  const getCurrentAlbums = () => {
    const startIndex = (currentPage + 2) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return albums.slice(startIndex, endIndex);
  };

  // Pagination controls component
  const PaginationControls = () => (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 rounded-md disabled:opacity-50 hover:bg-gray-700 transition-colors"
      >
        Previous
      </button>

      <span className="text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800 rounded-md disabled:opacity-50 hover:bg-gray-700 transition-colors"
      >
        Next
      </button>
    </div>
  );

  //
  if (selectedAlbum) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              setSelectedAlbum(null);
              setAlbumTracks([]);
            }}
            className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Albums
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          <img
            src={selectedAlbum.cover_medium}
            alt={selectedAlbum.title}
            className="w-full sm:w-48 h-48 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              {selectedAlbum.title}
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              {selectedAlbum.artist.name} •{" "}
              {selectedAlbum.releaseDate?.split("-")[0] || ""}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                {albumTracks.length}{" "}
                {albumTracks.length === 1 ? "song" : "songs"}
              </span>
              {selectedAlbum.explicit && (
                <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">
                  EXPLICIT
                </span>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-1">
            {albumTracks.map((track, index) => (
              <TrackRow
                key={`${track.id}-${index}`}
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
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Popular Albums
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {getCurrentAlbums().map((album) => (
          <button
            key={album.id}
            onClick={() => loadAlbumTracks(album)}
            className="group bg-gray-900/80 hover:bg-gray-800/90 p-3 rounded-xl transition-all text-left"
          >
            <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
              <img
                src={album.cover_medium}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              {album.explicit && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white/20">
                  EXPLICIT
                </div>
              )}
            </div>
            <h3 className="text-white font-medium truncate mb-1">
              {album.title}
            </h3>
            <p className="text-gray-400 text-sm truncate">
              {album.artist.name}
            </p>
            {album.releaseDate && (
              <p className="text-gray-500 text-xs mt-1">
                {album.releaseDate.split("-")[0]}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Pagination controls would go here */}
      {/* {console.log(albums.length)} */}
      {albums.length > ITEMS_PER_PAGE && <PaginationControls />}
    </div>
  );
};

export default AlbumGrid;
