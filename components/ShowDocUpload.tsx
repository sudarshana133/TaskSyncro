import { useToast } from "@/hooks/use-toast";
import { addDoc } from "@/utils/module-resource-util";
import { FormEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const ShowDocUpload = ({ slug }: { slug: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be under 10MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file || !title) {
      toast({
        title: "Error",
        description: "Please select a file and enter a title",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use the addDoc function to upload the document
      const response = await addDoc(slug, file, title);

      toast({
        title: "Success",
        description: response.message,
        className: "bg-green-400",
      });

      // Reset form
      setFile(null);
      setTitle("");
      (document.getElementById("fileInput") as HTMLInputElement).value = "";
    } catch (error: any) {
      console.log("Failed to upload document:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-2xl font-bold">
          Add Document Resource
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter document title"
              className="w-full transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="fileInput"
              className="text-sm font-medium text-gray-700"
            >
              PDF Document
            </label>
            <Input
              id="fileInput"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="w-full transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-primary"
              accept=".pdf,.doc,.docx,.txt,.md"
            />
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected file: {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full mt-4 transition-colors duration-200 ease-in-out"
            disabled={!file || !title || isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Add Document"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
