const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [63,64,65,66,67,68,69,70,71,72];
  let totalSum = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/table.html?seed=${seed}`;
    await page.goto(url);

    // Wait for DOM to load properly
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);

    const pageNumbers = await page.$$eval("td", cells =>
      cells
        .map(td => td.innerText.trim())
        .filter(text => text !== "")
        .map(text => Number(text))
        .filter(num => !isNaN(num))
    );

    const pageSum = pageNumbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} sum =`, pageSum);

    totalSum += pageSum;
  }

  console.log("FINAL_TOTAL =", totalSum);

  await browser.close();
})();
