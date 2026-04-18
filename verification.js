const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 } // iPhone 12 Pro dimensions
  });

  await page.goto('file:///app/ai tex to calnder.html');
  await page.waitForTimeout(1000);

  // Inject bubble card manually so we can verify its search behavior
  await page.evaluate(() => {
     if (typeof renderBubbleCard === 'function') {
         window.appState.bubbleCards = [
             { title: 'My Quick Link', link: 'https://example.com', image: '', color: '#ff0000', mainTitle: 'Quick Links' }
         ];
         renderBubbleCard(window.appState.bubbleCards[0]);
     }
  });

  // Test the tools search input by searching for "quick"
  await page.fill('#tools-search-input', 'quick');
  await page.waitForTimeout(500);

  // Check if dropdown became visible
  const dropdownClass = await page.evaluate(() => {
     return document.getElementById('tools-search-dropdown').className;
  });

  if (dropdownClass.includes('hidden')) {
      console.log('FAIL: Dropdown is hidden after searching for quick links.');
  } else {
      console.log('SUCCESS: Dropdown is visible.');

      const resultsHTML = await page.evaluate(() => {
          return document.getElementById('tools-search-dropdown').innerHTML;
      });
      console.log("Dropdown HTML:", resultsHTML.trim().substring(0, 300));

      if (resultsHTML.includes('My Quick Link')) {
          console.log('SUCCESS: Bubble card title is in search results.');
      } else {
          console.log('FAIL: Bubble card title NOT found in search results.');
      }

      if (resultsHTML.includes('Quick Links')) {
          console.log('SUCCESS: Bubble card Main Title is in search results as badge.');
      } else {
          console.log('FAIL: Bubble card Main Title badge NOT found in search results.');
      }
  }

  await browser.close();
})();
