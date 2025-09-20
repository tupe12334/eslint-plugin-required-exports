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

## Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Create a release
pnpm release
```

## Release Setup

To create releases, you'll need to configure environment variables:

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Fill in your tokens in `.env`:

   ```bash
   # GitHub Personal Access Token for releases
   GITHUB_TOKEN=ghp_your_token_here

   # NPM Token for publishing
   NPM_TOKEN=npm_your_token_here

   # Git configuration
   GIT_USER_NAME="Your Name"
   GIT_USER_EMAIL="your.email@example.com"
   ```

3. Create tokens:
   - **GitHub Token**: Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
     - Required scopes: `repo` (for private repos) or `public_repo` (for public repos)
   - **NPM Token**: Go to [NPM Settings > Tokens](https://www.npmjs.com/settings/tokens)
     - Required scope: `Automation` or `Publish`

4. Run release commands:

   ```bash
   # Dry run to test the release process
   pnpm release:dry

   # Create an actual release
   pnpm release
   ```

## License

MIT
