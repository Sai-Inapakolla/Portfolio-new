import { test, expect } from '@playwright/test';

test('discovery URLs serve Markdown and JSON instead of SPA HTML', async ({ request }) => {
  const llms = await request.get('/llms.txt');
  expect(llms.ok()).toBe(true);
  const markdown = await llms.text();
  expect(markdown).toMatch(/^# Sai Inapakolla/m);
  expect(markdown).toMatch(/\[[^\]]+\]\(https:\/\//);
  expect(markdown).not.toContain('<!doctype');
  const overview = await request.get('/index.md');
  expect(overview.ok()).toBe(true);
  expect(await overview.text()).toMatch(/^# Sai Inapakolla/);
  let canonical;
  for (const path of ['/ai-catalog.json', '/.well-known/ai-catalog.json', '/.well-known/ard.json']) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('application/json');
    const catalog = await response.json();
    expect(catalog.specVersion).toBe('1.0');
    expect(catalog.entries.length).toBeGreaterThan(0);
    for (const entry of catalog.entries) {
      expect(entry.identifier).toMatch(/^urn:air:sai-inapakolla:[a-z0-9-]+$/);
      expect(entry.displayName).toBeTruthy();
      expect(entry.type).toMatch(/^[\w.+-]+\/[\w.+-]+$/);
      expect(entry.url).toMatch(/^https:\/\/safego1\.vercel\.app\//);
      expect(entry.data).toBeUndefined();
      expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2);
      expect(entry.representativeQueries.length).toBeLessThanOrEqual(5);
    }
    if (canonical) expect(catalog).toEqual(canonical);
    canonical = catalog;
  }
});
