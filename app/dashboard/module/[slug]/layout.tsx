"use client"
import { ModuleResourceProvider } from "@/context/ModuleResourceContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ModuleResourceProvider>{children}</ModuleResourceProvider>;
};
export default layout;
