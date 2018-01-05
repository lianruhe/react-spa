## React-SPA
  SPA with react, redux, react-router, immutable

## Structure

  ```
  .
  ├── cli                      # Scripts for compile, clean, etc.
  ├── config                   # Project environment-specific configuration settings
  ├── mock                     # Mock data API
  ├── src                      # Application source code
  │   ├── application          # Application starter
  │   ├── components           # Generic React Components (generally Dumb components)
  │   ├── modules              # View modules of routes
  │   ├── routes               # Application route definitions
  │   ├── static               # Static assets (not imported anywhere in source code)
  │   ├── store                # Redux-specific pieces
  │   │   ├── actions          # Redux actions
  │   │   ├── reducers         # Redux reducers
  │   │   └── index.js         # Create store
  │   ├── themes               # Application-wide styles (generally settings)
  │   ├── index.ejs            # HTML template
  │   └── index.jsx            # Application bootstrap and rendering
  └── tests                    # Unit tests(WIP...)
  ```

## Usage

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# serve with hot reload at localhost:3000 and api serve at localhost:3001
npm run mock

# eslint, stylelint, unit test
npm run test (wip...)

# compile files for production
npm run compile

# test, clean, and compile
npm run build

```

## License

[MIT](https://github.com/lianruhe/react-spa/blob/master/LICENSE)
