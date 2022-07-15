# Available NPM scripts

## Running the project

Hot deployable development build that will run on http://localhost:3000 address.
```
yarn start
```

Build the distributable bundle and run the static server on http://localhost:3000 address.
```
yarn start:static:server
```

## Building distributable package

Build the development bundle
```
yarn build
```

Build the distributable bundle
```
yarn build:prod
```

## Server

Run the static server on http://localhost:3000 address
```
yarn static:server
```

## Linting

Styles can be linted by
```
yarn stylelint
```

Code base can be linted by
```
yarn eslint
```

Types can be linted by
```
yarn tsclint
```

All 3 commands can be linted by running
```
yarn lint
```

## Unit tests

This script will run Jest wrapper, transpile all tests ahead of time and run standard Jest instructions
```
yarn test
```

Updating the snapshots can be achieved by
```
yarn test:update:snapshot
```

To run the Jest in debug mode, please run
```
yarn test:debug
```

## Cypress

To open the Cypress dashboard and run E2E tests, please run
```
yarn cy:open
```

To run the Cypress in headless mode
```
yarn cy:headless
```

To run the Cypress in headless mode and run the static server
```
yarn ci:cy
```

---

[Back to README overview](../README.md)
