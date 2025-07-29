const { test, describe, expect, beforeEach } = require('@playwright/test')


describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })
  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('Login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: /log in/i }).click()

    await page.getByTestId('username').fill('percy1')
     await page.getByTestId('password').fill('P3rcy')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Percy logged-in')).toBeVisible()
  })
})