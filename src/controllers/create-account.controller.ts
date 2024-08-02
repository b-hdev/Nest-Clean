import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/v1')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post('/accounts')
  @HttpCode(201)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        `User with same e-mail address already exists.`,
      );
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
