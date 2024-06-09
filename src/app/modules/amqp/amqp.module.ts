import { Module } from '@nestjs/common';

import { AmqpServiceDTO } from 'src/app/dtos/amqp';
import { AmqpService } from './amqp.service';

import { PublishInOrdersToConvertExchangeUseCase } from 'src/app/useCases/queues/publishInOrdersToConvertExchange.usecase';
import { ConsumeOrdersQueueUseCase } from 'src/app/useCases/queues/consumeOrdersQueue.usecase';

@Module({
  providers: [
    {
      provide: AmqpServiceDTO,
      useClass: AmqpService,
    },
    PublishInOrdersToConvertExchangeUseCase,
    ConsumeOrdersQueueUseCase,
  ],
  exports: [
    AmqpServiceDTO,
    PublishInOrdersToConvertExchangeUseCase,
    ConsumeOrdersQueueUseCase,
  ],
})
export class AmqplibModule {}
