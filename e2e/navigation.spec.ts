import { test, expect } from '@playwright/test';

const routes = [
    '/',
    '/about',
    '/learn',
    '/sources',
    '/pledge',
    '/contact',
];

test.describe('Page navigation', () => {
    for (const url of routes) {
        test(`${url} loads without HTTP error`, async ({ page }) => {
            const response = await page.goto(url);
            expect(response?.status()).toBeLessThan(400);
            await expect(page).not.toHaveTitle(/404|not found/i);
        });
    }

    test('nav link to /learn works', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: /^learn$/i }).first().click();
        await expect(page).toHaveURL('/learn');
    });

    test('nav link to /pledge works', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: /take the pledge/i }).first().click();
        await expect(page).toHaveURL('/pledge');
    });

    test('nav link to /about works', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: /^about$/i }).first().click();
        await expect(page).toHaveURL('/about');
    });
});
