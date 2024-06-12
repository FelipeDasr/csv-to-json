import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConsumeOrdersQueueUseCase } from '../../useCases/queues/consumeOrdersQueue.usecase';
import { ConvertCsvToJsonUsecase } from '../../useCases/conversions/convertCSVToJSON.usecase';
import { ConsumeOrdersToDeleteQueueUsecase } from 'src/app/useCases/queues/consumeOrdersToDeleteQueue.usecase';
import { DeleteConvertedFileUsecase } from 'src/app/useCases/files/deleteConvertedFile.usecase';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly consumePaymentEventQueueService: ConsumeOrdersQueueUseCase,
    private readonly consumeOrdersToDeleteQueueUsecase: ConsumeOrdersToDeleteQueueUsecase,
    private readonly convertCsvToJsonUsecase: ConvertCsvToJsonUsecase,
    private readonly deleteConvertedFileUsecase: DeleteConvertedFileUsecase,
  ) {}

  public async onModuleInit() {
    const csvToJsonConverter = this.convertCsvToJsonUsecase.execute.bind(
      this.convertCsvToJsonUsecase,
    );

    const deleteConvertedFile = this.deleteConvertedFileUsecase.execute.bind(
      this.deleteConvertedFileUsecase,
    );

    await this.consumeOrdersToDeleteQueueUsecase.execute(deleteConvertedFile);
    await this.consumePaymentEventQueueService.execute(csvToJsonConverter);
  }
}
