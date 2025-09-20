# Contributing to eslint-plugin-required-exports

Thank you for your interest in contributing to eslint-plugin-required-exports! This guide will help you get started with development and releases.

## Development

### Prerequisites

- Node.js >= 18
- pnpm (recommended package manager)

### Getting Started

```bash
# Clone the repository
git clone https://github.com/tupe12334/eslint-plugin-required-exports.git
cd eslint-plugin-required-exports

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Development mode (watch builds)
pnpm dev
```

### Project Structure

```
src/
├── index.ts              # Main plugin export
└── rules/
    └── required-exports.ts # Core rule implementation

tests/
└── required-exports.test.ts # Test suite

dist/                     # Built output (generated)
├── index.js
├── index.d.ts
└── ...
```

### Development Workflow

1. **Make changes** to the source code in `src/`
2. **Write tests** in `tests/` for any new functionality
3. **Run tests** to ensure everything works: `pnpm test`
4. **Build the project** to check for TypeScript errors: `pnpm build`
5. **Test manually** with a sample ESLint configuration if needed

### Adding New Features

When adding new declaration types or configuration options:

1. Update the `Options` type in `src/rules/required-exports.ts`
2. Add the new option to the schema
3. Update the `defaultOptions`
4. Implement the visitor method for the new AST node type
5. Add test cases covering the new functionality
6. Update documentation in README.md

## Release Setup

To create releases, you'll need to configure environment variables for secure token management.

### Setting Up Release Environment

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

### Release Process

1. Ensure all changes are committed and the working directory is clean
2. Run tests and build to verify everything works:

   ```bash
   pnpm test
   pnpm build
   ```

3. Run release commands:

   ```bash
   # Dry run to test the release process
   pnpm release:dry

   # Create an actual release
   pnpm release
   ```

### Release Commands

- `pnpm release` - Interactive release with version selection
- `pnpm release:dry` - Dry run to test the release process
- `pnpm release minor --ci` - Non-interactive minor version release
- `pnpm release patch --ci` - Non-interactive patch version release
- `pnpm release major --ci` - Non-interactive major version release

### NPM 2FA and OTP

If you have 2FA enabled on NPM (recommended), you'll need to provide an OTP (One-Time Password) during releases.

**Important**: Do NOT store the OTP in your `.env` file as these codes expire quickly (usually within 30 seconds).

Instead, pass it as an environment variable when running the release:

```bash
NPM_OTP=123456 pnpm release
```

If the OTP expires during the release process, you may need to get a new code and run the command again.

## Pull Request Guidelines

1. **Fork** the repository and create a feature branch
2. **Write clear commit messages** following conventional commit format
3. **Add tests** for new functionality
4. **Update documentation** if needed
5. **Ensure all checks pass** (tests, build, linting)
6. **Keep PRs focused** - one feature or fix per PR

## Reporting Issues

When reporting issues, please include:

- ESLint version
- Plugin version
- Minimal reproduction case
- Expected vs actual behavior
- Error messages (if any)

## Code Style

This project uses:

- **TypeScript** for type safety
- **Vitest** for testing
- **ESLint** for linting (eating our own dog food!)
- **Conventional commits** for commit messages

## License

By contributing to eslint-plugin-required-exports, you agree that your contributions will be licensed under the MIT License.