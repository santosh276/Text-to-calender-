const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  // Navigate to the local HTML file
  await page.goto(`file:///app/ai tex to calnder.html`);

  // Wait for the app to be ready
  await page.waitForLoadState('networkidle');

  // Ensure the Panchang banner animation is disabled for a clean screenshot
  await page.addStyleTag({ content: '.animate-seamless-scroll { animation: none !important; }' });

  // Hide editor panel to not obstruct the view
  await page.addStyleTag({ content: '#editor-panel { display: none !important; }' });

  // Ensure panchang banner is visible
  await page.evaluate("document.getElementById('panchang-ticker').parentElement.style.display = 'flex';");

  // Switch to more view explicitly
  await page.evaluate("toggleView('more')");

  // Take a full-page screenshot
  await page.screenshot({ path: '/app/screenshot_ui_2.png', fullPage: true });

  await browser.close();
})();
