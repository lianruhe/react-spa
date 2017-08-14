import qs from 'query-string'
import template from 'string-template'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import merge from './object-merge'

const defaultReq = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET',
  credentials: 'include'
}

const defaultInterceptors = {
  request: [],
  response: []
}

function clonedInterceptors () {
  return {
    request: defaultInterceptors.request.slice(0),
    response: defaultInterceptors.response.slice(0)
  }
}

export function intercept ({ request, response } = {}) {
  const result = clonedInterceptors()
  if (request) {
    result.request = result.request.concat(request)
  }
  if (response) {
    result.response = result.response.concat(response)
  }
  return result
}

/**
 * request
 *
 *   request({
 *     url: 'path',
 *     query: { ... },
 *     params: { ... },
 *     body: { ... }
 *     headers: { ... }
 *   })
 *   request('path')
 *   request('path', { ... })
 *
 * @param  {string} [url]       URL
 * @param  {object} [options]   Options
 * @return {promise}            Promise
 */
async function request (url, options) {
  if (!options) {
    if (isPlainObject(url)) {
      options = url
      url = null
    } else {
      options = {
        url
      }
    }
  }

  if (!isPlainObject(options)) {
    throw new ParameterException('Options must be an object!')
  }

  if (isString(url)) {
    options.url = url
  }

  if (!isString(options.url)) {
    throw new ParameterException('URL is required!')
  }

  let { interceptors, ...req } = options
  interceptors = intercept(interceptors)

  req = await parseReq(req)
  req = await iterateInterceptors(req, interceptors.request)

  const res = await fetch(req.url, req)

  let body = await getBody(res)
  body = await iterateInterceptors(body, interceptors.response)

  if (res.status >= 200 && res.status < 400) {
    return body
  }

  throw body
}

async function getBody (res) {
  const type = res.headers.get('Content-Type')

  if (type && type.indexOf('json') !== -1) {
    const body = await res.json()
    return body
  }

  if (type && type.indexOf('stream') !== -1) {
    const blob = await res.blob()
    const filename = res.headers.get('Content-Disposition')
    return {
      filename,
      blob
    }
  }

  const body = await res.text()

  try {
    return JSON.parse(body)
  } catch (error) {
    return { body }
  }
}

function parseReq ({ url, query, params, body, ...req }) {
  req = merge({}, defaultReq, req)

  if (body) {
    if (typeof body === 'object' && body.constructor !== FormData) {
      if (/^(POST|PUT|PATCH)$/i.test(req.method)) {
        body = JSON.stringify(body)
      } else {
        url += ((url.indexOf('?') !== -1) ? '&' : '?') + qs.stringify(body)
        body = null
      }
    }
    if (body) {
      req.body = body
    }
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }

    if (query) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + query
    }
  }

  // 替换地址中的宏变量：{xyz}
  if (params) {
    url = template(url, params)
  }

  req.url = url

  return req
}

function iterateInterceptors (val, interceptors) {
  let i = 0
  async function iterator (val) {
    const interceptor = interceptors[i++]

    if (!interceptor) {
      return val
    }

    return iterator(await interceptor(val))
  }

  return iterator(val)
}

function ParameterException (message) {
  this.message = message
  this.name = 'ParameterException'
}

export default request

export function get (url, req = {}) {
  req.url = url
  req.method = 'GET'
  return request(req)
}

export function post (url, req = {}) {
  req.url = url
  req.method = 'POST'
  return request(req)
}

export function put (url, req = {}) {
  req.url = url
  req.method = 'PUT'
  return request(req)
}

export function patch (url, req = {}) {
  req.url = url
  req.method = 'PATCH'
  return request(req)
}

export function del (url, req = {}) {
  req.url = url
  req.method = 'DELETE'
  return request(req)
}
