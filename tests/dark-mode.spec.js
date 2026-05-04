const { test, expect } = require('@playwright/test');

test.describe('Dark Mode Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
  });

  test('Dark mode toggle button exists', async ({ page }) => {
    const toggleButton = page.locator('.theme-toggle');
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute('aria-label', 'Toggle dark mode');
    console.log('✓ Dark mode toggle button exists');
  });

  test('Start in light mode by default', async ({ page }) => {
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const theme = await page.getAttribute('html', 'data-theme');
    const icon = await page.locator('.theme-icon').textContent();
    
    console.log('Initial theme:', theme || 'not set (light)');
    console.log('Initial icon:', icon);
    
    // Light mode is default (no data-theme attribute or light)
    expect(theme === null || theme === 'light').toBeTruthy();
    expect(icon).toBe('🌙');
  });

  test('Toggle to dark mode', async ({ page }) => {
    // Clear and start fresh
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Click toggle
    await page.locator('.theme-toggle').click();
    await page.waitForTimeout(300);

    const theme = await page.getAttribute('html', 'data-theme');
    const icon = await page.locator('.theme-icon').textContent();
    const bgColor = await page.locator('body').evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );

    console.log('After toggle - Theme:', theme);
    console.log('After toggle - Icon:', icon);
    console.log('After toggle - BG Color:', bgColor);

    expect(theme).toBe('dark');
    expect(icon).toBe('☀️');
    // Dark background should be dark blue-ish
    expect(bgColor).toMatch(/rgb\(15,\s*23,\s*42\)/); // #0f172a
  });

  test('Toggle back to light mode', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Toggle to dark
    await page.locator('.theme-toggle').click();
    await page.waitForTimeout(300);
    
    // Toggle back to light
    await page.locator('.theme-toggle').click();
    await page.waitForTimeout(300);

    const theme = await page.getAttribute('html', 'data-theme');
    const icon = await page.locator('.theme-icon').textContent();

    expect(theme).toBe('light');
    expect(icon).toBe('🌙');
    console.log('✓ Toggle back to light mode works');
  });

  test('Dark mode persists after page reload', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Enable dark mode
    await page.locator('.theme-toggle').click();
    await page.waitForTimeout(300);

    // Reload page
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const theme = await page.getAttribute('html', 'data-theme');
    const icon = await page.locator('.theme-icon').textContent();
    const storedTheme = await page.evaluate(() => localStorage.getItem('portfolio-theme'));

    console.log('After reload - Theme:', theme);
    console.log('After reload - Icon:', icon);
    console.log('After reload - Stored:', storedTheme);

    expect(theme).toBe('dark');
    expect(icon).toBe('☀️');
    expect(storedTheme).toBe('dark');
  });

  test('Dark mode colors are applied', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.locator('.theme-toggle').click();
    await page.waitForTimeout(500);

    // Check various elements have dark mode colors
    const bodyBg = await page.locator('body').evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    const navbarBg = await page.locator('.navbar').evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    const textColor = await page.locator('.hero-title').evaluate(el => 
      window.getComputedStyle(el).color
    );

    console.log('Dark mode colors:');
    console.log('  Body BG:', bodyBg);
    console.log('  Navbar BG:', navbarBg);
    console.log('  Text Color:', textColor);

    // Dark backgrounds
    expect(bodyBg).toMatch(/rgb\(15,\s*23,\s*42\)/); // #0f172a
    expect(navbarBg).toMatch(/rgb\(15,\s*23,\s*42\)/);
    // Light text on dark
    expect(textColor).toMatch(/rgb\(241,\s*245,\s*249\)/); // #f1f5f9
  });

  test('Respect system preference if no saved preference', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    
    // Simulate dark mode system preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const theme = await page.getAttribute('html', 'data-theme');
    console.log('System dark preference - Theme:', theme);
    
    // Should default to dark when system prefers dark
    expect(theme).toBe('dark');
  });

  test('Take screenshots of both modes', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Light mode screenshot
    await page.screenshot({ 
      path: 'screenshots/dark-mode-light.png',
      fullPage: true 
    });
    console.log('✓ Light mode screenshot saved');

    // Toggle to dark
    await page.locator('.theme-toggle').click();
    await page.waitForTimeout(500);

    // Dark mode screenshot
    await page.screenshot({ 
      path: 'screenshots/dark-mode-dark.png',
      fullPage: true 
    });
    console.log('✓ Dark mode screenshot saved');
  });
});
