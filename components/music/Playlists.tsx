"use client";

import React, { useState, useEffect } from "react";
import { deletePlaylist, getPlaylists } from "@/utils/music";
import { EllipsisVertical, Music } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import DeleteAlert from "./DeletePlaylistModal";
import { CreatePlaylist } from "./CreateOrEditPlaylist";
import { usePlaylist } from "@/context/Playlist";

const Playlists = ({
  user,
  refreshFlag,
}: {
  user: User;
  refreshFlag: boolean;
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state for editing
  const { toast } = useToast();
  const { setPlaylist } = usePlaylist();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true); // Reset loading state
        const userPlaylists = await getPlaylists(user?.name);
        setPlaylists(userPlaylists);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to load playlists." + err.message);
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [refreshFlag, user?.name]);

  const handleDelete = async () => {
    if (!selectedPlaylist) return;
    try {
      await deletePlaylist(selectedPlaylist.$id);
      setPlaylists((prev) =>
        prev.filter((playlist) => playlist.$id !== selectedPlaylist.$id)
      );
      setIsDeleteModalOpen(false);
      toast({
        title: "Success",
        description: "Playlist deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setIsEditModalOpen(true); // Open edit modal on edit click
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const handlePlaylistClick = (playlist: Playlist) => {
    setPlaylist(playlist);
  };
  return (
    <div className="space-y-4">
      {playlists.length > 0 ? (
        playlists.map((playlist, index) => (
          <div
            key={index}
            className="flex items-center py-2 mx-1 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer px-2"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full mr-2 ml-1">
              <Music className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800">
                {playlist.title}
              </h2>
              <p className="text-gray-700">{playlist.songs.length} songs</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-20">
                  <DropdownMenuCheckboxItem
                    className="hover:cursor-pointer text-red-500"
                    onClick={() => {
                      setSelectedPlaylist(playlist);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    className="hover:cursor-pointer"
                    onClick={() => handleEdit(playlist)} // Open edit modal
                  >
                    Edit
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-500 text-sm">No playlists found.</p>
          <p className="text-gray-600 mt-1">
            Create your first playlist to get started!
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteAlert
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* Edit Playlist Modal */}
      {isEditModalOpen && selectedPlaylist && (
        <CreatePlaylist
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          playlist={selectedPlaylist} // Pass the selected playlist
          refreshPlaylists={() => setIsEditModalOpen(false)} // Handle refresh
        />
      )}
    </div>
  );
};

export default Playlists;
