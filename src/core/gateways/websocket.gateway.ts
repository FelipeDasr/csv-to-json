import {
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class WebSocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Map<string, Socket> = new Map();
  @WebSocketServer() server: Server;

  public afterInit() {
    console.log('\nWebSocket Gateway initialized\n');
  }

  public handleConnection(client: Socket) {
    this.clients.set(client.id, client);
    client.emit('connected', { clientId: client.id });
  }

  public handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  public clientIsConnected(clientId: string): boolean {
    return this.clients.has(clientId);
  }

  public emitToClient(clientId: string, event: string, data: any) {
    const client = this.clients.get(clientId);
    if (client) client.emit(event, data);
  }
}
