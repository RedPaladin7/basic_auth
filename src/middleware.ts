import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    // gets the current path
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'

    // if the user has token, he shouldn't be able to access the public paths

    const token = request.cookies.get('token')?.value || ''
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ]
}