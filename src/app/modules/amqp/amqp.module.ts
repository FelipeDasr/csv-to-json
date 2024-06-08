import { Module } from '@nestjs/common';

import { AmqpServiceDTO } from 'src/app/dtos/amqp';
import { AmqpService } from './amqp.service';

import { PublishInOrdersToConvertExchangeUseCase } from 'src/app/useCases/queues/publishInOrdersToConvertExchange.usecase';

@Module({
  providers: [
    {
      provide: AmqpServiceDTO,
      useClass: AmqpService,
    },
    PublishInOrdersToConvertExchangeUseCase,
  ],
  exports: [AmqpServiceDTO, PublishInOrdersToConvertExchangeUseCase],
})
export class AmqplibModule {}
