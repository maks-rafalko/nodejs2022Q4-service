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
git checkout feature/home-library-part-3
```

## Running application

Before running application, you need to create `.env` file in root directory of the project.

This can be done from the existing template:

```bash
cp .env.example .env
```

Make sure to update secret variables with the values you want to use.

To run application in development mode, run:

```
# one-time operaion
docker compose build

docker compose up
```

This will run 2 docker containers - one with Postgres database, another with NestJS application on ports from `.env`.

> **Warning**
> During the `docker compose up` command, all migrations will be executed to create needed tables, so you can immediately use the app.
>
> See `docker/app/node-entrypoint.sh` for how migrations are executed.

After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

> Just for testing, there is also `prod` target on `Dockerfile`. It's possible to run application in a production mode, however requires rebuilding an image with `prod` target.

## Using application

See what API endpoints are available and how to use them in OpenAPI documentation, and in assignment:

- [OpenAPI documentation](http://localhost:4000/doc/)
- [Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/22bfc08752babe59c7c7ea25e3fde771dc7b27c6/assignments/rest-service/assignment.md)

Except for the endpoints described in the assignment, there are also some additional endpoints:
    - `/check-logger` - to check all logger levels at once
    - `/check-error` - to check logger writes errors (500 error status code with stack traces) to a separate file

All endpoints are protected by JWT authentication. To get a token, you need to register a new user (`/auth/signup`) and then log in (`/auth/login`).

JWT token should be passed in the `Authorization` header in the following format:

```bash
Authorization: Bearer <token>
```

If you want to refresh the token, you can use `/auth/refresh` endpoint. In order to do it, make sure to do the following 2 things:

- Add `Authorization` header with the old `refreshToken`: `Authorization: Bearer <refreshToken>`
- Add `refreshToken` to body, like `{ "refreshToken": "<refreshToken>" }`

In response, you will get a new pair of `accessToken` and `refreshToken`.

### Logger

By default, logs are being written to both `stdout` and `./logs/application.log` file. Errors are written to a separate `./logs/error.log` file.

File rotation is controlled by `LOG_FILE_MAX_SIZE_KB` in `.env` file. By default, it's set to `15KB`, so you can see how it works.

Just run the tests (`npm run test:auth`) and log files will be created.

## Scan images for vulnerabilities

```bash
npm run scan:images
```

under the hood, it runs `docker scan maksrafalko/nodejs2022q4-service-app && docker scan maksrafalko/nodejs2022q4-service-db`

It works only if you are logged in your Docker Hub account.

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```bash
docker compose exec app npm run test:auth
```
To run only specific test suite with authorization

```bash
docker compose exec app npm run test:auth -- <path to suite>
```
To run all test without authorization

```bash
docker compose exec app npm run test
```
To run only one of all test suites

```bash
docker compose exec app npm run test -- <path to suite>
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

Migrations can be executed by running:

```bash
docker compose exec app npm run typeorm migration:run -- --dataSource=src/data-source.ts
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
