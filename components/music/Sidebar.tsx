import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Playlists } from "./Playlists";
import { CreatePlaylistButton } from "../client/CreatePlaylistButton";

const Sidebar = async ({ user }: { user: User }) => {
  return (
    <div className="w-full h-full p-4 space-y-6 bg-gray-50 rounded-lg shadow-inner">
      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg">
          <CardTitle className="text-lg sm:text-xl font-bold text-white">
            Your Playlists
          </CardTitle>
          <CreatePlaylistButton user={user} />
        </CardHeader>
      </Card>

      <Playlists user={user} />
    </div>
  );
};

export default Sidebar;
