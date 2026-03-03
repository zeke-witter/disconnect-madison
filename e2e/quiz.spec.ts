import { test, expect, type Page } from '@playwright/test';
import { results } from '@/lib/quiz';

async function answerAllWith(page: Page, optionIndex: number) {
    for (let i = 0; i < 10; i++) {
        await page.getByRole('radio').nth(optionIndex).click();
        if (i < 9) {
            await page.getByRole('button', { name: 'Next' }).click();
        } else {
            await page.getByRole('button', { name: 'See my results' }).click();
        }
    }
}

test.describe('Quiz flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/quiz');
    });

    test('shows question 1 on load with no Previous button', async ({ page }) => {
        await expect(page.getByText('Question 1 of 10')).toBeVisible();
        await expect(page.getByRole('button', { name: /Previous/ })).not.toBeVisible();
    });

    test('Next button is disabled until an answer is selected', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    test('Next button enables after selecting an answer', async ({ page }) => {
        await page.getByRole('radio').first().click();
        await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    });

    test('advances to question 2 and shows Previous button', async ({ page }) => {
        await page.getByRole('radio').first().click();
        await page.getByRole('button', { name: 'Next' }).click();
        await expect(page.getByText('Question 2 of 10')).toBeVisible();
        await expect(page.getByRole('button', { name: /Previous/ })).toBeVisible();
    });

    test('Previous restores the prior answer', async ({ page }) => {
        // Select the 2nd option on Q1, advance
        await page.getByRole('radio').nth(1).click();
        await page.getByRole('button', { name: 'Next' }).click();
        // Make a selection on Q2, then go back
        await page.getByRole('radio').nth(2).click();
        await page.getByRole('button', { name: /Previous/ }).click();
        // Q1 should show with the 2nd option still selected
        await expect(page.getByText('Question 1 of 10')).toBeVisible();
        await expect(page.getByRole('radio').nth(1)).toHaveAttribute('data-checked', '');
    });

    test('last question shows "See my results" button', async ({ page }) => {
        for (let i = 0; i < 9; i++) {
            await page.getByRole('radio').first().click();
            await page.getByRole('button', { name: 'Next' }).click();
        }
        await expect(page.getByRole('button', { name: 'See my results' })).toBeVisible();
        await expect(page.getByText('Question 10 of 10')).toBeVisible();
    });

    test('all minimum answers shows the low result', async ({ page }) => {
        await answerAllWith(page, 0);
        await expect(page.getByRole('heading', { name: results.low.title })).toBeVisible();
        await expect(page.getByText('0', { exact: true })).toBeVisible();
    });

    test('all maximum answers shows the high result', async ({ page }) => {
        await answerAllWith(page, 3);
        await expect(page.getByRole('heading', { name: results.high.title })).toBeVisible();
        await expect(page.getByText('30', { exact: true })).toBeVisible();
    });

    test('results screen shows expected links for the high result', async ({ page }) => {
        await answerAllWith(page, 3);
        for (const link of results.high.links) {
            await expect(page.getByRole('link', { name: link.label })).toBeVisible();
        }
    });

    test('"Take the quiz again" resets to question 1', async ({ page }) => {
        await answerAllWith(page, 0);
        await page.getByRole('button', { name: 'Take the quiz again' }).click();
        await expect(page.getByText('Question 1 of 10')).toBeVisible();
        await expect(page.getByRole('button', { name: /Previous/ })).not.toBeVisible();
        // All radios should be unchecked
        const radios = page.getByRole('radio');
        const count = await radios.count();
        for (let i = 0; i < count; i++) {
            await expect(radios.nth(i)).not.toHaveAttribute('data-checked', '');
        }
    });
});
