import { lowFirstLetter, randomString, upFirstLetter } from '..';

describe('strings randomString function', () => {
  test('randomString check', () => {
    expect(randomString(10)).toHaveLength(10);
  });

  test('upFirstLetter check', () => {
    expect(upFirstLetter('abc')).toBe('Abc');
    expect(upFirstLetter('Abc')).toBe('Abc');
    expect(upFirstLetter('1abc')).toBe('1abc');
  });

  test('upFirstLetter check', () => {
    expect(lowFirstLetter('Abc')).toBe('abc');
    expect(lowFirstLetter('1abc')).toBe('1abc');
  });
});
