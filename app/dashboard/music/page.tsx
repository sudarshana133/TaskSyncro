"use client";
import MusicSearch from "@/components/music/MusicSearch";
import { usePlaylist } from "@/context/Playlist";

const Page = () => {
  const { playlist } = usePlaylist();
  if (!playlist) {
    return <h1>Playlist not selected</h1>;
  }
  return (
    <div>
      <MusicSearch />
      {playlist.songs.length > 0 ? (
        playlist.songs.map((song, index) => <h1 key={index}>song</h1>)
      ) : (
        <h1>No song</h1>
      )}
    </div>
  );
};
export default Page;
