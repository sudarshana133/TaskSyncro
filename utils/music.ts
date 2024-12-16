import { database } from "@/lib/appwrite-server"
import { database_id } from "./module-resource-util"
import { ID, Query } from "node-appwrite";
import { getLoggedInUser } from "@/lib/appwrite";

export const userCollectionId = process.env.NEXT_PUBLIC_USER_COLLECTION_ID!;
export const musicPlaylistCollectionId = process.env.NEXT_PUBLIC_MUSIC_PLAYLIST_COLLECTION_ID!;
export const getPlaylists = async (name: string): Promise<Playlist[]> => {
    try {
        if (!name) {
            throw new Error("Name not provided");
        }

        const data = await database.listDocuments(database_id, musicPlaylistCollectionId, [
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
        await database.createDocument(database_id, musicPlaylistCollectionId, ID.unique(), documentData);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
export const deletePlaylist = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Id not provided");
        }
        await database.deleteDocument(database_id, musicPlaylistCollectionId, id);
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const editPlaylist = async (id: string, title: string) => {
    try {
        if (!id || !title) {
            throw new Error("Some details are missing");
        }
        await database.updateDocument(database_id, musicPlaylistCollectionId, id, {
            title
        });
    } catch (error: any) {
        throw new Error(error.message)
    }
}