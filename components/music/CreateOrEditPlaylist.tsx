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
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CreatePlaylist({
  isOpen,
  onClose,
  user,
  playlist,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  playlist?: Playlist;
}) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Reset states when playlist changes or modal opens
  useEffect(() => {
    if (playlist) {
      setTitle(playlist.title || "");
    } else {
      setTitle("");
    }
    setError(null);
  }, [playlist, isOpen]);

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

      // Reset states and close modal
      setTitle("");
      setError(null);
      router.refresh();
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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
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
            {playlist
              ? "Edit the details of your playlist."
              : "Add a title for your new playlist."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              value={title}
              placeholder="Add a title..."
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null); // Clear error on input change
              }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateOrEditPlaylist}>
            {playlist ? "Save Changes" : "Create"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
