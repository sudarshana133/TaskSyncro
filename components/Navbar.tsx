"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    return null;
  }
  return (
    <div>
      <div
        className="flex justify-between items-center p-4 bg-blue-500 text-white hover:cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <h1 className="text-xl font-bold">TaskSyncro</h1>
        <div className="flex items-center">
          {user.avatar && (
            <Image
              width={80}
              height={80}
              src={user.avatar}
              alt="User Avatar"
              className="rounded-full w-8 h-8 mr-2"
            />
          )}
          <Button
            onClick={() => {
              window.location.href = "/profile";
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
