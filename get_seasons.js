const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const filePath = 'file://' + path.resolve('ai tex to calnder.html').replace(/ /g, '%20');

    try {
        await page.goto(filePath);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await page.waitForTimeout(1000);

        await page.evaluate(() => {
            if (typeof toggleView === 'function') {
                toggleView('more');
            }
        });
        await page.waitForTimeout(500);

        const rituTitle = await page.evaluate(() => {
            return document.querySelector('.season-ui-card span.text-2xl').innerText;
        });
        console.log("Current Season:", rituTitle);

        const currentImageUrl = await page.evaluate(() => {
            return document.querySelector('.season-ui-card img').src;
        });
        console.log("Current Image:", currentImageUrl);
    } finally {
        await browser.close();
    }
})();
