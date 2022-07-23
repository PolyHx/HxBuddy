import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Participant } from 'src/participant/participant.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team', unique: true })
  teamId: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  })
  participants: Participant[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
