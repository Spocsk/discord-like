import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schemas/room.schema';

export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async createRoom(room: Room): Promise<Room> {
    return this.roomModel.create(room);
  }

  async getRoomById(id: string): Promise<Room> {
    return this.roomModel.findById(id);
  }

  async getRooms(): Promise<Room[]> {
    return this.roomModel.find();
  }
}
