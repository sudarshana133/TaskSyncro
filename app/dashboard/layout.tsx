import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/appwrite";
import React, { ReactNode } from "react";
import { MusicProvider } from "@/context/MusicContext";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user) {
    console.log("User not found");
    return;
  }
  return (
    <div>
      <MusicProvider>
        <Navbar user={user} />
        {children}
      </MusicProvider>
    </div>
  );
};

export default layout;
