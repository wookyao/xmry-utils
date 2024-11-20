# @xmry/utils


## Install
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

## Usage
### 🚀 type-checks

- #### isString()
  ```typescript
  import { isString } from '@xmry/utils'

  isString('') // true
  isString(1) // false
  isString(null) // false
  ```
- #### isNumber()
  ```typescript
  import { isNumber } from '@xmry/utils'

  isNumber(1) // true
  isNumber('') // false
  isNumber(null) // false
  ```

- #### isObject()
  ```typescript
  import { isObject } from '@xmry/utils'

  isObject({}) // true
  isObject([]) // false
  isObject(1) // false
  isObject('') // false
  isObject(null) // false
  ```