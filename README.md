# Todo-List app

Simple web-app to manage tasks in todo-list.

The project is built under monorepo

- Frontend: NextJS with Typescript
- Backend: NodeJS, ExpressJS with Typescript
- Testing: Using Jest for Unit Test or Functional Test
- E2E test: Playwright

## Online Demo

The application is hosted on a Ubuntu VPS. Please check the demo
http://15.235.146.167:3001/todo-app/tasks

## Project structure

This monorepo is structured as follows:

- `.github\workflows`: Github Actions CI/CD configuration
  - `pr-review.yaml`: CI to check code quality and execute tests on PR made to branch `dev`
  - `release-review.yaml`: CI to run the Integration tests when all feature branches is merged and pushed to release
  - `release-deploy.yaml`: CD is manually triggered to deploy to VPS and pushing tag
- `deployments`: contains compose files for docker run
- `dev-configs`: is to configure base configuration for dev such as `eslint` and `tsconfig`
- `e2e-testing`: contains E2E testing with Playwright
- `todo-list-app`: Frontend application with NextJS
- `todo-list-rest-server`: Restful server under ExpressJS framework

## Prerequisites

- Node version: >= 20.0.0
- Database: MySQL

## Getting started

### Instalation

To install dependecies for all repos

```bash
yarn
```

To install playwright devices

```bash
yarn e2e-testing install:playwright
```

### To run locally

#### Backend configuration:

- Setup database by running init script `init.sql` located at `todo-list-rest-server/src/db/init.sql` on your schema
- Configure `.env` file by referencing to `.env.template`

#### Frontend configuration

- Define API host in `.env.local` by referencing to `.env`. For example, if the backend is running on port 1990, then please add this line in:

  - `NEXT_PUBLIC_API_HOST_URL=http://localhost:1990`

#### Start development environment

To run backend:

```bash
yarn dev:server
```

To run frontend:

```bash
yarn dev:fe
```

### Test

To execute Unit Test or  Functional Test

```bash
yarn test
```

To execute E2E testing

```bash
yarn test:e2e-prod
```

## Troubleshooting

### Getting error when execute UT or FT by `yarn test`

The issue come from yarn bugs, there is still no fix yet. To workaround, please follow the following steps:

```bash
rm todo-list-app/yarn.lock
rm todo-list-rest-server/yarn.lock
yarn
yarn test
```

It is try removiving yarn.lock and reinstall, then rerun the command to execute the test.
