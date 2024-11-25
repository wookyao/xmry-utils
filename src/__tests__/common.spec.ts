import {
  copyOf,
  slice,
  copyDeep,
  serialize,
  equal,
  hex2Rgba,
  validate,
} from '..';

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

// equal
describe('equal', () => {
  test('should compare primitive values', () => {
    expect(equal(42, 42)).toBe(true);
    expect(equal('hello', 'hello')).toBe(true);
    expect(equal(null, null)).toBe(true);
    expect(equal(undefined, undefined)).toBe(true);

    const obj = { a: 1, b: { c: 2 } };
    expect(equal(obj, obj)).toBe(true);
    expect(equal(obj, { a: 1, b: { c: 2 } })).toBe(true);
    expect(equal(obj, { a: 1, b: { c: 3 } })).toBe(false);

    const list = [0, 2, 3];
    expect(equal(list, list)).toBe(true);
    expect(equal(list, [0, 2, 3])).toBe(true);
    expect(equal(list, [0, 3, 2])).toBe(false);
    expect(equal(list, [0, 2, 4])).toBe(false);
  });
});

// 自定义序列化
describe('serialize', () => {
  test('serialize string', () => {
    expect(serialize('hello')).toBe('s(hello)');

    const fn = () => {};

    function fn2() {}

    const obj = {
      a: 'hello',
      b: 123,
      b1: 0,
      b2: -0,
      c: true,
      d: false,
      e: null,
      f: undefined,
      g: () => {
        const a = 1;
        return a * 20;
      },
      gfn: fn,
      fn2,
      g2: function () {
        const a = 1;
        return a * 20;
      },
      h: new Date('2020-01-01'),
      i: /abc/gi,
      j: Symbol('test'),
      k: new Set([1, 2, 3]),
      l: new Map([
        ['a', 1],
        ['b', 2],
      ]),
      m: { n: 'nested' },
      n: [4, 5, 6],
      o: NaN,
      p: Infinity,
      q: -Infinity,
      r: BigInt(12345678901234567890),
    };

    expect(serialize(obj)).toBe(
      '{a:s(hello),b:#(123),b1:#(0),b2:-0,c:b(T),d:b(F),e:Nil.,f:Und.,fn2:f([code native]),g:lam([code native]),g2:f([code native]),gfn:lam([code native]),h:d(2020-01-01T00:00:00.000Z),i:r(/abc/gi),j:s(Symbol(test)),k:S{#(1),#(2),#(3)},l:M{s(a):#(1),s(b):#(2)},m:{n:s(nested)},n:[#(4),#(5),#(6)],o:NaN,p:#(Infinity),q:#(-Infinity),r:###(12345678901234567168)}',
    );
  });
});

// hex2rgba
describe('hex2Rgba', () => {
  test('hex2Rgba', () => {
    expect(hex2Rgba('#f00')).toBe('rgba(255,0,0,1)');
    expect(hex2Rgba('#f00', 0.5)).toBe('rgba(255,0,0,0.5)');
  });
});

// validate
describe('validate', () => {
  test('validate', () => {
    expect(validate('#000000', 'Hex')).toBe(true);
    expect(validate('#PUA250', 'Hex')).toBe(false);

    expect(validate('15256936288', 'CN_Phone')).toBe(true);
    expect(validate('138124578963', 'CN_Phone')).toBe(false);

    expect(validate('11000020200201', 'CN_ID_Card')).toBe(false);
    expect(validate('11000020200201507X', 'CN_ID_Card')).toBe(true);

    // 中国大陆邮政编码正则
    expect(validate('110000', 'CN_Post_Code')).toBe(true);
    expect(validate('11000', 'CN_Post_Code')).toBe(false);
    expect(validate('11000A', 'CN_Post_Code')).toBe(false);

    expect(validate('9527@qq.com', 'Email')).toBe(true);
    expect(validate('StephenChow@gmail.com', 'Email')).toBe(true);

    // 仅支持中文
    expect(validate('周星驰', 'CN')).toBe(true);
    expect(validate('周 星 驰', 'CN')).toBe(false);
    expect(validate('Stephen Chow@', 'CN')).toBe(false);
    //  仅支持中文 + 空格
    expect(validate('周 星 驰', 'CN_Space')).toBe(true);

    // 仅支持英文
    expect(validate('Stephen', 'EN')).toBe(true);
    expect(validate('Stephen Chow', 'CN')).toBe(false);
    // 仅支持英文 + 空格
    expect(validate('Stephen Chow', 'EN_Space')).toBe(true);

    // 仅支持数字 可以包括小数 也可以不包含小数
    expect(validate('Stephen Chow', 'NUM')).toBe(false);
    expect(validate(50, 'NUM')).toBe(true);
    expect(validate(-50.25, 'NUM')).toBe(true);

    // 验证整数
    expect(validate(-50, 'NUM_INT')).toBe(true);
    expect(validate(-50.25, 'NUM_INT')).toBe(false);

    // 验证小数 必须包含小数
    expect(validate(-50.25, 'NUM_DECIMAL')).toBe(true);
    expect(validate(-50, 'NUM_DECIMAL')).toBe(false);

    // 验证两位小数
    expect(validate(-50, 'NUM_DECIMAL_TWO')).toBe(false);
    expect(validate(-50.25, 'NUM_DECIMAL_TWO')).toBe(true);
    expect(validate(-50.251, 'NUM_DECIMAL_TWO')).toBe(false);

    // 验证中文数字混合
    expect(validate('hhh25', 'EN_NUM')).toBe(true);
    expect(validate(25, 'EN_NUM')).toBe(true);
    expect(validate('666', 'EN_NUM')).toBe(true);

    // 验证中文英文数字
    expect(validate('125Q', 'CN_EN_NUM')).toBe(true);
    expect(validate('125Q!@#', 'CN_EN_NUM')).toBe(false);
  });
});
