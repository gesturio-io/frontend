import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path starts with /dashboard
  if (path.startsWith('/dashboard')) {
    // Get the JWT cookie
    const jwtCookie = request.cookies.get('jwt')

    // If no JWT cookie is present, redirect to login
    if (!jwtCookie) {
      // Create new URL with explicit 127.0.0.1
      const loginUrl = new URL('/login', 'http://127.0.0.1:3000')
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
} 