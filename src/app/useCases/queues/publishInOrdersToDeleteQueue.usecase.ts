import { Injectable } from '@nestjs/common';

import { AmqpServiceDTO, IOrderEvent } from 'src/app/dtos/amqp';

@Injectable()
export class PublishInOrdersToDeleteQueueUsecase {
  constructor(private readonly amqpService: AmqpServiceDTO) {}

  public async execute(orderEvent: IOrderEvent, xDelay?: number) {
    return this.amqpService.publishInExchange(
      'direct_orders_to_delete_exchange',
      'order_to_delete_event',
      orderEvent,
      xDelay,
    );
  }
}
