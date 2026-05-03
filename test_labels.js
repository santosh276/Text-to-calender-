const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const filePath = 'file://' + path.resolve('ai tex to calnder.html');
    await page.goto(filePath);

    // Wait for initial render
    await page.waitForTimeout(1000);

    // Inject custom labels syntax into the editor
    await page.evaluate(() => {
        const editor = document.getElementById('editor');
        editor.value += '\n::: labels\ncalendar_nav : କ୍ୟାଲେଣ୍ଡର\npanchang_header : ପଞ୍ଚାଙ୍ଗ\n:::';
        editor.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Wait for the render to complete
    await page.waitForTimeout(1000);

    // Verify calendar_nav
    const calendarNavText = await page.evaluate(() => {
        const el = document.querySelector('[data-i18n="calendar_nav"]');
        return el ? el.innerText : null;
    });

    // Verify panchang_header
    const panchangHeaderText = await page.evaluate(() => {
        const el = document.querySelector('[data-i18n="panchang_header"]');
        return el ? el.innerText : null;
    });

    console.log('Calendar Nav Text:', calendarNavText);
    console.log('Panchang Header Text:', panchangHeaderText);

    if (calendarNavText === 'କ୍ୟାଲେଣ୍ଡର' && panchangHeaderText === 'ପଞ୍ଚାଙ୍ଗ') {
        console.log('SUCCESS: Labels updated correctly.');
    } else {
        console.log('FAILURE: Labels did not update correctly.');
        process.exit(1);
    }

    await browser.close();
})();
