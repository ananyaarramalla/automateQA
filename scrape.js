const { chromium } = require('playwright');

const seeds = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
const BASE_URL = 'https://exam.sanand.workers.dev/tds-2026-01-ga4';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${BASE_URL}?seed=${seed}`;
    console.log(`Visiting: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle' });

    // Extract all numbers from all table cells
    const numbers = await page.$$eval('table td, table th', cells =>
      cells
        .map(cell => cell.innerText.trim())
        .map(text => parseFloat(text))
        .filter(n => !isNaN(n))
    );

    const seedSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: found ${numbers.length} numbers, sum = ${seedSum}`);
    grandTotal += seedSum;
  }

  await browser.close();

  console.log(`Total sum across all seeds: ${grandTotal}`);
})();
