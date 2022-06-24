import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantSchema } from './participant.schema';
import { UserSchema } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Participant',
        schema: ParticipantSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService],
})
export class ParticipantModule {}
