import { Module } from '@nestjs/common';
import { WebSocketsGateway } from 'src/core/gateways/websocket.gateway';

@Module({
  providers: [WebSocketsGateway],
})
export class WebSocketModule {}
