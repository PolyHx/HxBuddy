import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './team.schema';

@Injectable()
export class TeamService {
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

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

  async isMemberOfTeam(
    teamId: string,
    participantId: string,
  ): Promise<boolean> {
    const team = await this.teamModel.findOne({
      $expr: {
        $in: [participantId, '$participants'],
      },
    });

    return team?._id.toString() === teamId;
  }

  async update(
    id: string,
    participantId: string,
    updateTeamDto: UpdateTeamDto,
  ) {
    if (!(await this.isMemberOfTeam(id, participantId))) {
      throw new HttpException(
        "You're not a member of this team",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.teamModel.updateOne({ _id: id }, updateTeamDto);
  }

  async remove(id: string, participantId: string) {
    if (!(await this.isMemberOfTeam(id, participantId))) {
      throw new HttpException(
        "You're not a member of this team",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.teamModel.remove(new mongoose.Types.ObjectId(id));
  }

  async joinTeam(teamId: string, participantId: string) {
    // Check if participant is already in a team
    const team = await this.teamModel.findOne({
      $expr: {
        $in: [participantId, '$participants'],
      },
    });

    if (team !== null) {
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
