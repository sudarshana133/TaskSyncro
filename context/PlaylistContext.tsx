"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useMusic } from "./MusicContext";
import { getSongFromApi } from "@/utils/song";

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

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const { setSong } = useMusic();

  const findSongFromId = async (index: number) => {
    try {
      const songId = playlist?.songs[index].id;
      if (!songId) {
        setSong(null);
        return;
      }
      const song: any = await getSongFromApi(songId);
      setSong(song[0]);
    } catch (error) {
      console.log("Error finding song from ID:", error);
      setSong(null);
    }
  };
  const playNextSong = useCallback(() => {
    if (playlist && currentSongIndex !== null) {
      const nextIndex = (currentSongIndex + 1) % playlist.songs.length;
      setCurrentSongIndex(nextIndex);
      if (playlist.private) {
        findSongFromId(nextIndex);
        return;
      }
      const findSong = playlist.songs[nextIndex];
      setSong(findSong);
    }
  }, [playlist, currentSongIndex]);

  const playPreviousSong = useCallback(() => {
    if (playlist && currentSongIndex !== null) {
      const previousIndex =
        (currentSongIndex - 1 + playlist.songs.length) % playlist.songs.length;
      setCurrentSongIndex(previousIndex);
      if (playlist.private) {
        findSongFromId(previousIndex);
        return;
      }
      const findSong = playlist.songs[previousIndex];
      setSong(findSong);
    }
  }, [playlist, currentSongIndex]);

  const currentSong =
    playlist && currentSongIndex !== null
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
