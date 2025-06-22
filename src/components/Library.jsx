
import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import TrackRow from './TrackRow';


const Library = ({ currentView, onViewChange }) => {
  const { playlists, likedSongs } = useTypedSelector(state => state.playlist);

  const renderPlaylistView = (playlistId) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return null;

    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onViewChange('library')}
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            ← Back to Library
          </button>
        </div>
        
        <div className="flex items-start gap-6 mb-8">
          <img
            src={playlist.cover || 'https://picsum.photos/300/300?random=playlist'}
            alt={playlist.name}
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{playlist.name}</h1>
            <p className="text-gray-400">{playlist.tracks.length} songs</p>
          </div>
        </div>

        {playlist.tracks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">This playlist is empty</p>
            <p className="text-gray-500">Add some songs to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {playlist.tracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                playlist={playlist.tracks}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLikedSongs = () => {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onViewChange('library')}
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            ← Back to Library
          </button>
        </div>
        
        <div className="flex items-start gap-6 mb-8">
          <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-6xl">♥</span>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">Liked Songs</h1>
            <p className="text-gray-400">{likedSongs.length} songs</p>
          </div>
        </div>

        {likedSongs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No liked songs yet</p>
            <p className="text-gray-500">Like some songs to see them here</p>
          </div>
        ) : (
          <div className="space-y-1">
            {likedSongs.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                playlist={likedSongs}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (currentView === 'liked') {
    return renderLikedSongs();
  }

  if (currentView.startsWith('playlist-')) {
    const playlistId = currentView.replace('playlist-', '');
    return renderPlaylistView(playlistId);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Your Library</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Liked Songs */}
        <button
          onClick={() => onViewChange('liked')}
          className="group bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors text-left"
        >
          <div className="w-full aspect-square bg-gradient-to-br from-purple-400 to-blue-400 rounded-md mb-3 flex items-center justify-center">
            <span className="text-white text-4xl">♥</span>
          </div>
          <h3 className="text-white font-medium truncate mb-1">Liked Songs</h3>
          <p className="text-gray-400 text-sm">{likedSongs.length} songs</p>
        </button>

        {/* User Playlists */}
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => onViewChange(`playlist-${playlist.id}`)}
            className="group bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors text-left"
          >
            <img
              src={playlist.cover || 'https://picsum.photos/300/300?random=playlist'}
              alt={playlist.name}
              className="w-full aspect-square object-cover rounded-md mb-3"
            />
            <h3 className="text-white font-medium truncate mb-1">{playlist.name}</h3>
            <p className="text-gray-400 text-sm">{playlist.tracks.length} songs</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Library;