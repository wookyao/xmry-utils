# @xmry/utils

## 安装

use npm

```bash
npm i @xmry/utils
```

use yarn

```bash
yarn add @xmry/utils
```

use pnpm

```bash
pnpm add @xmry/utils
```

## 用法

### 🚀 type-checks 类型检查模块

#### **isString(value: unknown): value is string**
> *判断给定的值是否为字符串类型*

  ```typescript
  import { isString } from '@xmry/utils';

  isString(''); // true
  isString(1); // false
  isString(null); // false
  ```
---

#### **isNumber(value: unknown): value is number**
> *检查给定的值是否为数字*

  ```typescript
  import { isNumber } from '@xmry/utils';

  isNumber(1); // true
  isNumber(''); // false
  isNumber(null); // false
  ```
---

#### **isBoolean(value: unknown): value is boolean**
> *检查给定的值是否为布尔类型*

  ```typescript
  import { isBoolean } from '@xmry/utils';

  isBoolean(true); // true
  isBoolean(false); // true
  isBoolean(1 === 1); // true
  isBoolean('true'); // false
  ```
---

#### **isObject(value: unknown): value is object**
> *检查给定的值是否为对象类型*

  ```typescript
  import { isObject } from '@xmry/utils';

  isObject({}); // true
  isObject([]); // false
  isObject(1); // false
  isObject(''); // false
  isObject(null); // false
  ```
---

#### **isArray(value: unknown): boolean**
> *判断给定的值是否为数组 和 Array.isArray()方法表现一致*

  ```typescript
  import { isArray } from '@xmry/utils';

  isArray([]); // true
  isArray({}); // false
  isArray(1); // false
  isArray(''); // false
  isArray(null); // false
  ```
---

#### **isFunction(value: unknown): value is Function**
> *判断给定的值是否为函数*

  ```typescript
  import { isFunction } from '@xmry/utils';

  isFunction(function () {}); // true
  isFunction(() => {}); // true
  isFunction({}); // false
  isFunction(1); // false
  isFunction(null); // false
  ```
---

#### **isUndefined(value: unknown): value is undefined**
> *检查给定的值是否为 `undefined`*

  ```typescript
  import { isUndefined } from '@xmry/utils';

  isUndefined(undefined); // true
  isUndefined(false); // false
  isUndefined(null); // false
  isUndefined(0); // false
  ```
---

#### **isNull(value: unknown): value is null**
> *检查给定的值是否为 null*

  ```typescript
  import { isNull } from '@xmry/utils';

  isNull(null); // true
  isNull(undefined); // false
  isNull(false); // false
  isNull(0); // false
  ```
---

#### **isDate(value: unknown): value is Date**
> *检查给定的值是否为一个有效的日期对象*

  ```typescript
  import { isDate } from '@xmry/utils';

  isDate(new Date()); // true
  isDate(''); // false
  isDate(new Date('  ')); // false
  ```
---

#### **isPromise(value: unknown): boolean**
> *判断给定的值是否为一个Promise对象*

  ```typescript
  import { isPromise } from '@xmry/utils';

  isPromise(new Promise(() => {})); // true
  isPromise(Promise.resolve()); // true
  isPromise(''); // false
  isPromise(new Date()); // false
  ```
---

#### **isError(value: unknown): value is Error**
> *判断给定的值是否为Error实例*

  ```typescript
  import { isError } from '@xmry/utils';

  isError(new Error('')); // true
  isError(new TypeError('')); // true
  isError(new Date()); // false
  ```
---

#### **isNil(value: unknown): value is null | undefined**
> *检查给定的值是否为 null 或 undefined*

  ```typescript
  import { isNil } from '@xmry/utils';

  isNil(null); // true
  isNil(undefined); // true
  isNil(0); // false
  ```
---

#### **isPrimitiveType(value: unknown): boolean**
> *判定给定的值是否为基础数据类型*
> *js中基础数据类型有：string、number、boolean、symbol、null、undefined*

  ```typescript
  import { isPrimitiveType } from '@xmry/utils';

  isPrimitiveType(''); // true
  isPrimitiveType(0); // true
  isPrimitiveType(false); // true
  isPrimitiveType(undefined); // true
  isPrimitiveType(null); // true
  isPrimitiveType(Symbol('')); // true

  isPrimitiveType(function () {}); // false
  isPrimitiveType({}); // false

  ```
