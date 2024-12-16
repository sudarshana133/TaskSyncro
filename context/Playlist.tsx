"use client";

import React, { createContext, useContext, useState } from "react";

interface PlaylistContextType {
  playlist: Playlist | null;
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>; // Set the song or undefined
}

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null); // Initialize song as undefined

  return (
    <PlaylistContext.Provider value={{ playlist, setPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a MusicProvider");
  }
  return context;
};
