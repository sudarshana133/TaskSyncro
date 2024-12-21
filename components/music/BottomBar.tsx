import Link from "next/link";
import { Home, Search, Library, User } from "lucide-react";

const BottomBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/dashboard"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/dashboard/music/search"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link
          href="/dashboard/music/playlists"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <Library size={24} />
          <span className="text-xs mt-1">Library</span>
        </Link>
        <Link
          href="/dashboard/music/profile"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomBar;
