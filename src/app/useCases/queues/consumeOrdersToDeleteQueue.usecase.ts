import { Injectable } from '@nestjs/common';

import { AmqpServiceDTO, IOrderEvent } from 'src/app/dtos/amqp';

@Injectable()
export class ConsumeOrdersToDeleteQueueUsecase {
  constructor(private readonly amqpService: AmqpServiceDTO) {}

  public async execute(
    callback: (eventPayload: IOrderEvent) => Promise<boolean>,
  ) {
    await this.amqpService.cunsumeQueue('order_to_delete_events', callback);
  }
}
