import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/appwrite";
import React, { ReactNode } from "react";
import MusicPlayer from "@/components/music/MusicPlayer";
import { MusicProvider } from "@/context/MusicContext";
import { PlaylistProvider } from "@/context/PlaylistContext";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user) {
    console.log("User not found");
    return;
  }
  return (
    <div>
      <MusicProvider>
        <PlaylistProvider>
          <Navbar user={user} />
          {children}
          <MusicPlayer user={user} />
        </PlaylistProvider>
      </MusicProvider>
    </div>
  );
};

export default layout;
