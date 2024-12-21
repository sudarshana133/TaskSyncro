"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/leaderboard");
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Leaderboard</h3>
      <ul className="space-y-4">
        {leaderboard.length > 0 ? (
          leaderboard.map((user: any, index: number) => (
            <li
              key={user.id}
              className={`flex justify-between items-center p-4 rounded-lg border ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition duration-200 ease-in-out`}
            >
              <span className="text-lg font-medium text-gray-800">
                {index + 1}. {user.username}
              </span>
              <span className="text-lg font-semibold text-blue-600">
                {user.points} points
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Loading leaderboard...</p>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
