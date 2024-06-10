import { OnModuleInit } from '@nestjs/common';

export type AmqpExchange =
  | 'direct_orders_to_convert_exchange'
  | 'direct_orders_to_convert_exchange_dlx';

export type AmqpRoutingKey = 'order_event';
export type AmqpQueue = 'order_events' | 'order_events_dlq';

export interface IOrderEvent {
  processId: string;
  clientWebSocketId: string;
  internalFilename: string;
  originalFilename: string;
}

export abstract class AmqpServiceDTO implements OnModuleInit {
  public abstract cunsumeQueue(
    queueName: AmqpQueue,
    callback: (payload: object) => Promise<boolean>,
  ): Promise<void>;
  public abstract publishInExchange(
    exchange: AmqpExchange,
    routingKey: AmqpRoutingKey,
    content: object,
  ): Promise<void>;
  public abstract onModuleInit(): Promise<void>;
}
