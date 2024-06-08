import { Module } from '@nestjs/common';

import { UploadCSVToConvertToJSONController } from './controllers/uploadCSVToConvertToJSON.controller';

@Module({
  controllers: [UploadCSVToConvertToJSONController],
})
export class HttpModule {}
