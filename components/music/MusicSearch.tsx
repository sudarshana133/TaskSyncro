"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "@/context/useDebounce";
import { useMusic } from "@/context/MusicContext";
import { Search, X, History } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";

const MusicSearch = ({
  maxRes,
  isHideOn,
}: {
  maxRes: number;
  isHideOn: boolean;
}) => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [songName, setSongName] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [history, setHistory] = useState<Song[]>([]);
  const debouncedSongName = useDebounce(songName, 500);

  const { setSong } = useMusic();

  useEffect(() => {
    // Load song history from localStorage on component mount
    const storedHistory = localStorage.getItem("songHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (debouncedSongName) {
      const searchSong = async () => {
        try {
          const { data } = await axios.get(
            `https://saavn.dev/api/search/songs?query=${debouncedSongName}`
          );
          setSongs(data.data.results.slice(0, maxRes));
        } catch (error) {
          console.error(error);
        }
      };

      searchSong();
    } else {
      setSongs(null);
    }
  }, [debouncedSongName]);

  const handleSongClick = (song: Song) => {
    // Set the clicked song as currently playing
    setSong(song);

    // Update song history
    const updatedHistory = [
      song,
      ...history.filter((s) => s.id !== song.id),
    ].slice(0, 10); // Keep 10 unique songs
    setHistory(updatedHistory);
    localStorage.setItem("songHistory", JSON.stringify(updatedHistory));

    setSongs(null);
    setSongName("");
    setIsSearchFocused(false);
  };

  const handleHistoryClick = (song: Song) => {
    setSong(song);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("songHistory");
  };

  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[400px]">
      <form className="relative">
        <Input
          type="text"
          value={songName}
          onChange={(e) => {
            e.preventDefault();
            setSongName(e.target.value);
            setIsSearchFocused(true);
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="pr-10 pl-10 bg-gray-100 text-black rounded-md w-full"
          placeholder="Search songs..."
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={20}
        />
        {songName && (
          <X
            onClick={() => {
              setSongName("");
              setSongs(null);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
            size={20}
          />
        )}
      </form>

      {/* Song Recommendations */}
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
                  {song.name.replace(/&quot;/g, '"')}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {song.artists.primary[0]?.name || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recently Played Songs */}
      {!isHideOn && history.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-gray-700">
              Recently Played
            </h4>
            <button
              onClick={clearHistory}
              className="text-xs text-gray-500 hover:text-red-500"
            >
              Clear
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
            {history.map((song) => (
              <div
                key={song.id}
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleHistoryClick(song)}
              >
                <Image
                  width={500}
                  height={500}
                  src={
                    song.image[song.image.length - 1]?.url ||
                    "/default-album-art.jpg"
                  }
                  alt={song.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <h4 className="text-xs font-medium text-center text-gray-800 truncate max-w-20">
                  {song.name.replace(/&quot;/g, '"')}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicSearch;
