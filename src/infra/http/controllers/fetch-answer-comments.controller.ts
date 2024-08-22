import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipes';
import { z } from 'zod';
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments';
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
export class FetchAnswerCommentsController {
  constructor(private fetchAnswerAnswer: FetchAnswerCommentsUseCase) {}

  @Get('/answers/:answerId/comments')
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchAnswerAnswer.execute({
      page,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const comments = result.value.comments;

    console.log(comments);

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTPMethod) };
  }
}
