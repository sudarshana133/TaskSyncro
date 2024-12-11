import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  const { pathname } = request.nextUrl;

  if (session) {
    if (pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname === "/") {
      return NextResponse.next();
    }

    if (pathname === "/dashboard") {
      return NextResponse.next();
    }
  }

  if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard"],
};
