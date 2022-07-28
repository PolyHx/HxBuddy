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
    return this.teamModel.findOne({ _id: id }).populate('participants');
  }

  findByName(name: string) {
    return this.teamModel.findOne({ name }).populate('participants');
  }

  findByParticipant(participantId: string) {
    return this.teamModel
      .findOne({
        $expr: {
          $in: [participantId, '$participants'],
        },
      })
      .populate('participants');
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

    return await this.teamModel.remove(id);
  }

  async joinTeam(teamId: string, participantId: string) {
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

    return await this.teamModel
      .findByIdAndUpdate(
        teamId,
        { $push: { participants: participantId } },
        { new: true },
      )
      .populate('participants');
  }

  async leaveTeam(teamId: string, participantId: string) {
    const team = await this.teamModel.findOne({
      $expr: {
        $in: [participantId, '$participants'],
      },
    });

    if (team === null) {
      throw new HttpException(
        'Participant is not in a team',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTeam = await this.teamModel
      .findByIdAndUpdate(
        teamId,
        { $pull: { participants: participantId } },
        { new: true },
      )
      .populate('participants');

    if (updatedTeam.participants.length === 0) {
      await this.teamModel.findByIdAndRemove(teamId);
      return null;
    }

    return updatedTeam;
  }
}
