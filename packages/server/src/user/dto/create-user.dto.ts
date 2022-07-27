import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { UserRole } from 'types';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @MinLength(8)
  password: string;
  @ApiProperty()
  role: UserRole;
}
