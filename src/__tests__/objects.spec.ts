import { filterEmpty, pick } from '../objects';
import { isNilOrNaN } from '../type-checks';

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

  test('filterEmpty', () => {
    const obj = {
      a: 0,
      b: null,
      c: undefined,
      d: '',
      e: false,
      f: NaN,
      g: '111',
    };

    expect(filterEmpty(obj)).toEqual({ a: 0, e: false, g: '111', f: NaN });

    expect(
      filterEmpty(obj, (value) => {
        return isNilOrNaN(value) || value === '';
      }),
    ).toEqual({ a: 0, e: false, g: '111' });
  });
});
