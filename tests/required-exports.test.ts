import { RuleTester } from '@typescript-eslint/rule-tester';
import { requiredExportsRule } from '../src/rules/required-exports';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
});

ruleTester.run('required-exports', requiredExportsRule, {
  valid: [
    'export const foo = 1;',
    'export function bar() {}',
    'export class Baz {}',
    'export interface Qux {}',
    'export type Quux = string;',
    'export enum Color { Red, Green, Blue }',
    'const _private = 1;',
    'function _privateFunc() {}',
    {
      code: 'const foo = 1;',
      options: [{ variable: false }],
    },
    {
      code: 'function bar() {}',
      options: [{ function: false }],
    },
    'const foo = 1; export { foo };',
  ],
  invalid: [
    {
      code: 'const foo = 1;',
      errors: [
        {
          messageId: 'missingExport',
          data: { name: 'foo' },
        },
      ],
      output: 'export const foo = 1;',
    },
    {
      code: 'function bar() {}',
      errors: [
        {
          messageId: 'missingExport',
          data: { name: 'bar' },
        },
      ],
      output: 'export function bar() {}',
    },
    {
      code: 'class Baz {}',
      errors: [
        {
          messageId: 'missingExport',
          data: { name: 'Baz' },
        },
      ],
      output: 'export class Baz {}',
    },
    {
      code: 'interface Qux {}',
      errors: [
        {
          messageId: 'missingExport',
          data: { name: 'Qux' },
        },
      ],
      output: 'export interface Qux {}',
    },
    {
      code: 'type Quux = string;',
      errors: [
        {
          messageId: 'missingExport',
          data: { name: 'Quux' },
        },
      ],
      output: 'export type Quux = string;',
    },
    {
      code: 'enum Color { Red, Green, Blue }',
      errors: [
        {
          messageId: 'missingExport',
          data: { name: 'Color' },
        },
      ],
      output: 'export enum Color { Red, Green, Blue }',
    },
    {
      code: 'const _private = 1;',
      options: [{ ignorePrivate: false }],
      errors: [
        {
          messageId: 'missingExport',
          data: { name: '_private' },
        },
      ],
      output: 'export const _private = 1;',
    },
  ],
});