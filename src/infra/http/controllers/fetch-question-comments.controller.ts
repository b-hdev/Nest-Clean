import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipes';
import { z } from 'zod';
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/v1')
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionAnswer: FetchQuestionCommentsUseCase) {}

  @Get('/questions/:questionId/comments')
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswer.execute({
      page,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const comments = result.value.comments;

    return {
      comments: comments.map(CommentWithAuthorPresenter.toHTTPMethod),
    };
  }
}
