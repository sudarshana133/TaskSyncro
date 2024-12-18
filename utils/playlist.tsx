import { database_id, musicCollectionId } from "@/constants/environment";
import { database } from "@/lib/appwrite-server";
import { getSongFromApi } from "./song";

interface SongArr {
  id: string;
  title: string;
}

export const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
  try {
    if (!playlistId) {
      throw new Error("No playlist ID provided");
    }

    // Fetch playlist document
    const data = await database.getDocument(
      database_id,
      musicCollectionId,
      playlistId
    );


    if (!data.songs || !Array.isArray(data.songs)) {
      throw new Error("Invalid songs data in playlist");
    }

    const SONGSFROMAPI: SongArr[] = data.songs;

    const songs = await Promise.all(
      SONGSFROMAPI.map(async (song) => {
        try {
          const fetchedSong = await getSongFromApi(song.id);
          return Array.isArray(fetchedSong) ? fetchedSong[0] : fetchedSong; // Handle extra wrapper
        } catch (error: any) {
          console.error(
            `Error fetching song with ID ${song.id}:`,
            error.message
          );
          return null;
        }
      })
    );

    return songs.filter((song): song is Song => song !== null);
  } catch (error: any) {
    console.error("Error in getPlaylistSongs:", error.message);
    throw new Error(error.message);
  }
};
