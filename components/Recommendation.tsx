"use client";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { FolderOpen, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const Recommendation = () => {
  const { user } = useUser();
  const [recommendation, setRecommendation] = useState<Module[]>([]);
  useEffect(() => {
    const fetchRecommendation = async () => {
      if (user) {
        try {
          const res = await axios.post("/api/recommendation", {
            username: user?.name,
          });
          console.log(res.data);
          setRecommendation(res.data);
        } catch (error) {
          console.log("Error fetching recommendation:", error);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Recommendations
      </h2>

      {recommendation ? (
        recommendation.length > 0 ? (
          <div className="space-y-4">
            {recommendation.map((rec) => (
              <div
                key={rec.$id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 
                           hover:bg-gray-100 transition duration-300 
                           transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <p className="text-gray-700">{rec.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <FolderOpen className="mx-auto mb-4 text-gray-300" size={48} />
            <p className="text-xl">No recommendations available</p>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin text-blue-500" size={36} />
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
