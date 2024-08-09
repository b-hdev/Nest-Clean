import { expect, test } from 'vitest';
import { Slug } from './slug';

test('It should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('An example slug test');

  expect(slug.value).toEqual('an-example-slug-test');
});
