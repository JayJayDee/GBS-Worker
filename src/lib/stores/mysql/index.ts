import { createConnection } from 'typeorm';

import { configMandatory, configOptional } from '../../configurators';
import { ArticleEntity, ContentEntity, ReplyEntity } from './entities';

type MysqlInitOptions = {
  logging?: boolean;
};

export const establishMysqlConnection =
  async (opts?: MysqlInitOptions) => {
    const fetchMysqlConfig = mysqlConnectionConfigurator(process.env);

    const connection =
      await createConnection({
        type: 'mysql',
        ...fetchMysqlConfig(),
        ...opts ? opts : {},
        entities: [
          ArticleEntity,
          ContentEntity,
          ReplyEntity
        ]
      });

    return connection;
  };

export const initMySQL =
  async () => {
    await establishMysqlConnection({ logging: false });
  };

const mysqlConnectionConfigurator =
  (source: {[key: string]: any}) =>
    () =>
      ({
        host: configMandatory<string>({ source, key: 'MYSQL_HOST' }),
        port: configOptional<number>({ source, key: 'MYSQL_PORT', defaultValue: 3306 }),
        database: configMandatory<string>({ source, key: 'MYSQL_DATABASE' }),
        username: configMandatory<string>({ source, key: 'MYSQL_USER' }),
        password: configMandatory<string>({ source, key: 'MYSQL_PASSWORD' }),
      });
