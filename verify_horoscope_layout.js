const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Serve the file locally to avoid cross-origin issues with file:// protocol if any
    // But direct file access is usually fine for DOM checks
    const filePath = path.resolve('ai tex to calnder.html');
    const fileUrl = `file://${filePath}`;

    await page.goto(fileUrl);

    // Wait for the app to initialize
    await page.waitForTimeout(1000);

    // We need to trigger renderHoroscope. It runs on load if data exists, or we can trigger it manually.
    // By default, rawInput might be empty or have default data.
    // Let's inspect the grid.

    const gridSelector = '#horoscope-grid';
    await page.waitForSelector(gridSelector);

    // Check grid classes
    const gridClass = await page.$eval(gridSelector, el => el.className);
    if (!gridClass.includes('grid-cols-3')) {
        console.error('FAIL: Grid does not have grid-cols-3 class. Class is:', gridClass);
        process.exit(1);
    }
    console.log('PASS: Grid has grid-cols-3 class');

    // Check number of items
    const buttons = await page.$$(`${gridSelector} button`);
    if (buttons.length !== 12) {
        console.error(`FAIL: Expected 12 buttons, found ${buttons.length}`);
        process.exit(1);
    }
    console.log(`PASS: Found ${buttons.length} horoscope buttons`);

    // Check styling of the first button's circle wrapper
    const firstButtonInner = await page.$eval(`${gridSelector} button:first-child > div`, el => el.className);
    if (!firstButtonInner.includes('rounded-full') || !firstButtonInner.includes('w-16')) {
        console.error('FAIL: Circle wrapper does not have rounded-full or w-16 class. Class is:', firstButtonInner);
        process.exit(1);
    }
    console.log('PASS: Circle wrapper has rounded-full and w-16 classes');

    // Check labels
    const labels = await page.$$eval(`${gridSelector} button span`, spans => spans.map(s => s.innerText));
    const expectedSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

    // Note: Labels might be localized or uppercase. The code uses localizedName.
    // Default language is 'en', so it should match.
    // Code: localizedName = localizedHoroscopes[signKey] ...
    // Code: btn.innerText (or innerHTML) includes localizedName.

    // Let's just check if we have 12 labels and they look like text.
    // We can check if 'Aries' is present (case insensitive).
    const ariesFound = labels.some(l => l.toLowerCase().includes('aries'));
    if (!ariesFound) {
         console.error('FAIL: Could not find "Aries" label. Found:', labels);
         process.exit(1);
    }
    console.log('PASS: Labels look correct (found Aries)');

    await browser.close();
    console.log('ALL CHECKS PASSED');
})();
