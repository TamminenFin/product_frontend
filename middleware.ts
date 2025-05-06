import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth.services";

// ✅ Publicly accessible routes
const AuthRoutes = ["/signin", "/signup"];

// ✅ Role-based route access
const roleBasedRoutes = {
  saller: [/^\/dashboard/],
  admin: [/^\/admin/],
} as const;

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const user = await getCurrentUser(); // Should parse cookies or headers internally

  console.log(user);

  // ✅ Public route handling (no user)
  if (!user) {
    const isAuthRoute = AuthRoutes.some((route) => pathname.startsWith(route));

    if (isAuthRoute) {
      return NextResponse.next();
    }

    // Redirect to /signin with intended redirect path
    const redirectUrl = new URL("/signin", request.url);
    const redirectPath =
      pathname + (searchParams.toString() ? `?${searchParams}` : "");
    redirectUrl.searchParams.set("redirect", redirectPath);

    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Authenticated route handling
  const role = user.role as Role;
  const allowedRoutes = roleBasedRoutes[role];

  if (allowedRoutes && allowedRoutes.some((regex) => regex.test(pathname))) {
    return NextResponse.next();
  }

  // ❌ Unauthorized role access → redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// ✅ Define the matcher for middleware to apply only on relevant paths
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/signin", "/signup"],
};
