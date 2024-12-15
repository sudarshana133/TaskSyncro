"use client";

import React, { createContext, useContext, useState } from "react";

interface MusicContextType {
  song: Song | undefined; // The song can be undefined if no song is selected
  setSong: React.Dispatch<React.SetStateAction<Song | undefined>>; // Set the song or undefined
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [song, setSong] = useState<Song | undefined>(undefined); // Initialize song as undefined

  return (
    <MusicContext.Provider value={{ song, setSong }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
