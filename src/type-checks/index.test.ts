import {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  isNil,
  isTypeOrNil,
  isEmpty,
  isDate,
  isPromise,
  isUndefined,
  isNull,
  isError,
  isPrimitiveType,
} from './';

const numGt5 = (value: unknown) => isNumber(value) && value > 5;

// isString
describe('isString', () => {
  test('isString check', () => {
    expect(isString('')).toBe(true);
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
  });
});

// isNumber
describe('isNumber', () => {
  test('isNumber check', () => {
    expect(isNumber('')).toBe(false);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(Number('sd'))).toBe(false);
  });
});

// isBoolean
describe('isBoolean', () => {
  test('isBoolean check', () => {
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(1 === 1)).toBe(true);
    expect(isBoolean('true')).toBe(false);
  });
});

// isObject
describe('isObject', () => {
  test('isObject check', () => {
    expect(isObject('')).toBe(false);
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

// isArray
describe('isArray', () => {
  test('isArray check', () => {
    expect(isArray('')).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray([])).toBe(true);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(Array())).toBe(true);
  });
});

// isFunction
describe('isFunction', () => {
  test('isFunction check', () => {
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction('() => {}')).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction({})).toBe(false);
  });
});

// isUndefined
describe('isUndefined', () => {
  test('isUndefined check', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined('undefined')).toBe(false);
    expect(isUndefined('null')).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(false)).toBe(false);
  });
});

// isNull
describe('isNull', () => {
  test('isNull check', () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(null)).toBe(true);
    expect(isNull('undefined')).toBe(false);
    expect(isNull('null')).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull(false)).toBe(false);
  });
});

// isDate
describe('isDate', () => {
  test('isDate check', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('  '))).toBe(false);
    expect(isDate('')).toBe(false);
    expect(isDate('2024-10-10')).toBe(false);
    expect(isDate(new Date('2024-10-10'))).toBe(true);
  });
});

// isPromise
describe('isPromise', () => {
  test('isPromise check', () => {
    expect(isPromise(new Promise(() => {}))).toBe(true);
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise('')).toBe(false);
    expect(isPromise(new Date('2024-10-10'))).toBe(false);
  });
});

// isError
describe('isError', () => {
  test('isError check', () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError('new TypeError()')).toBe(false);
  });
});

// isNil
describe('isNil', () => {
  test('should return true for null', () => {
    expect(isNil(null)).toBe(true);
  });

  test('should return true for undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  test('should return false for non-nil values', () => {
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(false)).toBe(false);
    expect(isNil([])).toBe(false);
  });
});

// isPrimitiveType
describe('isPrimitiveType', () => {
  test('isPrimitiveType check', () => {
    expect(isPrimitiveType('')).toBe(true);
    expect(isPrimitiveType(0)).toBe(true);
    expect(isPrimitiveType(false)).toBe(true);
    expect(isPrimitiveType(undefined)).toBe(true);
    expect(isPrimitiveType(null)).toBe(true);
    expect(isPrimitiveType(Symbol(''))).toBe(true);

    expect(isPrimitiveType(function () {})).toBe(false);
    expect(isPrimitiveType({})).toBe(false);
  });
});

// isTypeOrNil
describe('isTypeOrNil', () => {
  it('isString or null check', () => {
    expect(isTypeOrNil(null, isString)).toBe(true);
    expect(isTypeOrNil('null', isString)).toBe(true);
    expect(isTypeOrNil(0, isString)).toBe(false);
  });

  it('isNumber check', () => {
    expect(isTypeOrNil(1, isNumber)).toBe(true);
    expect(isTypeOrNil('', isNumber)).toBe(false);
    expect(isTypeOrNil(NaN, isNumber)).toBe(false);
  });

  it('isBoolean check', () => {
    expect(isTypeOrNil(false, isBoolean)).toBe(true);
    expect(isTypeOrNil(true, isBoolean)).toBe(true);
    expect(isTypeOrNil(NaN, isBoolean)).toBe(false);
  });

  it('isObject check', () => {
    expect(isTypeOrNil({}, isObject)).toBe(true);
    expect(isTypeOrNil({ key: 1 }, isObject)).toBe(true);
    expect(isTypeOrNil([], isObject)).toBe(false);
  });

  it('isArray check', () => {
    expect(isTypeOrNil({}, isArray)).toBe(false);
    expect(isTypeOrNil(() => {}, isArray)).toBe(false);
    expect(isTypeOrNil([], isArray)).toBe(true);
  });

  it('isFunction check', () => {
    expect(isTypeOrNil({}, isFunction)).toBe(false);
    expect(isTypeOrNil(() => {}, isFunction)).toBe(true);
    expect(isTypeOrNil(function () {}, isFunction)).toBe(true);
  });

  it('isDate check', () => {
    expect(isTypeOrNil({}, isDate)).toBe(false);
    expect(isTypeOrNil(new Date(), isDate)).toBe(true);
    expect(isTypeOrNil(new Date(' '), isDate)).toBe(false);
  });

  it('isPromise check', () => {
    expect(isTypeOrNil({}, isDate)).toBe(false);
    expect(isTypeOrNil(new Promise(() => {}), isPromise)).toBe(true);
  });

  it('isPromise customer function check', () => {
    expect(isTypeOrNil(6, numGt5)).toBe(true);
    expect(isTypeOrNil(1, numGt5)).toBe(false);
  });
});

// isEmpty
describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('Array check', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([0, 1])).toBe(false);
  });

  it('Object check', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ key: 'value' })).toBe(false);
  });

  it('String check', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('1')).toBe(false);
  });

  it('NaN numbers check', () => {
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(0)).toBe(false);
  });

  it('should return true for empty Maps and Sets', () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return true for empty Buffers', () => {
    expect(isEmpty(Buffer.from(''))).toBe(true);
  });

  it('should return true for empty TypedArrays', () => {
    expect(isEmpty(new Uint8Array(0))).toBe(true);
  });

  it('Date check', () => {
    expect(isEmpty(new Date('invalid'))).toBe(true);
    expect(isEmpty(new Date())).toBe(false);
  });
});
