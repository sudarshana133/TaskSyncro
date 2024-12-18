import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, HeartIcon } from "lucide-react";
import MusicSearch from "@/components/music/MusicSearch";
import { usePlaylist } from "@/context/Playlist";
import { getPlaylistSongs } from "@/utils/playlist";
import { useEffect, useState } from "react";
import PlaylistSongs from "@/components/music/PlaylistSongs";
import { getPlaylistById } from "@/utils/music";
import axios from "axios";
import Image from "next/image";

const Page = async ({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) => {
  const playlistId = (await params).playlistId;

  let playlist, songs;
  if (playlistId.startsWith("public-")) {
    const publicPlaylistId = playlistId.replace("public-", "");
    const { data } = await axios.get(
      `https://saavn.dev/api/playlists?id=${publicPlaylistId}`
    );
    playlist = data.data;
    songs = playlist.songs;
  } else {
    playlist = await getPlaylistById(playlistId);
    songs = await getPlaylistSongs(playlistId);
  }
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-4">
          <MusicSearch maxRes={10} isHideOn={true} />
        </div>
        <Card className="w-full">
          <CardHeader className="border-b p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                {playlist.title !== undefined ? (
                  <span className="text-4xl sm:text-6xl font-bold text-gray-500 uppercase">
                    {playlist.title.charAt(0)}
                  </span>
                ) : (
                  <Image
                    width={1000}
                    height={1000}
                    src={playlist.image[playlist.image.length - 1].url}
                    alt="playlist image"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left w-full">
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
                  {playlist.title}
                </h1>
                <div className="flex justify-center sm:justify-start items-center space-x-2 sm:space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-gray-600 hover:text-black w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            {songs && songs.length > 0 ? (
              <PlaylistSongs songs={songs} />
            ) : (
              <div className="text-center py-10 text-gray-500">
                No songs in this playlist
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
