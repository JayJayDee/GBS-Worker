import { connect } from 'amqplib';

import { Subscribe, Publish } from '../types';
import { configMandatory, configOptional } from '../../configurators';

const amqpConnectionConfigurator =
  (source: {[key: string]: any}) =>
    () =>
      ({
        hostname: configMandatory<string>({ source, key: 'AMQP_HOST' }),
        port: configOptional<number>({ source, key: 'AMQP_PORT', defaultValue: 5672 }),
        username: configOptional<string>({ source, key: 'AMQP_USER', defaultValue: null }),
        password: configOptional<string>({ source, key: 'AMQP_PASSWORD', defaultValue: null })
      });

export const initRabbitMq =
  async () => {
    const fetchConfig = amqpConnectionConfigurator({ source: process.env });
    const connection = await connect({
      ...fetchConfig()
    });

    console.log(connection);
  };

export const rabbitMqSubscriber =
  (): Subscribe =>
    async ({ topicId, consumer }) => {
      // TODO: to be implemented
    };

export const rabbitMqPublisher =
  (): Publish =>
    async ({ topicId, payload }) => {
      // TODO: to be implemented
    };
