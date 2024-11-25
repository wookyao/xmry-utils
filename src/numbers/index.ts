import { isNilOrNaN } from '../type-checks';

/** limitNumber
 * 将给定的数值限制在指定的最小值和最大值范围内
 *
 * @param value - 需要被限制的数值
 * @param max - 数值的最大限制
 * @param min - 数值的最小限制
 * @returns 返回被限制后的数值
 */
export function limitNumber(value: number, max: number, min: number): number {
  // 首先使用Math.min确保数值不超过最大限制，然后使用Math.max确保数值不低于最小限制
  return Math.max(min, Math.min(max, value));
}

/** rand
 * 生成指定范围内的随机整数
 *
 * @param max 随机数的上限（包含在范围内）
 * @param min 随机数的下限（包含在范围内）
 * @returns 返回min和max之间（包括min和max）的随机整数
 */
export function rand(max: number, min: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

/** toThousands
 * 将数字转换为带有千位分隔符的字符串
 *
 * @param num
 * @returns 一个带有千位分隔符、表示该数字的字符串
 * @throws 如果输入的不是有效数字，则抛出错误
 * @Link addCommasToIntegerPart(integerPart: string) string
 */
export function toThousands(num: any): string {
  if (
    typeof num !== 'number' ||
    num === Infinity ||
    num === -Infinity ||
    isNilOrNaN(num)
  ) {
    throw new TypeError('输入应为有效数字');
  }

  const numStr = num.toString();
  const parts = numStr.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  const formattedIntegerPart = addCommasToIntegerPart(integerPart);
  return formattedIntegerPart + decimalPart;
}

// 辅助函数： 金额格千分位
function addCommasToIntegerPart(integerPart: string): string {
  let result = '';
  while (integerPart.length > 3) {
    result = ',' + integerPart.slice(-3) + result;
    integerPart = integerPart.slice(0, -3);
  }
  return integerPart + result;
}
