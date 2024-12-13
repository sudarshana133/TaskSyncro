import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  // If user is logged in
  if (session) {
    // Redirect logged-in users away from auth pages
    if (pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Allow access to all other routes for logged-in users
    return NextResponse.next();
  }

  // If user is not logged in
  if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard"],
};
