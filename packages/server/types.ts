import { Types } from 'mongoose';

export type UserRole = 'participant' | 'admin';

export interface Payload {
  id: Types.ObjectId;
  email: string;
  role: UserRole;
}
