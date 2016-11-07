import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import tokens from './tokens'

export default combineReducers({
  tokens,
  router
})
