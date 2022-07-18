import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [/\/dashboard/, /\/check-in\/.+/];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("E-TICKET_ACCESS_TOKEN");
  const currentUrl = req.nextUrl.pathname;

  if (
    !token &&
    protectedRoutes.filter((route) => route.test(currentUrl)).length > 0
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}
