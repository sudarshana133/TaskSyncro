import { getPlaylists } from "@/utils/music";
import { ArrowRight, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PlaylistActions from "../client/PlaylistActions";
import Link from "next/link";

export const Playlists = async ({ user }: { user: User }) => {
  const playlists = await getPlaylists(user.name);

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {playlists.length > 0 ? (
          <div className="divide-y">
            {playlists.map((playlist, index) => (
              <div
                className="flex items-center p-4 hover:bg-gray-100 transition-colors group"
                key={index}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                    <Music className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-grow min-w-0 mr-4">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {playlist.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {playlist.songs.length} songs
                  </p>
                  <Link href={`/dashboard/music/${playlist.$id}`}>
                    <div className="text-xs text-blue-500 group-hover:text-blue-600">
                      <div className="flex items-center justify-center">
                        View <ArrowRight />
                      </div>
                    </div>
                  </Link>
                </div>
                <PlaylistActions playlist={playlist} user={user} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 text-gray-500">
            <p>No playlists found</p>
            <p className="text-xs mt-2">Create your first playlist</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
