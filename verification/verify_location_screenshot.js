
const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const filePath = path.join(process.cwd(), 'ai tex to calnder.html');

    await page.goto(`file://${filePath}`);

    // Set location and render
    await page.evaluate(() => {
        appState.config.location = { lat: 20.29, lng: 85.82, name: 'Bhubaneswar, Odisha' };
        render();
    });

    // Take screenshot of the sidebar
    const element = await page.locator('#panchang-list');
    await element.screenshot({ path: 'verification/location_display.png' });

    console.log("Screenshot taken at verification/location_display.png");

    await browser.close();
})();
