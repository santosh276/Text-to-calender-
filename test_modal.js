const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('file:///app/ai%20tex%20to%20calnder.html');

    await page.evaluate(() => {
        // Provide mock function implementations that the file needs
        window.getSpecialTimes = () => [];
        window.SunCalc = {
            getTimes: () => ({ sunrise: new Date(), sunset: new Date() }),
            getMoonTimes: () => ({ rise: new Date(), set: new Date() })
        };
        window.calculateTithi = () => ({ index: 1, name: 'Pratipada', jd: 0, sunLon: 0, moonLon: 0, paksha: 'Shukla' }); // added paksha

        // Mock appState structure needed inside generateDayModalHTML
        appState.details = {};
        appState.recurringDetails = {};
        appState.config = appState.config || {};
        appState.config.location = { lat: 0, lng: 0 };
        appState.config.language = 'en';

        const eventsArr = [
            { date: 15, symbol: '!', engName: 'Event with [brackets]', locName: '(Local event)' },
            { date: 15, symbol: '*', engName: 'Another (test)', locName: '[Test local]' }
        ];

        const monthDataMock = {
            year: 2025,
            month: 0,
            events: eventsArr,
            days: Array.from({length: 31}, (_, i) => ({
                date: i + 1,
                events: i + 1 === 15 ? eventsArr : []
            }))
        };

        // Ensure month names are available to prevent undefined array access
        window.langData = window.langData || {
            en: {
                indianSeasons: ['Season1','Season2','Season3','Season4','Season5','Season6'],
                indianMonths: ['Month1','Month2','Month3','Month4','Month5','Month6','Month7','Month8','Month9','Month10','Month11','Month12']
            }
        };

        const html = generateDayModalHTML(15, monthDataMock);
        document.body.innerHTML += `<div id="test-container" style="display:block;">${html}</div>`;
    });

    await page.waitForSelector('#new-modal-rich-body', { state: 'attached', timeout: 5000 });

    const modalHtml = await page.innerHTML('#new-modal-rich-body');
    console.log("Modal Rich Body HTML:");
    console.log(modalHtml);

    let failed = false;
    if (modalHtml.includes('[') || modalHtml.includes('(')) {
        console.error("TEST FAILED: Brackets still present in the modal output.");
        failed = true;
    } else {
        console.log("TEST PASSED: No brackets found in the modal output.");
    }

    if (modalHtml.includes('modal-card') && modalHtml.includes('relative') && modalHtml.includes('absolute left-0')) {
        console.log("TEST PASSED: Correct modal-card classes found.");
    } else {
        console.error("TEST FAILED: Correct modal-card classes not found.");
        failed = true;
    }

    await browser.close();
    if (failed) process.exit(1);
})();
