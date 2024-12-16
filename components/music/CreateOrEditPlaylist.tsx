"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPlaylist, editPlaylist } from "@/utils/music";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function CreatePlaylist({
  isOpen,
  onClose,
  user,
  refreshPlaylists,
  playlist,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  refreshPlaylists: () => void;
  playlist?: Playlist;
}) {
  const [title, setTitle] = useState(playlist?.title || "");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateOrEditPlaylist = async () => {
    if (!title.trim()) {
      setError("Playlist title cannot be empty");
      return;
    }

    try {
      if (playlist) {
        await editPlaylist(playlist.$id, title);
        toast({
          title: "Success",
          description: "Playlist updated successfully",
        });
      } else {
        await createPlaylist(title, user.$id, user.name);
        toast({
          title: "Success",
          description: "Playlist created successfully",
        });
      }

      // Reset error state
      setError(null);

      // Explicitly call refresh and close
      refreshPlaylists();
      onClose();
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Ensure modal closes properly on cancel
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setError(null);
      setTitle(playlist?.title || "");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {playlist ? "Edit Playlist" : "Create Playlist"}
          </DialogTitle>
          <DialogDescription>
            {playlist ? "Edit your playlist" : "Create a new playlist"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4 justify-center">
          <Label htmlFor="name" className="text-right">
            Title
          </Label>
          <Input
            id="name"
            value={title}
            placeholder="Add title.."
            onChange={(e) => {
              setTitle(e.target.value);
              setError(null);
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateOrEditPlaylist}>
            {playlist ? "Save Changes" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
