"use client";
import { Home, Search, User, ListMusic, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BottomBar = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-gray-800 shadow-md z-50 border-t border-gray-200">
      <div className="flex justify-around items-center px-4 py-3">
        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("/dashboard")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("/dashboard/music")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <ListMusic className="w-6 h-6" />
          <span className="text-xs mt-1">Playlists</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("/dashboard/music/search")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">Search</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("/dashboard/music/profile")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;
