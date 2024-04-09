# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application witch docker

### By Docker

1. Install [Docker](https://docs.docker.com/engine/install/)
2. run application

```
docker-compose up
```

### By localhost

1. Set valid DATABASE_URL in .env
2. npm run start:dev | run start

## Vulnerabilities scanning

```
npm run audit
```

## Logger

### if you have a ERROR [Logger] Error while writing logs to file: {"errno":-2,"code":"ENOENT","syscall"...}

try fix path to logs folder in ./src/logger/logger.service.ts line 69 and 86 This error may be caused by problems in the OS

1. Logs level - LOG = log

```
 1lvl     2lvl      3lvl    4lvl
 fatal => error =>  warn =>  log
```

2. logs files size - MAX_FILE_SIZE_MB

## Docker Hub

- [db](https://hub.docker.com/repository/docker/andreimashedo/nodejs2024q1-service-db/general)
- [app](https://hub.docker.com/repository/docker/andreimashedo/nodejs2024q1-service-app/general)

#### You can use api.yaml or http://localhost:4000/doc to get Swagger documentation

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
