import { database } from "@/lib/appwrite-server"
import { database_id } from "./module-resource-util"
import { ID, Query } from "node-appwrite";
import { musicCollectionId } from "@/constants/environment";
import axios from "axios";

export const userCollectionId = process.env.NEXT_PUBLIC_USER_COLLECTION_ID!;
export const songCollectionId = process.env.NEXT_PUBLIC_SONGS_COLLECTION_ID!;
export const getPlaylists = async (name: string): Promise<Playlist[]> => {
    try {
        if (!name) {
            throw new Error("Name not provided");
        }

        const data = await database.listDocuments(database_id, musicCollectionId, [
            Query.equal("creator", name)
        ]);
        const playlists: Playlist[] = data.documents.map((doc) => {
            return {
                $id: doc.$id,
                title: doc.title,
                songs: doc.songs,
            };
        });
        return playlists;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
export const createPlaylist = async (title: string, userId: string, userName: string) => {
    try {
        if (!title) {
            throw new Error("Title not provided");
        }
        const documentData = {
            title,
            songs: [],
            user: userId,
            creator: userName
        }
        await database.createDocument(database_id, musicCollectionId, ID.unique(), documentData);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
export const deletePlaylist = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Id not provided");
        }
        await database.deleteDocument(database_id, musicCollectionId, id);
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const editPlaylist = async (id: string, title: string) => {
    try {
        if (!id || !title) {
            throw new Error("Some details are missing");
        }
        await database.updateDocument(database_id, musicCollectionId, id, {
            title
        });
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const getUserPlaylist = async (creator: string): Promise<Playlist[]> => {
    try {
        if (!creator) {
            throw new Error("Creator name not provided");
        }
        const data = await database.listDocuments(database_id, musicCollectionId, [
            Query.equal("creator", creator)
        ])
        const playlists: Playlist[] = data.documents.map((doc) => {
            return {
                $id: doc.$id,
                songs: doc.songs,
                title: doc.title,
            }
        });
        return playlists;
    } catch (error: any) {
        throw new Error("Error" + error.message);
    }
}
export const getPlaylistByTitle = async (
    creator: string,
    title: string
): Promise<Playlist[]> => {
    try {
        if (!creator || !title) {
            throw new Error("Creator or title name not provided.");
        }

        // Fetch playlists by creator
        const data = await database.listDocuments(
            database_id,
            musicCollectionId,
            [Query.equal("creator", creator)]
        );

        const regex = new RegExp(title, "i");
        const playlists: Playlist[] = data.documents
            .filter((doc) => regex.test(doc.title))
            .map((doc) => ({
                $id: doc.$id,
                songs: doc.songs || [],
                title: doc.title || "Untitled",
            }));

        return playlists;
    } catch (error: any) {
        throw new Error(`Failed to fetch playlists: ${error.message}`);
    }
};
export const addToPlaylists = async (playlists: string[], songId: string, title: string) => {
    try {
        if (!playlists || !songId) {
            throw new Error("Missing information");
        }
        else if (playlists.length === 0) {
            throw new Error("You didn't select any playlists");
        }
        for (const playlist of playlists) {
            try {
                await addSongToPlaylist(playlist, songId, title);
            } catch (error: any) {
                throw new Error(`Error adding song to playlist: ${playlist}`, error.message);
            }
        }
    } catch (error: any) {
        throw new Error("Error", error.message);
    }
}
export const addSongToPlaylist = async (playlistId: string, songId: string, title: string) => {
    try {
        if (!playlistId || !songId || !title) {
            throw new Error("Missing some details");
        }
        const documentData = {
            title,
            id: songId,
            musicPlaylist: playlistId
        }
        await database.createDocument(database_id, songCollectionId, ID.unique(), documentData);
    } catch (error: any) {
        throw new Error("Error", error.message);
    }
};
export const getPlaylistById = async (playlistId: string) => {
    try {
        if (!playlistId) {
            throw new Error("playlistId not provided");
        }

        const data = await database.getDocument(database_id, musicCollectionId, playlistId);
        const playlist = data;
        return playlist;
    } catch (error: any) {
        throw new Error(error.message);
    }
};