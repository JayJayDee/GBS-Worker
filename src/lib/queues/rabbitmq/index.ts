import { connect } from 'amqplib';

import { Subscribe, Publish } from '../types';

export const initRabbitMq =
  async () => {
    // connect()
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
