import { Page, ElementHandle } from 'puppeteer';

import { makeArticleReplyUrl } from './patterns';
import { wrapError } from '../../utils';

const fetchReplyPaginationLinks =
  async ({ page }: {
    page: Page
  }) => {
    const container =
      await page.$('div #commentbox > div.ed.pagination-container');

    const linkComponents = await container.$$('ul > li > a');
    const links: string[] = await Promise.all(
      linkComponents.map((comp) =>
        comp.evaluate((elem) =>
          elem.href))
    );

    const deduped = Array.from(new Set(links));
    return deduped.filter((elem) => elem !== '');
  };

type Reply = {
  author?: string;
  reply?: string;
};

const parseSingleReply = async ({ row }: {
  row: ElementHandle
}): Promise<Reply | null> => {
  const author = 
    await wrapError<string>(
      async () =>
        (await row.$eval('h6 > a', (elem) => elem.innerText)).toString()
    );
  
  const reply =
    await wrapError<string>(
      async () =>
        (await row.$eval('div .ed .margin-left-xsmall > div > p',
          (elem) => elem.innerText)).toString()
    );

  if (!author || !reply) {
    return null;
  }

  return { author, reply };
};

const fetchReplies =
  async ({ page }: {
    page: Page
  }) => {
    const replyRows = await page.$$('div .ed .comment-item');
    
    const parsedReplies =
      await Promise.all(
        replyRows.map((row) => parseSingleReply({ row }))
      );

    return parsedReplies.filter((reply) => reply);
  };

/**
 * fetch article replies from given articleId
 */
export const fetchArticleReplies =
  async ({ articleId, page }: {
    articleId: string,
    page: Page
  }) => {
    await page.goto(makeArticleReplyUrl({ articleId }));

    // all replies in this pages will be stored
    const replies: Reply[] = [];

    // get reply pagination links
    const paginationLinks = await fetchReplyPaginationLinks({ page });

    // fetch initial replies
    replies.push(...await fetchReplies({ page }));

    // get all paginations
    for (const replyPageLink of paginationLinks) {
      await page.goto(replyPageLink);
      replies.push(...await fetchReplies({ page }));
    }

    return replies;
  };
