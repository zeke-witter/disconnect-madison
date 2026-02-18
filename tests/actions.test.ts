import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Hoisted mocks (must run before vi.mock factories) ───────────────────────

const { mockBuilder, mockResendSend, mockGetUser } = vi.hoisted(() => {
    // Chainable Supabase query builder.
    // All methods return `b` itself so chains work.
    // insert() and limit() are terminal and return Promises.
    // b is also thenable so that `await b.eq(...)` resolves correctly.
    const b: any = {};
    b.from   = vi.fn().mockReturnValue(b);
    b.select = vi.fn().mockReturnValue(b);
    b.update = vi.fn().mockReturnValue(b);
    b.delete = vi.fn().mockReturnValue(b);
    b.eq     = vi.fn().mockReturnValue(b);
    b.order  = vi.fn().mockReturnValue(b);
    b.insert = vi.fn().mockResolvedValue({ data: null, error: null });
    b.limit  = vi.fn().mockResolvedValue({ data: [], error: null });
    // Thenable: allows `await b` (i.e. when the last chain method returns b)
    b.then   = vi.fn().mockImplementation(
        (resolve: (val: unknown) => void) =>
            Promise.resolve({ data: null, error: null }).then(resolve),
    );

    const mockResendSend = vi.fn().mockResolvedValue({ data: {}, error: null });

    const mockGetUser = vi.fn().mockResolvedValue({ data: { user: null } });

    return { mockBuilder: b, mockResendSend, mockGetUser };
});

// ─── Module mocks ─────────────────────────────────────────────────────────────

vi.mock('@/lib/supabase', () => ({ supabase: mockBuilder }));

vi.mock('resend', () => ({
    // Must be a regular function (not arrow) so `new Resend()` works
    Resend: function (this: any) {
        this.emails = { send: mockResendSend };
    },
}));

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

vi.mock('@/lib/supabase-auth', () => ({
    createServerAuthClient: vi.fn().mockResolvedValue({
        auth: { getUser: mockGetUser },
    }),
}));

// ─── Imports (after mocks) ────────────────────────────────────────────────────

import {
    submitPledgeAction,
    submitContactAction,
    verifyPledgeAction,
    getPledgesAction,
    addNewsArticleAction,
    getNewsArticlesAction,
} from '@/lib/actions';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeFormData(fields: Record<string, string>): FormData {
    const fd = new FormData();
    for (const [key, value] of Object.entries(fields)) fd.append(key, value);
    return fd;
}

const VALID_PLEDGE_FIELDS = {
    'cf-turnstile-response': 'valid-token',
    'pledgeAction[id]': 'reduce_screen_time',
    email: 'user@example.com',
};

const VALID_CONTACT_FIELDS = {
    'cf-turnstile-response': 'valid-token',
    name: 'Alice',
    email: 'alice@example.com',
    message: 'Hello there',
};

beforeEach(() => {
    vi.clearAllMocks();

    // Re-apply default chaining after clearAllMocks (clears call history only,
    // but re-apply mockReturnValue to be safe after any mockReturnValueOnce calls)
    mockBuilder.from.mockReturnValue(mockBuilder);
    mockBuilder.select.mockReturnValue(mockBuilder);
    mockBuilder.update.mockReturnValue(mockBuilder);
    mockBuilder.delete.mockReturnValue(mockBuilder);
    mockBuilder.eq.mockReturnValue(mockBuilder);
    mockBuilder.order.mockReturnValue(mockBuilder);
    mockBuilder.insert.mockResolvedValue({ data: null, error: null });
    mockBuilder.limit.mockResolvedValue({ data: [], error: null });
    mockBuilder.then.mockImplementation(
        (resolve: (val: unknown) => void) =>
            Promise.resolve({ data: null, error: null }).then(resolve),
    );

    mockResendSend.mockResolvedValue({ data: {}, error: null });

    // Default fetch: Turnstile passes
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ success: true }),
        text: () => Promise.resolve(''),
    }));
});

// ─── submitPledgeAction ───────────────────────────────────────────────────────

