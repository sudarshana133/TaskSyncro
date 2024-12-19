"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import MusicSearch from "./music/MusicSearch";

const Navbar = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlayListPage, setIsPlaylistPage] = useState(false);
  const pathname = usePathname();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/dashboard");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreateModule = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/dashboard/module?new=true");
    setIsMenuOpen(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/dashboard/music/profile");
    setIsMenuOpen(false);
  };
  const handlePlaylistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/dashboard/music");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const musicDetailPathRegex = /^\/dashboard\/music\/[^/]+$/;
    setIsPlaylistPage(musicDetailPathRegex.test(pathname));
    if (pathname === "/dashboard/music") {
      setIsPlaylistPage(true);
    }
  }, [pathname]);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-blue-500 text-white">
      <div className="flex justify-between items-center p-4 relative">
        {/* Logo Section */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <Image
            width={50}
            height={50}
            alt="logo"
            src="/favicon.jpg"
            className="rounded-lg shadow-md w-10 sm:w-14"
          />
          <h1 className="text-[15px] sm:text-xl font-bold">TaskSyncro</h1>
        </Link>

        {/* Desktop Music Search - Hidden on mobile */}
        {!isPlayListPage && (
          <div className="hidden md:block">
            <MusicSearch maxRes={5} isHideOn />
          </div>
        )}

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              className="p-2 text-white hover:bg-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="default" onClick={handlePlaylistClick}>
              Music
            </Button>
            <Button
              variant="secondary"
              onClick={handleCreateModule}
              className="px-2 sm:px-4"
            >
              Create Module <ArrowRight />
            </Button>

            <Button
              className="rounded-full w-9 h-9"
              onClick={handleProfileClick}
            >
              {user.name.charAt(0).toUpperCase() || "U"}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-500 md:hidden z-50">
            <div className="p-4">
              {/* Mobile Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={handlePlaylistClick}
                >
                  Music
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCreateModule}
                  className="w-full"
                >
                  Create New Module
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
