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

    const contents = await fetchArticleContents({
      pageId: '273852095',
      pageAddress: 'https://www.dogdrip.net/273852095',
      page
    });
    console.log(contents);
  };
init();