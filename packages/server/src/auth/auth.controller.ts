import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Payload, UserRole } from 'types';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ParticipantService } from 'src/participant/participant.service';
import { CreateParticipantDto } from 'src/participant/dto/create-participant.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private participantService: ParticipantService,
  ) {}

  @Post('participant')
  async registerParticipant(
    @Body() createParticipantDto: CreateParticipantDto,
  ) {
    const { user } = await this.participantService.create(createParticipantDto);
    const payload = {
      id: user._id,
      role: user.role as UserRole,
      email: user.email,
    };
    delete user.password;
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByLogin(loginDto);
    const payload: Payload = {
      id: user._id,
      role: user.role as UserRole,
      email: user.email,
    };
    delete user.password;
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
