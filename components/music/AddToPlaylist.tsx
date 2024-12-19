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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  addToPlaylists,
  getPlaylistByTitle,
  getPlaylists,
} from "@/utils/music";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export function AddToPlaylist({
  isOpen,
  onClose,
  user,
  songId,
  songTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  songId: string;
  songTitle: string;
}) {
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const debounceValue = useDebounce(title, 300);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const searchUserPlaylist = async () => {
    try {
      const playlists = await getPlaylists(user.name);
      if (playlists.length > 5) {
        setPlaylists(playlists.slice(0, 4));
        return;
      }
      setPlaylists(playlists);
    } catch (error: any) {
      console.error("Error fetching user playlists:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching playlists.",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    searchUserPlaylist();
  }, []);

  useEffect(() => {
    if (!debounceValue) {
      searchUserPlaylist();
    }
    if (debounceValue) {
      const searchForPlaylist = async () => {
        try {
          const playlists = await getPlaylistByTitle(user.name, debounceValue);
          if (playlists.length > 5) {
            setPlaylists(playlists.slice(0, 4));
            return;
          }
          setPlaylists(playlists);
        } catch (error: any) {
          console.error("Error searching playlists by title:", error);
          toast({
            title: "Error",
            description: "An error occurred while searching playlists.",
            variant: "destructive",
          });
        }
      };
      searchForPlaylist();
    }
  }, [debounceValue]);

  const togglePlaylistSelection = (playlistId: string) => {
    setError(null);
    setSelectedPlaylists(
      (prev) =>
        prev.includes(playlistId)
          ? prev.filter((id) => id !== playlistId) // Remove if already selected
          : [...prev, playlistId] // Add if not selected
    );
  };

  const handleAddToPlaylist = async () => {
    if (selectedPlaylists.length === 0) {
      setError("You didn't select any playlists to save song");
    }
    try {
      await addToPlaylists(selectedPlaylists, songId, songTitle);
      toast({
        title: "Success!",
        description: "Successfully saved songs to playlists",
        className: "bg-green-500",
      });
      router.refresh();
      onClose();
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Playlists</DialogTitle>
          <DialogDescription>
            Add songs to an existing playlist or create a new one.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4 justify-center">
          <Label htmlFor="name" className="text-right">
            Title
          </Label>
          <Input
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search by title..."
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {playlists &&
            playlists.map((playlist) => (
              <div key={playlist.$id} className="flex gap-2 items-center">
                <Input
                  type="checkbox"
                  className="w-5 h-5 hover:cursor-pointer"
                  checked={selectedPlaylists.includes(playlist.$id)}
                  onChange={() => togglePlaylistSelection(playlist.$id)}
                />
                <h1>{playlist.title}</h1>
              </div>
            ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddToPlaylist}>
            Add to Playlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
