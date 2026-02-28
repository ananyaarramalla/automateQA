const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [63,64,65,66,67,68,69,70,71,72];
  let totalSum = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/cdp_trap/index.html?seed=${seed}`;
    await page.goto(url);

    // Wait for page to fully render
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    const numbers = await page.$$eval("*", elements =>
      elements
        .map(el => el.textContent)
        .filter(text => text && !isNaN(parseFloat(text.trim())))
        .map(text => parseFloat(text.trim()))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log("FINAL_TOTAL =", totalSum);

  await browser.close();
})();
