"use client";
import { ModuleResourceProvider } from "@/context/ModuleResourceContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ModuleResourceProvider>{children}</ModuleResourceProvider>
    </div>
  );
};
export default Layout;
