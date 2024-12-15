"use client";
import { useEffect } from "react";
import { useModuleResource } from "@/context/ModuleResourceContext";
import { Loader2 } from "lucide-react";
import ReactPlayer from "react-player";
import DocViewer from "./DocViewer";

export function ResourceRenderer({
  resources,
}: {
  resources: ModuleResource[];
}) {
  const { currentResource, setCurrentResource } = useModuleResource();

  // Set the current resource to the first one if not already set
  useEffect(() => {
    if (!currentResource && resources.length > 0) {
      setCurrentResource(resources[0]);
    }
  }, [currentResource, resources, setCurrentResource]);

  // Handle case where no resources are available
  if (resources.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No resources available</p>
      </div>
    );
  }

  // If the current resource is not ready yet
  if (!currentResource) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Render the current resource based on its type
  switch (currentResource.type) {
    case "youtube":
      return (
        <div className="relative w-full pt-[56.25%]">
          <ReactPlayer
            url={currentResource.url}
            width="100%"
            height="100%"
            className="absolute top-0 left-0 rounded-lg overflow-hidden"
            controls
          />
        </div>
      );
    case "document":
      return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <DocViewer fileId={currentResource.url} />
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Unsupported resource type</p>
        </div>
      );
  }
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}
