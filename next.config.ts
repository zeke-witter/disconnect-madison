import type { NextConfig } from "next";

// Content-Security-Policy value.
// NOTE: `unsafe-inline` in script-src is required because Next.js injects
// inline hydration scripts at runtime. Eliminating it requires per-request
// nonces threaded through middleware. Maybe a down-the-road item.
const CSP = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
    // HSTS: trust this domain over HTTPS for 2 years, include subdomains, eligible for preload list.
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    // Prevent the page from being embedded in a frame. Redundant with
    // frame-ancestors in CSP above, but kept for older browser compatibility.
    { key: 'X-Frame-Options', value: 'DENY' },
    // Stop browsers from MIME-sniffing a response away from the declared content-type.
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // Only send the origin (no path/query) as the referrer when crossing origins.
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Disable browser features this site doesn't use.
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Content-Security-Policy', value: CSP },
];

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ protocol: 'https', hostname: '**' }],
    },
    async headers() {
        return [{ source: '/(.*)', headers: securityHeaders }];
    },
};

export default nextConfig;
