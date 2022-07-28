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
  Query,
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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: { user: User }, @Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto, req.user.participantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findByParticipant(@Request() req: { user: User }) {
    return this.teamService.findByParticipant(req.user.participantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') teamId: string) {
    return this.teamService.findOne(teamId);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.teamService.findByName(name);
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

  @UseGuards(JwtAuthGuard)
  @Patch(':teamId/join/')
  joinTeam(@Request() req: { user: User }, @Param('teamId') teamId: string) {
    return this.teamService.joinTeam(teamId, req.user.participantId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':teamId/leave/')
  leaveTeam(@Request() req: { user: User }, @Param('teamId') teamId: string) {
    return this.teamService.leaveTeam(teamId, req.user.participantId);
  }
}
