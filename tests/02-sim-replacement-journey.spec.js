import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const BASE_URL = process.env.BASE_URL ??
  'https://webapp-dev.ryze.live/sim-replacement';

const TOKEN = process.env.AUTH_TOKEN ??
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3Njc2MDUwMDEsImV4cCI6MTc3MDI4MzQwMSwiZGF0YSI6eyJpZCI6MjAsImZpcnN0X25hbWUiOiIiLCJsYXN0X25hbWUiOm51bGwsImVtYWlsIjoiIiwicGhvbmUiOiIwMTkzMjM4MjgxMCIsInNlY29uZGFyeV9tb2JpbGUiOm51bGwsImRpc3RyaWN0IjpudWxsLCJhcmVhIjpudWxsLCJwb3N0X2NvZGUiOm51bGwsImFkZHJlc3MiOm51bGwsImdlbmRlciI6bnVsbCwiYXZhdGFyIjoiaHR0cDovL3dlYmFwcC1hcGktZGV2LnJ5emUubGl2ZS9zdG9yYWdlIiwiaXNfZW1haWxfdmVyaWZpZWQiOjAsImlzX3Bob25lX3ZlcmlmaWVkIjowLCJlbWFpbF92ZXJpZmllZF9hdCI6bnVsbCwicGhvbmVfdmVyaWZpZWRfYXQiOm51bGwsInBhc3N3b3JkX2NoYW5nZWRfYXQiOm51bGwsInN0YXR1cyI6MSwidXBkYXRlZF9ieSI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjQtMDktMjFUMjM6MzY6MzcuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA5LTIxVDIzOjM2OjM3LjAwMDAwMFoifX0.henR_gxUUJ3iYzeIVHHk6xTE-wWgr1_6TZGemxxbLms';

test('Physical SIM purchase journey', async ({ page, request }) => {
  await test.step('Open application', async () => {
    await page.goto(`${BASE_URL}?token=${TOKEN}`);
    await expect(page).toHaveURL(/sim-replacement\?token=/);
  });

  await test.step('Sim Type Selection Page', async () => {
    await expect(page.getByRole('heading', { name: 'SIM Replacement' })).toHaveText('SIM Replacement');
    await page.getByText('Recommended Option', { exact: true }).click();
    await page.getByRole('button', { name: /choose sim number/i }).click();
  });

  await test.step('Number Input Page', async () => {
    await page.getByRole('textbox', { name: 'Enter your number' }).fill('01932382810');
    await page.getByRole('button', { name: 'Continue with this number' }).click();
    await expect(page.getByText('Please enter RYZE number', { exact: true })).toBeVisible();
    await page.getByRole('textbox', { name: 'Enter your number' }).fill('01929301995');
    await page.getByRole('button', { name: 'Continue with this number' }).click();
  });

  await test.step('Personal Information Page', async () => {
    await page.getByRole('textbox', { name: 'Name' }).fill("Test User");
    await page.getByRole('textbox', { name: 'Contact Number' }).fill("01911675645");
    await page.getByRole('textbox', { name: 'Email' }).fill("test@example.com");
    const finalDate= dayjs().add(3, 'day').format('YYYY-MM-DD')
    await page.getByRole('textbox', { name: 'Select date' }).click();
    await page.getByRole('textbox', { name: 'Select date' }).fill(finalDate);
    await page.getByRole('textbox', { name: finalDate }).press('Enter');
    await page.getByRole('button', { name: 'Next' }).click();
  });

  await test.step('Shipping Information Page', async () => {
    await page.getByRole('textbox', { name: 'Address' }).click();
    await page.getByRole('textbox', { name: 'Address' }).fill("Test Address");
    await page.getByRole('combobox', { name: 'City / District' }).click();
    await page.getByText('Chattogram').nth(1).click();
    await page.getByRole('combobox', { name: 'Thana' }).click();
    await page.getByText('Anwara').nth(1).click();
    await page.getByRole('textbox', { name: 'Post Code' }).fill('1100');
    await page.getByRole('button', { name: 'Check out' }).click();
  });

});

