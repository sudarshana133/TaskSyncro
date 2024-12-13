import { account } from "@/lib/appwrite-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Credentials are missing" }, { status: 401 });
        }
        const session = await account.createEmailPasswordSession(email, password);
        const response = NextResponse.json({
            message: "Successfully created session"
        }, {
            status: 200
        });
        response.cookies.set('session', session.secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            expires: new Date(session.expire),
            sameSite: "strict"
        });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to create the session" },
            {
                status: error.status || error.code || 500
            }
        )
    }
}