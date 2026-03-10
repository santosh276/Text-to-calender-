const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  // Navigate to local file
  const filePath = 'file://' + path.resolve(__dirname, 'ai tex to calnder.html');
  await page.goto(filePath);

  // Wait for calendar rendering
  await page.waitForSelector('.grid-cell');
  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({ path: 'calendar_desktop_final.png', fullPage: true });

  await browser.close();
})();
