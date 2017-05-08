import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import loggerMiddleware from 'redux-logger'
import promiseMiddleware from './middleware/promiseMiddleware'
import rootReducer from './reducers'

export const history = createHistory()

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [routerMiddleware(history), thunk, promise, promiseMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [persistState(['tokens'])]

  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }

    middleware.push(loggerMiddleware)
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers')
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
