import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// Repositories ->
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';

// Prisma Repositories ->
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
