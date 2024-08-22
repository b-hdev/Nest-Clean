import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';

export class CommentWithAuthorPresenter {
  static toHTTPMethod(commentWithAuthor: CommentWithAuthor) {
    return {
      commentId: commentWithAuthor.commentId.toString(),
      authorId: commentWithAuthor.author.toString(),
      authorName: commentWithAuthor.author,
      content: commentWithAuthor.content,
      createdAt: commentWithAuthor.createdAt,
      updatedAt: commentWithAuthor.updatedAt,
    };
  }
}
