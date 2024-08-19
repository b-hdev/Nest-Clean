import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class AnswerPresenter {
  static toHTTPMethod(answer: Answer) {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId,
      events: answer.domainEvents,
      content: answer.content,
      createdAt: answer.createdAt,
      updateAt: answer.updatedAt,
    };
  }
}
