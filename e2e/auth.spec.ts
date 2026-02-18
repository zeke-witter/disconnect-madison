import { test, expect } from '@playwright/test';

test.describe('Auth protection', () => {
    test('/add-news redirects to /login when unauthenticated', async ({ page }) => {
        await page.goto('/add-news');
        await expect(page).toHaveURL(/\/login/);
    });

    test('/login renders email and password fields', async ({ page }) => {
        await page.goto('/login');
        await expect(page.getByLabel(/email/i)).toBeVisible();
        await expect(page.getByLabel(/password/i)).toBeVisible();
    });

    test('/login renders sign-in button', async ({ page }) => {
        await page.goto('/login');
        await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    });
});
