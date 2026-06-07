const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1800 });
    await page.goto('file://' + __dirname + '/ai tex to calnder.html');

    const testData = `
::: Footer tab
Main Title: [ASTROLOGY]
Title: [Daily Horoscope]
Hyperlink: [https://example.com/daily]

::: Footer tab
Main Title: [ASTROLOGY]
Title: [Kundli]
Hyperlink: [https://example.com/kundli]

::: Footer tab
Main Title: [CALCULATORS]
Title: [Love Match]
Hyperlink: [https://example.com/love]
Image Link: [https://example.com/icon.png]

::: Footer tab
Main Title: [CALCULATORS]
Title: [Numerology]
Hyperlink: [https://example.com/numerology]
`;

    // Wait for the app to initialize
    await page.waitForTimeout(1000);

    // Call parseInput to inject the data
    await page.evaluate((data) => {
        window.parseInput(data);
        window.render();
    }, testData);

    // Open More Tab
    await page.evaluate(() => {
        window.toggleView('more');
    });

    // Wait for dynamic container to be updated
    await page.waitForTimeout(1000);

    // Assertions
    const astrologyHeader = page.locator('h4.text-orange-600:has-text("ASTROLOGY")');
    await astrologyHeader.waitFor({ state: 'visible' });

    const calculatorsHeader = page.locator('h4.text-orange-600:has-text("CALCULATORS")');
    await calculatorsHeader.waitFor({ state: 'visible' });

    // Verify list structure
    const listItems = page.locator('ul.space-y-3 li a');
    const listCount = await listItems.count();
    if (listCount !== 4) {
        console.error("Expected 4 list items, found", listCount);
        process.exit(1);
    }

    const firstLinkText = await listItems.nth(0).innerText();
    if (!firstLinkText.includes('Daily Horoscope')) {
        console.error("Expected Daily Horoscope text, got", firstLinkText);
        process.exit(1);
    }

    // Scroll to the bottom of the "More" tab
    await page.evaluate(() => {
        const moreContainer = document.getElementById('dynamic-cards-container');
        if (moreContainer) moreContainer.scrollIntoView({ behavior: 'instant', block: 'end' });
    });

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test_footer_link.png', fullPage: true });

    console.log("Playwright Frontend Verification passed 100%");
    await browser.close();
})();
