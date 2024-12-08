import { database } from "@/lib/appwrite";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collection_id = process.env.NEXT_PUBLIC_MODULE_COLLECTION_ID!;

export async function POST(request: Request) {
    try {
        const { name } = await request.json(); // Get the username from the POST body

        if (!name) {
            return NextResponse.json({ error: "Username not found" }, { status: 404 });
        }

        const modules = await database.listDocuments(database_id, collection_id);

        if (modules.documents.length === 0) {
            return NextResponse.json({ message: "No modules found" }, { status: 200 });
        }

        return NextResponse.json({ modules: modules.documents }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while fetching modules" }, { status: 500 });
    }
}
