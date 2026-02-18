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
