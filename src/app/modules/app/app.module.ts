import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';

import { AmqplibModule } from '../amqp/amqp.module';
import { HttpModule } from '../http/http.module';

import { ConvertCsvToJsonUsecase } from 'src/app/useCases/conversions/convertCSVToJSON.usecase';
import { WebSocketsGateway } from 'src/core/gateways/websocket.gateway';
import { AppService } from './app.service';

import * as path from 'path';

@Module({
  imports: [
    HttpModule,
    AmqplibModule,
    // Frontend
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', '..', '..', 'static', 'public'),
      renderPath: '/',
    }),
  ],
  providers: [AppService, WebSocketsGateway, ConvertCsvToJsonUsecase],
})
export class AppModule {}
