const { test, expect } = require('@playwright/test');

test.describe('Portfolio Screenshot Tests', () => {
  test('Screenshot mobile (iPhone 12)', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'screenshots/portfolio-mobile.png',
      fullPage: true 
    });
    
    console.log('✓ Screenshot saved: portfolio-mobile.png');
  });

  test('Screenshot tablet (iPad Mini)', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'screenshots/portfolio-tablet.png',
      fullPage: true 
    });
    
    console.log('✓ Screenshot saved: portfolio-tablet.png');
  });

  test('Screenshot desktop (1920x1080)', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'screenshots/portfolio-desktop.png',
      fullPage: true 
    });
    
    console.log('✓ Screenshot saved: portfolio-desktop.png');
  });

  test('Check for visual issues', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check for text overflow
    const textOverflow = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const overflowed = [];
      elements.forEach(el => {
        if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
          if (el.tagName.match(/^(P|H[1-6]|SPAN|A)$/)) {
            overflowed.push(el.tagName + ' with class: ' + el.className);
          }
        }
      });
      return overflowed.slice(0, 5);
    });
    
    // Check for broken images
    const brokenImages = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const broken = [];
      images.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
          broken.push(img.src || img.alt);
        }
      });
      return broken;
    });
    
    // Check for small fonts
    const smallFonts = await page.evaluate(() => {
      const elements = document.querySelectorAll('p, span, a, button, label');
      const issues = [];
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize);
        if (fontSize < 12) {
          issues.push(el.tagName + ' font-size: ' + fontSize + 'px');
        }
      });
      return issues.slice(0, 3);
    });
    
    // Check for overlapping elements
    const overlaps = await page.evaluate(() => {
      const elements = document.querySelectorAll('.card, .btn, .form-input');
      const issues = [];
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width < 50 || rect.height < 20) {
          issues.push(el.className + ' may be too small');
        }
      });
      return issues.slice(0, 3);
    });
    
    console.log('\n=== Visual Issues Report ===');
    console.log('Text Overflow:', textOverflow.length ? textOverflow : 'None');
    console.log('Broken Images:', brokenImages.length ? brokenImages : 'None (using placeholders)');
    console.log('Small Fonts:', smallFonts.length ? smallFonts : 'None');
    console.log('Element Issues:', overlaps.length ? overlaps : 'None');
    
    expect(textOverflow.length).toBeLessThan(3);
  });

  test('Test dark mode toggle', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Take light mode screenshot
    await page.screenshot({ 
      path: 'screenshots/portfolio-light-mode.png',
      fullPage: true 
    });
    
    // Click dark mode toggle
    await page.click('.theme-toggle');
    await page.waitForTimeout(500);
    
    // Take dark mode screenshot
    await page.screenshot({ 
      path: 'screenshots/portfolio-dark-mode.png',
      fullPage: true 
    });
    
    // Verify dark mode is applied
    const theme = await page.getAttribute('html', 'data-theme');
    console.log('✓ Dark mode toggle works. Current theme:', theme);
    
    expect(theme).toBe('dark');
  });

  test('Test mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check if hamburger menu is visible
    const hamburgerVisible = await page.isVisible('.nav-toggle');
    console.log('Hamburger menu visible on mobile:', hamburgerVisible);
    
    if (hamburgerVisible) {
      // Click hamburger
      await page.click('.nav-toggle');
      await page.waitForTimeout(300);
      
      // Check if nav is open
      const navOpen = await page.evaluate(() => {
        return document.querySelector('.nav-links').classList.contains('active');
      });
      
      console.log('Mobile nav opens:', navOpen);
      expect(navOpen).toBe(true);
      
      // Take screenshot with open nav
      await page.screenshot({ 
        path: 'screenshots/portfolio-mobile-nav-open.png'
      });
    }
  });

  test('Test form validation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Scroll to contact section
    await page.click('a[href="#contact"]');
    await page.waitForTimeout(500);
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);
    
    // Check for error messages
    const errors = await page.evaluate(() => {
      const errorElements = document.querySelectorAll('.form-error');
      const errors = [];
      errorElements.forEach(el => {
        if (el.textContent.trim()) {
          errors.push(el.textContent.trim());
        }
      });
      return errors;
    });
    
    console.log('Form validation errors:', errors);
    expect(errors.length).toBeGreaterThan(0);
    
    // Take screenshot with errors
    await page.screenshot({ 
      path: 'screenshots/portfolio-form-errors.png'
    });
  });
});
