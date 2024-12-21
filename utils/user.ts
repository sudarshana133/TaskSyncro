import { database_id, userCollectionId } from "@/constants/environment";
import { account, database } from "@/lib/appwrite-server";
import { calculatePoints } from "@/lib/calculate-points";
import { Query } from "node-appwrite";

export const updatePoints = async (time: number, id: string) => {
    try {
        console.log("User ID:", id);
        console.log("Updating points for time:", time);
        const points = calculatePoints(time);
        console.log("Points calculated:", points);

        if (points === 0) {
            throw new Error("Time spent is less than 1 minute. No points awarded.");
        }

        const user = await database.getDocument(database_id, userCollectionId, id);
        const totalPoints = (user.points || 0) + points;

        await database.updateDocument(database_id, userCollectionId, id, {
            points: totalPoints,
        });

        return totalPoints;
    } catch (error: any) {
        console.log("Error in updatePoints:", error);
        throw new Error(error.message || "Failed to update points.");
    }
};