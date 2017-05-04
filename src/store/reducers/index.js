import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import tokens from './tokens'
import core from './core'

export default combineReducers({
  core,
  tokens,
  router
})
