const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 450, height: 900 }
  });
  const page = await context.newPage();

  const fileUrl = 'file://' + path.resolve('ai tex to calnder.html').replace(/ /g, '%20');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Clear location state to ensure location toast could be shown
  await page.evaluate(() => {
    localStorage.setItem('panchang_cached_state', JSON.stringify({
      config: { location: { lat: null, lng: null, name: "" } }
    }));
  });
  await page.reload({ waitUntil: 'networkidle' });

  // Show the "Today" button and the toast
  await page.evaluate(() => {
    // Show Today button by simulating we are in a different month
    const btnToday = document.getElementById('btn-today');
    if (btnToday) {
      btnToday.classList.remove('hidden');
      btnToday.classList.add('flex');
    }

    // Show toast
    const toast = document.getElementById('location-prompt-toast');
    if (toast) {
      toast.style.display = 'block';
      toast.classList.remove('opacity-0', 'translate-y-10');
      toast.classList.add('opacity-100', 'translate-y-0');
    }
  });

  // Wait a bit for transitions
  await page.waitForTimeout(500);

  // Take screenshot of #btn-today container
  const btnTodayEl = await page.locator('#btn-today');
  if (await btnTodayEl.count() > 0) {
    await btnTodayEl.screenshot({ path: 'btn-today-screenshot.png' });
    console.log('Saved btn-today-screenshot.png');
  } else {
    console.log('btn-today not found');
  }

  // Take screenshot of the toast
  const toastEl = await page.locator('#location-prompt-toast > div');
  if (await toastEl.count() > 0) {
    await toastEl.screenshot({ path: 'location-toast-screenshot.png' });
    console.log('Saved location-toast-screenshot.png');
  } else {
    console.log('location-prompt-toast not found');
  }

  await browser.close();
})();
