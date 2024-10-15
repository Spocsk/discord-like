import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageGateway } from './gateway/message.gateway';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forRoot(process.env.MONGODB_URL_MESSAGE),
    PassportModule,
    JwtModule.register({
      secret: 'pouet',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway, JwtStrategy],
})
export class AppModule {}
