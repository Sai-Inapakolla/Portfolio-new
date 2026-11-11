import { test, expect, type Page } from '@playwright/test';

async function explore(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Explore portfolio' }).click();
  await expect(page.getByRole('dialog', { name: 'Opening titles' })).toHaveCount(0);
  await expect(page.locator('#top').getByRole('heading', { name: 'SAI', exact: true })).toBeVisible();
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
  expect(await dialog.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(0, 0, 0)');
  await dialog.getByRole('button', { name: 'Pause', exact: true }).click();
  await dialog.getByRole('button', { name: 'Next highlight' }).click();
  await expect(dialog.getByRole('heading', { name: 'Enterprise & secure.' })).toBeVisible();
  await dialog.getByRole('button', { name: 'Previous highlight' }).click();
  await expect(dialog.getByRole('heading', { name: 'Full-Stack. Systems. Scale.' })).toBeVisible();
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.querySelector('dialog')?.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('resume is keyboard accessible and its dialog opens', async ({ page }) => {
  await explore(page);
  const trigger = page.getByRole('button', { name: 'View Resume', exact: false });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Resume', exact: true });
  await expect(dialog.getByRole('button', { name: 'Close resume' })).toBeFocused();
  expect(await dialog.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
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
  const trigger = page.getByRole('button', { name: 'Open TeamX', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'TeamX', exact: true });
  await expect(dialog.getByRole('button', { name: 'Close project' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.querySelector('dialog')?.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('mobile resume scrolls within the dialog', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await explore(page);
  await page.getByRole('button', { name: /View Resume/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Resume', exact: true });
  const scroller = dialog.locator('[data-lenis-prevent]');
  await expect(scroller).toBeVisible();
  expect(await scroller.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true);
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

test('Sai résumé content and metadata replace the previous portfolio', async ({ page }) => {
  await explore(page);
  await expect(page).toHaveTitle(/Sai Inapakolla/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Sai Inapakolla/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://safego1.vercel.app/');
  await expect(page.locator('main')).not.toContainText(/Amit Sah|ThinkNEXT|Chitkara/);
  await expect(page.getByRole('button', { name: 'Open TeamX', exact: true })).toHaveCount(1);
  await expect(page.locator('#about')).toContainText('Parul');
  await expect(page.locator('#moments')).toContainText('Moments');
  const catButtons = page.locator('#skills [aria-label="Skill categories"] button');
  await expect(catButtons).toHaveCount(6);
  await expect(catButtons.nth(0)).toContainText('Languages');
  await expect(catButtons.nth(1)).toContainText('Backend Development');
  await expect(catButtons.nth(2)).toContainText('Frontend Development');
  await expect(catButtons.nth(3)).toContainText('Database Engineering');
  await expect(catButtons.nth(4)).toContainText('AI & Machine Learning');
  await expect(catButtons.nth(5)).toContainText('Cloud, Tools & Testing');
  await expect(page.locator('#skills').getByRole('button', { name: /TypeScript/ })).toBeVisible();
});

test('skills render custom icon images and expandable work descriptions', async ({ page }) => {
  await page.route('**/api/portfolio', (route) => route.fulfill({ json: { data: null } }));
  await page.addInitScript(() => {
    localStorage.setItem(
      'sai_portfolio_custom_data_v1',
      JSON.stringify({
        skillCategories: [
          {
            id: 'backend',
            title: 'Backend Development',
            subtitle: 'Robust enterprise services, APIs & security',
            skills: [
              {
                name: 'Java',
                mono: 'Ja',
                note: 'Primary',
                iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
                description: 'TeamX: Custom multi-tenant Java backend architecture',
              },
              {
                name: 'Spring Boot',
                mono: 'SB',
                note: 'Primary',
              },
            ],
          },
        ],
      }),
    );
  });

  await explore(page);
  await page.locator('#skills').getByRole('button', { name: /Backend Development/ }).click();
  await expect(page.locator('#skills').getByRole('button', { name: /Spring Boot/ })).toBeVisible();
  const javaCard = page.locator('#skills').getByRole('button', { name: /^Java\b/ });
  await expect(javaCard).toBeVisible();
  await expect(javaCard.locator('img')).toHaveAttribute('src', /^data:image\/png;base64,/);
  await javaCard.click();
  await expect(javaCard).toContainText('TeamX: Custom multi-tenant Java backend architecture');
});
