import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'types';

export type UserDocument = User & Document;

// Authentication from https://mohaned-benmansour.medium.com/jwt-authentication-using-node-nestjs-mongoose-passport-ionic5-part1-bd07becc7a52

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: UserRole;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' })
  participantId: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User).pre(
  'save',
  async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  },
);
