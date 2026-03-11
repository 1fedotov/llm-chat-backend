# LLM Chat Backend

## Prerequisites

- Node.js v22 or higher
- pnpm v9 or higher

## Quick Start

```
pnpm install
pnpm dev
```

- Feel free to install other dependencies you need.

"devDependencies": {
    "@trivago/prettier-plugin-sort-imports": "^5.2.2", -> A prettier plugin to sort import declarations by provided Regular Expression order.

    "@typescript-eslint/eslint-plugin": "^5.45.0",
    "eslint": "^8.57.1", -> tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

    "eslint-plugin-import": "2.31.0", -> intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names. 

    "eslint-plugin-prettier": "^5.2.1",

    "husky": "^8.0.0", -> Automatically lint your commit messages, code, and run tests upon committing or pushing.

    "lint-staged": "^13.2.2", -> Run tasks like formatters and linters against staged git files and don't let 💩 slip into your code base!

    "prettier": "^3.3.3",

    "syncpack": "^10.0.0", ->  is a command-line tool for consistent dependency versions in large JavaScript Monorepos

    "turbo": "^2.6.1" -> is a high-performance build system for JavaScript and TypeScript codebases. It is designed for scaling monorepos and also makes workflows in single-package workspaces faster, too.
  },