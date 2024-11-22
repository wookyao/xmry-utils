/** equal
 * 深度比较两个对象是否相等
 *
 *  0 -0 不相等, NaN 相等, null 和 undefined 彼此不相等
 *
 * @param a any
 * @param b any
 * @returns 如果两个对象相等则返回true，否则返回false
 */
const equal = (a: any, b: any): boolean => {
  // 处理 基础数据类型
  if (a === b) {
    // 0 -0 不相等
    return a !== 0 || 1 / a === 1 / b;
  }

  // 处理 NaN
  if (a !== a && b !== b) {
    return true;
  }

  // 处理 null 和 undefined
  if (a == null || b == null) {
    return false;
  }

  // 验证 比较双方都是对象
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  // 比较原型链
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
    return false;
  }

  // 数组
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((item, index) => equal(item, b[index]));
  }

  // 对象
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 比较 key 是否相同
  const isSameKeys = equal(keysA, keysB);
  if (!isSameKeys) return false;

  // 比较 value
  for (const key of keysA) {
    if (!equal(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

export { equal };
