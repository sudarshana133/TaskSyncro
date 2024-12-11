import { database } from "@/lib/appwrite-server";
import { ID, Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collection_id = process.env.NEXT_PUBLIC_MODULE_COLLECTION_ID!;

export async function POST(request: NextRequest) {
    try {
        const { title, description, pub, userId } = await request.json();
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");

        // Ensure pub is explicitly converted to a boolean
        const isPublic = pub === true || pub === "true";
        if (!userId) return NextResponse.json({ error: "Your are not logged in" }, { status: 500 })
        if (!title || !description || !name) {
            return NextResponse.json({ error: "Title, description, or creator is missing" }, { status: 400 });
        }

        const documentData = {
            title,
            description,
            public: isPublic,
            creator: name,
            createdAt: new Date().toISOString(),
            user: userId
        }

        const res = await database.createDocument(
            database_id,
            collection_id,
            ID.unique(),
            documentData
        );

        return NextResponse.json({
            message: "Module created successfully",
            module: res
        }, { status: 201 })
    } catch (error: any) {
        console.error("Module creation error:", error);
        return NextResponse.json({
            error: "Failed to create module",
            details: error.message
        }, { status: error.status || error.code || 500 })
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json({ error: "Id is missing for deletion" }, { status: 400 });
        }
        await database.deleteDocument(
            database_id,
            collection_id,
            id,
        )
        return NextResponse.json({ message: "Successfully deleted module" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status || error.code || 500 })
    }
}