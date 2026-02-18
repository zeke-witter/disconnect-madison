import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Hoisted mocks ────────────────────────────────────────────────────────────

const { mockGetUser, mockNextResponse } = vi.hoisted(() => {
    const mockGetUser = vi.fn().mockResolvedValue({ data: { user: null } });

    const mockCookiesSet = vi.fn();
    const mockNextResponse = {
        next: vi.fn().mockReturnValue({ cookies: { set: mockCookiesSet } }),
        redirect: vi.fn().mockImplementation((url: { pathname: string }) => ({
            type: 'redirect',
            url,
        })),
    };

    return { mockGetUser, mockNextResponse };
});

vi.mock('@supabase/ssr', () => ({
    createServerClient: vi.fn().mockReturnValue({
        auth: { getUser: mockGetUser },
    }),
}));

vi.mock('next/server', () => ({
    NextResponse: mockNextResponse,
}));

// ─── Import middleware after mocks ────────────────────────────────────────────

import { middleware, config } from '@/middleware';
import type { NextRequest } from 'next/server';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function createMockRequest(pathname: string): NextRequest {
    // The middleware clones nextUrl to build the redirect target
    const cloned: { pathname: string } = { pathname };
    return {
        nextUrl: {
            pathname,
            clone: () => cloned,
        },
        cookies: {
            getAll: () => [],
            set: vi.fn(),
        },
    } as unknown as NextRequest;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('middleware', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockNextResponse.next.mockReturnValue({ cookies: { set: vi.fn() } });
    });

    it('redirects to /login when no user is authenticated', async () => {
        mockGetUser.mockResolvedValueOnce({ data: { user: null } });
        const request = createMockRequest('/add-news');
        await middleware(request);

        expect(mockNextResponse.redirect).toHaveBeenCalledOnce();
        const redirectArg = mockNextResponse.redirect.mock.calls[0][0] as { pathname: string };
        expect(redirectArg.pathname).toBe('/login');
    });

    it('passes through (does not redirect) when user is authenticated', async () => {
        mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user-123' } } });
        const request = createMockRequest('/add-news');
        const result = await middleware(request);

        expect(mockNextResponse.redirect).not.toHaveBeenCalled();
        // Should return the supabase response (the NextResponse.next() return value)
        expect(result).toHaveProperty('cookies');
    });

    it('config.matcher only matches /add-news', () => {
        expect(config.matcher).toEqual(['/add-news']);
    });
});
