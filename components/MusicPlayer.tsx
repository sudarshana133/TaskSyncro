"use client";
import { useMusic } from "@/context/MusicContext";
import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Volume1, 
  VolumeX 
} from "lucide-react";

const MusicPlayer = () => {
  const { song } = useMusic();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (song && audioRef.current) {
      try {
        // Attempt to load and play the highest quality download URL
        const highestQualityUrl = song.downloadUrl[song.downloadUrl.length - 1].url;
        audioRef.current.src = highestQualityUrl;
        audioRef.current.load();
        
        // Attempt to play
        audioRef.current.play().catch(error => {
          console.error("Error attempting to play:", error);
        });
        
        setIsPlaying(true);
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

  if (!song) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white rounded-lg shadow-lg p-4 w-72 z-50">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={song.image[0].url || "https://via.placeholder.com/150"} 
          alt="Album Art"
          className="w-16 h-16 rounded object-cover"
        />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">{song.name}</p>
          <p className="text-xs text-gray-400 truncate">
            {song.artists.primary[0].name}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-2">
        <button 
          onClick={togglePlayPause} 
          className="bg-blue-500 p-2 rounded-full hover:bg-blue-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-gray-700 rounded-full appearance-none"
        />
      </div>

      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default MusicPlayer;