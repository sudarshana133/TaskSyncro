import { Button } from "@/components/ui/button";
import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import axios from "axios";
import Logout from "@/components/Logout";
import { cookies } from "next/headers";

const Page = async () => {
  const user: User | null = await getLoggedInUser();

  if (!user || user === null) {
    redirect("/login");
  }
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="mt-4">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        {user?.points !== undefined && (
          <p>
            <strong>Points:</strong> {user.points}
          </p>
        )}
      </div>
      {/* Logout Button */}
      <Logout/>
    </div>
  );
};

export default Page;
