"use client";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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
    <div>
      <Button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white rounded px-4 py-2"
      >
        Logout
      </Button>
    </div>
  );
};
export default Logout;
