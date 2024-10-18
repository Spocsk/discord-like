import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schemas/room.schema';
import { Message, MessageDocument } from '../schemas/message.schema';

export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createRoom(room: Room): Promise<Room> {
    return this.roomModel.create(room);
  }

  async findMessagesByRoomId(roomId: string): Promise<MessageDocument[]> {
    console.log('roomId', roomId);
    return this.messageModel
      .find({
        roomId,
      })
      .exec();
  }

  async getRooms(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }
}
