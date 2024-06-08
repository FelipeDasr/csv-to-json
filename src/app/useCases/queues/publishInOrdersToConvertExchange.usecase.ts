import { Injectable } from '@nestjs/common';
import { AmqpServiceDTO } from '../../dtos/amqp';

interface IOrderEvent {
  clientWebSocketId: string;
  internalFilename: string;
  originalFilename: string;
}

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
