import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isAdmin = token?.role === "admin"

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return null
  }

  // Protect admin routes
  if (isAdminPage) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Protect meeting routes
  if (req.nextUrl.pathname.startsWith('/meetings')) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  }

  return null
}

export const config = {
  matcher: [
    '/meetings/:path*',
    '/admin/:path*',
    '/auth/signin',
  ],
}
