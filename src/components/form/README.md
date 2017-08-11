## antd-form
  配置化 antd 的 Form 组件

## Structure

  ```
  .
  ├── cli                      # Compile, etc. Some scripts
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
npm run gfw

# serve with hot reload at localhost:3000
npm run dev

# serve with hot reload at localhost:3000 and api serve at localhost:3001
npm run mock

# eslint, stylelint, unit and e2e test
npm test (wip...)

# compile files for production
npm run compile

# test, clean, and compile
npm run build

```

## Props

 - 封装的 form
 - @param {string} className    自定义类名
 - @param {array} items         FormItems 构建需要的值
 - @param {func} handleSubmit   提交触发的方法
 - @param {object} props        Form 其它的一些参数
 - @param {object} formData     Form 初始化参数

## License

MIT
