import { slice } from '.';

describe('slice', () => {
  test('should slice a string', () => {
    expect(slice('hello world', '1:4')).toBe('ello');
    expect(slice('hello world', ':')).toBe('hello world');
    expect(slice('hello world', ':2')).toBe('hel');
  });

  test('should slice an array', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(slice(arr, '1:4')).toEqual([2, 3, 4, 5]);
    expect(slice(arr, ':')).toEqual([1, 2, 3, 4, 5]);
    expect(slice(arr, ':2')).toEqual([1, 2, 3]);
  });
});
