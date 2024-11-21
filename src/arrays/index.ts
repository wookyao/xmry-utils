// 获取两个数组的交集
export function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => b.includes(value));
}

// 获取两个数组的差集
export function difference<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => !b.includes(value));
}

// 获取两个数组的并集
export function union<T>(a: T[], b: T[]): T[] {
  return [...a, ...b];
}

// 获取两个数组的对称差
export function symmetricDifference<T>(a: T[], b: T[]): T[] {
  return [...difference(a, b), ...difference(b, a)];
}
