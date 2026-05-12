const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/test_ui.html');
  await page.screenshot({ path: 'test_ui.png' });
  await browser.close();
})();
