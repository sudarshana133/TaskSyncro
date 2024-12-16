declare global {
    type Song = {
        id: string;
        name: string;
        type: string;
        year: string;
        releaseDate: string | null;
        duration: number; // in seconds
        label: string;
        explicitContent: boolean;
        playCount: number;
        language: string;
        hasLyrics: boolean;
        lyricsId: string | null;
        url: string;
        copyright: string;
        album: {
            id: string;
            name: string;
            url: string;
        };
        artists: {
            primary: Artist[];
            featured: Artist[];
            all: Artist[];
        };
        image: Image[];
        downloadUrl: DownloadUrl[];
    };

    type Artist = {
        id: string;
        name: string;
        role: string; // e.g., "singer", "lyricist"
        image: Image[];
        type: string;
        url: string;
    };

    type Image = {
        quality: string; // e.g., "50x50", "150x150"
        url: string;
    };

    type DownloadUrl = {
        quality: string; // e.g., "12kbps", "320kbps"
        url: string;
    };
    type Playlist = {
        $id: string;
        title: string;
        songs: Song[] | []
    }
}
export { };