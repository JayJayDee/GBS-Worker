import { logger } from '../lib/logger';

const log = logger({ module: 'worker-entry' });

(async () => {
  log.info('started');

  log.info('ended');
})();