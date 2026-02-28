const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [63,64,65,66,67,68,69,70,71,72];
  let totalSum = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/table.html?seed=${seed}`;
    await page.goto(url);
    await page.waitForTimeout(2000);

    const numbers = await page.$$eval('table td', cells =>
      cells.map(c => parseFloat(c.innerText)).filter(n => !isNaN(n))
    );

    totalSum += numbers.reduce((a, b) => a + b, 0);
  }

  console.log("FINAL_TOTAL =", totalSum);

  await browser.close();
})();
