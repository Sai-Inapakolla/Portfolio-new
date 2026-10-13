import { test, expect, type Page } from '@playwright/test';

async function explore(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Explore portfolio' }).click();
  await expect(page.getByRole('dialog', { name: 'Opening titles' })).toHaveCount(0);
  await expect(page.locator('#top').getByRole('heading', { name: 'SUSHMITA', exact: true })).toBeVisible();
}

test('direct entry and profile selection persist across reloads', async ({ page }) => {
  await explore(page);
  await page.getByRole('button', { name: /Switch profile/ }).click();
  await page.getByRole('menuitem', { name: /Recruiter/ }).click();
  await expect(page.locator('main > section[id]').nth(1)).toHaveAttribute('id', 'story');
  await page.reload();
  await expect(page.getByRole('button', { name: /Viewing as Recruiter/ })).toBeVisible();
});

test('intro tap zones work and modal focus returns to its trigger', async ({ page }) => {
  await explore(page);
  const trigger = page.getByRole('button', { name: /Play Intro/ });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Intro highlight reel' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Pause', exact: true }).click();
  await dialog.getByRole('button', { name: 'Next highlight' }).click();
  await expect(dialog.getByRole('heading', { name: 'Java first.' })).toBeVisible();
  await dialog.getByRole('button', { name: 'Previous highlight' }).click();
  await expect(dialog.getByRole('heading', { name: 'B.Tech · AI & ML' })).toBeVisible();
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.querySelector('dialog')?.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('resume is keyboard accessible and its PDF is available', async ({ page }) => {
  await explore(page);
  const trigger = page.getByRole('button', { name: 'View Resume', exact: false });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Resume', exact: true });
  await expect(dialog.getByRole('button', { name: 'Close resume' })).toBeFocused();
  const href = await dialog.getByRole('link', { name: /Download/ }).getAttribute('href');
  expect((await page.request.get(href!)).ok()).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('large touch screens use a swipe rail and unvisited sections have zero progress', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    const match = window.matchMedia.bind(window);
    window.matchMedia = (query) => query.includes('pointer: fine') ? match('(max-width: 0px)') : match(query);
  });
  await explore(page);
  await expect(page.locator('#originals .overflow-x-auto')).toBeVisible();
  await expect(page.locator('section[aria-labelledby="continue-title"]')).toHaveAccessibleName('Continue Exploring');
  await expect(page.locator('section[aria-labelledby="continue-title"] button').filter({ hasText: 'The Full Story' }).locator('.origin-left')).toHaveCSS('transform', 'matrix(0, 0, 0, 1, 0, 0)');
});


test('project overlay contains focus and restores its card after closing', async ({ page }) => {
  await explore(page);
  const trigger = page.getByRole('button', { name: 'Open PolicyGuard AI', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'PolicyGuard AI', exact: true });
  await expect(dialog.getByRole('button', { name: 'Close project' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.querySelector('dialog')?.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('mobile resume scrolls within the dialog and offers the original PDF', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await explore(page);
  await page.getByRole('button', { name: /View Resume/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Resume', exact: true });
  const scroller = dialog.locator('[data-lenis-prevent]');
  await expect(scroller).toBeVisible();
  expect(await scroller.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true);
  const link = dialog.getByRole('link', { name: 'Open original PDF' });
  await link.scrollIntoViewIfNeeded();
  await expect(link).toBeInViewport();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});

test('failed lazy overlay leaves a usable return path', async ({ page }) => {
  await page.route('**/src/components/PlayIntro.tsx*', (route) => route.abort());
  await explore(page);
  await page.getByRole('button', { name: /Play Intro/ }).click();
  const failure = page.getByRole('dialog', { name: 'Unable to open content' });
  await expect(failure).toBeVisible();
  await failure.getByRole('button', { name: 'Back to portfolio' }).click();
  await expect(failure).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Play Intro/ })).toBeFocused();
});
