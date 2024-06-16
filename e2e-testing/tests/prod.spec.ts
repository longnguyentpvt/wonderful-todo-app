import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://15.235.146.167:3001/todo-app/tasks');

  await expect(page).toHaveTitle("Wonderful Todo App");
});