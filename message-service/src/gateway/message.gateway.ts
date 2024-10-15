import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsJwtGuard } from 'src/auth/guards/ws-auth.guard';
import { CreateMessageDto } from 'src/dto/message.dto';
import { MessageService } from 'src/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  @UseGuards(WsJwtGuard)
  async handleMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
  ): Promise<void> {
    const savedMessage =
      await this.messageService.createMessage(createMessageDto);
    this.server.emit('receiveMessage', savedMessage);
  }
}
