"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deletePlaylist } from "@/utils/music";
import { useState } from "react";
import DeleteAlert from "../music/DeletePlaylistModal";
import { CreatePlaylist } from "../music/CreateOrEditPlaylist";

interface PlaylistActionsProps {
  playlist: Playlist;
  user: User;
}

export default function PlaylistActions({
  playlist,
  user,
}: PlaylistActionsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePlaylist(playlist.$id);
      router.refresh();
      setIsDeleteModalOpen(false);
      toast({
        title: "Success",
        description: "Playlist deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete playlist: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-red-500 focus:text-red-600"
            onSelect={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsEditModalOpen(true)}>
            <Edit className="mr-2 w-4 h-4" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteAlert
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* Edit Playlist Modal */}
      {isEditModalOpen && (
        <CreatePlaylist
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          playlist={playlist}
          user={user}
        />
      )}
    </>
  );
}
