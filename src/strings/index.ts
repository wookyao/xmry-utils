import { isNumber, isString } from '../type-checks';

/** randomString
 * 生成指定长度的随机字符串
 *
 * @param length 字符串的长度
 * @param template 可选参数，用于指定生成字符串的字符集默认为大小写字母和数字
 * @returns 返回生成的随机字符串
 */
export function randomString(length: number, template?: string): string {
  if (!isNumber(length)) {
    throw new Error('长度参数必须为数字');
  }

  if (length <= 0) {
    throw new Error('字符串长度必须大于0');
  }

  const chars =
    template ||
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/** upFirstLetter
 * 将字符串的第一个字母转换为大写
 * 如果输入不是字符串类型，则直接返回原始输入
 *
 * @param str 待处理的字符串
 * @returns 返回首字母大写的字符串，如果输入为空字符串或单字符，则分别返回原字符串或该字符的大写形式
 */
export function upFirstLetter(str: string): string {
  if (!isString(str)) return str;

  if (str.length === 0) return str;

  if (str.length === 1) return str.toUpperCase();

  try {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  } catch (error) {
    return str;
  }
}

/** lowFirstLetter
 * 将字符串的第一个字母转换为小写
 * 如果输入不是字符串类型，则直接返回原始输入
 *
 * @param str 待处理的字符串
 * @returns 返回首字母小写的字符串，如果输入为空字符串或单字符，则分别返回原字符串或该字符的小写形式
 */
export function lowFirstLetter(str: string): string {
  if (!isString(str)) return str;

  if (str.length === 0) return str;

  if (str.length === 1) return str.toLowerCase();

  try {
    return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
  } catch (error) {
    return str;
  }
}
