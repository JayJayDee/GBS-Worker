import 'dotenv/config';

import { establishMysqlConnection } from '../lib/stores';
import { logger } from '../lib/logger';

const log = logger({
  module: 'cli',
  subModule: 'mysql-sync'
});

(async () => {
  log.info('starting sync ...');

  const connection = await establishMysqlConnection({ logging: true });
  await connection.synchronize();

  log.info('sync completed.');
  process.exit(0);
})();
