"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface PlaylistContextType {
  playlist: Playlist | null;
  currentSongIndex: number | null;
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
  playNextSong: () => void;
  playPreviousSong: () => void;
  currentSong: Song | null;
  setCurrentSongIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);

  const playNextSong = useCallback(() => {
    if (playlist && currentSongIndex !== null && playlist.songs.length > 0) {
      const nextIndex = (currentSongIndex + 1) % playlist.songs.length;
      setCurrentSongIndex(nextIndex);
      return playlist.songs[nextIndex]; // Return the next song
    }
    return null;
  }, [playlist, currentSongIndex]);

  const playPreviousSong = useCallback(() => {
    if (playlist && currentSongIndex !== null && playlist.songs.length > 0) {
      const previousIndex = (currentSongIndex - 1 + playlist.songs.length) % playlist.songs.length;
      setCurrentSongIndex(previousIndex);
      return playlist.songs[previousIndex]; // Return the previous song
    }
    return null;
  }, [playlist, currentSongIndex]);

  const currentSong = playlist && currentSongIndex !== null 
    ? playlist.songs[currentSongIndex] 
    : null;

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        currentSongIndex,
        setPlaylist,
        playNextSong,
        playPreviousSong,
        currentSong,
        setCurrentSongIndex,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};