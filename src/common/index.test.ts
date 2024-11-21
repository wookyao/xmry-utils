import { copyOf, slice } from '.';

// 切片
describe('slice', () => {
  test('should slice a string', () => {
    expect(slice('strawberry', '1:4')).toBe('tra');
    expect(slice('strawberry', ':')).toBe('strawberry');
    expect(slice('strawberry', '::2')).toBe('srwer');
    expect(slice('abc', '::-1')).toBe('cba');

    expect(slice('strawberry', '1:')).toBe('trawberry');
    expect(slice('strawberry', ':2')).toBe('st');
    expect(slice('strawberry', '::-2')).toBe('yrbat');
    expect(slice('strawberry', '4::-2')).toBe('yrb');
  });

  test('should slice an array', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(slice(arr, '1:4')).toEqual([1, 2, 3]);
    expect(slice(arr, ':')).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(slice(arr, ':2')).toEqual([0, 1]);
    expect(slice(arr, '::-1')).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    expect(slice(arr, '::-2')).toEqual([10, 8, 6, 4, 2, 0]);
    expect(slice(arr, '4::-2')).toEqual([10, 8, 6, 4]);
  });
});

// copyOf
describe('copyOf', () => {
  test('copyOf String test', () => {
    const str: string = 'abcdef';

    expect(copyOf(str, 3)).toBe('abc');
    expect(copyOf(str, 9, '*')).toBe('abcdef***');

    expect(copyOf(str, 0)).toBe('');
    expect(copyOf(str, 1)).toBe('a');

    expect(copyOf(str, 1, (i) => i * 2)).toBe('a');
    expect(copyOf(str, 9, (i) => i * 2)).toBe('abcdef121');
  });

  test('copyOf Array test', () => {
    const list = [0, 1, 2, 3, 4, 5];

    expect(copyOf(list, 3) as number[]).toEqual([0, 1, 2]);

    expect(copyOf(list, 9, 1) as number[]).toEqual([0, 1, 2, 3, 4, 5, 1, 1, 1]);

    expect(copyOf(list, 0)).toEqual([] as number[]);
    expect(copyOf(list, 1)).toEqual([0]);

    expect(copyOf(list, 1, (i) => i * 2)).toEqual([0]);
    expect(copyOf(list, 9, (i) => i * 2)).toEqual([
      0, 1, 2, 3, 4, 5, 12, 14, 16,
    ]);
  });
});
