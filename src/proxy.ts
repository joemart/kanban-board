import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  // Your middleware logic here
  const token = request.cookies.get("nhostSession")
    if (request.nextUrl.pathname === ('/') && !token) {
      return NextResponse.redirect(new URL("/signin", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}