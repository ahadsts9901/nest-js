import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath =
        path === "/auth/login" ||
        path === "/auth/signup" ||
        path === "/profile/:_id"

    const hart = request.cookies.get("hart")?.value || '';

    if (isPublicPath && hart) {
        return NextResponse.redirect(new URL('/', request?.url))
    }

    if (!isPublicPath && !hart) {
        return NextResponse.redirect(new URL('/auth/login', request?.url))
    }

}

export const config = {
    matcher: [
        '/',
        '/auth/login',
        '/auth/signup',
        '/chat/:_id',
        '/profile/:_id',
    ],
}