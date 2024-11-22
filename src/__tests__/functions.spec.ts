import { curry } from '..';

// 函数柯里化
describe('curry', () => {
  test('curry check', () => {
    const add = (a: number, b: number) => a + b;
    const curriedAdd = curry(add);
    expect(curriedAdd(1)(2)).toBe(3);
    expect(curriedAdd(1, 2)).toBe(3);
  });
});
