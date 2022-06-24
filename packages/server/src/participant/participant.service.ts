import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant, ParticipantDocument } from './participant.schema';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto) {
    try {
      const createdParticipant = new this.participantModel(
        createParticipantDto,
      );
      const user = new this.userModel({
        ...createParticipantDto,
        role: 'participant',
      });
      createdParticipant.userId = user._id.toString();
      await createdParticipant.save();
      user.participantId = createdParticipant._id.toString();
      await user.save();
      return { createdParticipant, user };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.participantModel.find();
  }

  findOne(id: string) {
    return this.participantModel.findOne({ _id: id });
  }

  update(id: string, updateParticipantDto: UpdateParticipantDto) {
    return this.participantModel.updateOne({ _id: id }, updateParticipantDto);
  }

  remove(id: string) {
    return this.participantModel.remove(id);
  }
}
