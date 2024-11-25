import { copyDeep } from '../common';

/** pick
 * 从一个对象中挑选出指定的属性
 *
 * @template T 被挑选对象的类型， extends object 表示只能是对象类型
 * @template K 指定属性的类型， extends keyof T 表示只能是 T 类型的属性键
 * @param obj 被挑选的对象
 * @param keys 需要挑选的属性键数组
 * @returns 返回一个只包含指定属性的新对象，类型为 Pick<T, K>
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  deep?: boolean,
): Pick<T, K> => {
  if (obj == null) {
    throw new TypeError('目标对象不能为null或undefined');
  }

  const result = {} as Pick<T, K>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deep ? copyDeep(obj[key]) : obj[key];
    }
  }
  return result;
};

/**
 * 从一个对象中省略指定的键
 *
 * @template T 被操作的对象的类型
 * @template K 对象中被省略的键的类型
 * @param {T} obj 被操作的对象
 * @param {K[]} keys 一组需要被省略的键
 * @param {boolean} [deep=false] 是否深度省略如果为true，则深度复制对象，省略指定的键
 * @returns {Omit<T, K>} 返回一个省略了指定键的新对象
 * @throws {TypeError} 如果提供的对象为null或undefined，则抛出类型错误
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  deep?: boolean,
): Omit<T, K> => {
  if (obj == null) {
    throw new TypeError('目标对象不能为null或undefined');
  }
  const sourceKeys = Reflect.ownKeys(obj).filter(
    (key) => typeof key === 'string',
  ) as K[];
  const pickKeys = sourceKeys.filter((key) => !keys.includes(key));

  const result: Partial<T> = {};
  for (const key of pickKeys) {
    result[key] = deep ? copyDeep(obj[key]) : obj[key];
  }

  return result as Omit<T, K>;
};
