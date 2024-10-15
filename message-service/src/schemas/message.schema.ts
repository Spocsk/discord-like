import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({required: true})
  roomId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
