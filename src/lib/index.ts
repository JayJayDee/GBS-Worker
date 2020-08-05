import { launch } from 'puppeteer';
import { fetchArticles } from './dogdrip/article-fetcher';

export const init =
  async () => {
    const browser = await launch({
      headless: false
    });
    const page = (await browser.pages())[0];
    await page.goto('https://www.dogdrip.net/index.php?mid=dogdrip&page=1');

    await fetchArticles({ page });
  };
init();