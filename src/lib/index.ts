import { launch } from 'puppeteer';
import { fetchArticles } from './fetchers/dogdrip/article-list-fetcher';
import { fetchArticleContents } from './fetchers/dogdrip/article-content-fetcher';
import { fetchArticleReplies } from './fetchers/dogdrip/article-reply-fetcher';

export const init =
  async () => {
    const browser = await launch({
      headless: false,
      // args: [ '--no-sandbox' ]
    });
    const page = (await browser.pages())[0];
    
    // const articles = await fetchArticles({
    //   numPage: 2,
    //   page
    // });
    // console.log(articles);

    const contents = await fetchArticleContents({
      articleId: '273860452',
      page
    });
    console.log(contents);

    // const replies = await fetchArticleReplies({
    //   articleId: '273860452',
    //   page
    // });
    // console.log(replies);
  };
init();