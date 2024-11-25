import { pick } from '../objects';

describe('objects', () => {
  const obj = { a: 1, b: 2, c: { foo: 'bar' }, d: [1, 2, 3] };

  test('pick', () => {
    expect(pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 2 });
    expect(pick(obj, ['a', 'b', 'c'])).toEqual({
      a: 1,
      b: 2,
      c: { foo: 'bar' },
    });
  });

  test('pick deep', () => {
    expect(pick(obj, ['a', 'b'], true)).toEqual({ a: 1, b: 2 });
    expect(pick(obj, ['a', 'b', 'c', 'd'], true)).toEqual({
      a: 1,
      b: 2,
      c: { foo: 'bar' },
      d: [1, 2, 3],
    });

    expect(pick(obj, ['c'], true)).not.toBe(obj.c);
  });
});
