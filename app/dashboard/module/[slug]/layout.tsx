"use client";
import MusicPlayer from "@/components/MusicPlayer";
import { ModuleResourceProvider } from "@/context/ModuleResourceContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ModuleResourceProvider>
        {children}
        <MusicPlayer />
      </ModuleResourceProvider>
    </div>
  );
};
export default Layout;
