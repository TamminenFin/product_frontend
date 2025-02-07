import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth.services";

const authRoute = ["/signin", "/signup"];

const userRoutes = [
  "/dashboard",
  "/dashboard/product",
  "/dashboard/product/add",
  "/dashboard/my-category",
  "/dashboard/category-request",
];

const dynamicUserRoutes = [
  "/dashboard/product/edit/", // This will match any product edit path with an ID
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let user = await getCurrentUser();

  if (!user) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (user?.role) {
    if (user?.role === "saller") {
      if (
        userRoutes.includes(pathname) ||
        dynamicUserRoutes.some((route) => pathname.startsWith(route))
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    if (user?.role === "admin") {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard",
    "/admin",
    "/signin",
    "/signup",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
