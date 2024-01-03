import {expect, test} from '@playwright/test';

const query = `
  {
    launches {
      mission_name
      id
    }
  }
`;
test(`home flow with graphql api`, async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email').fill('test2@gmail.com');
  await page.getByPlaceholder('Password').fill('test2');
  await page.getByRole('button').click();
  await page.waitForURL('http://localhost:3000/');

  await page.evaluate(async (query) => {
    const result = await fetch('https://spacex-production.up.railway.app/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    return result.json();
  }, query);

  await expect(page.getByText('Space X launches')).toBeVisible();
  await expect(page.getByText('Please select one of the items to see the details!')).toBeVisible();

  await expect(page.getByText('FalconSat')).toBeVisible();

  await page.getByText('FalconSat').click();

  await expect(page.getByText('Please select one of the items to see the details!')).toBeHidden();
  await expect(page.getByText('Launch Year - 2006')).toBeVisible();
  await expect(page.getByText('Rocket name - Falcon 1')).toBeVisible();
});