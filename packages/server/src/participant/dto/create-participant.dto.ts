import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateParticipantDto extends CreateUserDto {
  @ApiProperty()
  name: string;
}
