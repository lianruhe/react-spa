// 本地模拟
const SIMULATION = 0
// 开发
const DEVELOPMENT = 1
// 测试
const DEBUG = 2
// 生产
const PRODUCTION = 4

// mock 数据地址
const MOCK_HOST = 'localhost:3001'
// 生产数据地址
const PRO_HOST = '155.16.xxx.xxx'

const LOC_PROTOCOL = location.protocol + '//'
const LOC_HOST = location.host
// host === hostname:port
const LOC_HOSTNAME = location.hostname

const LOC_RES = {
  module: 'loc',
  protocol: LOC_PROTOCOL,
  host: LOC_HOST,
  ver: 'v0.1'
}
const APP_RES = {
  module: 'app',
  protocol: 'http://',
  ver: ''
}

/**
 * @constant {number} ENV
 */
const ENV = (() => {
  if (__DEV__) {
    switch (LOC_HOSTNAME) {
      case 'localhost':
        return SIMULATION
      case '127.0.0.1':
        return DEVELOPMENT
      default:
        return DEBUG
    }
  }
  return PRODUCTION
})()

switch (ENV) {
  case SIMULATION:
    APP_RES.host = MOCK_HOST
    break
  case DEVELOPMENT:
    APP_RES.host = PRO_HOST
    break
  case DEBUG:
    APP_RES.host = PRO_HOST
    break
  default:
    APP_RES.host = PRO_HOST
}

/**
 * @constant {string} DATETIME_FORMAT 默认的时间日期格式
 */
const DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

/**
 * @constant {string} DATE_FORMAT 默认的日期格式
 */
const DATE_FORMAT = 'yyyy-MM-dd'

/**
 * @constant {string} TIME_FORMAT 默认的时间格式
 */
const TIME_FORMAT = 'hh:mm:ss'

/**
 * @constant {string} TOAST_DURATION 默认提示信息显示毫秒数
 */
const TOAST_DURATION = 3000

/**
 * @constant {string}  透明图片
 */
const DEFAULT_AVATAR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAALVBMVEXd3d0AAADi4uLf39/09PTg4ODh4eHj4+Ph4eHu7u7q6ure3t7h4eH6+vr5+fnM+2pCAAAADXRSTlO8AMeq84sRTnTh1TopPRDhSQAAA/pJREFUWMOlmc9LVFEUxw++xh+TCA9xRphZzKJNgvJECCoXQwxUxMS40IgiHESMVg6USESMELlpEUYLIUMsamU0RXuHiGoXMYsK3hBihMLzb0iH0aP3e+89t/puHx/uOeeec94995JvUOLj7OhQ4A2Nzt8p+gYZ4PRsQPvy5qt/ASf2UMaLrvBUgUCxGTf4U0AaeQ9c4Hdk0BUZZhZpCf5AFl21w9fJqvs2OBnYYa9khhMFEhQrGuG3JOq0Ce4VQHCbwGgXwxF+T04a1sGpwA32KgxDtOSYIZwiZ1UAfu0OH2UYPZa9VuAJQrX0LeYWVzIEOnEYTgSIPo/CXdXPA+4VD8E9wMbz4Z5qQI8cgsukqCMK91XfUOn2g3AKbN5lmV7X7xbpw7XUgJjOQMgYVkviWKhIXTrGcBKNVlQjRaUmjFYPhKBltLsJl2FhUBbi3YTTyocjIeorKao24R4INWpDlyeEBdUSalSH0mrCBbQaldFsFmF6rWrhZU2SEbocaeEz4HQDXlPKiQFrhnY24LLVZS4O3GmCPtAfCktzRyBI7CUTnIX0JilerC2IGPnjkCIGbStw6w48rQ+2nCdtPqnB7gDG5HT7DhwIO8X6qYTbpzQ5w1/UqiR1p7qAMdZ0iXpdYeyCc9QNsLPZgzRO/xowaqU1dzir1hVNk2OSYD9oYxhyG8sK4DIZOr7cQNupQI5OY+uOIdwlrsxwIPxdWXU1YB7DcrTXEXbPsB8AE7Z80WkUuiz+4Slwh7dEn1f/J2AD7rntQZJ0WFyWMywSrWbYvTCyWBjTeHIUej7WM8YbXUZ4jaSyYpehDY0T2C25zA2wm0B5oQlx6+1FeEAoKW76SQLF3aymEqUJlXeymqrkB052rxPI45+7kCcPCdTOxwp7nnwnVBsfaLC0MFx4oOmRmhEvjEepJGkUj8BjUImPjzgcYajx+NgIN+ppqMySEGw+MoNa8vaFqZMP66guu8c0wmOCbbsypFMFBhR3OMajkUZHsF/jaGRyut+aXjQC4yAUB0wXMA7qdvr4xQO1nFvBXVZGYERZGwswAhuG7z5GjXgJxn6+H9FpM4Njv2J3CyzLvi9oLxxS7C0va1u8ApcsyKLnGbxk8Sf5XsauWiPdxuBiifuHlc7AxZI/wSUs08Oay7RXoZM2vQpe48VDR13QXCCuusJzAPtvIkf2m49w0hGuz2lg/64b/NvXwWm3napqYf+GC/zCdDl+TWZ/+SY4lReNrqgwqzsSIj1oe4r4bIef2B9BbtrYs9Lzyz0ze86XYKaRRRh0O9LG6qXbY9dkHtnamOszW/pypCz7uOpLMGvqZHQAfTRjfeBDJW6dym2H4Xbu2SXj0+IfAM+HJyw1M54AAAAASUVORK5CYII='
/**
 * 单位
 * @type {Object}
 */
const UNITS = {
  'SECOND': 'SECOND',
  'MINUTE': 'MINUTE',
  'HOUR': 'HOUR',
  'KM': 'KM',
  'METER': 'METER',
  'GROUP': 'GROUP',
  'NUM': 'NUM',
  'CLUD': 'CLUD'
}

const config = {
  SIMULATION,
  DEVELOPMENT,
  DEBUG,
  PRODUCTION,
  ENV,
  LOC_RES,
  APP_RES,
  DATETIME_FORMAT,
  DATE_FORMAT,
  TIME_FORMAT,
  TOAST_DURATION,
  DEFAULT_AVATAR,
  UNITS
}

Object.keys(config).map(key => {
  if (/^(?!LOC).+_RES$/.test(key)) {
    const { protocol, host, ver } = config[key]
    config[key].base = `${protocol}${host}${ver && `/${ver}`}`
  }
})

export default config
