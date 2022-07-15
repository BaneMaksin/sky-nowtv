# Architecture decisions records

## Clean structure
The project has been organised into clean, decoupling and scalable structure.


## Custom scripts
Custom scripts have been written to support stable development and continues delivery.

### Jest wrapper
Jest wrapper will pre-compile ahead of time any tests files to common JS and will programmatically only change modified files.

### Static server
Native HTTP server has been written to run distributable build for testing or CI pipeline support.


## Store
Store feature pattern has been integrated, and it's treated as a standalone module where all the features dependencies are located within the module instance.

Webpack require context has been utilized to automatically import and render reducers, selectors, slices and actions.

Selectors hook pattern has been use across application.

Redux Toolkit side effect middleware has been used for handling HTTP requests and manipulating actions.


## Code splitting
Root routes are lazy loaded and webpack production build have additional instruction to optimise the bundles.


## Transpilation
Babel has been configured to support transpilation of React components, latest ES rules and Typescript.


## Module bandler
Webpack has been used as module bandler with 2 custom configuration, one for development and other for distributable production.


## Linting
Custom ES lint, TypeScript and Style lint configurations have been written to lint the entire code base.


## UI / UX
JSX a11y linting plugin has been used to check for various accessibility bottlenecks.

Post CSS and auto prefixer plugin has been used to support old and latest browser features.

## Testing
Jest has been configured with custom configuration to support ahead of time transpilation.

Cypress has been used for E2E testing of pages and content.


## Mocks
Service worker has been utilised to intercept the HTTP request and return mocked data.

Please bear in mind that service workers will only work under localhost hostname and under SSL certificate.


## Dependencies
`connected-react-router` package has been removed since the package is not maintained anymore.

`redux-thunk` package has been also removed in favor of side effects.

`serve` package has been removed in favor of native HTTP server.

`enzyme` has been removed in favor of `testing-library`.

`prettier` has been removed in favour of more strict and robust custom ESLint rules.

---

[Back to README overview](../README.md)
