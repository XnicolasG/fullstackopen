const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')


describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing')
    await request.post('/api/users', {
      data: {
        username: 'percy1',
        password: 'P3rcy'
      }
    })

    await page.goto('/')
  })

  test('login fails with wrong password', async ({ page }) => {
    // await page.getByRole('button', { name: 'log in' }).click()
    // await page.getByTestId('username').fill('percy1')
    // await page.getByTestId('password').fill('wrong')
    // await page.getByRole('button', { name: 'login' }).click()
    await loginWith(page, 'percy1', 'wrong')


    await expect(page.getByText('Wrong credentials, please try again')).toBeVisible()
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('Login form can be opened', async ({ page }) => {
    // await page.getByRole('button', { name: /log in/i }).click()

    // await page.getByTestId('username').fill('percy1')
    // await page.getByTestId('password').fill('P3rcy')
    // await page.getByRole('button', { name: 'Login' }).click()

    await loginWith(page, 'percy1', 'P3rcy')

    await expect(page.getByText('logged-in')).toBeVisible()
  })

  describe('when logged a note exist', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3001/api/testing')

      await loginWith(page, 'percy1', 'P3rcy')

      await expect(page.getByText('logged-in')).toBeVisible()

      await createNote(page, 'another note by playwright')
      // await page.getByRole('button', { name: 'New note' }).click()
      // await page.getByTestId('new note').fill('another note by playwright')
      // await page.getByRole('button', { name: 'save' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.locator('li:nth-last-child(1)').getByRole('button', { name: 'make not important' }).click()
      await expect(
        page.locator('li:nth-last-child(1)').getByText('make important')
      ).toBeVisible({ timeout: 30000 })
    })
  })
})