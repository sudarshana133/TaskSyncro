"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { CreatePlaylist } from "../music/CreateOrEditPlaylist";

export const CreatePlaylistButton = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={handleOpenModal}
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      <CreatePlaylist
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
    </>
  );
};
