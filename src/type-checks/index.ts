// file: type-checks.ts

/**
 * 判断给定的值是否为字符串类型
 *
 * @param value 任意类型的值，用于判断
 * @returns 如果值是字符串类型，则返回true；否则返回false
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * 检查给定的值是否为数字。
 *
 * 该函数用于确定提供的值是否为一个有效的数字类型。它不仅检查值的类型是否为'number'，
 * 还要进一步确认该值不是NaN（不是一个数字）。这是因为NaN值在JavaScript中是一个特殊的数值，
 * 它虽然被归类为数字类型，但实际上并不表示一个有效的数字。
 *
 * @param value - 待检查的值，可以是任何类型。
 * @returns 返回一个布尔值，如果给定的值是一个有效的数字，则为true；否则为false。
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * 判断给定的值是否为布尔类型
 *
 * @param value 任意类型的值，用于判断
 * @returns 如果值是布尔类型，则返回true；否则返回false
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

/**
 * 判断给定值是否为非空且非数组的对象
 *
 * 此函数用于精确区分对象类型与其它类型，包括null和数组虽然在JavaScript中被视为对象，
 * 但在这个函数中被排除在外，以满足特定的类型判断需求
 *
 * @param value 任意类型的值，用于判断其是否为非空且非数组的对象
 * @returns 如果值是对象且不是null也不是数组，则返回true；否则返回false
 */
export const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * 判断给定的值是否为数组
 *
 * @template T 数组元素的类型
 * @param value 待检查的值
 * @returns 如果给定的值是数组，则返回true；否则返回false
 */
export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

/**
 * 判断给定的值是否为函数
 *
 * @param value 任意类型的值，用于判断是否为函数
 * @returns 如果值是函数类型，则返回true；否则返回false
 */
export const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function';
};

/**
 * 检查给定的值是否为 `undefined`。
 *
 * @param value 任意类型的值，将被检查是否为 `undefined`。
 * @returns 如果 `value` 是 `undefined`，则返回 `true`；否则返回 `false`。
 */
export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined';
};

/**
 * 检查给定的值是否为 null
 *
 * @param value 未知类型的值，用于检查是否为 null
 * @returns 如果给定的值为 null，则返回 true；否则返回 false
 */
export const isNull = (value: unknown): value is null => {
  return value === null;
};

/**
 * 检查给定的值是否为一个有效的日期对象
 *
 * @param value 未知类型的值，待检查是否为日期对象
 * @returns 如果值是一个有效的日期对象，则返回true；否则返回false
 */
export const isDate = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

/**
 * 判断给定的值是否为一个Promise对象
 *
 * @template T Promise解析后的类型
 * @param value 任意类型的值，用于判断是否为Promise
 * @returns 如果value是一个Promise对象，则返回true；否则返回false
 */
export const isPromise = <T>(value: unknown): value is Promise<T> => {
  return (
    !!value && // 确保value不是null、undefined或false等虚假值
    (typeof value === 'object' || typeof value === 'function') && // 判断value是否为对象或函数类型，因为Promise是一个对象
    typeof (value as Promise<T>).then === 'function' // 检查value是否具有then方法，这是Promise的特征
  );
};

/**
 * 判断给定的值是否为Error实例
 *
 * @param value 任意类型的值，用于判断是否为Error实例
 * @returns 如果value是Error实例，则返回true；否则返回false
 */
export const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};

export const isSymbol = (value: unknown): value is symbol => {
  return typeof value === 'symbol';
};

/**
 * 检查给定的值是否为 null 或 undefined
 *
 * @param value 未知类型的值，待检查
 * @returns 如果值为 null 或 undefined，则返回 true，否则返回 false
 */
export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

/**
 * 检查给定的值是否为 null、undefined 或 NaN
 *
 * @param value 任意类型的值，将被检查是否为 null、undefined 或 NaN
 * @returns 如果值是 null、undefined 或 NaN，则返回 true；否则返回 false
 */
export const isNilOrNaN = (value: unknown): boolean => {
  // 使用 isNil 函数检查值是否为 null 或 undefined，或检查值是否为 NaN 的数字
  return isNil(value) || (typeof value === 'number' && isNaN(value));
};

/**
 * 检查值是否为指定类型或者为null或undefined
 *
 * @param value 未知类型的值，待检查
 * @param typeCheck 类型检查函数，用于检查值是否为指定类型
 * @returns 如果值为指定类型、null或undefined，则返回true；否则返回false
 */
export const isTypeOrNil = <T>(
  value: unknown,
  typeCheck: (value: unknown) => value is T,
): value is T | null | undefined => {
  // 检查值是否为null或undefined，或者是否通过类型检查函数的验证
  return isNil(value) || typeCheck(value);
};

/**
 * 检查给定的值是否为空
 *
 * 此函数用于判断各种类型的值是否为空，包括但不限于对象、数组、字符串、数字和符号
 * 对于不同类型的数据，空的定义有所不同例如，对于对象和数组，空意味着没有元素；
 * 对于字符串，空意味着长度为零；对于数字，空意味着是NaN
 *
 * @param value 待检查的值，可以是任意类型
 * @returns 如果给定的值被认为是空，则返回true；否则返回false
 */
export const isEmpty = (value: unknown): boolean => {
  if (value == null) {
    // Checks for null or undefined
    return true;
  }

  if (typeof value === 'number' && isNaN(value)) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    // Checks for empty string or array
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    // Checks for empty Map or Set
    return value.size === 0;
  }

  if (value instanceof Date) {
    // Checks for empty Date
    return isNaN(value.getTime());
  }

  if (isObject(value)) {
    // Checks for empty object
    return Object.keys(value as object).length === 0;
  }

  return false;
};
