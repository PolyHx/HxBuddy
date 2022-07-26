import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Participant,
  ParticipantDocument,
} from 'src/participant/participant.schema';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './team.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    const team = new this.teamModel(createTeamDto);
    return team.save();
  }

  findAll() {
    return this.teamModel.find();
  }

  findOne(id: string) {
    return this.teamModel.findOne({ _id: id });
  }

  async isMemberOfTeam(teamId: string, userId: string): Promise<boolean> {
    const participant = await this.participantModel.findOne({ userId });
    const team = await this.teamModel.findOne({
      $expr: {
        $in: [participant, '$participants'],
      },
    });

    return team !== null && team._id.toString() === teamId;
  }

  async update(id: string, userId: string, updateTeamDto: UpdateTeamDto) {
    if (!(await this.isMemberOfTeam(id, userId))) {
      throw new HttpException(
        "You're not a member of this team",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.teamModel.updateOne({ _id: id }, updateTeamDto);
  }

  async remove(id: string, userId: string) {
    if (!(await this.isMemberOfTeam(id, userId))) {
      throw new HttpException(
        "You're not a member of this team",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.teamModel.remove(new mongoose.Types.ObjectId(id));
  }

  async joinTeam(teamId: string, userId: string) {
    // Check if participant is already in a team
    const participant = await this.participantModel.findOne({ userId });
    const team = await this.teamModel.findOne({
      participants: participant,
    });

    if (team !== null) {
      throw new HttpException(
        'Participant is already in a team',
        HttpStatus.CONFLICT,
      );
    }

    return await this.teamModel.updateOne(
      { _id: teamId },
      { $push: { participants: participant._id } },
    );
  }
}
