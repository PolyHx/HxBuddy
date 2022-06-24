import { UserRole } from 'types';

export class CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
}
