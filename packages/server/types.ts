import { Types } from 'mongoose';

export type UserRole = 'participant';

export interface Payload {
  id: Types.ObjectId;
  email: string;
  role: UserRole;
}
