const { chromium } = require('playwright');
const path = require('path');

(async () => {
    let browser;
    try {
        console.log("Starting Playwright Test...");
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();

        const filePath = 'file://' + path.resolve('/app/ai tex to calnder.html');
        console.log("Navigating to: " + filePath);
        await page.goto(filePath);

        // Wait for page to load fully
        await page.waitForTimeout(2000);

        console.log("Opening Add Custom Card Modal...");
        await page.click('text=Add Custom Card');
        await page.waitForSelector('#custom-card-modal', { state: 'visible' });

        console.log("Selecting Design 3...");
        await page.selectOption('#custom-card-design', 'bubble tab');

        console.log("Filling form...");
        await page.fill('#custom-card-title', 'Test Bubble');
        await page.fill('#custom-card-desc', 'Bubble description');
        await page.fill('#custom-card-image', 'https://example.com/bubble.jpg');
        await page.fill('#custom-card-link', 'https://example.com/bubble-link');

        console.log("Submitting form...");
        await page.click('button[type="submit"]:has-text("Add Card")');

        await page.waitForTimeout(1000); // give time for parse and render

        console.log("Navigating to More tab...");
        // Need to trigger toggleView('more')
        await page.evaluate(() => {
            toggleView('more');
        });
        await page.waitForTimeout(1000); // give time for transition

        console.log("Verifying Bubble Card exists and has correct classes...");
        const bubbleSelector = '#bubble-container a.snap-start';
        const bubbleCard = await page.$(bubbleSelector);
        if (!bubbleCard) throw new Error("Bubble card not found in DOM");

        // Verify Hyperlink
        const href = await bubbleCard.getAttribute('href');
        if (href !== 'https://example.com/bubble-link') throw new Error(`Incorrect hyperlink: ${href}`);

        // Verify rounded-full on image container
        const imgContainer = await bubbleCard.$('div.rounded-full');
        if (!imgContainer) throw new Error("Image container missing 'rounded-full' class");

        // Verify Title positioned inside the card below image
        const titleSpan = await bubbleCard.$('span.text-center');
        if (!titleSpan) throw new Error("Title span not found");
        const titleText = await titleSpan.innerText();
        if (titleText !== 'Test Bubble') throw new Error(`Incorrect title: ${titleText}`);

        // Verify Title is positioned *below* the circle by comparing bounding boxes
        const imgBox = await imgContainer.boundingBox();
        const titleBox = await titleSpan.boundingBox();
        if (imgBox.y >= titleBox.y) {
             throw new Error("Title is not positioned below the circular image container!");
        }

        console.log("Reloading page to test localStorage persistence...");
        await page.reload();
        await page.waitForTimeout(2000);

        await page.evaluate(() => { toggleView('more'); });
        await page.waitForTimeout(1000);

        const bubbleCardAfterReload = await page.$(bubbleSelector);
        if (!bubbleCardAfterReload) throw new Error("Bubble card lost after reload (localStorage issue)");

        console.log("Playwright test passes 100% for this exact string.");
    } catch (err) {
        console.error("Test failed:", err);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
})();
