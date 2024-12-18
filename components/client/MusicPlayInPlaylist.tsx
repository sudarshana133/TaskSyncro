"use client";
import { PlayIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useMusic } from "@/context/MusicContext";

const MusicPlayInPlaylist = ({ song }: { song: Song }) => {
  const { setSong } = useMusic();
  const handleMusicPlay = () => {
    setSong(song);
  };
  return (
    <div>
      <Button
        className="hidden group-hover:flex bg-green-500 text-white rounded-full shadow-md hover:shadow-lg focus:ring focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
        size="icon"
        onClick={handleMusicPlay}
      >
        <PlayIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
export default MusicPlayInPlaylist;
