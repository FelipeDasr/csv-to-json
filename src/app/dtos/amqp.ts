import { OnModuleInit } from '@nestjs/common';

export type AmqpExchange =
  | 'direct_orders_to_convert_exchange'
  | 'direct_orders_to_convert_exchange_dlx'
  | 'direct_orders_to_delete_exchange'
  | 'direct_orders_to_delete_exchange_dlx';

export type AmqpRoutingKey = 'order_event' | 'order_to_delete_event';

export type AmqpQueue =
  | 'order_events'
  | 'order_events_dlq'
  | 'order_to_delete_events'
  | 'order_to_delete_events_dlq';

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
    xDelay?: number,
  ): Promise<void>;
  public abstract onModuleInit(): Promise<void>;
}
