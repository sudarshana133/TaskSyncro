"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateURL } from "@/lib/validate-youtube-url";
import { useParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const YouTubeResourcePage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ title: "", youtubeURL: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resources, setResources] = useState<ModuleResource[]>([]); // Array of resources
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validationRes = validateURL(new URL(formData.youtubeURL));
      if (validationRes) {
        throw new Error(validationRes);
      }

      await axios.post(`/api/modules/${slug}/youtube`, formData);

      toast({
        title: "Success",
        description: "YouTube resource added successfully!",
        className: "bg-green-400",
      });

      setFormData({ title: "", youtubeURL: "" });
      fetchResources(); // Refresh resources after adding
    } catch (error: any) {
      console.error("Failed to add YouTube URL:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[400px,1fr]">
        {/* YouTube Resource Form */}
        <div className="w-full">
          <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-2xl font-bold">
                Add YouTube Resource
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6 px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter resource title"
                    className="w-full transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="youtubeURL"
                    className="text-sm font-medium text-gray-700"
                  >
                    YouTube URL
                  </label>
                  <Input
                    id="youtubeURL"
                    name="youtubeURL"
                    value={formData.youtubeURL}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter YouTube URL"
                    className="w-full transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 transition-colors duration-200 ease-in-out"
                  disabled={
                    !formData.title || !formData.youtubeURL || isSubmitting
                  }
                >
                  {isSubmitting ? "Submitting..." : "Add Resource"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Resources List */}
        <div className="w-full">
          <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                Module Resources
                <Button
                  onClick={fetchResources}
                  variant="outline"
                  size="sm"
                  className="transition-colors duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground"
                >
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto pt-6 pb-6 px-6">
              {loading ? (
                <p>Loading...</p>
              ) : resources.length > 0 ? (
                <ul className="space-y-4">
                  {resources.map((resource) => (
                    <li
                      key={resource.$id}
                      className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-sm transition-shadow duration-200 hover:shadow-md"
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
                            className="text-primary hover:text-primary-dark font-medium text-lg transition-colors duration-200"
                          >
                            {resource.title || "Untitled Resource"}
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            YouTube Video
                          </p>
                        </div>
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
        </div>
      </div>
    </div>
  );
};

export default YouTubeResourcePage;
