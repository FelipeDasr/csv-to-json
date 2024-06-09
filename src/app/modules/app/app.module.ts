import { Module } from '@nestjs/common';

import { AmqplibModule } from '../amqp/amqp.module';
import { HttpModule } from '../http/http.module';

import { ConvertCsvToJsonUsecase } from 'src/app/useCases/conversions/convertCSVToJSON.usecase';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule, AmqplibModule],
  providers: [AppService, ConvertCsvToJsonUsecase],
})
export class AppModule {}
