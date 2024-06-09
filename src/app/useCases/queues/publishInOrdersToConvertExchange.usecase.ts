import { Injectable } from '@nestjs/common';
import { AmqpServiceDTO, IOrderEvent } from '../../dtos/amqp';

@Injectable()
export class PublishInOrdersToConvertExchangeUseCase {
  constructor(private readonly amqpService: AmqpServiceDTO) {}

  public async execute(orderEvent: IOrderEvent) {
    return this.amqpService.publishInExchange(
      'direct_orders_to_convert_exchange',
      'order_event',
      orderEvent,
    );
  }
}
