import { OnModuleInit } from '@nestjs/common';

export type AmqpExchange = 'direct_payments_exchange' | 'direct_payments_dlx';
export type AmqpRoutingKey = 'payment_event';

export abstract class AmqpServiceDTO implements OnModuleInit {
  public abstract publishInExchange(
    exchange: AmqpExchange,
    routingKey: AmqpRoutingKey,
    content: object,
  ): Promise<void>;
  public abstract onModuleInit(): Promise<void>;
}
