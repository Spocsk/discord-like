import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoomService } from './rooms/rooms.service';
import { Room } from './schemas/room.schema';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(@Param('name') name: string): Promise<Room> {
    return this.roomService.createRoom({ name });
  }
}
