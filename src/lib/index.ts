import { launch } from 'puppeteer';
import { fetchArticles } from './fetchers/dogdrip/article-list-fetcher';
import { fetchArticleContents } from './fetchers/dogdrip/article-content-fetcher';

export const init =
  async () => {
    const browser = await launch({
      headless: false
    });
    const page = (await browser.pages())[0];
    
    // const articles = await fetchArticles({
    //   page,
    //   pageAddress: 'https://www.dogdrip.net/index.php?mid=dogdrip&page=1'
    // });
    // console.log(articles);

    await fetchArticleContents({
      pageId: '273761788',
      pageAddress: 'https://www.dogdrip.net/273761788',
      page
    });
  };
init();