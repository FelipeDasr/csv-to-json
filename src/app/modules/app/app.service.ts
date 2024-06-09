import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConsumeOrdersQueueUseCase } from '../../useCases/queues/consumeOrdersQueue.usecase';
import { ConvertCsvToJsonUsecase } from '../../useCases/conversions/convertCSVToJSON.usecase';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly consumePaymentEventQueueService: ConsumeOrdersQueueUseCase,
    private readonly convertCsvToJsonUsecase: ConvertCsvToJsonUsecase,
  ) {}

  public async onModuleInit() {
    const csvToJsonConverter = this.convertCsvToJsonUsecase.execute.bind(
      this.convertCsvToJsonUsecase,
    );

    await this.consumePaymentEventQueueService.execute(csvToJsonConverter);
  }
}
