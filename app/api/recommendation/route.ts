import { database } from "@/lib/appwrite-server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { database_id, geminikey, moduleCollectionId } from "@/constants/environment";
import { Query } from "node-appwrite";

export async function POST(request: Request) {
    try {
        const { username } = await request.json();
        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        // Fetch only public modules created by the user
        const userPublicModules = await database.listDocuments(database_id, moduleCollectionId, [
            Query.equal("creator", username),
            Query.equal("public", true), // Ensure only public modules created by the user
        ]);

        // Map user's public modules to a detailed structure
        const userPublicModuleData = userPublicModules.documents.map((module: any) => ({
            $id: module.$id,
            title: module.title,
            description: module.description,
            creator: module.creator,
            participants: module.participants,
            public: module.public,
            createdAt: module.createdAt,
            updatedAt: module.updatedAt,
            modules: module.modules,  // Module resources
        }));

        // If the user doesn't have public modules, return a message
        if (userPublicModuleData.length === 0) {
            return NextResponse.json({ message: "User has no public modules to generate recommendations" }, { status: 200 });
        }

        // Fetch only public modules from other users (not the user's own modules)
        const allPublicModules = await database.listDocuments(database_id, moduleCollectionId, [
            Query.equal("public", true),
            Query.notEqual("creator", username)  // Ensure these are not the user's own modules
        ]);

        // Map all public modules from other users to a detailed structure
        const allPublicModuleData = allPublicModules.documents.map((module: any) => ({
            $id: module.$id,
            title: module.title,
            description: module.description,
            creator: module.creator,
            participants: module.participants,
            public: module.public,
            createdAt: module.createdAt,
            updatedAt: module.updatedAt,
            modules: module.modules,  // Module resources
        }));

        // Prepare the training data: Use only the user's public modules
        const trainingData = userPublicModuleData;

        // If no public modules available from other users, return a message
        if (allPublicModuleData.length === 0) {
            return NextResponse.json({ message: "No public modules available from other users for recommendations" }, { status: 200 });
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(geminikey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare the prompt: Use the user's public modules to generate recommendations
        const prompt = `
          Based on the following modules created by the user, recommend 3 related learning modules from other users' public modules.
          Return the response in valid JSON format as an array of objects with "$id", "title", "description", "creator", "public", "createdAt", "updatedAt", and "modules" fields.
          User Modules: ${JSON.stringify(trainingData, null, 2)}
          Other Public Modules: ${JSON.stringify(allPublicModuleData, null, 2)}
        `;

        // Generate recommendations
        const response = await model.generateContent(prompt);
        const responseText = await response.response.text();


        // Extract JSON content from the response
        const cleanedText = responseText.replace(/```json\n|```/g, "").trim();

        // Parse the cleaned JSON response
        let recommendations;
        try {
            recommendations = JSON.parse(cleanedText);
        } catch (err) {
            console.error("Error parsing LLM response:", err);
            return NextResponse.json(
                { error: "Failed to parse JSON response from LLM", cleanedText },
                { status: 500 }
            );
        }

        // Return the recommendations with full module details
        return NextResponse.json({ recommendations }, { status: 200 });
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
