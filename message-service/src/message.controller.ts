import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schema';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllMessages(): Promise<Message[]> {
    return this.messageService.findAllMessages();
  }
}
