const { chromium } = require('playwright');

const seeds = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
const BASE_URL = 'https://sanand0.github.io/tdsdata/js_table/';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${BASE_URL}?seed=${seed}`;
    console.log(`Visiting: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for numbers to render (they appear as text, not in <table> tags)
    await page.waitForTimeout(2000);

    // Get all text content and extract numbers
    const bodyText = await page.locator('body').innerText();
    
    const numbers = bodyText
      .split(/\s+/)
      .map(t => parseFloat(t))
      .filter(n => !isNaN(n));

    const seedSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: found ${numbers.length} numbers, sum = ${seedSum}`);
    grandTotal += seedSum;
  }

  await browser.close();
  console.log(`Total sum across all seeds: ${grandTotal}`);
})();
