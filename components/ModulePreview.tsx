"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface ModulePreviewProps {
  slug: string;
  isEdit?: boolean;
  resources: ModuleResource[];
  setResources: Dispatch<SetStateAction<ModuleResource[]>>;
}

const ModulePreview = ({
  slug,
  isEdit,
  resources,
  setResources,
}: ModulePreviewProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/modules/${slug}`);
      setResources(response.data.resources || []);
    } catch (err: any) {
      console.log("Failed to fetch resources:", err);
      setError(err.response?.data?.error || "Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/modules/${slug}`, {
        data: {
          moduleResourceId: id,
        },
      });
      setResources((resources) => resources.filter((r) => r.$id !== id));
      toast({
        title: "Success!",
        description: res.data.message,
        className: "bg-green-400",
      });
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchResources();
  }, [slug]);

  return (
    <Card className="max-h-[calc(100vh-210px)] shadow-lg transition-shadow duration-300 hover:shadow-xl flex flex-col">
      <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg">
        <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-between">
          Module Resources
          {isEdit && (
            <Button
              onClick={fetchResources}
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
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-20 w-32 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && resources.length > 0 ? (
          <ul className="space-y-4">
            {resources.map((resource: ModuleResource) => (
              <li
                key={resource.$id}
                className="flex items-center space-x-4 bg-white p-0 sm:p-4 rounded-md shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <img
                  src="https://i.ytimg.com/vi/UrsmFxEIp5k/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBm9X2Vozsbpfw8ihb1mR7DCytnWQ"
                  alt="Resource Thumbnail"
                  width={120}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex items-center justify-between w-full gap-2">
                  <div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark font-medium text-md sm:text-lg transition-colors duration-200"
                    >
                      {resource.title || "Untitled Resource"}
                    </a>
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
                      onClick={() => {
                        handleDelete(resource.$id);
                      }}
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
