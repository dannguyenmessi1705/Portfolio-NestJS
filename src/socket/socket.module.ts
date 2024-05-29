import { Module } from '@nestjs/common';
import { SocketGatewayService } from './socket.gateway.service';

@Module({
  providers: [SocketGatewayService]
})
export class SocketModule {}
