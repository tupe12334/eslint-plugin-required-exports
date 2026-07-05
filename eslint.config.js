import config from 'eslint-config-agent/recommended-incremental'

export default [
  {
    // tsconfig.json's "include" only covers src/**/*, so these files sit
    // outside its program and can't be type-aware linted.
    ignores: ['tests/**', 'vite.config.ts', 'vitest.config.ts'],
  },
  ...config,
]
