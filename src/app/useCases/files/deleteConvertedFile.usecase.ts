import { Injectable } from '@nestjs/common';

import { IOrderEvent } from 'src/app/dtos/amqp';

import { deleteFile } from 'src/core/utils/files';
import { WebSocketsGateway } from 'src/core/gateways/websocket.gateway';

@Injectable()
export class DeleteConvertedFileUsecase {
  constructor(private readonly webSocketsGateway: WebSocketsGateway) {}

  public async execute(order: IOrderEvent): Promise<boolean> {
    const fileToExclude = order.originalFilename.replace(
      '.csv',
      `_${order.processId}.json`,
    );

    deleteFile(fileToExclude, 'public');

    // Check if the client is still connected
    const clientIsConnected = this.webSocketsGateway.clientIsConnected(
      order.clientWebSocketId,
    );

    // If the client is connected, we need to notify the client that the file was deleted
    if (clientIsConnected) {
      this.webSocketsGateway.emitToClient(
        order.clientWebSocketId,
        'order:deleted',
        {
          processId: order.processId,
        },
      );
    }

    return true;
  }
}
