"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAlert from "../music/DeletePlaylistModal";
import { deleteSong } from "@/utils/song";

interface SongActionsProps {
  song: Song;
}

export default function SongActions({ song }: SongActionsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSong(song.id);
      router.refresh();
      setIsDeleteModalOpen(false);
      toast({
        title: "Success",
        description: "Song deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete Song: ${error.message}`,
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
            <MoreHorizontal className="w-4 h-4" />
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
    </>
  );
}
