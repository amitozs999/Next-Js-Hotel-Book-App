import { withAuth } from "next-auth/middleware";
import { IUser } from "./server/models/user";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // authorize roles
    const url = req?.nextUrl?.pathname;
    const user = req?.nextauth?.token?.user as IUser;

    if (url?.startsWith("/admin") && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/me/:path*", "/bookings/:path*", "/admin/:path*"],
};
