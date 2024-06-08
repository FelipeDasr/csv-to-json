import { Module } from '@nestjs/common';

import { UploadCSVToConvertToJSONController } from './controllers/uploadCSVToConvertToJSON.controller';

import { AmqplibModule } from '../amqp/amqp.module';

@Module({
  controllers: [UploadCSVToConvertToJSONController],
  imports: [AmqplibModule],
})
export class HttpModule {}
