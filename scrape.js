const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [63,64,65,66,67,68,69,70,71,72];
  let totalSum = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/table.html?seed=${seed}`;
    await page.goto(url);

    // 🔥 Wait for table to actually render
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(c => parseFloat(c.textContent.trim()))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log("FINAL_TOTAL =", totalSum);

  await browser.close();
})();
