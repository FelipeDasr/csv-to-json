import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import {
  FileValidatorPipe,
  IValidatedFile,
} from 'src/core/pipes/fileValidator.pipe';
import { ValidatorPipe } from 'src/core/pipes/validator.pipe';
import { uploadFileToConversionRequestValidator } from 'src/core/validators/uploadFileToConversionRequest.validator';

import { IUploadFileToConversionRequest } from 'src/app/dtos/requests';

import { SaveFileToConversionUsecase } from 'src/app/useCases/saveFileToConversion.usecase';

const fileValidatorSchema = {
  allowedMimeTypes: ['text/csv', 'application/vnd.ms-excel'],
  maxSizeInBytes: 1024 * 1024 * 50, // 50mb
};

@Controller('csv-to-json')
export class UploadCSVToConvertToJSONController {
  constructor(
    private readonly saveFileToConversionUsecase: SaveFileToConversionUsecase,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile(new FileValidatorPipe(fileValidatorSchema))
    file: IValidatedFile,
    @Body(new ValidatorPipe(uploadFileToConversionRequestValidator))
    bodyRequest: IUploadFileToConversionRequest,
    @Res() response: Response,
  ) {
    const uploadResponse = await this.saveFileToConversionUsecase.execute(
      bodyRequest,
      file,
    );

    return response.status(200).send(uploadResponse);
  }
}
