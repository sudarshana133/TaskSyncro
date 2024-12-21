import { getPlaylists } from "@/utils/music";
import { ArrowRight, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PlaylistActions from "../client/PlaylistActions";
import Link from "next/link";

export const Playlists = async ({ user }: { user: User }) => {
  const playlists = await getPlaylists(user.name);

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {playlists.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {playlists.map((playlist, index) => (
              <div
                className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 group"
                key={index}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-full flex items-center justify-center shadow-md">
                    <Music className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-grow min-w-0 mr-4">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {playlist.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {playlist.songs.length}{" "}
                    {playlist.songs.length === 1 ? "song" : "songs"}
                  </p>
                  <Link
                    href={`/dashboard/music/${playlist.$id}`}
                    className="inline-block mt-2"
                  >
                    <div className="text-xs font-medium text-blue-600 group-hover:text-blue-800 transition-colors duration-200">
                      <div className="flex items-center">
                        View <ArrowRight className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </div>
                <PlaylistActions playlist={playlist} user={user} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500">
            <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold">No playlists found</p>
            <p className="text-sm mt-2">
              Create your first playlist to get started
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
