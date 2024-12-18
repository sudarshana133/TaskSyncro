import BottomBar from "@/components/music/BottomBar";
import Sidebar from "@/components/music/Sidebar";
import { PlaylistProvider } from "@/context/Playlist";
import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <PlaylistProvider>
        <div className="flex flex-col h-screen">
          <div className="flex flex-1">
            {/* Large screen mode */}
            <div className="hidden md:block w-56">
              <Sidebar user={user} />
            </div>
            {/* Small screen mode */}
            <div className="fixed flex justify-center bottom-0 w-full md:hidden z-[999]">
              <BottomBar />
            </div>
            <main className="flex-1 md:pl-2 border-l-[1px] border-black">
              {children}
            </main>
          </div>
        </div>
      </PlaylistProvider>
    </>
  );
};
export default layout;
