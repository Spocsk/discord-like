import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message.service';
import { CreateMessageDto } from '../dto/message.dto';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-auth.guard';
import { AuthWsMiddleware } from '../middleware/ws.middleware';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  },
})
export class MessageGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private messageService: MessageService,
    private readonly jwtService: JwtService,
    private http: HttpService,
  ) {}

  async afterInit() {
    // server.use((socket, next) => {
    //   const authMiddleware = new AuthWsMiddleware(this.jwtService, this.http);
    //   authMiddleware.use(socket, next);
    // });
  }

  @SubscribeMessage('joinRoom')
  @UseGuards(WsJwtGuard)
  handleJoinRoom(client: Socket, room: string) {
    console.log(client);
    client.join(room);
    client.emit('message', `User ${client.id} has joined room ${room}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: CreateMessageDto) {
    this.messageService.createMessage(payload).then((res) => {
      this.server.to(payload.roomId).emit(payload.roomId, res);
    });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('message', `You have left room ${room}`);
  }
}
