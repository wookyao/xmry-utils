import { isArray, isString } from '../type-checks';

function slice(value: string, rule: string): string;
function slice(value: unknown[], rule: string): unknown[];
function slice(value: string | unknown[], rule: string): string | unknown[];

/**
 * 一个自定义的切片函数，它能够按照指定规则处理字符串或数组。
 *
 * @param value - 要进行切片操作的字符串或数组。
 * @param rule "start:end[:step]"。
 *  - 格式为“起始位置:结束位置[:步长]”的切片规则字符串。
 *  - 如果不提供步长，默认为1。
 *
 * @returns 返回切片后的字符串或数组。
 *
 * @throws 如果传入的值不是字符串或数组，则抛出类型错误（TypeError）。
 * @throws 如果规则格式不正确，则抛出错误（Error）。
 *
 * @example
 *
 * String
 * slice('strawberry', '1:4') // 'tra'
 * slice('strawberry', ':') // 'strawberry'
 * slice('strawberry', '::2') // 'srwer'
 * slice('abc', '::-1') // 'cba'
 *
 * slice('strawberry', '1:') // 'trawberry'
 * slice('strawberry', ':2') // 'st'
 * slice('strawberry', '::-2') // 'yrbat'
 * slice('strawberry', '4::-2') // 'yrb'
 *
 * Array
 * const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * slice(arr, '2:6') // [2, 3, 4, 5]
 * slice(arr, ':') // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * slice(arr, ':2') // [0, 1]
 * slice(arr, '::-1') // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
 * slice(arr, '::-2') // [10, 8, 6, 4, 2, 0]
 * slice(arr, '4::-2') // [10, 8, 6, 4]
 */
function slice(value: string | unknown[], rule: string) {
  // 1. 参数校验
  if (!isString(value) && !isArray(value)) {
    throw new TypeError('The value must be a string or an array.');
  }

  if (!isString(rule) || !/^(-?\d*):(-?\d*):?(-?\d+)?$/.test(rule)) {
    throw new Error(
      'The rule must be a string in the format "start:end[:step]".',
    );
  }

  // 2. 参数解析
  const [startStr, endStr, stepStr] = rule.split(':');
  const length = value.length;

  const start = startStr ? parseInt(startStr, 10) : 0;
  const end = endStr ? parseInt(endStr, 10) : length;
  const step = stepStr ? parseInt(stepStr, 10) : 1;

  if (isNaN(start) || isNaN(end) || isNaN(step) || step === 0) {
    throw new Error(
      'Start, end, and step must be valid integers, and step cannot be 0.',
    );
  }

  // 3. 起始位置 结束位置 边界处理
  const normalizedStart =
    start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
  const normalizedEnd =
    end < 0 ? Math.max(length + end, 0) : Math.min(end, length);

  // 4. 切片处理
  const result = [];
  if (step > 0) {
    for (let i = normalizedStart; i < normalizedEnd; i += step) {
      result.push(value[i]);
    }
  } else {
    for (let i = normalizedEnd - 1; i >= normalizedStart; i += step) {
      result.push(value[i]);
    }
  }

  const res = isString(value) ? result.join('') : result;

  return res;
}

export default slice;
