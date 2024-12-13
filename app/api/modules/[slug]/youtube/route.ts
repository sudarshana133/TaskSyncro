import { NextRequest, NextResponse } from "next/server";
import { validateURL } from "@/lib/validate-youtube-url";
import { database } from "@/lib/appwrite-server";
import { ID } from "node-appwrite";

const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collection_id = process.env.NEXT_PUBLIC_MODULE_RESOURCES_COLLECTION_ID!;

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const { youtubeURL, title } = await request.json();

    // Validate the YouTube URL
    const validationRes = validateURL(new URL(youtubeURL));
    if (validationRes) {
        return NextResponse.json({ error: validationRes }, { status: 400 });
    }

    try {
        const documentData = {
            moduleId: slug,
            type: "youtube",
            url: youtubeURL,
            title,
            createdAt: new Date().toISOString(),
            module: slug,
        };

        const res = await database.createDocument(
            database_id,
            collection_id,
            ID.unique(),
            documentData
        );

        return NextResponse.json({ message: "YouTube URL added successfully", resource: res }, { status: 201 });
    } catch (error: any) {
        console.error("Error adding YouTube URL:", error);
        return NextResponse.json({ error: error.message || "Failed to add YouTube URL" }, { status: 500 });
    }
}