"use client";

import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Loader2,
  FolderOpen,
  FileText,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Modules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const { toast } = useToast();
  const getModules = async () => {
    try {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      const res = await axios.get(`/api/modules?name=${user.name}`);
      setModules(res.data.modules || []);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error fetching modules: ", error.message);
      setError(error.message || "Failed to fetch modules");
      setIsLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete("/api/modules", {
        data: {
          id,
        },
      });

      setModules((prev) => prev.filter((module) => module.$id !== id));

      toast({
        title: "Module Deleted",
        description: res.data.message,
        variant: "default",
        className: "bg-green-400",
      });
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (user) {
      getModules();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-12 bg-white rounded-xl shadow-md">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <span className="ml-4 text-gray-600 text-xl">Loading modules...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl shadow-md">
        <div className="flex items-center">
          <AlertTriangle className="mr-4 text-red-500" size={36} />
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b">
        <FolderOpen className="mr-4 text-blue-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Your Modules</h1>
      </div>

      {modules.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.$id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 
                         hover:bg-gray-100 hover:border-blue-200 
                         transition duration-300 transform hover:-translate-y-2 
                         hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="mr-3 text-blue-500" size={24} />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {module.title}
                  </h2>
                </div>
                <Trash2
                  color="red"
                  className="cursor-pointer hover:text-red-700 transition"
                  onClick={() => handleDelete(module.$id)}
                />
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {module.description || "No description available"}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(module.createdAt).toLocaleDateString()}</span>
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${
                      module.public
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-200 text-gray-700 border border-gray-300"
                    }
                  `}
                >
                  {module.public ? "Public" : "Private"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-12">
          <FolderOpen className="mx-auto mb-4 text-gray-300" size={64} />
          <h2 className="text-2xl text-gray-600 mb-2">No modules found</h2>
          <p className="text-gray-500">
            Create your first module to get started
          </p>
          <button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md 
                       hover:bg-blue-600 transition duration-300"
          >
            Create Module
          </button>
        </div>
      )}
    </div>
  );
};

export default Modules;
