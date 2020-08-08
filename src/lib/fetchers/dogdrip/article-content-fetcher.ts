import { Page, ElementHandle } from 'puppeteer';

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

const parseSingleParagraph = async ({
  paragraph
}: {
  paragraph: ElementHandle
}) => {
  const type = await judgeParagraphEventType({ paragraph });
  console.log(type);
  
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
    console.log(text);
    return {
      type: 'text',
      data: {
        text
      }
    };
  }

  return null;
};

export const fetchArticleContents =
  async ({ pageId, pageAddress, page }: {
    pageId: string,
    pageAddress: string,
    page: Page
  }) => {
    await page.goto(pageAddress);

    const paragraphs = await page.$$('div.xe_content > p');
    // console.log(paragraphs);

    const promises =
      paragraphs.map((paragraph) => parseSingleParagraph({ paragraph }));

    await Promise.all(promises);
  };