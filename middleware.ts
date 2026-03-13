import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const intlMiddleware = createMiddleware(routing);

// Paths that have Spanish versions — everything else stays English-only
const SPANISH_PATHS = new Set(['/', '/pledge']);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // If someone navigates directly to /es/[path] with no Spanish version, redirect to English
    if (pathname === '/es' || pathname.startsWith('/es/')) {
        const stripped = pathname === '/es' ? '/' : pathname.slice(3) || '/';
        if (!SPANISH_PATHS.has(stripped)) {
            const url = request.nextUrl.clone();
            url.pathname = stripped;
            return NextResponse.redirect(url);
        }
    }

    if (pathname === '/add-news') {
        let supabaseResponse = NextResponse.next({ request });
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return request.cookies.getAll(); },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) =>
                            request.cookies.set(name, value));
                        supabaseResponse = NextResponse.next({ request });
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options));
                    },
                },
            }
        );
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
        return supabaseResponse;
    }

    // Run intl middleware, but suppress any redirect to an /es/[path] that has no Spanish version.
    // This prevents Spanish-locale users (via cookie or Accept-Language) from hitting 404s
    // when navigating to English-only pages like /learn or /about.
    const response = intlMiddleware(request);
    const status = response.status;
    if (status === 301 || status === 302 || status === 307 || status === 308) {
        const location = response.headers.get('location');
        if (location) {
            const redirectPath = new URL(location, request.url).pathname;
            const isEsRedirect = redirectPath === '/es' || redirectPath.startsWith('/es/');
            if (isEsRedirect) {
                const stripped = redirectPath === '/es' ? '/' : redirectPath.slice(3) || '/';
                if (!SPANISH_PATHS.has(stripped)) {
                    return NextResponse.next();
                }
            }
        }
    }
    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
