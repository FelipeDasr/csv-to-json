import { Module } from '@nestjs/common';

import { AmqpServiceDTO } from 'src/app/dtos/amqp';
import { AmqpService } from './amqp.service';

import { PublishInOrdersToConvertExchangeUseCase } from 'src/app/useCases/queues/publishInOrdersToConvertExchange.usecase';
import { ConsumeOrdersQueueUseCase } from 'src/app/useCases/queues/consumeOrdersQueue.usecase';
import { PublishInOrdersToDeleteQueueUsecase } from 'src/app/useCases/queues/publishInOrdersToDeleteQueue.usecase';
import { ConsumeOrdersToDeleteQueueUsecase } from 'src/app/useCases/queues/consumeOrdersToDeleteQueue.usecase';

@Module({
  providers: [
    {
      provide: AmqpServiceDTO,
      useClass: AmqpService,
    },
    PublishInOrdersToConvertExchangeUseCase,
    PublishInOrdersToDeleteQueueUsecase,
    ConsumeOrdersToDeleteQueueUsecase,
    ConsumeOrdersQueueUseCase,
  ],
  exports: [
    AmqpServiceDTO,
    PublishInOrdersToConvertExchangeUseCase,
    PublishInOrdersToDeleteQueueUsecase,
    ConsumeOrdersToDeleteQueueUsecase,
    ConsumeOrdersQueueUseCase,
  ],
})
export class AmqplibModule {}
