import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Calculate Unix timestamp in seconds (not milliseconds)
  const thirtyDaysFromNow = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60);

  await page.context().addCookies([
    {
      name: 'interview',
      value: '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl',
      domain: '.tractive.com',
      path: '/',
      expires: thirtyDaysFromNow, // Unix timestamp in SECONDS
      sameSite: 'None',
      secure: true
    }
  ]);
  
  await page.goto('https://my-stage.tractive.com/#/');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Try Demo Mode' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Don\'t allow' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Done' }).click();
  await page.getByText('Manage your Account').click();
  await page.getByText('My Profile').click();
  await page.locator('#firstName').click();
  await page.locator('#firstName').fill('MeYou');
  await page.locator('#lastName').click();
  await page.locator('#lastName').fill('👤Tester');
  await page.locator('tcommon-date-input').getByRole('textbox').click();
  await page.locator('tcommon-date-input').getByRole('textbox').click({
    button: 'right'
  });
  await page.getByText('2024').click();
  await page.getByText('Nov').click();
  await page.getByText('13').click();
  await page.locator('#gender').selectOption('M');
  await page.locator('#phoneNumber').click();
  await page.locator('#phoneNumber').fill('+421905810055123456789');
  // Assert the input value after filling
await expect(page.locator('#phoneNumber')).toHaveValue('+421905810055123456789');

// Alternative assertions:
// Check if the input is filled
await expect(page.locator('#phoneNumber')).toBeVisible();

// Verify the input is not empty
await expect(page.locator('#phoneNumber')).not.toBeEmpty();


  await page.locator('#invoiceLastName').click();
  await page.locator('#invoiceLastName').fill('👤NoTester');
  await page.locator('#state').click();
  await page.locator('#state').fill('Austria');
  await page.locator('tcommon-form-field').filter({ hasText: 'Country' }).locator('div').nth(1).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Updating your information').click();
  await page.locator('tgps-sidebar-action-item').filter({ hasText: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});