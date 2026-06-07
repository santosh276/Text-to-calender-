const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });

    // Test 1: Mobile Layout
    const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await mobilePage.addInitScript(() => {
        window.navigator.geolocation.getCurrentPosition = (success) => {
            success({ coords: { latitude: 28.6139, longitude: 77.2090 } });
        };
    });

    const filePath = `file://${path.join(process.cwd(), 'ai tex to calnder.html')}`;
    await mobilePage.goto(filePath);

    const editor = mobilePage.locator('#editor');
    const syntaxToInject = `
::: Footer tab
Main Title: [PANCHANG]
Title: [Today's Panchang]
Hyperlink: [https://example.com/panchang]

::: Footer tab
Main Title: [PANCHANG]
Title: [Monthly Calendar]
Hyperlink: [https://example.com/monthly]

::: Footer tab
Main Title: [ASTROLOGY]
Title: [Daily Horoscope]
Hyperlink: [https://example.com/horoscope]

::: Footer tab
Main Title: [ASTROLOGY]
Title: [Kundli Match]
Hyperlink: [https://example.com/kundli]
`;

    await editor.fill(syntaxToInject);
    await mobilePage.waitForTimeout(500);

    await mobilePage.evaluate(() => toggleView('more'));
    await mobilePage.waitForTimeout(500);

    const footerGrid = mobilePage.locator('#dynamic-cards-container .max-w-screen-xl');
    const gridClass = await footerGrid.getAttribute('class');
    if (gridClass.includes('grid-cols-1') && gridClass.includes('gap-y-8') && gridClass.includes('px-6')) {
        console.log("Mobile optimization classes applied correctly.");
    }

    await mobilePage.evaluate(() => {
        const el = document.querySelector('#dynamic-cards-container > div.w-screen');
        if (el) {
            el.scrollIntoView();
            window.scrollBy(0, 200);
        }
    });
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: 'footer_mobile_opt_screenshot.png', fullPage: true });
    console.log("Mobile screenshot taken.");
    await mobilePage.close();


    // Test 2: Desktop Layout
    const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await desktopPage.addInitScript(() => {
        window.navigator.geolocation.getCurrentPosition = (success) => {
            success({ coords: { latitude: 28.6139, longitude: 77.2090 } });
        };
    });

    await desktopPage.goto(filePath);

    const desktopEditor = desktopPage.locator('#editor');
    await desktopEditor.fill(syntaxToInject);
    await desktopPage.waitForTimeout(500);

    await desktopPage.evaluate(() => toggleView('more'));
    await desktopPage.waitForTimeout(500);

    await desktopPage.evaluate(() => {
        const el = document.querySelector('#dynamic-cards-container > div.w-screen');
        if (el) {
            el.scrollIntoView();
            window.scrollBy(0, 200);
        }
    });
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({ path: 'footer_desktop_opt_screenshot.png', fullPage: true });
    console.log("Desktop screenshot taken.");
    await desktopPage.close();

    await browser.close();
})();
