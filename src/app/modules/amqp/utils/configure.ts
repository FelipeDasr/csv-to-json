import { Channel } from 'amqplib';

export const configureAmqp = async (channel: Channel) => {
  /********************************************************
   * PAYMENT QUEUES AND EXCHANGES
   *******************************************************/

  // Custom exchange
  await channel.assertExchange('direct_orders_to_convert_exchange', 'direct', {
    durable: true,
  });

  // Dead Letter Exchange
  await channel.assertExchange(
    'direct_orders_to_convert_exchange_dlx',
    'direct',
    {
      durable: true,
    },
  );

  // Main queue
  await channel.assertQueue('order_events', {
    deadLetterExchange: 'direct_orders_to_convert_exchange_dlx',
    deadLetterRoutingKey: 'order_event',
  });

  // Dead Letter Queue
  await channel.assertQueue('order_events_dlq');

  // Bind main queue to exchange
  await channel.bindQueue(
    'order_events',
    'direct_orders_to_convert_exchange',
    'order_event',
  );

  // Bind dead letter queue to dead
  await channel.bindQueue(
    'order_events_dlq',
    'direct_orders_to_convert_exchange_dlx',
    'order_event',
  );

  console.log('AMQP configured\n');
};
