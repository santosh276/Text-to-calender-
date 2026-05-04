const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Need to mock location so timings calculate and render
  await page.addInitScript(() => {
    window.localStorage.clear();
  });

  const filePath = `file://${path.resolve('ai tex to calnder.html')}`;
  await page.goto(filePath);

  await page.evaluate(() => {
    appState.config.location = { lat: 20.0, lng: 85.0 };
  });

  const customLabels = `
::: labels
Upcoming Festivals : ଆସୁଥିବା ପର୍ବ
View calendar : କ୍ୟାଲେଣ୍ଡର ଦେଖନ୍ତୁ
Next Upcoming Festival : ପରବର୍ତ୍ତୀ ପର୍ବ
Today Festival : ଆଜିର ପର୍ବ:
Timings : ସମୟ
:::
  `;

  // Inject labels
  await page.evaluate((labels) => {
    const editor = document.getElementById('editor');
    editor.value += labels;
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }, customLabels);

  // Wait a bit for render
  await page.waitForTimeout(1000);

  // Verify UI elements
  // 1. Upcoming Festivals
  const upcomingFestivalsTitle = await page.locator('h2:has-text("ଆସୁଥିବା ପର୍ବ")').count();

  // 2. View calendar
  const viewCalendar = await page.locator('text="କ୍ୟାଲେଣ୍ଡର ଦେଖନ୍ତୁ"').count();

  // 3. Next Upcoming Festival
  const nextFestival = await page.locator('#hero-festival-text:has-text("ପରବର୍ତ୍ତୀ ପର୍ବ")').count();

  // 4. Timings
  const timings = await page.locator('h3:has-text("ସମୟ")').count();

  console.log('Upcoming Festivals Title found:', upcomingFestivalsTitle > 0);
  console.log('View calendar found:', viewCalendar > 0);
  console.log('Next Upcoming Festival found:', nextFestival > 0);
  console.log('Timings found:', timings > 0);

  // For "Today Festival", we would need to mock a festival for today.
  // We can just verify if the text works via JS checking translation map.
  const appStateRes = await page.evaluate(() => appState.customLabels);
  console.log('customLabels state for today_festival:', appStateRes['today_festival']);

  if (upcomingFestivalsTitle > 0 && viewCalendar > 0 && nextFestival > 0 && timings > 0 && appStateRes['today_festival'] === 'ଆଜିର ପର୍ବ:') {
    console.log('SUCCESS');
    process.exit(0);
  } else {
    console.error('FAILED. One or more elements not found correctly translated.');
    process.exit(1);
  }
})();
