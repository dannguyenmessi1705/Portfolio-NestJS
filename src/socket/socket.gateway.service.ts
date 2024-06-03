import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import path from 'path';

import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  path: '/socket',
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*', // Allow all origins
  },
  allowEIO3: true,
})
export class SocketGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  afterInit(server: Socket) {}

  async handleConnection(socket: Socket) {
    try {
      console.log(`Client connected: ${socket.id}`);
      const users = await this.server.fetchSockets();
      this.server.emit('online-users', users.length);
    } catch (error) {
      socket.disconnect();
    }
  }

  async handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('message')
  async handleListenMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log(`Message Received from ${socket.id}`, data);
  }

  handleEmitMessage(data: any, event: string) {
    this.server.emit(event, data);
  }
}
