import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Playlists } from "./Playlists";
import { CreatePlaylistButton } from "../client/CreatePlaylistButton";

const Sidebar = async ({ user }: { user: User }) => {
  return (
    <div className="w-full h-full p-4 space-y-4 bg-white">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
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
