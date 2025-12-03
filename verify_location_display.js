const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Log console messages
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto('http://localhost:8080/ai%20tex%20to%20calnder.html');

    // Wait for appState to be available
    await page.waitForFunction(() => typeof window.appState !== 'undefined');

    // Inject location state
    await page.evaluate(() => {
      window.appState.config.location = { lat: 20.29, lng: 85.82, name: 'Bhubaneswar, Odisha' };
      if (typeof window.saveConfigToStorage === 'function') window.saveConfigToStorage();
      if (typeof window.render === 'function') window.render();
    });

    // Give a little time for rendering
    await page.waitForTimeout(500);

    // Check if Location is in the list
    const listText = await page.innerText('#panchang-list');
    console.log('Panchang List Content:\n', listText);

    if (listText.includes('Location:')) {
      console.log('TEST PASS: "Location:" IS present in the list.');
    } else {
      console.log('TEST FAIL: "Location:" IS NOT present in the list.');
    }

    // Check the footer container
    const footerText = await page.innerText('#location-btn-container');
    console.log('Footer Content:', footerText);

    await browser.close();
  } catch (e) {
    console.error('Error in verification script:', e);
  }
})();
