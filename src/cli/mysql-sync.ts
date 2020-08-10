import 'dotenv/config';
import { establishMysqlConnection } from '../lib/stores';

(async () => {
  console.log('starting sync ...');

  const connection = await establishMysqlConnection({ logging: true });
  await connection.synchronize();

  console.log('sync completed.');
})();