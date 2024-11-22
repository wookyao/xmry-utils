// 函数柯里化
// 来自 chatGpt
export function curry<T extends (...args: any[]) => any>(
  fn: T,
): CurriedFunction<T> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...nextArgs: any[]) => curried(...args, ...nextArgs);
    }
  } as CurriedFunction<T>;
}

type CurriedFunction<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => infer R
  ? <K extends Partial<P>>(
      ...args: K
    ) => K['length'] extends P['length']
      ? R
      : CurriedFunction<(...args: DropFirst<P>) => R>
  : never;

type DropFirst<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
