import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.schema';

@Injectable()
export class SelfParticipantAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    const id: string = req.params.id;

    return user.role === 'participant' && user.participantId.toString() === id;
  }
}
