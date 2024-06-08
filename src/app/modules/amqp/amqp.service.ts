import { Injectable } from '@nestjs/common';

import { configureAmqp } from './utils/configure';

import { AmqpExchange, AmqpRoutingKey, AmqpServiceDTO } from '../../dtos/amqp';
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
  ) {
    this.channel.publish(
      exchange,
      routingKey,
      this.parseObjectToBuffer(content),
    );
  }
}
