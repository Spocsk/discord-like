import { Room } from '../schemas/room.schema';
import { RoomService } from './rooms.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(@Body() room: Room): Promise<Room> {
    return this.roomService.createRoom(room);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Get('messages/:roomId')
  @UseGuards(JwtAuthGuard)
  async getMessagesByRoomId(@Param('roomId') roomId: string) {
    return this.roomService.findMessagesByRoomId(roomId);
  }
}
