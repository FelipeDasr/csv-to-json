import { Injectable } from '@nestjs/common';

import { IOrderEvent } from 'src/app/dtos/amqp';

import * as CsvParser from 'csv-parser';
import { deleteFile, getFileStream, saveFile } from 'src/core/utils/files';

import { WebSocketsGateway } from 'src/core/gateways/websocket.gateway';

@Injectable()
export class ConvertCsvToJsonUsecase {
  constructor(private readonly webSocketsGateway: WebSocketsGateway) {}

  public async execute(order: IOrderEvent): Promise<boolean> {
    return new Promise(async (resolve) => {
      // Check if the client is still connected
      const clientIsConnected = this.webSocketsGateway.clientIsConnected(
        order.clientWebSocketId,
      );

      // If the client is not connected, we don't need to convert the file
      if (!clientIsConnected) {
        deleteFile(order.internalFilename, 'private');
        return resolve(true);
      }

      // Notify the client that the file is being processed
      this.webSocketsGateway.emitToClient(
        order.clientWebSocketId,
        'order:processing',
        {
          processId: order.processId,
        },
      );

      const jsonFileName = await this.convertCsvToJson(order);

      // Notify the client that the file is ready
      this.webSocketsGateway.emitToClient(
        order.clientWebSocketId,
        'order:done',
        {
          processId: order.processId,
          jsonFileURL: `${process.env.APP_HOST}/download/${jsonFileName}`,
        },
      );

      deleteFile(order.internalFilename, 'private');
      return resolve(true);
    });
  }

  private async convertCsvToJson(order: IOrderEvent): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const separator = await this.getSeparator(order.internalFilename);
      const fileStream = getFileStream(order.internalFilename, 'private');

      const data = [];

      const saveJsonFile = async () => {
        const fileData = JSON.stringify(data, null, 2);
        const fileBuffer = Buffer.from(fileData);

        const internalName = order.internalFilename.replace('.csv', '');
        const filename = order.originalFilename.replace(
          '.csv',
          `_${internalName}.json`,
        );
        await saveFile(filename, fileBuffer, 'public');
        resolve(filename);
      };

      fileStream
        .pipe(CsvParser({ separator }))
        .on('data', (row) => data.push(row))
        .on('error', (err) => reject(err))
        .on('end', () => saveJsonFile());
    });
  }

  private async getSeparator(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileStream = getFileStream(filename, 'private');

      let lineAccumulator = '';
      let currentPosition = 0;
      let index: number;

      const getFileSeparator = (line: string) => {
        if (line.includes(',')) return ',';
        return ';';
      };

      fileStream
        // Getting the first line of the .csv file
        .on('data', function (chunk) {
          index = chunk.indexOf('\n');
          lineAccumulator += chunk;
          index !== -1 ? fileStream.close() : (currentPosition += chunk.length);
        })
        .on('close', function () {
          const line = lineAccumulator.slice(0, currentPosition + index);
          resolve(getFileSeparator(line));
        })
        .on('error', function (err) {
          reject(err);
        });
    });
  }
}
