import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/auth";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!auth) {
      return NextResponse.json({ message: "Not authenticated" });
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
