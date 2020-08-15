import moment from 'moment';

const makeLogPrefix = ({ module, subModule }: {
  module: string,
  subModule?: string
}) =>
  `${moment().format('YYYY-MM-DD hh:mm:ss')} [${module}/${subModule ? subModule : ''}]`;

/**
 * worker default logger
 */
export const logger =
  ({ module, subModule }: {
    module: string,
    subModule?: string
  }) => 

  ({
    debug(...args: any[]) {
      console.log(...[
        makeLogPrefix({ module, subModule }),
        ...args
      ]);
    },

    info(...args: any[]) {
      console.log(...[
        makeLogPrefix({ module, subModule }),
        ...args
      ]);
    },

    error(...args: any[]) {
      console.log(...[
        makeLogPrefix({ module, subModule }),
        ...args
      ]);
    }
  });
