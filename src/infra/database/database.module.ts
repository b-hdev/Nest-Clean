import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// Repositories ->
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/questions-attachments-repository';
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';

// Prisma Repositories ->
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository';

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
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },

    {
      provide: AnswerRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentsRepository,
    AnswerCommentsRepository,
    AnswerRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
    AttachmentsRepository,
  ],
})
export class DatabaseModule {}
