# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:maks-rafalko/nodejs2022Q4-service.git
```

## Installing NPM modules

First, got to cloned directory:

```bash
cd nodejs2022Q4-service
```

and checkout the development branch:

```bash
git checkout feature/home-library-part-1
```

Then, install dependencies:

```
npm install
```

## Running application

Before running application, you need to create `.env` file in root directory of the project.

This can be done from the template:

```bash
cp .env.example .env
```

To run application in production mode, run:

```
npm start
```

After starting the app on port (4000 as default, can be changed in `.env.`) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

To run application in development mode, run:

```
npm run start:dev
```

## Using application

See what API endpoints are available and how to use them in OpenAPI documentation, and in assignment:

- [OpenAPI documentation](http://localhost:4000/doc/)
- [Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/22bfc08752babe59c7c7ea25e3fde771dc7b27c6/assignments/rest-service/assignment.md)

Working with `typeorm` CLI:

```bash
npm run typeorm schema:sync -- --dataSource=src/data-source.ts
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
