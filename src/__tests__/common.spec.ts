import { copyOf, slice, copyDeep } from '..';

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

// 深拷贝
describe('copyDeep', () => {
  it('should copy primitive values', () => {
    expect(copyDeep(42)).toBe(42);
    expect(copyDeep('hello')).toBe('hello');
    expect(copyDeep(null)).toBe(null);
    expect(copyDeep(undefined)).toBe(undefined);
  });

  it('should copy arrays', () => {
    const arr = [1, 2, { a: 3 }];
    const copied = copyDeep(arr);
    expect(copied).toEqual(arr);
    expect(copied).not.toBe(arr); // 引用不同
    expect(copied[2]).not.toBe(arr[2]); // 深拷贝内部对象
  });

  it('should copy objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copied = copyDeep(obj);
    expect(copied).toEqual(obj);
    expect(copied).not.toBe(obj);
    expect(copied.b).not.toBe(obj.b); // 深拷贝内部对象
  });

  it('should handle dates', () => {
    const date = new Date();
    const copied = copyDeep(date);
    expect(copied).toEqual(date);
    expect(copied).not.toBe(date); // 引用不同
    expect(copied.getTime()).toBe(date.getTime());
  });

  it('should handle sets', () => {
    const set = new Set([1, 2, 3]);
    const copied = copyDeep(set);
    expect(copied).toEqual(set);
    expect(copied).not.toBe(set); // 引用不同
  });

  it('should handle maps', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', { c: 2 });

    const copied = copyDeep(map);
    expect(copied).toEqual(map);
    expect(copied).not.toBe(map); // 引用不同
    expect(copied.get('b')).not.toBe(map.get('b')); // 深拷贝内部对象
  });

  it('should handle circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj; // 创建循环引用
    const copied = copyDeep(obj);
    expect(copied).toEqual({ a: 1, self: copied }); // 确保引用指向复制后的对象
    expect(copied.self).toBe(copied); // 循环引用保持正确
  });

  it('should handle deeply nested structures', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
            },
          },
        },
      },
    };
    const copied = copyDeep(obj);
    expect(copied).toEqual(obj);
    expect(copied.level1.level2.level3.level4).not.toBe(
      obj.level1.level2.level3.level4,
    ); // 深拷贝
  });

  it('should handle empty objects and arrays', () => {
    expect(copyDeep({})).toEqual({});
    expect(copyDeep([])).toEqual([]);
    expect(copyDeep([])).not.toBe([]); // 引用不同
  });

  it('should handle edge cases', () => {
    const obj = Object.create(null);
    obj.a = 1;
    const copied = copyDeep(obj);
    expect(copied).toEqual(obj);
    expect(copied).not.toBe(obj);
  });

  it('should handle special types like RegExp', () => {
    const regex = /test/gi;
    const copied = copyDeep(regex);
    expect(copied).toEqual(regex);
    expect(copied).not.toBe(regex); // 引用不同
    expect(copied.flags).toBe(regex.flags);
  });
});
