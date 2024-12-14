import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface ModuleResourceContextType {
  currentResource: ModuleResource | null;
  setCurrentResource: (resource: ModuleResource | null) => void;
}

// Create the context with default values
const ModuleResourceContext = createContext<ModuleResourceContextType | undefined>(undefined);

// Provider component
export const ModuleResourceProvider = ({ children }: { children: ReactNode }) => {
  const [currentResource, setCurrentResource] = useState<ModuleResource | null>(null);

  return (
    <ModuleResourceContext.Provider value={{ currentResource, setCurrentResource }}>
      {children}
    </ModuleResourceContext.Provider>
  );
};

// Hook to use the context
export const useModuleResource = (): ModuleResourceContextType => {
  const context = useContext(ModuleResourceContext);
  if (!context) {
    throw new Error("useModuleResource must be used within a ModuleResourceProvider");
  }
  return context;
};
