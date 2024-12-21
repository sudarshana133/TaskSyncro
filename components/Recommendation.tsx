"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { FolderOpen, Loader2 } from "lucide-react";
import ModuleCard from "./ModuleCard";

const Recommendation = ({ user }: { user: User }) => {
  const [recommendation, setRecommendation] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (user) {
        try {
          const res = await axios.post("/api/recommendation", {
            username: user?.name,
          });
          if (res.data?.recommendations) {
            setRecommendation(res.data.recommendations);
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecommendation();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b">
        <FolderOpen className="mr-4 text-blue-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Recommendations</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin text-blue-500" size={36} />
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      ) : recommendation.length > 0 ? (
        <ModuleCard modules={recommendation} />
      ) : (
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-12">
          <FolderOpen className="mx-auto mb-4 text-gray-300" size={64} />
          <h2 className="text-2xl text-gray-600 mb-2">
            No recommendations found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
