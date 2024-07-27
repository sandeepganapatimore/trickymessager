import { NextResponse, NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl

    // If the token exists and the user is trying to access a public path, redirect to /dashboard
    if (token && (url.pathname === '/sign-in' || url.pathname === '/sign-up' || url.pathname === '/verify' || url.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If the token does not exist and the user is trying to access a protected path, redirect to /home
    if (!token && (url.pathname.startsWith('/dashboard'))) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // If none of the conditions match, continue with the request
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*']
}
