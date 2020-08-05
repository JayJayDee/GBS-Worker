import { Page, ElementHandle } from 'puppeteer';

export const fetchArticles = async ({ page }: {
  page: Page
}) => {

  // const articleHeaders = await page.waitForSelector('.ed .title-link');
  // articleHeaders.
  const articleRows = await page.$$('tr');
  console.log(articleRows);

  await queryArticleComponent({ row: articleRows[0] });
};

const queryArticleComponent =
  async ({ row }: {
    row: ElementHandle
  }) => {
    const source = row
  };
