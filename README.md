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
### type-checks

- isString
  ```typescript
  import { isString } from '@xmry/utils'

  isString('') // true
  isString(1) // false
  isString(null) // false
  ```