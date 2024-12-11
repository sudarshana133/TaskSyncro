import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default layout;