describe('submitPledgeAction', () => {
    it('returns fake success when honeypot field is filled', async () => {
        const fd = makeFormData({ website: 'http://bot.example.com' });
        const result = await submitPledgeAction({}, fd);
        expect(result).toEqual({
            success: true,
            message: 'Please check your email to confirm your pledge.',
        });
    });

    it('returns error when Turnstile token is missing', async () => {
        const fd = makeFormData({ 'pledgeAction[id]': 'reduce_screen_time', email: 'user@example.com' });
        const result = await submitPledgeAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Bot verification failed. Please try again.' });
    });

    it('returns error when Turnstile verification fails', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ success: false }),
        }));
        const fd = makeFormData({ ...VALID_PLEDGE_FIELDS, 'cf-turnstile-response': 'bad-token' });
        const result = await submitPledgeAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Bot verification failed. Please try again.' });
    });

    it('returns error when email is missing', async () => {
        const fd = makeFormData({
            'cf-turnstile-response': 'valid-token',
            'pledgeAction[id]': 'reduce_screen_time',
        });
        const result = await submitPledgeAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Missing required info.' });
    });

    it('returns error when email is invalid', async () => {
        const fd = makeFormData({ ...VALID_PLEDGE_FIELDS, email: 'not-an-email' });
        const result = await submitPledgeAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Please enter a valid email address.' });
    });

    it('returns error on Supabase unique constraint (23505)', async () => {
        mockBuilder.insert.mockResolvedValueOnce({ data: null, error: { code: '23505' } });
        const fd = makeFormData(VALID_PLEDGE_FIELDS);
        const result = await submitPledgeAction({}, fd);
        expect(result).toEqual({ success: false, message: 'You have already confirmed this pledge.' });
    });

    it('returns success and sends verification email on happy path', async () => {
        const fd = makeFormData(VALID_PLEDGE_FIELDS);
        const result = await submitPledgeAction({}, fd);
        expect(result).toEqual({
            success: true,
            message: 'Please check your email to confirm your pledge.',
        });
        expect(mockResendSend).toHaveBeenCalledOnce();
        expect(mockResendSend).toHaveBeenCalledWith(
            expect.objectContaining({ to: 'user@example.com' }),
        );
    });
});

// ─── submitContactAction ──────────────────────────────────────────────────────

describe('submitContactAction', () => {
    it('returns error when Turnstile token is missing', async () => {
        const fd = makeFormData({ name: 'Alice', email: 'alice@example.com', message: 'Hi' });
        const result = await submitContactAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Bot verification failed. Please try again.' });
    });

    it('returns error when required fields are missing', async () => {
        const fd = makeFormData({ 'cf-turnstile-response': 'valid-token', name: 'Alice' });
        const result = await submitContactAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Please fill out all fields.' });
    });

    it('returns error when email is invalid', async () => {
        const fd = makeFormData({ ...VALID_CONTACT_FIELDS, email: 'bad-email' });
        const result = await submitContactAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Please enter a valid email address.' });
    });

    it('returns error when Resend fails', async () => {
        mockResendSend.mockResolvedValueOnce({ data: null, error: { message: 'API error' } });
        const fd = makeFormData(VALID_CONTACT_FIELDS);
        const result = await submitContactAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Something went wrong. Please try again.' });
    });

    it('returns success on happy path', async () => {
        const fd = makeFormData(VALID_CONTACT_FIELDS);
        const result = await submitContactAction({}, fd);
        expect(result).toEqual({ success: true, message: 'Message sent. Thank you for reaching out.' });
        expect(mockResendSend).toHaveBeenCalledOnce();
    });
});

// ─── verifyPledgeAction ───────────────────────────────────────────────────────

