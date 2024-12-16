"use client";
import { useMusic } from "@/context/MusicContext";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronUp, ChevronDown, Volume2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from "next/image";

const MusicPlayer = () => {
  const { song } = useMusic();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (song && audioRef.current) {
      console.log("Setting up audio for song:", song.name);
      try {
        const highestQualityUrl =
          song.downloadUrl[song.downloadUrl.length - 1].url;
        audioRef.current.src = highestQualityUrl;
        audioRef.current.load();
        audioRef.current.play().catch((error) => {
          console.error("Error attempting to play:", error);
        });
        setIsPlaying(true);
        console.log("Audio setup complete and playing started.");
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    }
  }, [song]);

  const togglePlayPause = () => {
    console.log("Toggling play/pause. Current state:", isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        console.log("Audio paused.");
      } else {
        audioRef.current.play();
        console.log("Audio playing.");
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    console.log("Changing volume to:", newVolume);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleCollapse = () => {
    console.log("Toggling collapse. Current state:", isCollapsed);
    setIsCollapsed(!isCollapsed);
  };

  if (!song) {
    console.log("No song available to play.");
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 bg-gray-800 text-white rounded-full shadow-lg z-50 transition-all duration-300",
        isCollapsed ? "w-16 h-16" : "w-72 h-auto rounded-lg"
      )}
    >
      {isCollapsed ? (
        <div className="relative w-full h-full group">
          <Image
            width={500}
            height={500}
            src={
              song.image[song.image.length - 1].url ||
              "/placeholder.svg?height=80&width=80"
            }
            alt="Album Art"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-blue-400 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
          <button
            onClick={toggleCollapse}
            className="absolute -top-2 -right-2 bg-gray-700 rounded-full p-1 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors md:opacity-0 md:group-hover:opacity-100 duration-300"
            aria-label="Expand player"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={
                song.image[song.image.length - 1].url ||
                "/placeholder.svg?height=64&width=64"
              }
              alt="Album Art"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{song.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {song.artists.primary[0].name}
              </p>
            </div>
            <button
              onClick={toggleCollapse}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Collapse player"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={togglePlayPause}
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <div className="flex-1 flex items-center space-x-2">
              <Volume2 size={16} className="text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      )}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default MusicPlayer;

