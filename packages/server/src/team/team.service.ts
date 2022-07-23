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

  update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamModel.updateOne({ _id: id }, updateTeamDto);
  }

  remove(id: string) {
    return this.teamModel.remove(new mongoose.Types.ObjectId(id));
  }

  async joinTeam(teamId: string, participantId: string) {
    // Check if participant is already in a team
    const participant = await this.participantModel.findOne({
      _id: participantId,
    });
    const team = await this.teamModel.find({
      participants: participant,
    });

    if (team.length > 0) {
      throw new HttpException(
        'Participant is already in a team',
        HttpStatus.CONFLICT,
      );
    }

    return await this.teamModel.updateOne(
      { _id: teamId },
      { $push: { participants: participantId } },
    );
  }
}
