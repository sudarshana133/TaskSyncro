"use client";
import { useMusic } from "@/context/MusicContext";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Volume2,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { AddToPlaylist } from "./AddToPlaylist";

const MusicPlayer = ({ user }: { user: User }) => {
  const { song } = useMusic();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlaylist, setIsPlaylist] = useState(false);

  useEffect(() => {
    if (song && audioRef.current) {
      try {
        const highestQualityUrl =
          song?.downloadUrl?.[song.downloadUrl.length - 1]?.url;
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = highestQualityUrl;
          audioRef.current.load();
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) =>
              console.error("Error attempting to play:", error)
            );
        }
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    }
  }, [song]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  if (!song) {
    return null;
  }

  const albumImage =
    song?.image?.[song.image.length - 1]?.url || "/placeholder.svg";
  const artistName = song?.artists?.primary?.[0]?.name || "Unknown Artist";

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 bg-white text-black border border-gray-300 rounded-full shadow-lg z-[999] transition-all duration-300",
        isCollapsed ? "w-16 h-16" : "w-72 h-auto rounded-lg"
      )}
    >
      {isCollapsed ? (
        <div className="relative w-full h-full group">
          <Image
            width={500}
            height={500}
            src={albumImage}
            alt="Album Art"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-800 bg-opacity-30 rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlayPause}
              className="text-black hover:text-blue-500 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
          <button
            onClick={toggleCollapse}
            className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 text-black hover:text-white hover:bg-blue-500 transition-colors md:opacity-0 md:group-hover:opacity-100 duration-300"
            aria-label="Expand player"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={albumImage}
              alt="Album Art"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 overflow-hidden flex gap-2 items-center">
              <div className="flex flex-col">
                <p className="text-sm font-medium truncate max-w-[5.25rem] text-gray-800">
                  {song.name}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[5.25rem]">
                  {artistName}
                </p>
              </div>
              <Button
                className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 w-8 h-8"
                onClick={() => setIsPlaylist(true)}
              >
                <PlusCircle />
              </Button>
            </div>
            <button
              onClick={toggleCollapse}
              className="text-gray-500 hover:text-blue-600 transition-colors ml-1"
              aria-label="Collapse player"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={togglePlayPause}
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 text-white transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <div className="flex-1 flex items-center space-x-2">
              <Volume2 size={16} className="text-gray-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      )}
      {isPlaylist && (
        <AddToPlaylist
          onClose={() => setIsPlaylist(false)}
          isOpen={isPlaylist}
          user={user}
          songId={song.id}
          songTitle={song.name}
        />
      )}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} loop />
    </div>
  );
};

export default MusicPlayer;
