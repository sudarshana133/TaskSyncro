"use client";

import ModulePreview from "@/components/ModulePreview";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { slug } = useParams();
  const [resources, setResources] = useState<ModuleResource[]>([]);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const slugString = Array.isArray(slug) ? slug[0] : slug;

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/modules/${slugString}`);
      setResources(response.data.resources || []);
    } catch (err: any) {
      console.error("Failed to fetch resources:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to load resources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slugString) {
      fetchResources();
    }
  }, [slugString]);

  if (!slugString) return null;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex flex-col lg:flex-row w-full gap-8 mt-6">
        {/* Conditional Rendering of Resource Type */}
        <div className="flex-1 lg:w-2/3">
          {loading ? (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : resources.length > 0 && resources[0].type === "youtube" ? (
            <div className="relative w-full pt-[56.25%]">
              <ReactPlayer
                url={resources[0].url}
                width="100%"
                height="100%"
                className="absolute top-0 left-0 rounded-lg"
                controls
              />
            </div>
          ) : resources.length > 0 && resources[0].type === "document" ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold text-center text-gray-700">
                PDF Preview (Placeholder)
              </h1>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">No resources available</p>
            </div>
          )}
        </div>

        {/* Module Preview */}
        <div className="flex-1 lg:w-1/3">
          <ModulePreview
            slug={slugString}
            resources={resources}
            setResources={setResources}
            isEdit={false}
          />
        </div>
      </div>
      <Button
        className="absolute top-2 right-4"
        onClick={() => {
          router.push(`${pathName}/edit`);
        }}
      >
        Edit <Pencil />
      </Button>
    </div>
  );
};

export default Page;
