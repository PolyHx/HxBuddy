import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { SelfParticipantAuthGuard } from 'src/auth/participant.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from 'src/user/user.schema';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') teamId: string) {
    return this.teamService.findOne(teamId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req: { user: User },
    @Param('id') teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.update(
      teamId,
      req.user.participantId,
      updateTeamDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: { user: User }, @Param('id') teamId: string) {
    return this.teamService.remove(teamId, req.user.participantId);
  }

  @UseGuards(SelfParticipantAuthGuard)
  @Patch(':teamId/join/:id')
  joinTeam(
    @Param('teamId') teamId: string,
    @Param('id') participantId: string,
  ) {
    return this.teamService.joinTeam(teamId, participantId);
  }
}