---

#### **isNilOrNaN(value: unknown): boolean**
> *检查给定的值是否为 null、undefined 或 NaN*

  ```typescript
  import { isNilOrNaN } from '@xmry/utils';

  isNilOrNaN(undefined); // true
  isNilOrNaN(null); // true
  isNilOrNaN('天外飞仙'); // true

  isNilOrNaN(123); // false
  isNilOrNaN('123'); // false
  ```
---

#### **isTypeOrNil(value: unknown, typeCheck: (value: unknown) => boolean): boolean**
> - *检查值是否为指定类型或者为null或undefined*
> - *@param value 未知类型的值，待检查*
> - *@param typeCheck 类型检查函数，用于检查值是否为指定类型*

  ```typescript
  import { isTypeOrNil, isString, isNumber, isBoolean, isObject, isArray } from '@xmry/utils';

  isTypeOrNil(null, isString); // true
  isTypeOrNil('null', isString); // true
  isTypeOrNil(0, isString); // false

  isTypeOrNil(1, isNumber); // true
  isTypeOrNil('', isNumber); // false

  isTypeOrNil(false, isBoolean) // true
  isTypeOrNil({}, isObject) // true
  isTypeOrNil([], isArray) // true

  const numGt5 = (value: unknown) => isNumber(value) && value > 5

  isTypeOrNil(6, numGt5) // true
  isTypeOrNil(1, numGt5) // false

  ```
---

#### **isEmpty(value: unknown, typeCheck: (value: unknown) => boolean): boolean**
> - *检查给定的值是否为空*
> - *此函数用于判断各种类型的值是否为空，包括但不限于对象、数组、字符串、数字和符号*
> - *对于不同类型的数据，空的定义有所不同例如，对于对象和数组，空意味着没有元素；*
> - *对于字符串，空意味着长度为零；对于数字，空意味着是NaN*

  ```typescript
  import { isEmpty, isString, isNumber, isBoolean, isObject, isArray } from '@xmry/utils';

  isEmpty(null); // true
  isEmpty(undefined); // true
  isEmpty([]); // true
  isEmpty([1]); // false

  isEmpty({}); // true
  isEmpty({k: 'v'}); // false

  isEmpty('') // true
  isEmpty('1') // false
  isEmpty(Number('飞线')) // true

  isEmpty(new Date('invalid')) // true
  isEmpty(new Date()) // false

  ```
---


### 🚀 common 通用模块

#### **slice(value:string | unknown[], rule:string): string | unknown[]**
> - *一个自定义的切片函数，它能够按照指定规则处理字符串或数组*
> - *@param {string | unknown[]} value - 要处理的字符串或数组。*
> - *@param rule "start:end[:step]"*
> - *rule - 格式为“起始位置:结束位置[:步长]”的切片规则字符串, 取数规则[start:end) *

  ```typescript
  import { slice } from '@xmry/utils';

  // string
  slice('strawberry', '1:4'); // tra
  slice('strawberry', ':'); // strawberry
  slice('strawberry', '::2'); // srwer
  slice('abc', '::-1')； // cba

  // array
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  slice(arr, '1:4') // [1, 2, 3]
  slice(arr, ':2') // [0,1]

  slice(arr, ':') // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  slice(arr, '::-1') // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

  slice(arr, '::-2') // [10, 8, 6, 4, 2, 0]
  slice(arr, '4::-2') // [10, 8, 6, 4]

  ```
---

#### **copyOf(value:string | unknown[], size: number,placeholder?: string | unknown | Placeholder\<unknown\>): string | unknown[]**
> - type Placeholder\<T\> = (index: number) => T;
> - *创建一个数组或字符串的副本，可以选择性地填充到指定大小*
> - *对于数组元素为引用类型的值，实现浅拷贝*
> - *@param value 原始字符串或数组*
> - *@param size 复本的大小。如果小于等于0，返回空数组或空字符串*
> - *@param placeholder 用于填充的占位符或占位符生成函数。如果未提供，不进行填充*

  ```typescript
  import { copyOf } from '@xmry/utils';

  const str: string = 'abcdef';

  copyOf(str, 3)  //('abc');
  copyOf(str, 9, '*')  //('abcdef***');

  copyOf(str, 0)  //('');
  copyOf(str, 1)  //('a');

  copyOf(str, 1, (i) => i * 2)  //('a');
  copyOf(str, 9, (i) => i * 2)  //('abcdef121');


  const list = [0, 1, 2, 3, 4, 5];

  copyOf(list, 3)  // [0, 1, 2]
  copyOf(list, 9, 1)  // [0, 1, 2, 3, 4, 5, 1, 1, 1]

  copyOf(list, 0)  // []
  copyOf(list, 1)  // [0]

  copyOf(list, 1, (i) => i * 2)  // [0]
  copyOf(list, 9, (i) => i * 2)  // [0, 1, 2, 3, 4, 5, 12, 14, 16]

  ```
