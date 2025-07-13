# TypeScript TDD Katas

A multi-module monorepo for practicing Test-Driven Development (TDD) with TypeScript.

## Project Structure

```
tdd-katas-ts/
├── package.json          # Root workspace configuration
├── tsconfig.json         # Shared TypeScript config
├── jest.config.js        # Shared Jest config
├── .eslintrc.js         # Shared ESLint config
└── katas/
    └── kata-template/    # Template for new katas
        ├── package.json
        ├── tsconfig.json
        └── src/
```

## Getting Started

Install dependencies:
```bash
npm install
```

## Running Commands

### Root Level Commands
Run from the project root to execute across all katas:

- `npm test` - Run tests across all katas
- `npm run build` - Build all katas
- `npm run typecheck` - Type check all katas
- `npm run lint` - Lint all TypeScript files

### Individual Kata Commands
Run from within a specific kata directory:

- `npm test` - Run tests for that specific kata
- `npm run test:watch` - Watch mode for development
- `npm run build` - Build just that kata
- `npm run typecheck` - Type check just that kata

## Creating a New Kata

1. **Copy the template:**
   ```bash
   cp -r katas/kata-template katas/your-kata-name
   ```

2. **Update the package.json:**
   ```bash
   cd katas/your-kata-name
   ```
   Edit `package.json` and change the `name` field:
   ```json
   {
     "name": "@katas/your-kata-name",
     ...
   }
   ```

3. **Replace the example code:**
   - Delete or rename `src/Example.ts` and `src/marsRover.test.ts`
   - Create your kata implementation files
   - Update `src/index.ts` to export your main classes

4. **Start developing:**
   ```bash
   npm run test:watch
   ```

## Features

- **Shared Configuration**: TypeScript, Jest, and ESLint configs are shared across all katas
- **Isolated Modules**: Each kata is a separate npm package with its own dependencies
- **Hot Reloading**: Use watch mode for immediate feedback during TDD
- **Type Safety**: Full TypeScript support with strict type checking
- **Code Quality**: ESLint rules enforce consistent code style

## Example Katas

Create your own katas using the template structure provided.