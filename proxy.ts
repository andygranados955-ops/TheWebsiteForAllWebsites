import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_HOST = "www.andygranados.com";

/**
 * Keep preview deployments out of search indexes to avoid duplicate content.
 * The main custom domain remains indexable.
 */
export function proxy(req: NextRequest) {
  const host = req.nextUrl.hostname.toLowerCase();
  const res = NextResponse.next();

  if (host.endsWith(".vercel.app") && host !== CANONICAL_HOST) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
