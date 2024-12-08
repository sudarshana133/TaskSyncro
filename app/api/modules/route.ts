import { database } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collection_id = process.env.NEXT_PUBLIC_MODULE_COLLECTION_ID!;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name) {
        return NextResponse.json({ error: "Name not found" }, { status: 404 });
    }
    try {
        const documents = await database.listDocuments(database_id, collection_id, [
            Query.equal("creator", name),
        ]);

        const modules: Module[] = documents.documents.map((doc) => ({
            $id: doc.$id,
            title: doc.title,
            description: doc.description,
            creator: doc.creator,
            participants: doc.participants,
            public: doc.public,
            createdAt: doc.createAt,
            updatedAt: doc.updatedAt
        }));

        if (modules.length === 0) {
            return NextResponse.json({ error: "No modules found" }, { status: 404 });
        }
        return NextResponse.json({ modules }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    try {
        const { title, description, pub } = await request.json();
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");

        // Ensure pub is explicitly converted to a boolean
        const isPublic = pub === true || pub === "true";

        if (!title || !description || !name) {
            return NextResponse.json({ error: "Title, description, or creator is missing" }, { status: 400 });
        }

        const documentData = {
            title,
            description,
            public: isPublic, // Use the converted boolean value
            creator: name,
            createdAt: new Date().toISOString(),
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