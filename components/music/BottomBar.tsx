"use client";
import { Home, Search, User, ListMusic, Play, Pause, MusicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BottomBar = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-gray-800 shadow-md z-[40] border-t border-gray-200">
      <div className="flex justify-around items-center px-4 py-3">
        {/* Navigation Buttons */}
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="flex flex-col items-center hover:text-blue-600 transition bg-transparent focus:bg-transparent"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => handleNavigation("/dashboard/music")}
          className="flex flex-col items-center hover:text-blue-600 transition bg-transparent focus:bg-transparent"
        >
          <ListMusic className="w-6 h-6" />
          <span className="text-xs mt-1">Playlists</span>
        </button>
        <button
          onClick={() => handleNavigation("/dashboard/music/search")}
          className="flex flex-col items-center hover:text-blue-600 transition bg-transparent focus:bg-transparent"
        >
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button
          onClick={() => handleNavigation("/dashboard/music/playlists")}
          className="flex flex-col items-center hover:text-blue-600 transition bg-transparent focus:bg-transparent"
        >
          <MusicIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Your playlists</span>
        </button>
        <button
          onClick={() => handleNavigation("/dashboard/music/profile")}
          className="flex flex-col items-center hover:text-blue-600 transition bg-transparent focus:bg-transparent"
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
