"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaylistFromApi {
  id: string;
  name: string;
  type: string;
  image: { quality: string; url: string }[];
  url: string;
  songCount: number;
  language: string;
  explicitContent: boolean;
}

const MusicDashboard = () => {
  const router = useRouter();
  const [publicPlaylists, setPublicPlaylists] = useState<PlaylistFromApi[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queries = [
      "arrahman",
      "bollywood hits",
      "punjabi songs",
      "party mix",
      "romantic songs",
      "top 50 india",
      "indie music",
      "devotional songs",
      "workout playlist",
      "retro classics",
    ];

    const fetchPublicPlaylists = async () => {
      setLoading(true);
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      try {
        const { data } = await axios.get(
          `https://saavn.dev/api/search/playlists?query=${randomQuery}`
        );
        setPublicPlaylists(data.data.results || []);
      } catch (error) {
        console.error("Error fetching public playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPlaylists();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Public Playlists</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading playlists...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publicPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                router.push(`/dashboard/music/public-${playlist.id}`)
              }
            >
              <div className="p-4">
                <img
                  src={
                    playlist.image.find((img) => img.quality === "500x500")
                      ?.url || "/default-playlist.jpg"
                  }
                  alt={playlist.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h2 className="mt-2 text-lg font-bold">{playlist.name}</h2>
                <p className="text-sm text-gray-500">
                  {playlist.songCount} songs • {playlist.language.toUpperCase()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicDashboard;
