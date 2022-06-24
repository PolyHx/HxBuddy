import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
  userId: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
