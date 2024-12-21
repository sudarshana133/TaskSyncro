export function validateURL(url: URL): string | null {
    if (!url) return "There is no URL";
    
    const validHostnames = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"];
    if (!validHostnames.includes(url.hostname)) {
        return "Please enter a valid YouTube URL";
    }

    return null;
}