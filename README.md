# LLM Chat Backend

## Prerequisites

- Node.js v22 or higher
- pnpm v9 or higher
- Ollama v0.18.0 or higher
- MongoDB 8.2.2 or higher

## Quick Start

```
pnpm install
pnpm dev
```

## Architecture Diagram

```mermaid
architecture-beta

    service gateway(internet)[Gateway]
    service db(database)[Database]
    service agent(server)[AI Agent]
    service disk2(disk)[Storage]
    service server(server)[Server]

    db:L -- R:server
    agent:T -- B:server
    disk2:L -- R:db
    gateway:L -- B:server
    agent:T -- B:db
```
## Database schema

```mermaid
classDiagram
    class SessionSchema {
        sessionId: _ID
        title: String
        history: [MessageSchema]
        createdAt: Timestamp
        ppdatedAt: Timestamp
    }

    class MessageSchema {
        role: String
        content: String
    }
```
## How your data model supports session and message queries

```mermaid
sequenceDiagram
  actor A1 as User
  participant P1 as Server
  participant P2 as AI Agent
  participant P3@{ "type": "database" } as Database
  A1->>P1: POST req
  P1->>P2: Req.message
  P2->>P3: Req.sessionId
  P3->>P2: sessionId.history
  P2->>P2: Generating the answer
  P2->>P3: sessionId.history
  P2->>P1: Return result
  P1->>A1: Return answer
```
## Link or location of API documentation


## Public deployment URL 


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