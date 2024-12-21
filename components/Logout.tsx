"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="text-white hover:text-gray-200 hover:bg-white/10 transition-colors duration-200"
    >
      <LogOut className="w-5 h-5 mr-2" />
      Logout
    </Button>
  );
};

export default Logout;
