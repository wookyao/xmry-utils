import CONSTANT from '../const';
import { isString } from '../type-checks';

const RegMap = CONSTANT.reg;

type RegType = keyof typeof RegMap;

/**
 * 检查给定值是否符合指定的类型或格式
 *
 * 此函数旨在提供一种灵活的方式来验证一个给定的值（value）是否符合一个指定的类型（type）
 * 类型可以是一个字符串（代表预定义的验证类型）或一个正则表达式对象通过这种方式，函数支持
 * 对数据进行简单的类型或格式检查，适用于需要进行输入验证或数据校验的场景
 *
 * type RegType = "Hex" | "CN_Phone" | "CN_ID_Card" | "CN_Post_Code" | "Email" |
 *                "CN" | "EN" | "NUM" | "NUM_INT" | "NUM_DECIMAL" | "NUM_DECIMAL_TWO" |
 *                "EN_NUM" | "CN_EN_NUM" | "CN_EN_NUM_LINE" | "CN_EN_NUM_LINE_HYPHEN"
 *
 * @param value 要被验证的值，可以是任何类型
 * @param type 指定的类型，可以是字符串或正则表达式
 * @returns 如果value符合type；否则返回false
 * @throws指定的类型或格式，则返回true 如果type不是字符串或正则表达式，或者如果是字符串但不是内置验证类型，则抛出错误
 */
const validate = (value: any, type: RegType | RegExp) => {
  if (isString(type)) {
    const regExp = RegMap[type];
    if (!regExp) {
      throw new Error(`${type}: 不是内置验证类型`);
    }
    return regExp.test(String(value));
  }

  if (type instanceof RegExp) {
    return type.test(String(value));
  }

  throw new Error('参数type必须是字符串或正则表达式');
};

export default validate;
