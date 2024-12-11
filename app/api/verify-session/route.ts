import { serverAccount } from "@/lib/appwrite-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { session } = body;

        if (!session) {
            return NextResponse.json({ error: "JWT is required" }, { status: 400 });
        }

        // Verify the JWT or fetch session details using the Server SDK
        const sessionOnServer = await serverAccount.updateSession(session);

        return NextResponse.json({ sessionOnServer }, { status: 200 });
    } catch (error) {
        console.error("Session verification failed:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}