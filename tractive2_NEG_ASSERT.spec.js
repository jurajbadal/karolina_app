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
  

  //await page.pause();
  
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Try Demo Mode' }).click();
  await page.screenshot({ 
    path: 'test-results/screenshots/screenshot.png', 
    fullPage: true 
  });
  // Basic visibility assertion
  await expect(page.getByText('Just FYI - this demo will be')).toBeVisible();

  // Alternative assertions you might use:
  // Check exact text content
  await expect(page.getByText('Just FYI - this demo will be')).toHaveText('Just FYI - this demo will be');

  // Check if the element exists
  await expect(page.getByText('Just FYI - this demo will be')).toBeAttached();

  await page.pause();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Don\'t allow' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  const title = await page.title();
  console.log(title);


  await page.getByRole('link', { name: 'Next' }).click();
  
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Done' }).click();
  
  await page.pause();
  
});
