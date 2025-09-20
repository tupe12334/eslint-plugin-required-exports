# eslint-plugin-required-exports

An ESLint plugin that enforces exports for top-level declarations like `const`, `function`, `class`, `interface`, `type`, and `enum`.

## Installation

```bash
npm install --save-dev eslint-plugin-required-exports
# or
pnpm add -D eslint-plugin-required-exports
# or
yarn add -D eslint-plugin-required-exports
```

## Usage

### ESLint 9 (Flat Config)

```js
import requiredExports from 'eslint-plugin-required-exports';

export default [
  {
    plugins: {
      'required-exports': requiredExports,
    },
    rules: {
      'required-exports/required-exports': 'error',
    },
  },
  // or use the recommended config
  requiredExports.configs.recommended,
];
```

### Legacy ESLint Config

```json
{
  "plugins": ["required-exports"],
  "rules": {
    "required-exports/required-exports": "error"
  }
}
```

## Rule: `required-exports`

This rule enforces that top-level declarations must be exported.

### ❌ Examples of incorrect code

```js
const myConstant = 42;
function myFunction() {}
class MyClass {}
interface MyInterface {}
type MyType = string;
enum MyEnum { A, B }
```

### ✅ Examples of correct code

```js
export const myConstant = 42;
export function myFunction() {}
export class MyClass {}
export interface MyInterface {}
export type MyType = string;
export enum MyEnum { A, B }

// Or using export statements
const myConstant = 42;
export { myConstant };

// Private identifiers are ignored by default
const _privateConstant = 42;
function _privateFunction() {}
```

### Options

The rule accepts an options object with the following properties:

```ts
{
  variable?: boolean;   // default: true
  function?: boolean;   // default: true
  class?: boolean;      // default: true
  interface?: boolean;  // default: true
  type?: boolean;       // default: true
  enum?: boolean;       // default: true
  ignorePrivate?: boolean; // default: true
}
```

#### Examples

```js
// Only check functions and classes
{
  "required-exports/required-exports": ["error", {
    "variable": false,
    "function": true,
    "class": true,
    "interface": false,
    "type": false,
    "enum": false
  }]
}

// Don't ignore private identifiers
{
  "required-exports/required-exports": ["error", {
    "ignorePrivate": false
  }]
}
```

## Auto-fix

This rule supports auto-fixing. It will automatically add the `export` keyword to declarations that are missing it.

## Contributing

Interested in contributing? Please see our [Contributing Guide](./CONTRIBUTING.md) for development setup, release process, and guidelines.

## License

MIT
