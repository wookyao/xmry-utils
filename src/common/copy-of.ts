import { isArray, isFunction, isString, isUndefined } from '../type-checks';
import copyDeep from './copy-deep';
import slice from './slice';

type Placeholder<T> = (index: number) => T;

// start 函数重载 copyOf
function copyOf(
  value: string,
  size: number,
  placeholder?: Placeholder<unknown>,
): string;
function copyOf(value: string, size: number, placeholder?: string): string;
function copyOf(value: string, size: number): string;

function copyOf(
  value: unknown[],
  size: number,
  placeholder?: Placeholder<unknown>,
): unknown[];
function copyOf(
  value: unknown[],
  size: number,
  placeholder?: unknown,
): unknown[];
function copyOf(value: unknown[], size: number): unknown[];

function copyOf(
  value: string | unknown[],
  size: number,
  placeholder?: string | unknown | Placeholder<unknown>,
): string | unknown[];
// end 函数重载

/** copyOf
 * 创建一个数组或字符串的副本，可以选择性地填充到指定大小。
 *
 * 对于数组元素为引用类型的值，实现浅拷贝
 *
 * @param value 原始字符串或数组。
 * @param size 复本的大小。如果小于等于0，返回空数组或空字符串。
 * @param placeholder 用于填充的占位符或占位符生成函数。如果未提供，不进行填充。
 * @returns 返回复制并可能填充后的数组或字符串。
 * @throws 如果value既不是字符串也不是数组，抛出类型错误。
 */
function copyOf(
  value: string | unknown[],
  size: number,
  placeholder?: string | unknown | Placeholder<unknown>,
) {
  // 边界判断
  if (size <= 0) return isArray(value) ? [] : '';

  // 参数校验
  if (!isString(value) && !isArray(value)) {
    throw new TypeError('复制对象的值必须是字符串或数组');
  }

  const length = value.length;
  const sliceValue = slice(value, `0:${size}`);

  const diffSize = size - length;

  if (diffSize <= 0 || isUndefined(placeholder)) return sliceValue;

  // 占位符生成辅助函数
  const generatePlaceholders = () => {
    if (isFunction(placeholder)) {
      return Array.from({ length: diffSize }, (_, i) =>
        placeholder(length + i),
      );
    } else {
      return Array(diffSize).fill(placeholder);
    }
  };

  const placeholders = generatePlaceholders();

  if (isString(value)) {
    return sliceValue + slice(placeholders.join(''), `0:${diffSize}`);
  } else {
    return [...(sliceValue as unknown[]), ...placeholders];
  }
}

// start 函数重载 copyDeepOf
function copyDeepOf(
  value: string,
  size: number,
  placeholder?: Placeholder<unknown>,
): string;
function copyDeepOf(value: string, size: number, placeholder?: string): string;
function copyDeepOf(value: string, size: number): string;

function copyDeepOf(
  value: unknown[],
  size: number,
  placeholder?: Placeholder<unknown>,
): unknown[];
function copyDeepOf(
  value: unknown[],
  size: number,
  placeholder?: unknown,
): unknown[];
function copyDeepOf(value: unknown[], size: number): unknown[];

function copyDeepOf(
  value: string | unknown[],
  size: number,
  placeholder?: string | unknown | Placeholder<unknown>,
): string | unknown[];
// end 函数重载

/** copyDeepOf
 * 创建一个数组或字符串的副本，可以选择性地填充到指定大小。
 *
 * 对于数组元素为引用类型的值，实现深拷贝
 *
 * @param value 原始字符串或数组。
 * @param size 复本的大小。如果小于等于0，返回空数组或空字符串。
 * @param placeholder 用于填充的占位符或占位符生成函数。如果未提供，不进行填充。
 * @returns 返回复制并可能填充后的数组或字符串。
 * @throws 如果value既不是字符串也不是数组，抛出类型错误。
 */
function copyDeepOf(
  value: string | unknown[],
  size: number,
  placeholder?: string | unknown | Placeholder<unknown>,
) {
  const result = copyOf(value, size, placeholder);

  return copyDeep(result);
}

export { copyOf, copyDeepOf };
