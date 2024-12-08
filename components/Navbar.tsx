"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleDashboardClick = (e: any) => {
    e.stopPropagation(); // Prevent outer div click
    router.push("/dashboard");
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white hover:cursor-pointer">
        <Link href="/dashboard">
          <div className="flex items-center space-x-3 hover:cursor-pointer">
            <Image
              width={50}
              height={50}
              alt="logo"
              src="/favicon.jpg"
              className="rounded-lg shadow-md w-10 sm:w-14"
            />
            <h1 className="text-[16px] sm:text-xl font-bold">TaskSyncro</h1>
          </div>
        </Link>
        <div className="flex items-center" onClick={handleDashboardClick}>
          {user.avatar && (
            <Image
              width={80}
              height={80}
              src={user.avatar}
              alt="User Avatar"
              className="rounded-full w-8 h-8 mr-2"
            />
          )}
          <div className="mr-2">
            <Button
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/dashboard/module?new=true");
              }}
            >
              Create <ArrowRight />
            </Button>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/dashboard/profile");
            }}
            className="rounded-full w-9 h-9"
          >
            {user.name.charAt(0).toUpperCase() || "U"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
