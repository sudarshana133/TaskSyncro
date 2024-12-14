import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/appwrite";
import { notFound, redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user) {
    console.log("User not found");
    return;
  }
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default layout;
