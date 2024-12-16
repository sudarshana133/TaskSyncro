"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Playlists from "./Playlists";
import { useState, useCallback } from "react";
import { CreatePlaylist } from "./CreateOrEditPlaylist";

const Sidebar = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const refreshPlaylists = useCallback(() => {
    // Use functional update to ensure state change
    setRefreshFlag((prev) => !prev);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Your Playlists
        </h1>
        <button
          onClick={handleOpenModal}
          className="rounded-md bg-transparent px-3 py-2 text-sm font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5 text-black" />
        </button>
      </div>
      <div>
        <Playlists user={user} refreshFlag={refreshFlag} />
      </div>
      <CreatePlaylist
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
        refreshPlaylists={refreshPlaylists}
      />
    </div>
  );
};

export default Sidebar;
