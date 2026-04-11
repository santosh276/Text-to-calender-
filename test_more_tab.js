const { chromium } = require('playwright');
const os = require('os');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    // Test Desktop
    let context = await browser.newContext({ viewport: { width: 1024, height: 800 } });
    let page = await context.newPage();
    await page.goto('file://' + process.cwd() + '/ai tex to calnder.html');

    let errors = [];
    page.on('pageerror', err => errors.push(err));

    await page.evaluate(() => {
        // Mock appState
        if (!window.appState) {
            window.appState = { config: {} };
        }
    });

    console.log("Desktop Navigation Test:");
    await page.waitForSelector('.menu-icon-btn');
    await page.click('#desktop-top-nav .menu-icon-btn'); // Click More

    // Check if #more-view-container is visible
    await page.waitForSelector('#more-view-container:not(.hidden)');
    let isVisible = await page.isVisible('#more-view-container');
    console.log(`More View Container Visible (Desktop): ${isVisible}`);

    // Check seamless scroll animation
    let hasAnimation = await page.evaluate(() => {
        const el = document.querySelector('.animate-seamless-scroll');
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.animationName !== 'none';
    });
    console.log(`Has Animation (Desktop): ${hasAnimation}`);

    await page.screenshot({ path: 'more_tab_desktop.png' });
    console.log("Saved more_tab_desktop.png");

    await context.close();

    // Test Mobile
    context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    page = await context.newPage();
    await page.goto('file://' + process.cwd() + '/ai tex to calnder.html');

    page.on('pageerror', err => errors.push(err));

    await page.evaluate(() => {
        // Mock appState
        if (!window.appState) {
            window.appState = { config: {} };
        }
    });

    console.log("Mobile Navigation Test:");
    await page.waitForSelector('#mobile-bottom-nav .menu-icon-btn');
    await page.click('#mobile-bottom-nav .menu-icon-btn', {force: true}); // Click More

    // Check if #more-view-container is visible
    await page.waitForSelector('#more-view-container:not(.hidden)');
    isVisible = await page.isVisible('#more-view-container');
    console.log(`More View Container Visible (Mobile): ${isVisible}`);

    await page.screenshot({ path: 'more_tab_mobile.png' });
    console.log("Saved more_tab_mobile.png");

    console.log(`Total Errors: ${errors.length}`);

    await browser.close();
})();
