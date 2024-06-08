import { Injectable } from '@nestjs/common';

import { IUploadFileToConversionRequest } from '../dtos/requests';
import { IValidatedFile } from 'src/core/pipes/fileValidator.pipe';

import { PublishInOrdersToConvertExchangeUseCase } from './queues/publishInOrdersToConvertExchange.usecase';

import { saveFile } from 'src/core/utils/files';

@Injectable()
export class SaveFileToConversionUsecase {
  constructor(
    private readonly publishInOrdersToConvertExchangeUseCase: PublishInOrdersToConvertExchangeUseCase,
  ) {}

  public async execute(
    bodyRequest: IUploadFileToConversionRequest,
    file: IValidatedFile,
  ) {
    const { internalFileName, originalname } = file;
    const { clientWebsocketId } = bodyRequest;

    await saveFile(file.internalFileName, file.buffer, 'private');

    await this.publishInOrdersToConvertExchangeUseCase.execute({
      clientWebSocketId: clientWebsocketId,
      internalFilename: internalFileName,
      originalFilename: originalname,
    });

    return {
      message: 'File uploaded successfully and is being processed',
    };
  }
}
