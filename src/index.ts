import { requiredExportsRule } from './rules/required-exports';

export = {
  meta: {
    name: 'eslint-plugin-required-exports',
    version: '0.1.0',
  },
  rules: {
    'required-exports': requiredExportsRule,
  },
  configs: {
    recommended: {
      plugins: ['required-exports'],
      rules: {
        'required-exports/required-exports': 'error',
      },
    },
  },
};