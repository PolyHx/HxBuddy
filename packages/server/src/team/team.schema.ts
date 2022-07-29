import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Participant } from 'src/participant/participant.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
    required: true,
  })
  participants: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
