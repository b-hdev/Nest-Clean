import { Either, left, right } from './either';

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('successful');
  } else {
    return left('error');
  }
}

test('Successfully result', () => {
  const successResult = doSomething(true);

  expect(successResult.isRight()).toBe(true);
  expect(successResult.isLeft()).toBe(false);
});

test('Error result', () => {
  const errorResult = doSomething(false);

  expect(errorResult.isLeft()).toBe(true);
  expect(errorResult.isRight()).toBe(false);
});
