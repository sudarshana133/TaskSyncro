import { database } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "appwrite";

const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collection_id = process.env.NEXT_PUBLIC_MODULE_RESOURCES_COLLECTION_ID!;
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const slug = params.slug;

    if (!slug) {
        return NextResponse.json({ error: "Module slug is required" }, { status: 400 });
    }

    try {
        // Fetch resources linked to the provided module slug
        const resources = await database.listDocuments(database_id, collection_id, [
            Query.equal("moduleId", slug),
        ]);

        if (resources.documents.length === 0) {
            return NextResponse.json({ error: "No resources found for this module" }, { status: 404 });
        }

        return NextResponse.json({ resources: resources.documents }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching resources:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch resources" }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const { moduleResourceId } = await request.json();
        if (!moduleResourceId) {
            return NextResponse.json({ error: "There is no module resource id" }, { status: 400 })
        }
        await database.deleteDocument(
            database_id,
            collection_id,
            moduleResourceId
        );
        return NextResponse.json({ message: "Content deleted module" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status || error.code || 500 })
    }
}