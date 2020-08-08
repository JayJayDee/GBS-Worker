import { Page, ElementHandle } from 'puppeteer';

import { wrapError } from '../../utils';
import { makeArticleListUrl } from './patterns';

type Article = {
  articleId?: string;
  link?: string;
  title?: string;
};

const queryArticleComponent =
  async ({ row }: {
    row: ElementHandle
  }): Promise<Article | null> => {

    const link = 
      await wrapError<string>(
        async () =>
          (await row.$eval('.ed .link-reset', (elem) => elem.href)).toString()
      );

    const articleId =
      link ? link.split('/').pop() : null;

    const title =
      await wrapError<string>(
        async () =>
          (await (row.$eval('.ed .title-link', (elem) => elem.innerText))).toString()
      );

    return { articleId, link, title };
  };

/**
 * fetchArticles from given page number
 */
export const fetchArticles = async ({ numPage, page }: {
  numPage: number,
  page: Page
}) => {
  await page.goto(makeArticleListUrl({ numPage }));
  const articleRows = await page.$$('tr');

  const promises = articleRows.map((row) => queryArticleComponent({ row }));
  const datas = await Promise.all(promises);

  const filtered = datas.filter((data) =>
    data.articleId && data.link && data.title);
  return filtered;
};
