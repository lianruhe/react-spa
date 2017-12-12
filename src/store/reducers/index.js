/**
 * 组合 reducers
 */
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

const moduleContext = require.context('./', true, /index\.js$/)
const reducers = { router }
moduleContext.keys().map(module => {
  const match = module.match(/\.\/(.+)\/index\.js/)
  if (match) {
    reducers[match[1]] = moduleContext(module)
  }
})

export default combineReducers(reducers)
