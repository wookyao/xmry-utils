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
} from './';

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
