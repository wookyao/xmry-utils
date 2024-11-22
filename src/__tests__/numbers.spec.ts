import { limitNumber, rand, toThousands } from '../numbers';

// limitNumber 限制取值范围
describe('numbers limitNumber function', () => {
  test('limitNumber check', () => {
    expect(limitNumber(7, 10, 5)).toBe(7);
    expect(limitNumber(7, 6, 3)).toBe(6);
    expect(limitNumber(1, 10, 5)).toBe(5);
    expect(limitNumber(-7, 10, 5)).toBe(5);
    expect(limitNumber(10, 10, 5)).toBe(10);
  });
});

// 随机数
describe('numbers rand function', () => {
  test('should return a number between min and max', () => {
    const min = 1;
    const max = 10;
    const result = rand(max, min);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  test('should handle when min and max are the same', () => {
    const min = 5;
    const max = 5;
    const result = rand(max, min);
    expect(result).toEqual(min);
  });
});

// 金额千分位
describe('toThousands function', () => {
  it('should format numbers with commas', () => {
    expect(toThousands(1000)).toBe('1,000');
    expect(toThousands(1000000)).toBe('1,000,000');
    expect(toThousands(1000000000)).toBe('1,000,000,000');
  });

  it('should handle decimal numbers correctly', () => {
    expect(toThousands(1000.123)).toBe('1,000.123');
    expect(toThousands(1000.1)).toBe('1,000.1');
    expect(toThousands(1000.0)).toBe('1,000');
  });

  it('should throw an error for invalid inputs', () => {
    expect(() => toThousands('not a number')).toThrow(TypeError);
    expect(() => toThousands(NaN)).toThrow(TypeError);
    expect(() => toThousands(Infinity)).toThrow(TypeError);
    expect(() => toThousands(null)).toThrow(TypeError);
    expect(() => toThousands(undefined)).toThrow(TypeError);
  });

  it('should handle edge cases', () => {
    expect(toThousands(0)).toBe('0');
    expect(toThousands(1)).toBe('1');
    expect(toThousands(-1000)).toBe('-1,000');
    expect(toThousands(1000.001)).toBe('1,000.001');
  });
});
