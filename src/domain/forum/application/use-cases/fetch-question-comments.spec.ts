import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to fetch question comments', async () => {
    const student = makeStudent({ name: 'Student John' });

    inMemoryStudentsRepository.items.push(student);

    const firstComment = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });

    const secondComment = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });

    const thirdComment = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });

    await inMemoryQuestionCommentsRepository.create(firstComment);

    await inMemoryQuestionCommentsRepository.create(secondComment);

    await inMemoryQuestionCommentsRepository.create(thirdComment);

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.value?.comments).toHaveLength(3);
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'Student John',
          commentId: firstComment.id,
        }),
        expect.objectContaining({
          author: 'Student John',
          commentId: secondComment.id,
        }),
        expect.objectContaining({
          author: 'Student John',
          commentId: thirdComment.id,
        }),
      ]),
    );
  });

  it('should be able to fetch paginated question comments', async () => {
    const student = makeStudent({ name: 'Student John' });

    inMemoryStudentsRepository.items.push(student);

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          authorId: student.id,
        }),
      );
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.value?.comments).toHaveLength(2);
  });
});
