import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

// import tokens from './tokens'
import core from './core'
import demo from './demo'

export default combineReducers({
  core,
  demo,
  // tokens,
  router
})
