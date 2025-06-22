import React, { useState, useEffect } from "react";
import { deezerApi } from "../services/deezerApi";
import TrackRow from "./TrackRow";

const AlbumGrid = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const response = await deezerApi.getChart();
        // Extract unique albums from chart tracks
        const uniqueAlbums = response.data.reduce((acc, track) => {
          const existingAlbum = acc.find(
            (album) => album.id === track.album.id.toString()
          );
          if (!existingAlbum) {
            acc.push({
              id: track.album.id.toString(),
              title: track.album.title,
              cover_medium: track.album.cover_medium,
              artist: track.artist,
            });
          }
          return acc;
        }, []);
        setAlbums(uniqueAlbums.slice(0, 12));
      } catch (error) {
        console.error("Error loading albums:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbums();
  }, []);

  const loadAlbumTracks = async (album) => {
    setSelectedAlbum(album);
    setIsLoading(true);
    try {
      const response = await deezerApi.searchTracks(
        `album:"${album.title}" artist:"${album.artist.name}"`
      );
      const formattedTracks = response.data.map((track) => ({
        id: track.id,
        title: track.title,
        artist: track.artist,
        album: track.album,
        preview: track.preview,
        duration: track.duration,
      }));
      setAlbumTracks(formattedTracks);
    } catch (error) {
      console.error("Error loading album tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedAlbum) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedAlbum(null)}
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

        {isLoading ? (
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

      {isLoading ? (
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
