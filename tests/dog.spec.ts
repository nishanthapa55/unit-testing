import { test, expect } from '@playwright/test';

test.describe('Dog Application E2E Tests', () => {

  test('should verify that a dog image is displayed when the page loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForResponse('**/api/dogs/random');

    const dogImage = page.locator('img');
    await expect(dogImage).toBeVisible();

    const src = await dogImage.getAttribute('src');
    expect(src).toMatch(/^https:\/\//);
  });

  test('should retrieve a new dog image when the button is clicked', async ({ page }) => {
    await page.goto('/');
    await page.waitForResponse('**/api/dogs/random');
    const firstImageSrc = await page.locator('img').getAttribute('src');

    const [response] = await Promise.all([
      page.waitForResponse('**/api/dogs/random'),
      page.getByRole('button', { name: /get another dog/i }).click(),
    ]);

    await response.finished();
    const secondImageSrc = await page.locator('img').getAttribute('src');
    expect(secondImageSrc).toMatch(/^https:\/\//);
    expect(secondImageSrc).not.toBe(firstImageSrc);
  });

  test('should display an error message when the API call fails', async ({ page }) => {
    await page.route('**/api/dogs/random', route => route.abort());

    await page.goto('/');
    const errorMsg = page.locator('text=/error/i');
    await expect(errorMsg).toBeVisible();
  });
});