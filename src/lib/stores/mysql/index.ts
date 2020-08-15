import { createConnection } from 'typeorm';

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
        ...opts ? opts : {}
      });

    return connection;
  };

export const initMySQL =
  async () => {
    await establishMysqlConnection({ logging: false });
  };

const configMandatory = ({ source, key }: {
  source: {[key: string]: any},
  key: string
}) => {
  if (source[key] === undefined) {
    throw new Error(`Configuration ${key} required`);
  }
  return source[key];
}

const configOptional = ({ source, key, defaultValue }: {
  source: {[key: string]: any},
  key: string,
  defaultValue?: any
}) => {
  if (source[key] === undefined && defaultValue === undefined) {
    throw new Error(`Configuration ${key} required`);
  } else if (source[key] === undefined) {
    return defaultValue;
  }
  return source[key];
}

const mysqlConnectionConfigurator =
  (source: {[key: string]: any}) =>
    () =>
      ({
        host: configMandatory({ source, key: 'MYSQL_HOST' }),
        port: configOptional({ source, key: 'MYSQL_PORT', defaultValue: 3306 }),
        database: configMandatory({ source, key: 'MYSQL_DATABASE' }),
        username: configMandatory({ source, key: 'MYSQL_USER' }),
        password: configMandatory({ source, key: 'MYSQL_PASSWORD' }),
      });
