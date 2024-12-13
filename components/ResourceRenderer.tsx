"use client";
import { Loader2 } from "lucide-react";
import ReactPlayer from "react-player";

export function ResourceRenderer({
  resources,
}: {
  resources: ModuleResource[];
}) {
  if (resources.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No resources available</p>
      </div>
    );
  }

  const firstResource = resources[0];

  switch (firstResource.type) {
    case "youtube":
      return (
        <div className="relative w-full pt-[56.25%]">
          <ReactPlayer
            url={firstResource.url}
            width="100%"
            height="100%"
            className="absolute top-0 left-0 rounded-lg"
            controls
          />
        </div>
      );
    case "document":
      return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            PDF Preview (Placeholder)
          </h1>
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
