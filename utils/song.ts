import axios from "axios";

export const getSongFromApi = async (songId: string): Promise<Song> => {
    try {
        if (!songId) {
            throw new Error("Song ID not provided");
        }

        const res = await axios.get(`https://saavn.dev/api/songs/${songId}`);

        if (!res.data || !res.data.data) {
            throw new Error("Invalid response from API");
        }

        return res.data.data;
    } catch (error: any) {
        console.error("Error fetching song from API:", error.message);
        throw new Error(error.message);
    }
};

