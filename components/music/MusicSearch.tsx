"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "@/context/useDebounce";
import { useMusic } from "@/context/MusicContext";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";

const MusicSearch = () => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [songName, setSongName] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const debouncedSongName = useDebounce(songName, 500);

  const { setSong } = useMusic();

  useEffect(() => {
    if (debouncedSongName) {
      const searchSong = async () => {
        try {
          const { data } = await axios.get(
            `https://saavn.dev/api/search/songs?query=${debouncedSongName}`
          );
          setSongs(data.data.results.slice(0, 5));
        } catch (error) {
          console.error(error);
        }
      };

      searchSong();
    } else {
      setSongs(null);
    }
  }, [debouncedSongName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSongClick = (song: Song) => {
    setSong(song);
    setSongs(null);
    setSongName("");
    setIsSearchFocused(false);
  };

  const clearSearch = () => {
    setSongName("");
    setSongs(null);
    setIsSearchFocused(false);
  };

  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[400px]">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={songName}
          onChange={(e) => {
            setSongName(e.target.value);
            setIsSearchFocused(true);
          }}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="pr-10 pl-10 bg-white text-black rounded-md w-full"
          placeholder="Search songs..."
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={20}
        />
        {songName && (
          <X
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
            size={20}
          />
        )}
      </form>

      {isSearchFocused && songs && songs.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-md mt-1 border border-gray-200">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center space-x-4 py-3 px-4 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-gray-100 transition-colors"
              onMouseDown={() => handleSongClick(song)}
            >
              <img
                src={song.image[0]?.url || "/default-album-art.jpg"}
                alt={song.name}
                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 overflow-hidden">
                <h4 className="font-semibold text-sm text-black truncate">
                  {song.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {song.artists.primary[0]?.name || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicSearch;
