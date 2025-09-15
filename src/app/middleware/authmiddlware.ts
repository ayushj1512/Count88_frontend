// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 Check session (auth_token cookie)
  const session = req.cookies.get("auth_token")?.value;

  // List of protected routes
  const protectedPaths = ["/profile", "/dashboard"];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected) {
    if (!session) {
      // 🚫 No session → Redirect to login
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url); // redirect back after login
      return NextResponse.redirect(loginUrl);
    }

    // ✅ Session exists → allow
    return NextResponse.next();
  }

  // Public routes → continue
  return NextResponse.next();
}

// ✅ Apply only to protected routes
export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
