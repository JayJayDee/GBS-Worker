import { Page, ElementHandle } from 'puppeteer';

import { wrapError } from '../../utils';

type Article = {
  id?: string;
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

    const id =
      link ? link.split('/').pop() : null;

    const title =
      await wrapError<string>(
        async () =>
          (await (row.$eval('.ed .title-link', (elem) => elem.innerText))).toString()
      );

    return { id, link, title };
  };

/**
 * fetchArticles from given page address
 */
export const fetchArticles = async ({ pageAddress, page }: {
  pageAddress: string,
  page: Page
}) => {
  await page.goto(pageAddress);
  const articleRows = await page.$$('tr');

  const promises = articleRows.map((row) => queryArticleComponent({ row }));
  const datas = await Promise.all(promises);

  const filtered = datas.filter((data) =>
    data.id && data.link && data.title);
  return filtered;
};