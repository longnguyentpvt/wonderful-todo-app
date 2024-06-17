import { test, expect, Page } from '@playwright/test';


let page: Page;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('open Prod', async () => {
  await page.goto('http://15.235.146.167:3001/todo-app/tasks');
});

test('has title', async () => {
  await expect(page).toHaveTitle("Wonderful Todo App");
});

test('has breadcrumb', async () => {
  const breadcrumbSelector = 'div.fs-3';
  const breadcrumbLocator = page.locator(breadcrumbSelector);
  await page.waitForSelector(breadcrumbSelector);

  const isVisible = await breadcrumbLocator.isVisible();
  expect(isVisible).toBeTruthy();

  const text = await breadcrumbLocator.innerText();
  expect(text).toBe("Todo List");
});

test('has new task button', async () => {
  const buttonLocator = page.getByRole('button', { name: /\+ NEW TASK/i });

  const isVisible = await buttonLocator.isVisible();
  expect(isVisible).toBeTruthy();
});

test('able to open Create modal', async () => {
  const buttonLocator = page.getByRole('button', { name: /\+ NEW TASK/i });

  await buttonLocator.click();

  const modalLocator = page.locator('div.offcanvas');
  const title = modalLocator.locator('.offcanvas-title');

  const titleText = await title.innerText();
  expect(titleText).toBe('Detail');
});