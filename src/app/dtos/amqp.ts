import { OnModuleInit } from '@nestjs/common';

export type AmqpExchange =
  | 'direct_orders_to_convert_exchange'
  | 'direct_orders_to_convert_exchange_dlx';

export type AmqpRoutingKey = 'order_event';

export abstract class AmqpServiceDTO implements OnModuleInit {
  public abstract publishInExchange(
    exchange: AmqpExchange,
    routingKey: AmqpRoutingKey,
    content: object,
  ): Promise<void>;
  public abstract onModuleInit(): Promise<void>;
}
