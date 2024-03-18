# Home Library Service

## Running application witch docker

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Create `Docker Hub` account [Docker Hub](https://hub.docker.com/)

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker-compose up
```

## Docker Hub
[db](https://hub.docker.com/repository/docker/andreimashedo/nodejs2024q1-service-db/general)
[app](https://hub.docker.com/repository/docker/andreimashedo/nodejs2024q1-service-app/general)

## You can use api.yaml or http://localhost:4000/doc to get Swagger documentation

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
