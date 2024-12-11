import { createSessionClient } from "@/lib/appwrite";
import { account } from "@/lib/appwrite-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession("current");

        const response = NextResponse.json(
            { message: "Successfully logged out" },
            { status: 200 }
        );

        // Clear the session cookie
        response.cookies.set('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            expires: new Date(0), // Expire the cookie immediately
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to log out" },
            {
                status: error.status || error.code || 500
            }
        );
    }
}
