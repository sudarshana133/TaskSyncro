"use client";

import { useMusic } from "@/context/MusicContext";
import { usePlaylist } from "@/context/PlaylistContext";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  PlusCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AddToPlaylist } from "./AddToPlaylist";

const MusicPlayer = ({ user }: { user: User }) => {
  const { song, setSong } = useMusic();
  const { playNextSong, playPreviousSong, playlist, setPlaylist } =
    usePlaylist();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      setIsMuted(!isMuted);
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
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
        "fixed bottom-[4rem] md:bottom-4 left-4 bg-white text-black border border-gray-300 rounded-full shadow-lg transition-all duration-300",
        isCollapsed ? "w-16 h-16" : "w-80 h-auto rounded-lg"
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
          <div className="flex items-center space-x-4 mb-4 relative">
            <Image
              src={albumImage}
              alt="Album Art"
              width={500}
              height={500}
              className="rounded-lg object-cover w-20 h-20"
            />
            <div className="flex-1 overflow-hidden flex gap-2 items-center">
              <div className="flex flex-col">
                <p className="text-sm font-medium truncate max-w-[8rem] text-gray-800">
                  {song.name}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[8rem]">
                  {artistName}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end mt-4 gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="Add to Playlists"
              >
                <PlusCircle size={20} />
              </button>
              <button
                onClick={toggleCollapse}
                className="text-gray-500 hover:text-blue-600 transition-colors ml-1"
                aria-label="Collapse player"
              >
                <ChevronDown size={20} />
              </button>
            </div>
            <div className="absolute top-[-5px] right-[-3px]">
              <button
                onClick={() => {
                  setSong(null);
                  setPlaylist(null);
                }}
              >
                <X />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <button onClick={playPreviousSong} aria-label="Previous Song">
              <SkipBack
                size={20}
                className="text-gray-600 hover:text-blue-500"
              />
            </button>
            <button
              onClick={togglePlayPause}
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 text-white transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={playNextSong} aria-label="Next Song">
              <SkipForward
                size={20}
                className="text-gray-600 hover:text-blue-500"
              />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 size={16} className="text-gray-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer"
              aria-label="Volume"
            />
            <button onClick={toggleMute} aria-label="Mute">
              {isMuted ? (
                <VolumeX
                  size={16}
                  className="text-gray-600 hover:text-blue-500"
                />
              ) : (
                <Volume2
                  size={16}
                  className="text-gray-600 hover:text-blue-500"
                />
              )}
            </button>
          </div>

          <div className="flex items-center mt-4">
            <span className="text-xs text-gray-500">
              {isNaN(currentTime) || !currentTime
                ? "00:00"
                : new Date(currentTime * 1000).toISOString().substr(14, 5)}
            </span>
            <input
              type="range"
              min="0"
              max={isNaN(duration) || !duration ? 0 : duration}
              step="0.01"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 mx-2 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer"
              aria-label="Seek"
            />
            <span className="text-xs text-gray-500">
              {isNaN(duration) || !duration
                ? "00:00"
                : new Date(duration * 1000).toISOString().substr(14, 5)}
            </span>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={() => {
          if (playlist === null) {
            audioRef.current?.play();
          } else {
            playNextSong();
          }
        }}
        loop={false}
      />
      {isModalOpen && (
        <AddToPlaylist
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={user}
          songId={song.id}
          songTitle={song.name}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
