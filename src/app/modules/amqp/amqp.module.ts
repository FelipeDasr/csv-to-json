import { Module } from '@nestjs/common';

import { AmqpServiceDTO } from 'src/app/dtos/amqp';
import { AmqpService } from './amqp.service';

@Module({
  providers: [
    {
      provide: AmqpServiceDTO,
      useClass: AmqpService,
    },
  ],
  exports: [AmqpServiceDTO],
})
export class AmqplibModule {}
