// hex 正则
const Hex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;

// 中国大陆手机号正则
const CN_Phone = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
// 中国大陆身份证号正则
const CN_ID_Card =
  /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/;
// 中国大陆邮政编码正则
const CN_Post_Code = /^[1-9]\d{5}$/;

// Email 正则
const Email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// 仅支持中文
const CN = /^[\u4e00-\u9fa5]+$/;
// 仅支持中文 + 空格
const CN_Space = /^[\u4e00-\u9fa5\s]+$/;

// 仅支持英文
const EN = /^[a-zA-Z]+$/;
// 仅支持英文 + 空格
const EN_Space = /^[a-zA-Z\s]+$/;

// 仅支持数字 可以包括小数 也可以不包含小数
const NUM = /^-?\d*\.?\d*$/;

// 验证整数
const NUM_INT = /^-?\d+$/;
// 验证小数 必须包含小数
const NUM_DECIMAL = /^-?\d+\.\d*$/;
// 两位小数
const NUM_DECIMAL_TWO = /^-?\d+\.\d{2}$/;

// 仅支持字母和数字
const EN_NUM = /^[a-zA-Z0-9]+$/;

// 仅支持中文、英文、数字
const CN_EN_NUM = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;

export default {
  Hex,
  CN_Phone,
  CN_ID_Card,
  CN_Post_Code,
  Email,
  CN,
  CN_Space,
  EN,
  EN_Space,
  NUM,
  NUM_INT,
  NUM_DECIMAL,
  NUM_DECIMAL_TWO,
  EN_NUM,
  CN_EN_NUM,
};
