"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateURL } from "@/lib/validate-youtube-url";
import { useParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ModulePreview from "@/components/ModulePreview";

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

        <ModulePreview
          resources={resources}
          setResources={setResources}
          isEdit={true}
          slug={slugString}
        />
      </div>
    </div>
  );
};

export default YouTubeResourcePage;
