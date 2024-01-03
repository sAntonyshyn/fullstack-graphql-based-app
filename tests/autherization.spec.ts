import { test, expect } from "@playwright/test";

test('authorization flow', async ({ page }) => {

  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email').fill('test2@gmail.com');
  await page.getByPlaceholder('Password').fill('test2');
  await page.getByRole('button').click();

  await page.waitForURL('http://localhost:3000/');

  await expect(page.getByText('Space X launches')).toBeVisible();
});