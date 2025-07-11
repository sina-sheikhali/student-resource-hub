import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("role_token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // try {
  //   const decoded = atob(token);
  //   const role = decoded.split("|")[0];

  //   const path = request.nextUrl.pathname;

  //   if (path === "/") {
  //     if (role === "admin")
  //       return NextResponse.redirect(new URL("/admin", request.url));
  //     if (role === "teacher")
  //       return NextResponse.redirect(new URL("/teacher", request.url));
  //     if (role === "user")
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }

  //   if (path.startsWith("/admin") && role !== "admin") {
  //     return NextResponse.redirect(new URL("/404", request.url));
  //   }

  //   if (path.startsWith("/teacher") && role !== "teacher") {
  //     return NextResponse.redirect(new URL("/404", request.url));
  //   }
  //   if (path.startsWith("/dashboard") && role !== "user") {
  //     return NextResponse.redirect(new URL("/404", request.url));
  //   }

  //   return NextResponse.next();
  // } catch (err) {
  //   return NextResponse.redirect(new URL("/404", request.url));
  // }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*", "/teacher/:path*"],
};
