import regMap from '../const/reg-map';
import { limitNumber } from '../numbers';

/** hex2Rgba
 * 将十六进制颜色转换为RGBA颜色
 *
 * @param hex 十六进制颜色字符串
 * @param alpha 透明度值，可选，默认为1
 * @returns 返回RGBA颜色字符串
 * @throws 如果hex格式不正确，则抛出错误
 */
const hex2Rgba = (hex: string, alpha?: number) => {
  // 检查格式是否正确
  if (!regMap.Hex.test(hex)) {
    throw new Error(`不正确的hex格式: ${hex}`);
  }

  // 去掉开头的#
  let cleanedHex = hex.replace(/^#/, '');

  // 将缩写的hex转换为完整的hex 并转换为小写
  cleanedHex = expandShortHex(cleanedHex).toLowerCase();

  // 将hex转换为rgba
  const r = parseInt(cleanedHex.substring(0, 2), 16);
  const g = parseInt(cleanedHex.substring(2, 4), 16);
  const b = parseInt(cleanedHex.substring(4, 6), 16);
  // 限制alpha范围
  const a = limitNumber(alpha || 1, 1, 0);

  // 返回rgba颜色字符串
  return `rgba(${r},${g},${b},${a})`;
};

// 辅助函数： 将缩写的hex转换为完整的hex
const expandShortHex = (hex: string) => {
  if (hex.length === 3) {
    return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return hex;
};

export default hex2Rgba;
