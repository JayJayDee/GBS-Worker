import { Page, ElementHandle } from 'puppeteer';
import { makeArticleUrl } from './patterns';

const checkIsImage = async ({ paragraph }: {
  paragraph: ElementHandle
}) => {
  try {
    const found = await paragraph.$eval('img', (elem) => elem);
    if (!found) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

const judgeParagraphEventType = async ({
  paragraph
}: {
  paragraph: ElementHandle
}) => {
  const isImage = await checkIsImage({ paragraph });
  if (isImage === true) {
    return 'image';
  }
  return 'text';
};

const extractText = async ({
  paragraph
}: {
  paragraph: ElementHandle
}) => {
  const text =
    (await paragraph.evaluate((elem) => elem.innerText)).toString();
  return text;
};

const extractImage = async ({
  paragraph
}: {
  paragraph: ElementHandle
}) => {
  const imageUrl =
    await paragraph.$eval('img', (elem) => elem.src);
  return imageUrl;
};

type Content = {
  type: 'image' | 'text';
  data: {[key: string]: any};
};

const parseSingleParagraph = async ({
  paragraph
}: {
  paragraph: ElementHandle
}): Promise<Content | null> => {
  const type = await judgeParagraphEventType({ paragraph });

  if (type === 'image') {
    // case of image
    const url = await extractImage({ paragraph });
    return {
      type: 'image',
      data: {
        url 
      }
    };

  } else if (type === 'text') {
    // case of text
    const text = await extractText({ paragraph });
    return {
      type: 'text',
      data: {
        text
      }
    };
  }

  return null;
};

const filterEmpty = (element: Content | null) => {
  if (!element) return false;
  if (element.type === 'text' && element.data.text.trim() === '') {
    return false;
  }
  return true;
}

/**
 * fetch Contents from given page address, puppeteer page.
 * returns Content[]
 */
export const fetchArticleContents =
  async ({ articleId, page }: {
    articleId: string,
    page: Page
  }) => {
    await page.goto(makeArticleUrl({ articleId }));

    // fetch paragraphs from page
    const paragraphs = await page.$$('#article_1 > div.xe_content > p');

    const gatheredContents: Content[] = [];

    // parse all paragraphs
    for (const paragraph of paragraphs) {
      const content = await parseSingleParagraph({ paragraph });
      gatheredContents.push(content);
    }

    // filter empty contents
    const filtered = gatheredContents.filter(filterEmpty);
    return filtered;
  };
