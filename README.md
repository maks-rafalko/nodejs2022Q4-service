# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Donwload & Install Docker](https://docs.docker.com/get-docker)

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
git checkout feature/home-library-part-2
```

## Running application

Before running application, you need to create `.env` file in root directory of the project.

This can be done from the existing template:

```bash
cp .env.example .env
```

To run application in development mode, run:

```
# one-time operaion
docker compose build

docker compose up
```

This will run 2 docker containers - one with Postgres database, another with NestJS application on ports from `.env`.

> **Warning**
> During the `docker compose up` command, all migrations will be executed to create needed tables, so you can immediately use the app.

After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Using application

See what API endpoints are available and how to use them in OpenAPI documentation, and in assignment:

- [OpenAPI documentation](http://localhost:4000/doc/)
- [Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/22bfc08752babe59c7c7ea25e3fde771dc7b27c6/assignments/rest-service/assignment.md)

## Scan images for vulnerabilities

```bash
npm run scan:images
```

under the hood, it runs `docker scan maksrafalko/nodejs2022q4-service-app && docker scan maksrafalko/nodejs2022q4-service-db`

It works only if you are logged in your Docker Hub account.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
docker compose exec app npm run test
```

To run only one of all test suites

```bash
docker compose exec app npm run test -- <path to suite>
```

To run all test with authorization

```bash
docker compose exec app npm run test:auth
```

To run only specific test suite with authorization

```bash
docker compose exec app npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
docker compose exec app npm run lint
```

```bash
docker compose exec app npm run format
```

### Working with `typeorm` CLI:

```bash
docker compose exec app npm run typeorm schema:sync -- --dataSource=src/data-source.ts
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
