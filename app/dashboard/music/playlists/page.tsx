import { Suspense } from "react";
import { getLoggedInUser } from "@/lib/appwrite";
import { Playlists } from "@/components/music/Playlists";
import { Button } from "@/components/ui/button";
import { PlusCircle, Music } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreatePlaylistButton } from "@/components/client/CreatePlaylistButton";

const PlaylistsPage = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Music</h1>
        <p className="text-gray-600">Discover and manage your playlists</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Playlists */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Music className="w-6 h-6 mr-2" />
                Your Playlists
              </h2>
              <CreatePlaylistButton user={user} />
            </div>
            <div className="p-6">
              <Suspense fallback={<PlaylistsSkeleton />}>
                <Playlists user={user} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaylistsSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);

export default PlaylistsPage;
