import { Page } from 'puppeteer';
import { makeArticleReplyUrl } from './patterns';

/**
 * fetch article replies from given articleId
 */
export const fetchArticleReplies =
  async ({ articleId, page }: {
    articleId: string,
    page: Page
  }) => {
    await page.goto(makeArticleReplyUrl({ articleId }));
    const replies = await page.$$('div .ed .comment-item');
    console.log(replies.length);
  };
