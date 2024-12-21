// pages/api/leaderboard.ts

import { database } from "@/lib/appwrite-server";
import { database_id, userCollectionId } from "@/constants/environment";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET() {
    try {
        // Fetch the top users by points, ensuring the `points` field exists in the document
        const users = await database.listDocuments(database_id, userCollectionId, [
            Query.orderDesc("points"), // Sort by points in descending order
            Query.limit(10),           // Limit to top 10 users
        ]);

        // Map the fetched documents to a cleaner format
        const leaderboard = users.documents
            .filter((user: any) => user.points !== undefined) // Ensure points exist
            .map((user: any) => ({
                id: user.$id,          // User's document ID
                username: user.username, // User's username
                points: user.points,    // User's points
            }));

        // Return the leaderboard data as JSON
        return new NextResponse(JSON.stringify(leaderboard), { status: 200 });
    } catch (error: any) {
        console.error("Error fetching leaderboard:", error);
        return new NextResponse(
            JSON.stringify({ error: error.message || "Failed to fetch leaderboard" }),
            { status: 500 }
        );
    }
}