describe('verifyPledgeAction', () => {
    it('returns error when token is empty', async () => {
        const result = await verifyPledgeAction('');
        expect(result).toEqual({ success: false, message: 'Invalid verification link.' });
    });

    it('returns error when no rows updated (bad/used token)', async () => {
        mockBuilder.then.mockImplementationOnce(
            (resolve: (val: unknown) => void) =>
                Promise.resolve({ data: [], error: null }).then(resolve),
        );
        const result = await verifyPledgeAction('bad-token');
        expect(result).toEqual({
            success: false,
            message: 'This link is invalid or your pledge has already been confirmed.',
        });
    });

    it('returns success when pledge is confirmed', async () => {
        mockBuilder.then.mockImplementationOnce(
            (resolve: (val: unknown) => void) =>
                Promise.resolve({ data: [{ id: 'pledge-1' }], error: null }).then(resolve),
        );
        const result = await verifyPledgeAction('valid-token-uuid');
        expect(result).toEqual({
            success: true,
            message: 'Your pledge has been confirmed. Thank you for disconnecting!',
        });
    });
});

// ─── getPledgesAction ─────────────────────────────────────────────────────────

describe('getPledgesAction', () => {
    it('returns correct counts from Supabase data', async () => {
        mockBuilder.then.mockImplementationOnce(
            (resolve: (val: unknown) => void) =>
                Promise.resolve({
                    data: [
                        { pledge_action: 'reduce_screen_time' },
                        { pledge_action: 'reduce_screen_time' },
                        { pledge_action: 'take_a_break' },
                        { pledge_action: 'quit_for_good' },
                        { pledge_action: 'quit_for_good' },
                        { pledge_action: 'quit_for_good' },
                    ],
                    error: null,
                }).then(resolve),
        );
        const result = await getPledgesAction();
        expect(result).toEqual({
            reduce_screen_time: 2,
            take_a_break: 1,
            quit_for_good: 3,
        });
    });

    it('returns zeros on Supabase error', async () => {
        mockBuilder.then.mockImplementationOnce(
            (resolve: (val: unknown) => void) =>
                Promise.resolve({ data: null, error: { message: 'DB error' } }).then(resolve),
        );
        const result = await getPledgesAction();
        expect(result).toEqual({ reduce_screen_time: 0, take_a_break: 0, quit_for_good: 0 });
    });
});

// ─── addNewsArticleAction ─────────────────────────────────────────────────────

describe('addNewsArticleAction', () => {
    it('returns unauthorized when no user', async () => {
        mockGetUser.mockResolvedValueOnce({ data: { user: null } });
        const fd = makeFormData({ url: 'https://example.com/article' });
        const result = await addNewsArticleAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Unauthorized.' });
    });

    it('returns error when URL is missing', async () => {
        mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'admin-1' } } });
        const fd = makeFormData({});
        const result = await addNewsArticleAction({}, fd);
        expect(result).toEqual({ success: false, message: 'Please enter a URL.' });
    });

    it('inserts article on success', async () => {
        mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'admin-1' } } });
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            text: () =>
                Promise.resolve(
                    '<html><head><meta property="og:title" content="Test Article" /></head></html>',
                ),
            json: () => Promise.resolve({ success: true }),
        }));
        const fd = makeFormData({ url: 'https://example.com/article' });
        const result = await addNewsArticleAction({}, fd);
        expect(result).toEqual({ success: true, message: 'Added: Test Article' });
        expect(mockBuilder.insert).toHaveBeenCalledWith(
            expect.objectContaining({ url: 'https://example.com/article', title: 'Test Article' }),
        );
    });
});

// ─── getNewsArticlesAction ────────────────────────────────────────────────────

describe('getNewsArticlesAction', () => {
    it('returns articles on success', async () => {
        const articles = [
            { id: 1, url: 'https://example.com', title: 'Example', image_url: null, created_at: '2024-01-01' },
        ];
        mockBuilder.limit.mockResolvedValueOnce({ data: articles, error: null });
        const result = await getNewsArticlesAction();
        expect(result).toEqual(articles);
    });

    it('returns empty array on error', async () => {
        mockBuilder.limit.mockResolvedValueOnce({ data: null, error: { message: 'DB error' } });
        const result = await getNewsArticlesAction();
        expect(result).toEqual([]);
    });
});
