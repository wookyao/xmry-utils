import { slice } from '.';
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
