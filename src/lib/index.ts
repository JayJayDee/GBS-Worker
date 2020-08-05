import { launch } from 'puppeteer';

export const init =
  async () => {
    const browser = await launch({
      headless: false
    });
    const page = (await browser.pages())[0];
    await page.goto('https://www.dogdrip.net/index.php?mid=dogdrip&page=1');

    // const articleHeaders = await page.waitForSelector('.ed .title-link');
    // articleHeaders.
    const titles = await page.$$eval('.ed .title-link',
      (e) =>
        e.map((elem) => elem.innerText));
    console.log(titles);
  };
init();