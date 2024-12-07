import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </UserProvider>
  );
};

export default layout;
