import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './team.schema';
import { ParticipantModule } from 'src/participant/participant.module';
import { ParticipantSchema } from 'src/participant/participant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Team', schema: TeamSchema },
      {
        name: 'Participant',
        schema: ParticipantSchema,
      },
    ]),
    ParticipantModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
