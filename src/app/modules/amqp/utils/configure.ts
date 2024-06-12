import { Channel } from 'amqplib';

export const configureAmqp = async (channel: Channel) => {
  /********************************************************
   * PAYMENT QUEUES AND EXCHANGES
   *******************************************************/

  // Custom exchange
  await channel.assertExchange('direct_orders_to_convert_exchange', 'direct', {
    durable: true,
  });

  // Custom exchange
  await channel.assertExchange(
    'direct_orders_to_delete_exchange',
    'x-delayed-message',
    {
      durable: true,
      arguments: {
        'x-delayed-type': 'direct',
      },
    },
  );

  // Dead Letter Exchange
  await channel.assertExchange(
    'direct_orders_to_convert_exchange_dlx',
    'direct',
    {
      durable: true,
    },
  );

  // Dead Letter Exchange
  await channel.assertExchange(
    'direct_orders_to_delete_exchange_dlx',
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

  await channel.assertQueue('order_to_delete_events', {
    deadLetterExchange: 'direct_orders_to_delete_exchange_dlx',
    deadLetterRoutingKey: 'order_to_delete_event',
  });

  // Dead Letter Queue
  await channel.assertQueue('order_events_dlq');
  await channel.assertQueue('order_to_delete_events_dlq');

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

  await channel.bindQueue(
    'order_to_delete_events',
    'direct_orders_to_delete_exchange',
    'order_to_delete_event',
  );

  await channel.bindQueue(
    'order_to_delete_events_dlq',
    'direct_orders_to_delete_exchange_dlx',
    'order_to_delete_event',
  );

  console.log('AMQP configured\n');
};
