import { isDate } from '../type-checks';

/** serialize
 * 将对象序列化为自定义字符串格式
 *
 * 该函数用于将各种类型的对象转换为字符串表示形式，以便于存储或传输
 * 它处理循环引用、null、undefined、数字、BigInt、字符串、布尔值、符号、
 * 函数、日期、正则表达式、错误对象、数组、Set、Map以及普通对象
 *
 * @param target 要序列化的对象
 * @param seen 用于跟踪已访问对象的WeakMap，以处理循环引用，默认为新的WeakMap
 * @returns 序列化后的字符串
 */
const serialize = (
  target: any,
  seen: WeakMap<object, string> = new WeakMap(),
): string => {
  let size: number = 0;

  function _serialize(value: any): string {
    if (value === null) {
      return 'Nil.';
    }

    if (value === undefined) {
      return 'Und.';
    }

    if (typeof value === 'number') {
      if (Object.is(value, -0)) return '-0';
      if (Number.isNaN(value)) return 'NaN';
      return `#(${value})`;
    }

    if (typeof value === 'bigint') {
      return `###(${value.toString()})`;
    }

    if (typeof value === 'string') {
      return `s(${value})`;
    }

    if (typeof value === 'boolean') {
      return `b(${value ? 'T' : 'F'})`;
    }

    if (typeof value === 'symbol') {
      return `s(${value.toString()})`;
    }

    if (typeof value === 'function') {
      const str = value.toString().trim();

      if (str.startsWith('function')) {
        return `f([code native])`;
      }

      return `lam([code native])`;
    }

    if (isDate(value)) {
      return `d(${value.toISOString()})`;
    }

    if (value instanceof RegExp) {
      return `r(${value.toString()})`;
    }

    if (value instanceof Error) {
      return `e(${value.message})`;
    }

    if (typeof value === 'object') {
      if (seen.has(value)) {
        return `[Circular:${seen.get(value)}]`;
      }

      const id = `o${size++}`;
      seen.set(value, id);

      if (Array.isArray(value)) {
        return `[${value.map((v) => _serialize(v)).join(',')}]`;
      }

      if (value instanceof Set) {
        const setList = Array.from(value).map((v) => _serialize(v));

        return `S{${setList.join(',')}}`;
      }

      if (value instanceof Map) {
        const entries = Array.from(value.entries()).map(
          ([key, val]) => `${_serialize(key)}:${_serialize(val)}`,
        );
        return `M{${entries.join(',')}}`;
      }

      const keys = Object.keys(value).sort(); // Sort keys to ensure consistency
      const entries = keys.map((key) => `${key}:${_serialize(value[key])}`);
      return `{${entries.join(',')}}`;
    }

    return 'Unk.';
  }

  const ser = _serialize(target);

  return ser;
};

export { serialize };