---

#### **copyDeepOf(value:string | unknown[], size: number,placeholder?: string | unknown | Placeholder\<unknown\>): string | unknown[]**
> - type Placeholder\<T\> = (index: number) => T;
> - *创建一个数组或字符串的副本，可以选择性地填充到指定大小*
> - *对于数组元素为引用类型的值，实现深拷贝*
> - *@param value 原始字符串或数组*
> - *@param size 复本的大小。如果小于等于0，返回空数组或空字符串*
> - *@param placeholder 用于填充的占位符或占位符生成函数。如果未提供，不进行填充*

  ```typescript
  import { copyDeepOf } from '@xmry/utils';

  const str: string = 'abcdef';

  copyDeepOf(str, 3)  //('abc');
  copyDeepOf(str, 9, '*')  //('abcdef***');

  copyDeepOf(str, 0)  //('');
  copyDeepOf(str, 1)  //('a');

  copyDeepOf(str, 1, (i) => i * 2)  //('a');
  copyDeepOf(str, 9, (i) => i * 2)  //('abcdef121');


  const list = [0, 1, 2, 3, 4, 5];

  copyDeepOf(list, 3)  // [0, 1, 2]
  copyDeepOf(list, 9, 1)  // [0, 1, 2, 3, 4, 5, 1, 1, 1]

  copyDeepOf(list, 0)  // []
  copyDeepOf(list, 1)  // [0]

  copyDeepOf(list, 1, (i) => i * 2)  // [0]
  copyDeepOf(list, 9, (i) => i * 2)  // [0, 1, 2, 3, 4, 5, 12, 14, 16]

  ```
---


#### **copyDeep\<T\>(source: T, seen = new WeakMap()): T**
> - *深拷贝一个对象或数组*
> - *@param source 要拷贝的源对象或数组*
> - *@param seen 用于处理循环引用的对象弱引用映射，默认为新的 WeakMap*
> - *@returns 返回深拷贝后的对象或数组*

  ```typescript
  import { copyDeep } from '@xmry/utils';

  const arr = [1, 2, { a: 3 }];
  const copied = copyDeep(arr);

  // 数组
  expect(copied).toEqual(arr); // 值相同 
  expect(copied).not.toBe(arr); // 引用不同 
  expect(copied[2]).not.toBe(arr[2]); // 深拷贝内部对象 

  // 对象
  const obj = { a: 1, b: { c: 2 } };
  const copied = copyDeep(obj);
  expect(copied).toEqual(obj); // 值相同 
  expect(copied).not.toBe(obj); // 引用不同 
  expect(copied.b).not.toBe(obj.b); // 深拷贝内部对象

  // Set
  const set = new Set([1, 2, 3]);
  const copied = copyDeep(set);
  expect(copied).toEqual(set);
  expect(copied).not.toBe(set); // 引用不同

  // Map 
  const map = new Map();
  map.set('a', 1);
  map.set('b', { c: 2 });

  // 正则
  const regex = /test/gi;
  const copied = copyDeep(regex);
  expect(copied).toEqual(regex);
  expect(copied).not.toBe(regex); // 引用不同
  expect(copied.flags).toBe(regex.flags);

  const copied = copyDeep(map);
  expect(copied).toEqual(map);
  expect(copied).not.toBe(map); // 引用不同
  expect(copied.get('b')).not.toBe(map.get('b')); // 深拷贝内部对象

  // 循环引用
  const obj: any = { a: 1 };
  obj.self = obj; // 创建循环引用
  const copied = copyDeep(obj);
  expect(copied).toEqual({ a: 1, self: copied }); // 确保引用指向复制后的对象
  expect(copied.self).toBe(copied); // 循环引用保持正确
  

  ```
---