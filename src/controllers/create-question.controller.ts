import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/auth/current-user-decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UserPayload } from '@/auth/jwt.strategy';

@Controller('/v1')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() {}

  @Post('/questions')
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user);
    return 'ok';
  }
}
