import { test, expect } from '@playwright/test';

test.describe('/pledge form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/pledge');
    });

    test('renders email input', async ({ page }) => {
        await expect(page.getByLabel(/email address/i)).toBeVisible();
    });

    test('renders all three pledge radio options', async ({ page }) => {
        await expect(page.getByRole('radio', { name: /reduce screen time/i })).toBeVisible();
        await expect(page.getByRole('radio', { name: /step away/i })).toBeVisible();
        await expect(page.getByRole('radio', { name: /quit for good/i })).toBeVisible();
    });

    test('renders submit button', async ({ page }) => {
        await expect(page.getByRole('button', { name: /submit my pledge/i })).toBeVisible();
    });

    test('Turnstile widget container is present', async ({ page }) => {
        await expect(page.locator('.cf-turnstile')).toBeAttached();
    });
});

test.describe('/pledge form error state', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/pledge');
        // Fill required visible fields and submit without completing Turnstile.
        // The server action checks the Turnstile token first, so it returns a
        // bot-verification error before touching Supabase or Resend.
        await page.getByLabel(/email address/i).fill('test@example.com');
        await page.getByRole('button', { name: /submit my pledge/i }).click();
    });

    test('shows "Report this issue" link', async ({ page }) => {
        await expect(page.getByRole('link', { name: /report this issue/i })).toBeVisible();
    });

    test('"Report this issue" link href targets /contact with subject and message params', async ({ page }) => {
        const link = page.getByRole('link', { name: /report this issue/i });
        await expect(link).toBeVisible();
        const href = await link.getAttribute('href');
        expect(href).toMatch(/^\/contact\?/);
        expect(href).toContain('subject=');
        expect(href).toContain('message=');
    });

    test('"Report this issue" link pre-fills the contact form message', async ({ page }) => {
        const link = page.getByRole('link', { name: /report this issue/i });
        await expect(link).toBeVisible();
        await link.click();
        await expect(page).toHaveURL(/\/contact/);
        const messageValue = await page.getByLabel(/^message$/i).inputValue();
        expect(messageValue.length).toBeGreaterThan(0);
        expect(messageValue).toContain('pledge page');
    });

    test('"Report this issue" message template includes selected pledge type and entered email', async ({ page }) => {
        const link = page.getByRole('link', { name: /report this issue/i });
        await expect(link).toBeVisible();
        const href = await link.getAttribute('href') ?? '';
        const url = new URL(href, 'http://localhost');
        const message = url.searchParams.get('message') ?? '';
        expect(message).toContain('Reduce screen time'); // default pledge action
        expect(message).toContain('test@example.com');
    });
});

test.describe('/contact form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact');
    });

    test('renders name field', async ({ page }) => {
        await expect(page.getByLabel(/^name$/i)).toBeVisible();
    });

    test('renders email field', async ({ page }) => {
        await expect(page.getByLabel(/^email$/i)).toBeVisible();
    });

    test('renders message field', async ({ page }) => {
        await expect(page.getByLabel(/^message$/i)).toBeVisible();
    });

    test('renders submit button', async ({ page }) => {
        await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
    });

    test('Turnstile widget container is present', async ({ page }) => {
        await expect(page.locator('.cf-turnstile')).toBeAttached();
    });
});

test.describe('/contact query param pre-fill', () => {
    test('pre-fills message from ?message param', async ({ page }) => {
        await page.goto('/contact?message=Hello%20world');
        await expect(page.getByLabel(/^message$/i)).toHaveValue('Hello world');
    });

    test('pre-fills name from ?name param', async ({ page }) => {
        await page.goto('/contact?name=Alice');
        await expect(page.getByLabel(/^name$/i)).toHaveValue('Alice');
    });

    test('pre-fills email from ?email param', async ({ page }) => {
        await page.goto('/contact?email=alice%40example.com');
        await expect(page.getByLabel(/^email$/i)).toHaveValue('alice@example.com');
    });

    test('pre-fills all fields together', async ({ page }) => {
        await page.goto('/contact?name=Bob&email=bob%40example.com&message=Bug+report');
        await expect(page.getByLabel(/^name$/i)).toHaveValue('Bob');
        await expect(page.getByLabel(/^email$/i)).toHaveValue('bob@example.com');
        await expect(page.getByLabel(/^message$/i)).toHaveValue('Bug report');
    });

    test('empty params leave fields blank', async ({ page }) => {
        await page.goto('/contact');
        await expect(page.getByLabel(/^name$/i)).toHaveValue('');
        await expect(page.getByLabel(/^email$/i)).toHaveValue('');
        await expect(page.getByLabel(/^message$/i)).toHaveValue('');
    });
});

test.describe('/contact form error state', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact');
        await page.getByLabel(/^name$/i).fill('Alice');
        await page.getByLabel(/^email$/i).fill('alice@example.com');
        await page.getByLabel(/^message$/i).fill('Hello there');
        await page.getByRole('button', { name: /send message/i }).click();
    });

    test('shows "Try emailing us directly" mailto link', async ({ page }) => {
        await expect(page.getByRole('link', { name: /try emailing us directly/i })).toBeVisible();
    });

    test('mailto link href starts with mailto:', async ({ page }) => {
        const link = page.getByRole('link', { name: /try emailing us directly/i });
        await expect(link).toBeVisible();
        const href = await link.getAttribute('href') ?? '';
        expect(href).toMatch(/^mailto:/);
        expect(href).toContain('subject=');
        expect(href).toContain('body=');
    });
});
