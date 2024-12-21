import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import Logout from "@/components/Logout";
import Leaderboard from "@/components/client/LeaderBoard";
import { Playlists } from "@/components/music/Playlists";

const Page = async () => {
  const user: User | null = await getLoggedInUser();

  if (!user || user === null) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <Logout />
          </div>
          <div className="p-6 space-y-4">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Name:</span> {user?.name}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            {user?.points !== undefined && (
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Points:</span> {user.points}
              </p>
            )}
          </div>
        </div>

        {/* Playlists */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600">
            <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
          </div>
          <div className="p-6">
            <Playlists user={user} />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-600">
            <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          </div>
          <div className="p-6">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
