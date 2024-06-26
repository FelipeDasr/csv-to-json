import { Module } from '@nestjs/common';

import { UploadCSVToConvertToJSONController } from './controllers/uploadCSVToConvertToJSON.controller';
import { DownloadFilesController } from './controllers/downloadFiles.controller';
import { AmqplibModule } from '../amqp/amqp.module';

import { SaveFileToConversionUsecase } from 'src/app/useCases/saveFileToConversion.usecase';

@Module({
  controllers: [UploadCSVToConvertToJSONController, DownloadFilesController],
  imports: [AmqplibModule],
  providers: [SaveFileToConversionUsecase],
})
export class HttpModule {}
