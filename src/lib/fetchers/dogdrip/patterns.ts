
export const makeArticleUrl =
  ({ articleId }: {
    articleId: string
  }) =>
    `https://www.dogdrip.net/${articleId}`;

export const makeArticleListUrl =
  ({ numPage }: {
    numPage: number
  }) =>
    `https://www.dogdrip.net/index.php?mid=dogdrip&page=${numPage}`;

export const makeArticleReplyUrl =
  ({ articleId }: {
    articleId: string
  }) =>
    `https://www.dogdrip.net/${articleId}`;