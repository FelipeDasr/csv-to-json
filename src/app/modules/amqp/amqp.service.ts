import { Injectable } from '@nestjs/common';

import { configureAmqp } from './utils/configure';

import {
  AmqpExchange,
  AmqpQueue,
  AmqpRoutingKey,
  AmqpServiceDTO,
} from '../../dtos/amqp';
import * as amqplib from 'amqplib';

@Injectable()
export class AmqpService extends AmqpServiceDTO {
  private connection: amqplib.Connection;
  private channel: amqplib.Channel;

  public async onModuleInit() {
    await this.init();
  }

  private async init() {
    this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
    console.log('\nConnected to RabbitMQ');

    this.channel = await this.connection.createChannel();
    await configureAmqp(this.channel);

    return this;
  }

  private parseObjectToBuffer(object: object) {
    return Buffer.from(JSON.stringify(object));
  }

  public async publishInExchange(
    exchange: AmqpExchange,
    routingKey: AmqpRoutingKey,
    content: object,
    xDelay?: number,
  ) {
    this.channel.publish(
      exchange,
      routingKey,
      this.parseObjectToBuffer(content),
      // Apply x-delay header if xDelay is defined
      xDelay
        ? {
            headers: {
              'x-delay': xDelay,
            },
          }
        : undefined,
    );
  }

  public async cunsumeQueue(
    queueName: AmqpQueue,
    callback: (payload: object) => Promise<boolean>,
  ) {
    await this.channel.consume(
      queueName,
      async (message_: amqplib.ConsumeMessage) => {
        const payload_ = JSON.parse(message_.content.toString());
        const executionResult = await callback(payload_);

        if (executionResult) this.channel.ack(message_);
        else this.channel.nack(message_, true, false);
      },
    );
  }
}
