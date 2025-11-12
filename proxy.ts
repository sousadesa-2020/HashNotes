import { NextResponse } from "next/server";

export function proxy() {
  const res = NextResponse.next();
  if (process.env.NODE_ENV === "production") {
    const gateway = process.env.NEXT_PUBLIC_GATEWAY_URL ? `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}` : "";
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: " + gateway,
      "script-src 'self'",
      "style-src 'self'",
      "font-src 'self'",
      "connect-src 'self'",
      "upgrade-insecure-requests",
      "block-all-mixed-content",
    ].join("; ");
    res.headers.set("Content-Security-Policy", csp);
  }
  return res;
}

export const config = {
  matcher: ["/(.*)"],
};