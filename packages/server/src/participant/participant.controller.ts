import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { SelfParticipantAuthGuard } from 'src/auth/participant.guard';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(SelfParticipantAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(id);
  }

  @UseGuards(SelfParticipantAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @UseGuards(SelfParticipantAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(id);
  }
}
