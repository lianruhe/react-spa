## RRW
  react + redux + webpack

## Structure

  ```
  .
  ├── cli                      # Compile, etc. Some scripts
  ├── config                   # Project environment-specific configuration settings
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
npm run gfw

# serve with hot reload at localhost:3000
npm run dev

# eslint, stylelint, unit and e2e test
npm test

# compile files for production
npm run compile

# test, clean, and compile
npm run build

```

## License

MIT
