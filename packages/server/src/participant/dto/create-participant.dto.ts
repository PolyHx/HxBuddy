import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateParticipantDto extends CreateUserDto {
  name: string;
}
