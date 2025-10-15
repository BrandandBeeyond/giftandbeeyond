import { NextResponse } from "next/server";

const publicRoutes = ["/account/login", "/account/signup"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const protectedRoutes = ["/account", "/dashboard", "/profile"];
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/account/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*", "/profile/:path*"],
};
