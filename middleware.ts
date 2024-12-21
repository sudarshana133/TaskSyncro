// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname, search } = request.nextUrl;

  // If user is logged in
  if (session) {
    // Check if there's a redirect parameter and handle it
    if (pathname === "/login" || pathname === "/signup") {
      const redirectTo = request.nextUrl.searchParams.get("redirect");
      if (redirectTo) {
        // Ensure the redirect URL is within your domain
        try {
          const decodedRedirect = decodeURIComponent(redirectTo);
          // Only redirect to internal paths (starting with /)
          if (decodedRedirect.startsWith('/')) {
            return NextResponse.redirect(new URL(decodedRedirect, request.url));
          }
        } catch (e) {
          console.error("Invalid redirect URL");
        }
      }
      // Default redirect if no valid redirect parameter
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // If user is not logged in
  if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
    return NextResponse.next();
  }

  // Create the redirect URL with the current path encoded
  const encodedRedirect = encodeURIComponent(pathname + search);
  const loginUrl = new URL(`/login?redirect=${encodedRedirect}`, request.url);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};