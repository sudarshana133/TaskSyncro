"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  deleteModuleResource,
  fetchModuleResources,
} from "@/utils/module-resource-util";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModuleResource } from "@/context/ModuleResourceContext";

interface ModulePreviewProps {
  slug: string;
  isEdit?: boolean;
  resources: ModuleResource[];
}

const ModulePreview = ({
  slug,
  isEdit = false,
  resources,
}: ModulePreviewProps) => {
  const { toast } = useToast();
  const { setCurrentResource } = useModuleResource();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      await deleteModuleResource(id);
      toast({
        title: "Deleted",
        description: "Resource successfully deleted.",
        className: "bg-green-400",
      });
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete the resource.",
        variant: "destructive",
      });
    }
  };
  function handleResourceClick(selectedResource: ModuleResource) {
    setCurrentResource(selectedResource);
  }
  return (
    <Card className="max-h-[calc(100vh-210px)] shadow-lg transition-shadow duration-300 hover:shadow-xl flex flex-col">
      <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg">
        <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-between">
          Module Resources
          {isEdit && (
            <Button
              onClick={() => {
                router.refresh();
              }}
              variant="outline"
              size="sm"
              className="transition-colors duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground"
            >
              Refresh
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-6 pb-6 px-6">
        {resources.length > 0 ? (
          <ul className="space-y-4">
            {resources.map((resource: ModuleResource) => (
              <li
                key={resource.$id}
                className="flex items-center bg-white p-4 sm:p-6 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-lg hover:cursor-pointer"
                onClick={() => handleResourceClick(resource)}
              >
                {resource.type === "youtube" ? (
                  <img
                    src="https://i.ytimg.com/vi/UrsmFxEIp5k/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBm9X2Vozsbpfw8ihb1mR7DCytnWQ"
                    alt="YouTube Video Thumbnail"
                    width={120}
                    height={80}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-[120px] h-[80px] bg-gray-100 rounded-md">
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div className="flex items-center justify-between w-full gap-2 ml-4">
                  <div>
                    <p className="text-primary hover:text-primary-dark font-medium text-md sm:text-lg transition-colors duration-200">
                      {resource.title || "Untitled Resource"}
                    </p>
                    {resource.type === "youtube" ? (
                      <p className="text-sm text-gray-500 mt-1">
                        YouTube Video
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">PDF Document</p>
                    )}
                  </div>
                  {isEdit && (
                    <div
                      className="text-red-600 hover:cursor-pointer"
                      onClick={() => handleDelete(resource.$id)}
                    >
                      <Trash />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-center py-8">
            No resources available for this module.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ModulePreview;
