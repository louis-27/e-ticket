import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [/\/dashboard/, /\/check-in\/.+/];

export default function middleware(req: NextRequest) {
  const cookie = process.env.COOKIE;
  const token = req.cookies.get("E-TICKET_ACCESS_TOKEN");
  const currentUrl = req.nextUrl.pathname;

  // console.log(token, "===", cookie, token === cookie);

  // if (
  //   token &&
  //   token !== cookie &&
  //   PROTECTED_ROUTES.filter((route) => route.test(currentUrl)).length > 0
  // ) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }

  if (
    !token &&
    PROTECTED_ROUTES.filter((route) => route.test(currentUrl)).length > 0
    // (token && token != cookie)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}
