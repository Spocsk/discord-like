import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageGateway } from './gateway/message.gateway';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { RoomService } from './rooms/rooms.service';
import { Room, RoomSchema } from './schemas/room.schema';
import { RoomController } from './rooms/room.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forRoot(process.env.MONGODB_URL_MESSAGE),
    PassportModule,
    JwtModule.register({
      secret: 'pouet',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [MessageController, RoomController],
  providers: [MessageService, MessageGateway, JwtStrategy, RoomService],
})
export class AppModule {}
