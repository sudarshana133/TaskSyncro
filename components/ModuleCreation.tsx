"use client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export const ModuleCreation = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Validation Error",
        description: "Description cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log(isPublic);
      const res = await axios.post(`/api/modules/?name=${user?.name}`, {
        title: title.trim(),
        description: description.trim(),
        pub: isPublic,
        userId: user.$id
      });

      // Success toast
      toast({
        title: "Success",
        description: "Module created successfully",
        className: "bg-green-500 text-white",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setIsPublic(false);
    } catch (error: any) {
      // Error toast with more informative message
      toast({
        title: "Error",
        description:
          error.response?.data?.error ||
          error.message ||
          "Failed to create module",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create New Module
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Title
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter module title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter module description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="public-toggle"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label
            htmlFor="public-toggle"
            className="text-sm font-medium text-gray-700"
          >
            Make Module Public
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
        >
          Create Module
        </Button>
      </form>
    </div>
  );
};
