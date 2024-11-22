import { isArray, isDate, isPrimitiveType } from '../type-checks';

/** copyDeep
 * 深拷贝一个对象或数组
 * @param source 要拷贝的源对象或数组
 * @param seen 用于处理循环引用的对象弱引用映射，默认为新的 WeakMap
 * @returns 返回深拷贝后的对象或数组
 */
const copyDeep = <T>(source: T, seen = new WeakMap()): T => {
  // 处理原始值和 null
  if (source === null || isPrimitiveType(source)) return source;

  // 处理循环引用
  if (seen.has(source)) return seen.get(source) as T;

  // 处理特殊类型
  if (isDate(source)) {
    return new Date(source) as unknown as T;
  }

  if (source instanceof Map) {
    const map = new Map();
    source.forEach((value, key) => {
      map.set(copyDeep(key, seen), copyDeep(value, seen));
    });
    return map as unknown as T;
  }

  if (source instanceof Set) {
    const set = new Set();
    source.forEach((value) => {
      set.add(copyDeep(value, seen));
    });
    return set as unknown as T;
  }

  if (source instanceof RegExp) {
    return new RegExp(source) as unknown as T;
  }

  // 处理数组或者对象
  const result = isArray(source) ? [] : {};

  // 记录当前对象到 WeakMap
  if (seen.has(source)) return seen.get(source) as T;
  seen.set(source, result);

  // 遍历属性并递归拷贝
  Object.keys(source).forEach((key) => {
    (result as any)[key] = copyDeep((source as any)[key], seen);
  });

  return result as T;
};

export default copyDeep;
