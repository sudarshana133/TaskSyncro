import { database_id, userCollectionId } from "@/constants/environment";
import { account, database } from "@/lib/appwrite-server";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Credentials are missing" },
                { status: 400 }
            );
        }

        const user = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        const session = await account.createEmailPasswordSession(email, password);

        const response = NextResponse.json(
            { message: "Successfully created account and session" },
            { status: 201 }
        );
        const docData = {
            username,
            email,
            createdAt: new Date()
        }
        await database.createDocument(database_id, userCollectionId,user.$id,docData);
        // Set session cookie
        response.cookies.set("session", session.secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            expires: new Date(session.expire),
            sameSite: "strict",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to create account" },
            { status: error.status || error.code || 500 }
        );
    }
}
